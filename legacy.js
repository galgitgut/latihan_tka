function svgCubes(){
  const s=26, c=Math.cos(Math.PI/6);
  const P=(x,y,z,ox,oy)=>[ox+(x-y)*s*c, oy+(x+y)*s*0.5-z*s];
  function stack(n,ox,oy,fill){
    const cubes=[]; for(let z=0;z<n;z++)for(let y=0;y<n;y++)for(let x=0;x<n;x++)cubes.push([x,y,z]);
    cubes.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1])||a[2]-b[2]);
    const poly=(pts,f)=>`<polygon points="${pts.map(p=>p.map(v=>v.toFixed(1)).join(",")).join(" ")}" fill="${f}" stroke="#3A3844" stroke-width="1.6" stroke-linejoin="round"/>`;
    return cubes.map(([x,y,z])=>
      poly([P(x,y,z+1,ox,oy),P(x+1,y,z+1,ox,oy),P(x+1,y+1,z+1,ox,oy),P(x,y+1,z+1,ox,oy)],fill[0])+
      poly([P(x+1,y,z,ox,oy),P(x+1,y+1,z,ox,oy),P(x+1,y+1,z+1,ox,oy),P(x+1,y,z+1,ox,oy)],fill[1])+
      poly([P(x,y+1,z,ox,oy),P(x+1,y+1,z,ox,oy),P(x+1,y+1,z+1,ox,oy),P(x,y+1,z+1,ox,oy)],fill[2])).join("");
  }
  const F=["#D9EEB8","#A9CF79","#C2E09A"];
  return `<svg viewBox="0 0 330 180" width="330" role="img" aria-label="Satu kardus kubus 1×1×1 dan tumpukan kardus 2×2×2">
    ${stack(1,60,80,F)}
    <text x="60" y="160" text-anchor="middle" font-family="Patrick Hand,cursive" font-size="16" fill="#2C2A35">1 × 1 × 1</text>
    <line x1="120" y1="20" x2="120" y2="165" stroke="#3A3844" stroke-dasharray="4 5" stroke-width="1.5"/>
    ${stack(2,230,58,F)}
    <text x="230" y="172" text-anchor="middle" font-family="Patrick Hand,cursive" font-size="16" fill="#2C2A35">2 × 2 × 2</text>
  </svg>`;
}
function svgTrap(){
  return `<svg viewBox="0 0 360 200" width="360" role="img" aria-label="Trapesium sama kaki ABCD dengan sudut A 65 derajat">
        <path d="M40 170 L70 170 A30 30 0 0 0 52.7 142.8 Z" fill="#9CCB6B" stroke="#3A3844" stroke-width="1.2"/>
    <polygon points="40,170 320,170 273.5,70.3 86.5,70.3" fill="none" stroke="#2C2A35" stroke-width="3" stroke-linejoin="round"/>
    <line x1="56" y1="118" x2="70" y2="124" stroke="#2C2A35" stroke-width="2.5"/>
    <line x1="290" y1="124" x2="304" y2="118" stroke="#2C2A35" stroke-width="2.5"/>
    <g font-family="Mali,cursive" font-weight="700" font-size="18" fill="#2C2A35">
      <text x="22" y="182">A</text><text x="326" y="182">B</text><text x="268" y="60">C</text><text x="76" y="60">D</text>
      <text x="76" y="160" font-size="17">65°</text>
    </g>
  </svg>`;
}
function svgBars(){
  const v=[3,4,5,6,4,2,1], lab=[70,75,80,85,90,95,100];
  const x0=46, y0=170, h=140, w=290, step=w/v.length, bw=24, max=7;
  let g="";
  for(let i=0;i<=max;i++){ const y=y0-i/max*h;
    g+=`<line x1="${x0}" y1="${y}" x2="${x0+w}" y2="${y}" stroke="#3A3844" stroke-opacity=".18" stroke-dasharray="3 4"/>
        <text x="${x0-8}" y="${y+5}" text-anchor="end" font-size="14" fill="#2C2A35">${i}</text>`; }
  v.forEach((n,i)=>{ const x=x0+i*step+(step-bw)/2, bh=n/max*h;
    g+=`<rect x="${x}" y="${y0-bh}" width="${bw}" height="${bh}" fill="#B7A0E0" stroke="#3A3844" stroke-width="1.5"/>
        <text x="${x+bw/2}" y="${y0-bh-6}" text-anchor="middle" font-size="15" font-weight="700" fill="#2C2A35">${n}</text>
        <text x="${x+bw/2}" y="${y0+20}" text-anchor="middle" font-size="14" fill="#2C2A35">${lab[i]}</text>`; });
  return `<svg viewBox="0 0 350 222" width="350" role="img" aria-label="Diagram batang nilai ulangan IPA: nilai 70 tiga anak, 75 empat, 80 lima, 85 enam, 90 empat, 95 dua, 100 satu">
    <g font-family="Patrick Hand,cursive">
    <text x="${x0+w/2}" y="14" text-anchor="middle" font-size="16" fill="#2C2A35">Data Nilai Ulangan IPA</text>
    ${g}
    <line x1="${x0}" y1="${y0}" x2="${x0+w}" y2="${y0}" stroke="#2C2A35" stroke-width="2"/>
    <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0-h-6}" stroke="#2C2A35" stroke-width="2"/>
    <text x="${x0+w/2}" y="${y0+44}" text-anchor="middle" font-size="14" fill="#6E6A79">Nilai · tinggi batang = banyak siswa (anak)</text>
    </g></svg>`;
}
function extraTable(kind){
  if(kind==="baca") return `<div class="tbl" style="margin-top:4px"><table class="dtable"><tr><th>Nama</th><th>Mulai Membaca</th><th>Selesai Membaca</th></tr>
    <tr><td>Doni</td><td>09.00</td><td>09.45</td></tr><tr><td>Elsa</td><td>09.20</td><td>10.00</td></tr><tr><td>Fani</td><td>09.15</td><td>10.15</td></tr></table></div>`;
  if(kind==="toko") return `<div class="tbl" style="margin-top:4px"><table class="dtable"><tr><th>Barang</th><th>Jumlah Penjualan</th></tr>
    <tr><td>Beras</td><td>250 kg</td></tr><tr><td>Gula</td><td>110 kg</td></tr><tr><td>Minyak Goreng</td><td>95 kg</td></tr><tr><td>Tepung Terigu</td><td>120 kg</td></tr></table></div>`;
  return "";
}

