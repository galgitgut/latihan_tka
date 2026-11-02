// Penyimpanan riwayat ke Firebase (Firestore + login anonim).
// Semua data satu keluarga ada di families/{KODE}. Perangkat jadi anggota lewat families/{KODE}/devices/{uid}.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  doc, collection, setDoc, getDoc, getDocs, deleteDoc, onSnapshot, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJpWiuatuZ356RH6BLAOlDcmaKC6JLcbE",
  authDomain: "latihan-tka-cbc91.firebaseapp.com",
  projectId: "latihan-tka-cbc91",
  storageBucket: "latihan-tka-cbc91.firebasestorage.app",
  messagingSenderId: "146097527255",
  appId: "1:146097527255:web:29158ddda882a723f91392"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });

let uidPromise = null;
function signIn() {
  if (!uidPromise) uidPromise = new Promise((resolve, reject) => {
    const off = onAuthStateChanged(auth, u => {
      if (u) { off(); resolve(u.uid); }
    }, reject);
    signInAnonymously(auth).catch(err => { off(); uidPromise = null; reject(err); });
  });
  return uidPromise;
}

const clean = o => JSON.parse(JSON.stringify(o)); // Firestore menolak nilai undefined
const ALPHA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function newCode() {
  const r = crypto.getRandomValues(new Uint32Array(8));
  return "TKA-" + Array.from(r, n => ALPHA[n % ALPHA.length]).join("");
}
export function normalizeCode(s) {
  s = String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (s.startsWith("TKA")) s = s.slice(3);
  return s ? "TKA-" + s : "";
}

async function createFamily(label) {
  const uid = await signIn();
  for (let i = 0; i < 4; i++) {
    const code = newCode();
    try {
      await setDoc(doc(fs, "families", code), { name: "Latihan TKA Malika", createdAt: serverTimestamp(), version: 1 });
    } catch (e) { continue; } // kode kebetulan sudah dipakai: coba kode lain
    await setDoc(doc(fs, "families", code, "devices", uid), { label: label || "Perangkat", pairedAt: serverTimestamp() });
    return code;
  }
  throw new Error("Gagal membuat kode keluarga. Coba lagi.");
}

async function joinFamily(rawCode, label) {
  const uid = await signIn();
  const code = normalizeCode(rawCode);
  if (code.length < 8) throw new Error("Kode belum lengkap.");
  const dev = doc(fs, "families", code, "devices", uid);
  await setDoc(dev, { label: label || "Perangkat", pairedAt: serverTimestamp() });
  const fam = await getDoc(doc(fs, "families", code));
  if (!fam.exists()) {
    try { await deleteDoc(dev); } catch (e) {}
    throw new Error("Kode tidak ditemukan. Periksa lagi kodenya.");
  }
  return code;
}

// Adapter dengan bentuk yang sama seperti penyimpanan app sebelumnya.
function familyDb(code) {
  const base = ["families", code];
  const col = name => collection(fs, ...base, name);
  return {
    code,
    collection(name) {
      return {
        orderBy(field, dir) {
          return {
            onSnapshot(cb, err) {
              return onSnapshot(query(col(name), orderBy(field, dir || "asc")),
                s => cb({ docs: s.docs.map(d => ({ id: d.id, data: () => d.data() })) }), err);
            }
          };
        },
        add(body) { // id dibuat di perangkat, jadi tetap jalan saat offline
          const ref = doc(col(name));
          setDoc(ref, clean(body)).catch(e => console.warn("Gagal menyimpan", name, e));
          return Promise.resolve({ id: ref.id });
        },
        doc(id) { return { delete: () => deleteDoc(doc(fs, ...base, name, id)) }; }
      };
    },
    doc(path) {
      const ref = doc(fs, ...base, ...path.split("/"));
      return {
        get: () => getDoc(ref).then(d => ({ exists: d.exists(), data: () => d.data() })),
        set: v => setDoc(ref, clean(v)),
        delete: () => deleteDoc(ref)
      };
    },
    async devices() {
      const s = await getDocs(col("devices"));
      const me = auth.currentUser && auth.currentUser.uid;
      return s.docs.map(d => ({ id: d.id, me: d.id === me, ...d.data() }));
    },
    async leave() {
      const uid = await signIn();
      try { await deleteDoc(doc(fs, ...base, "devices", uid)); } catch (e) {}
    }
  };
}

window.TKAStore = { signIn, createFamily, joinFamily, familyDb, normalizeCode };
window.dispatchEvent(new Event("tkastore"));
