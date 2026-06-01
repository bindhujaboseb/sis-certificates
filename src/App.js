import { useState, useRef, useEffect } from "react";

const SCHOOL_LOGO_B64 = "data:image/png;base64,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";

const TEMPLATES = [
  { id: "academic",     label: "Academic Excellence",  emoji: "🏆", c1: "#1a0533", c2: "#4a1080", c3: "#c084fc", gold: "#FFD700", ribbon: "#9333ea" },
  { id: "participation",label: "Participation",         emoji: "⭐", c1: "#002d1f", c2: "#065f46", c3: "#34d399", gold: "#FFD700", ribbon: "#10b981" },
  { id: "winner",       label: "Competition Winner",    emoji: "🥇", c1: "#3b0000", c2: "#991b1b", c3: "#fca5a5", gold: "#FFD700", ribbon: "#ef4444" },
  { id: "completion",   label: "Course Completion",     emoji: "📜", c1: "#001e3c", c2: "#1e40af", c3: "#93c5fd", gold: "#FFD700", ribbon: "#3b82f6" },
  { id: "special",      label: "Special Achievement",   emoji: "✨", c1: "#2d1b00", c2: "#92400e", c3: "#fcd34d", gold: "#FFD700", ribbon: "#f59e0b" },
];

const defaultSettings = {
  schoolName: "Sharjah Indian School",
  principalName: "Dr. Rajesh Kumar",
};

function drawCert(canvas, data, settings, tid, logoImg) {
  const t = TEMPLATES.find(x => x.id === tid) || TEMPLATES[0];
  const ctx = canvas.getContext("2d");
  const W = 1122, H = 794;
  canvas.width = W; canvas.height = H;

  // ── Background: radial parchment glow ──────────────────────────────────
  const bgGrad = ctx.createRadialGradient(W/2, H/2, 100, W/2, H/2, 700);
  bgGrad.addColorStop(0,   "#fffef7");
  bgGrad.addColorStop(0.6, "#fef9e7");
  bgGrad.addColorStop(1,   "#fef0c0");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ── Colourful corner triangles ────────────────────────────────────────
  const corners = [
    { x:0, y:0,   pts:[[0,0],[200,0],[0,200]] },
    { x:W, y:0,   pts:[[W,0],[W-200,0],[W,200]] },
    { x:0, y:H,   pts:[[0,H],[200,H],[0,H-200]] },
    { x:W, y:H,   pts:[[W,H],[W-200,H],[W,H-200]] },
  ];
  const cg1 = ctx.createLinearGradient(0,0,200,200);
  cg1.addColorStop(0, t.c2); cg1.addColorStop(1, t.c3+"88");
  corners.forEach(({ pts }) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    pts.forEach(p => ctx.lineTo(p[0], p[1]));
    ctx.closePath();
    ctx.fillStyle = cg1;
    ctx.fill();
  });

  // ── Outer borders ─────────────────────────────────────────────────────
  const rr = (x,y,w,h,r) => {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
  };

  ctx.strokeStyle = t.c2; ctx.lineWidth = 10; rr(8,8,W-16,H-16,20); ctx.stroke();
  ctx.strokeStyle = t.gold; ctx.lineWidth = 4; rr(20,20,W-40,H-40,14); ctx.stroke();
  ctx.strokeStyle = t.c3+"99"; ctx.lineWidth = 1.5; rr(30,30,W-60,H-60,10); ctx.stroke();

  // ── Decorative corner ornaments ────────────────────────────────────────
  [[52,52],[W-52,52],[52,H-52],[W-52,H-52]].forEach(([cx,cy]) => {
    // Outer ring
    ctx.strokeStyle = t.gold; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2); ctx.stroke();
    // Spokes
    for (let a=0; a<8; a++) {
      const ang = a/8*Math.PI*2;
      ctx.strokeStyle = t.gold+"99"; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx+Math.cos(ang)*10, cy+Math.sin(ang)*10);
      ctx.lineTo(cx+Math.cos(ang)*20, cy+Math.sin(ang)*20);
      ctx.stroke();
    }
    ctx.fillStyle = t.gold;
    ctx.beginPath(); ctx.arc(cx,cy,7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = t.c2;
    ctx.beginPath(); ctx.arc(cx,cy,4,0,Math.PI*2); ctx.fill();
  });

  // ── Side flourish lines ───────────────────────────────────────────────
  ctx.strokeStyle = t.gold+"44"; ctx.lineWidth = 1;
  ctx.setLineDash([6,5]);
  [[80,80,80,H-80],[W-80,80,W-80,H-80]].forEach(([x1,y1,x2,y2]) => {
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  });
  ctx.setLineDash([]);

  // ── Header band ────────────────────────────────────────────────────────
  const hg = ctx.createLinearGradient(42,42,W-42,150);
  hg.addColorStop(0, t.c1); hg.addColorStop(0.4, t.c2); hg.addColorStop(0.6, t.c2); hg.addColorStop(1, t.c1);
  ctx.fillStyle = hg; rr(42,42,W-84,108,10); ctx.fill();
  // Gold shimmer strip
  ctx.fillStyle = t.gold; ctx.fillRect(42,148,W-84,4);
  const shimmer = ctx.createLinearGradient(42,148,W-42,148);
  shimmer.addColorStop(0,"transparent"); shimmer.addColorStop(0.5,t.gold+"55"); shimmer.addColorStop(1,"transparent");
  ctx.fillStyle = shimmer; ctx.fillRect(42,148,W-84,2);

  // School logo (real image)
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(96, 93, 44, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#fff";
    ctx.fillRect(52, 49, 88, 88);
    ctx.drawImage(logoImg, 52, 49, 88, 88);
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(96, 93, 44, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    ctx.font = "40px serif"; ctx.textAlign="center"; ctx.fillText("🏫", 96, 102);
  }

  // School name
  ctx.fillStyle = t.gold;
  ctx.font = "bold 30px 'Palatino Linotype', Palatino, Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText(settings.schoolName.toUpperCase(), W/2, 86);
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "italic 13px Georgia, serif";
  ctx.fillText("✦  Excellence in Education  •  Inspiring Futures  ✦", W/2, 114);

  // ── Divider helper ─────────────────────────────────────────────────────
  const divider = (y, spread=300) => {
    ctx.strokeStyle = t.gold; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(W/2-spread,y); ctx.lineTo(W/2-28,y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W/2+28,y); ctx.lineTo(W/2+spread,y); ctx.stroke();
    // centre diamond
    ctx.fillStyle = t.gold;
    ctx.save(); ctx.translate(W/2,y); ctx.rotate(Math.PI/4); ctx.fillRect(-8,-8,16,16); ctx.restore();
    ctx.save(); ctx.translate(W/2-18,y); ctx.rotate(Math.PI/4); ctx.fillRect(-4,-4,8,8); ctx.restore();
    ctx.save(); ctx.translate(W/2+18,y); ctx.rotate(Math.PI/4); ctx.fillRect(-4,-4,8,8); ctx.restore();
  };

  // ── Year badge ─────────────────────────────────────────────────────────
  const yg = ctx.createLinearGradient(W/2-95,158,W/2+95,186);
  yg.addColorStop(0, t.c2+"44"); yg.addColorStop(0.5, t.c3+"33"); yg.addColorStop(1, t.c2+"44");
  ctx.fillStyle = yg; rr(W/2-95,158,190,28,6); ctx.fill();
  ctx.strokeStyle = t.gold+"66"; ctx.lineWidth=1; rr(W/2-95,158,190,28,6); ctx.stroke();
  ctx.fillStyle = t.c2;
  ctx.font = "bold 11px Arial, sans-serif";
  ctx.fillText("ACADEMIC YEAR  2026 – 2027", W/2, 176);

  // ── Main title ─────────────────────────────────────────────────────────
  // Shadow
  ctx.shadowColor = t.c3+"55"; ctx.shadowBlur = 12;
  ctx.fillStyle = t.c1;
  ctx.font = "bold 54px 'Palatino Linotype', Palatino, Georgia, serif";
  ctx.fillText("CERTIFICATE", W/2, 242);
  ctx.shadowBlur = 0;

  ctx.fillStyle = t.ribbon;
  ctx.font = "28px 'Palatino Linotype', Palatino, Georgia, serif";
  ctx.fillText("OF  ACHIEVEMENT", W/2, 273);

  divider(287, 320);

  // ── Body ───────────────────────────────────────────────────────────────
  ctx.fillStyle = "#555";
  ctx.font = "italic 17px Georgia, serif";
  ctx.fillText("This is to certify that", W/2, 322);

  // Student name — gradient text via clip trick
  const name = data.studentName || "Student Name";
  ctx.font = "bold 50px 'Palatino Linotype', Palatino, Georgia, serif";
  const ng = ctx.createLinearGradient(W/2-300,0,W/2+300,0);
  ng.addColorStop(0, t.c2); ng.addColorStop(0.5, t.ribbon); ng.addColorStop(1, t.c2);
  ctx.fillStyle = ng;
  ctx.fillText(name, W/2, 383);

  // Decorative name underline
  const nw = ctx.measureText(name).width;
  const ul = W/2-nw/2-12, ur = W/2+nw/2+12;
  const ulg = ctx.createLinearGradient(ul,0,ur,0);
  ulg.addColorStop(0,"transparent"); ulg.addColorStop(0.2, t.gold); ulg.addColorStop(0.8, t.gold); ulg.addColorStop(1,"transparent");
  ctx.strokeStyle = ulg; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(ul,392); ctx.lineTo(ur,392); ctx.stroke();

  // Grade line
  ctx.fillStyle = "#666";
  ctx.font = "17px Georgia, serif";
  ctx.fillText(`of  Grade ${data.grade||"6"}  —  Division ${data.division||"A"}`, W/2, 421);

  ctx.fillStyle = "#555";
  ctx.font = "italic 16px Georgia, serif";
  ctx.fillText("has successfully completed / participated in", W/2, 449);

  // Activity name
  const acg = ctx.createLinearGradient(W/2-250,0,W/2+250,0);
  acg.addColorStop(0, t.c2); acg.addColorStop(0.5, t.ribbon); acg.addColorStop(1, t.c2);
  ctx.fillStyle = acg;
  ctx.font = "bold italic 28px 'Palatino Linotype', Palatino, Georgia, serif";
  ctx.fillText(`"  ${data.activityName||"Activity Name"}  "`, W/2, 483);

  ctx.fillStyle = "#666";
  ctx.font = "15px Georgia, serif";
  ctx.fillText("and is awarded this certificate under the category of", W/2, 510);

  // Category pill
  ctx.font = "bold 13px Arial, sans-serif";
  const cat = (data.category||"Participation").toUpperCase();
  const cw = ctx.measureText(cat).width + 52;
  const cpg = ctx.createLinearGradient(W/2-cw/2,0,W/2+cw/2,0);
  cpg.addColorStop(0, t.c1); cpg.addColorStop(0.5, t.c2); cpg.addColorStop(1, t.c1);
  ctx.fillStyle = cpg; rr(W/2-cw/2,518,cw,32,8); ctx.fill();
  ctx.strokeStyle = t.gold+"66"; ctx.lineWidth=1; rr(W/2-cw/2,518,cw,32,8); ctx.stroke();
  ctx.fillStyle = t.gold; ctx.fillText(cat, W/2, 538);

  ctx.fillStyle = "#777";
  ctx.font = "italic 13px Georgia, serif";
  ctx.fillText("for demonstrating exceptional dedication, enthusiasm, and commitment.", W/2, 568);
  ctx.fillText("We congratulate the student and wish them continued success.", W/2, 585);

  divider(601, 360);

  // ── Principal signature ────────────────────────────────────────────────
  // Wavy line
  ctx.strokeStyle = t.c2; ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i=0;i<=12;i++) {
    const sx = W/2-70+(i/12)*140, sy = 648+Math.sin(i*1.4)*3.5;
    i===0 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
  }
  ctx.stroke();
  ctx.fillStyle = t.c1;
  ctx.font = "bold 13px Georgia, serif";
  ctx.fillText(settings.principalName, W/2, 665);
  ctx.fillStyle = "#999";
  ctx.font = "11px Arial, sans-serif";
  ctx.fillText("Principal", W/2, 680);

  // ── Bottom info bar ────────────────────────────────────────────────────
  const ibg = ctx.createLinearGradient(42,H-62,W-42,H-34);
  ibg.addColorStop(0, t.c1+"33"); ibg.addColorStop(0.5, t.c2+"22"); ibg.addColorStop(1, t.c1+"33");
  ctx.fillStyle = ibg; ctx.fillRect(42,H-62,W-84,28);
  ctx.strokeStyle = t.gold+"33"; ctx.lineWidth=1; ctx.strokeRect(42,H-62,W-84,28);

  ctx.font = "10px Arial, sans-serif"; ctx.textAlign="left";
  ctx.fillStyle = "#999";
  ctx.fillText(`Date of Issue: ${data.dateOfIssue||new Date().toLocaleDateString("en-GB")}`, 58, H-43);
  ctx.textAlign="center";
  ctx.fillText("Sharjah Indian School  •  Verified Certificate", W/2, H-43);
  ctx.textAlign="right";
  ctx.fillText(`Cert No: ${data.certNumber||"SIS-G6-2026-001"}`, W-58, H-43);

  // ── Template emoji badge ────────────────────────────────────────────────
  ctx.font = "34px serif"; ctx.textAlign="center";
  ctx.fillText(t.emoji, 90, H-50);
  ctx.font = "34px serif";
  ctx.fillText(t.emoji, W-90, H-50);

  // ── Seal watermark ──────────────────────────────────────────────────────
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = t.c2;
  ctx.font = "bold 180px Georgia, serif";
  ctx.fillText("SIS", W/2, H/2+65);
  ctx.globalAlpha = 1;

  // ── Sparkle stars ───────────────────────────────────────────────────────
  [[90,170],[W-90,170],[90,H-88],[W-90,H-88]].forEach(([sx,sy]) => {
    ctx.fillStyle = t.gold+"aa"; ctx.font="22px serif"; ctx.textAlign="center";
    ctx.fillText("✦",sx,sy);
  });
}

export default function App() {
  const [tab, setTab]           = useState("individual");
  const [template, setTemplate] = useState("academic");
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sis_s")||"null")||defaultSettings; }
    catch { return defaultSettings; }
  });
  const [settingsLocal, setSettingsLocal] = useState(settings);
  const [certCount, setCertCount]   = useState(1);
  const [history, setHistory]       = useState([]);
  const [form, setForm]             = useState({
    studentName:"Ahmed Mohammed Al Rashid", grade:"6", division:"A",
    category:"Participation", activityName:"AI Innovation Challenge 2026",
    dateOfIssue: new Date().toISOString().split("T")[0],
    certNumber:"SIS-G6-2026-001",
  });
  const [bulkRecords, setBulkRecords] = useState([]);
  const [bulkStatus, setBulkStatus]   = useState("");
  const [progress, setProgress]       = useState(0);
  const [generating, setGenerating]   = useState(false);
  const [drag, setDrag]               = useState(false);
  const [toast, setToast]             = useState(null);
  const [libs, setLibs]               = useState({ xlsx:false, jszip:false });
  const canvasRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const load = (src, key) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => setLibs(l => ({...l,[key]:true}));
      document.head.appendChild(s);
    };
    load("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js","xlsx");
    load("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js","jszip");
  }, []);

  // Redraw canvas whenever form/template/settings change
  useEffect(() => {
    if (canvasRef.current && logoRef.current) drawCert(canvasRef.current, form, settings, template, logoRef.current);
  }, [form, template, settings]);

  const showToast = (msg, type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  // ── Download PNG ───────────────────────────────────────────────────────
  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return showToast("Canvas not ready","err");
    try {
      canvas.toBlob(blob => {
        if (!blob) return showToast("Failed to create image","err");
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${form.certNumber||"certificate"}_${(form.studentName||"student").replace(/\s+/g,"_")}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("✅ PNG downloaded successfully!");
      }, "image/png");
    } catch(e) { showToast("Download failed: "+e.message,"err"); }
  };

  // ── Print / Save as PDF ────────────────────────────────────────────────
  const printPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL("image/png");
    const w = window.open("","_blank");
    if (!w) return showToast("Pop-up blocked – allow pop-ups","err");
    w.document.write(`<!DOCTYPE html><html><head><title>Certificate – ${form.studentName||""}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box;}
      @page{size:A4 landscape;margin:0;}
      body{background:#fff;display:flex;align-items:center;justify-content:center;height:100vh;}
      img{width:100%;height:100%;object-fit:contain;}
    </style></head><body><img src="${dataURL}"/>
    <script>window.onload=function(){window.print();};<\/script>
    </body></html>`);
    w.document.close();
    showToast("🖨 Print dialog opened — choose 'Save as PDF'");
  };

  // ── Bulk ───────────────────────────────────────────────────────────────
  const parseExcel = async file => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) return setBulkStatus("❌ Please upload .xlsx or .xls");
    setBulkStatus("📖 Reading…");
    const XLSX = window.XLSX;
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(ws);
    const norm = k => k.trim().toLowerCase();
    const cols = Object.keys(json[0]||{}).map(norm);
    const req = ["student name","grade","division","certificate category","activity name"];
    const miss = req.filter(r=>!cols.includes(r));
    if (miss.length) return setBulkStatus(`❌ Missing columns: ${miss.join(", ")}`);
    const records = json.map((row,i)=>{
      const r={}; Object.keys(row).forEach(k=>{r[norm(k)]=row[k];});
      return { studentName:r["student name"]||"", grade:String(r["grade"]||"6"), division:r["division"]||"A",
               category:r["certificate category"]||"Participation", activityName:r["activity name"]||"",
               dateOfIssue:r["date of issue"]||new Date().toISOString().split("T")[0],
               certNumber:`SIS-G6-2026-${String(i+1).padStart(3,"0")}` };
    }).filter(r=>r.studentName);
    setBulkRecords(records); setBulkStatus(`✅ Loaded ${records.length} records`);
  };

  const generateZip = async () => {
    if (!bulkRecords.length) return;
    setGenerating(true); setProgress(0);
    const zip = new window.JSZip();
    for (let i=0;i<bulkRecords.length;i++) {
      const c=document.createElement("canvas");
      drawCert(c, bulkRecords[i], settings, template, logoRef.current);
      const blob = await new Promise(r=>c.toBlob(r,"image/png"));
      zip.file(`${bulkRecords[i].certNumber}_${bulkRecords[i].studentName.replace(/\s+/g,"_")}.png`, blob);
      setProgress(Math.round((i+1)/bulkRecords.length*100));
      await new Promise(r=>setTimeout(r,10));
    }
    const content = await zip.generateAsync({type:"blob"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(content);
    a.download=`SIS_Certificates_${Date.now()}.zip`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setGenerating(false); showToast(`📦 ZIP downloaded (${bulkRecords.length} certificates)!`);
  };

  const downloadSample = () => {
    const XLSX=window.XLSX;
    const data=[
      ["Student Name","Grade","Division","Certificate Category","Activity Name","Date of Issue"],
      ["Ahmed Ali","6","A","Participation","AI Innovation Challenge","01/06/2026"],
      ["Sara John","6","B","Completion","Scratch Programming","01/06/2026"],
      ["Fatima Hassan","6","C","Excellence","Robotics Competition","01/06/2026"],
    ];
    const ws=XLSX.utils.aoa_to_sheet(data);
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Certificates");
    XLSX.writeFile(wb,"SIS_Template.xlsx");
  };

  const tmpl = TEMPLATES.find(t=>t.id===template)||TEMPLATES[0];

  return (
    <div style={{minHeight:"100vh", background:`linear-gradient(135deg, ${tmpl.c1} 0%, ${tmpl.c2} 50%, ${tmpl.c1} 100%)`, fontFamily:"Georgia,serif", paddingBottom:48, transition:"background 0.6s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap');
        .fi{background:rgba(255,255,255,0.08);border:1px solid rgba(255,215,0,0.3);color:#FEF9E7;border-radius:8px;padding:9px 14px;font-size:13px;font-family:Lato,sans-serif;width:100%;box-sizing:border-box;outline:none;transition:border 0.2s;}
        .fi:focus{border-color:rgba(255,215,0,0.7);background:rgba(255,255,255,0.12);}
        .fi option{background:#111;color:#FEF9E7;}
        .fi::placeholder{color:rgba(254,249,231,0.35);}
        lbl{display:block;font-size:10px;color:rgba(255,215,0,0.8);margin-bottom:4px;letter-spacing:1px;font-family:Lato,sans-serif;font-weight:700;text-transform:uppercase;}
        .card{background:rgba(0,0,0,0.25);border:1px solid rgba(255,215,0,0.18);border-radius:16px;padding:22px;backdrop-filter:blur(6px);}
        .btn{border:none;border-radius:10px;cursor:pointer;font-family:Lato,sans-serif;font-weight:700;transition:all 0.15s;letter-spacing:.5px;}
        .btn:hover{transform:translateY(-2px);filter:brightness(1.12);}
        .btn:active{transform:scale(0.97);}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(255,215,0,0.3);border-radius:3px}
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,
          background: toast.type==="err"?"#5c0000":"rgba(0,0,0,0.85)",
          color:"#FFD700", padding:"13px 22px", borderRadius:10, fontSize:13,
          fontFamily:"Lato,sans-serif", border:"1px solid rgba(255,215,0,0.4)",
          boxShadow:"0 8px 32px rgba(0,0,0,0.6)", maxWidth:340}}>
          {toast.msg}
        </div>
      )}

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div style={{background:"rgba(0,0,0,0.35)", borderBottom:"1px solid rgba(255,215,0,0.2)", padding:"18px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:52,height:52,borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(255,215,0,0.6)",boxShadow:`0 4px 20px rgba(255,215,0,0.35)`}}><img src={SCHOOL_LOGO_B64} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
          <div>
            <div style={{fontFamily:"'Cinzel',Georgia,serif",fontSize:20,color:"#FFD700",fontWeight:700,letterSpacing:3}}>{(settings.schoolName||"SIS").toUpperCase()}</div>
            <div style={{fontSize:10,color:"rgba(254,249,231,0.45)",fontFamily:"Lato,sans-serif",letterSpacing:3,marginTop:2}}>CERTIFICATE GENERATOR  ✦  2026–2027</div>
          </div>
        </div>
        <div style={{display:"flex",gap:6}}>
          {[{id:"individual",icon:"🎓",label:"Individual"},{id:"bulk",icon:"📦",label:"Bulk"},{id:"history",icon:"📋",label:`History (${history.length})`},{id:"settings",icon:"⚙️",label:"Settings"}].map(t=>(
            <button key={t.id} className="btn" onClick={()=>setTab(t.id)} style={{padding:"9px 16px",fontSize:12,background:tab===t.id?"rgba(255,215,0,0.18)":"transparent",color:tab===t.id?"#FFD700":"rgba(254,249,231,0.45)",border:tab===t.id?`1px solid rgba(255,215,0,0.45)`:"1px solid transparent",borderRadius:8,fontWeight:tab===t.id?700:400,fontFamily:"Lato,sans-serif"}}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1300,margin:"0 auto",padding:"0 24px"}}>

        {/* ── INDIVIDUAL ──────────────────────────────────────────────── */}
        {tab==="individual" && (
          <div style={{display:"grid",gridTemplateColumns:"350px 1fr",gap:22}}>

            {/* Left panel */}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>

              {/* Form */}
              <div className="card">
                <div style={{fontFamily:"'Cinzel',serif",color:"#FFD700",fontSize:12,letterSpacing:2,marginBottom:16}}>✦ STUDENT DETAILS</div>
                {[{label:"Student Name",key:"studentName",ph:"Full name"},{label:"Activity / Program Name",key:"activityName",ph:"e.g. AI Innovation Challenge"}].map(({label,key,ph})=>(
                  <div key={key} style={{marginBottom:11}}>
                    <div style={{fontSize:10,color:"rgba(255,215,0,0.75)",marginBottom:4,fontFamily:"Lato,sans-serif",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{label}</div>
                    <input className="fi" value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph}/>
                  </div>
                ))}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:11}}>
                  <div>
                    <div style={{fontSize:10,color:"rgba(255,215,0,0.75)",marginBottom:4,fontFamily:"Lato,sans-serif",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Grade</div>
                    <select className="fi" value={form.grade} onChange={e=>setForm(f=>({...f,grade:e.target.value}))}>
                      {["5","6","7","8","9","10"].map(g=><option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{fontSize:10,color:"rgba(255,215,0,0.75)",marginBottom:4,fontFamily:"Lato,sans-serif",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Division</div>
                    <select className="fi" value={form.division} onChange={e=>setForm(f=>({...f,division:e.target.value}))}>
                      {["A","B","C","D","E"].map(d=><option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{marginBottom:11}}>
                  <div style={{fontSize:10,color:"rgba(255,215,0,0.75)",marginBottom:4,fontFamily:"Lato,sans-serif",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Category</div>
                  <select className="fi" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                    {["Participation","Completion","Excellence","Competition Winner","Special Achievement"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div>
                    <div style={{fontSize:10,color:"rgba(255,215,0,0.75)",marginBottom:4,fontFamily:"Lato,sans-serif",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Date</div>
                    <input className="fi" type="date" value={form.dateOfIssue} onChange={e=>setForm(f=>({...f,dateOfIssue:e.target.value}))}/>
                  </div>
                  <div>
                    <div style={{fontSize:10,color:"rgba(255,215,0,0.75)",marginBottom:4,fontFamily:"Lato,sans-serif",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Cert No.</div>
                    <input className="fi" value={form.certNumber} onChange={e=>setForm(f=>({...f,certNumber:e.target.value}))}/>
                  </div>
                </div>
              </div>

              {/* Template picker */}
              <div className="card">
                <div style={{fontFamily:"'Cinzel',serif",color:"#FFD700",fontSize:12,letterSpacing:2,marginBottom:12}}>✦ TEMPLATE</div>
                {TEMPLATES.map(t=>(
                  <button key={t.id} onClick={()=>setTemplate(t.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",background:template===t.id?`${t.c2}cc`:"transparent",border:template===t.id?`1.5px solid ${t.gold}`:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"9px 14px",cursor:"pointer",marginBottom:6,color:template===t.id?t.gold:"rgba(254,249,231,0.55)",transition:"all 0.15s",fontFamily:"Lato,sans-serif",fontSize:13}}>
                    <span style={{fontSize:20}}>{t.emoji}</span>
                    <span style={{fontWeight:template===t.id?700:400}}>{t.label}</span>
                    {template===t.id&&<span style={{marginLeft:"auto",fontSize:12}}>✓</span>}
                  </button>
                ))}
              </div>

              {/* Action buttons — only 3 */}
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <button className="btn" onClick={downloadPNG} style={{background:`linear-gradient(135deg, ${tmpl.c2}, ${tmpl.ribbon})`,color:"#FFD700",padding:"13px",fontSize:14,border:`1px solid rgba(255,215,0,0.5)`,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <span style={{fontSize:18}}>⬇</span> Download as PNG
                </button>
                <button className="btn" onClick={printPDF} style={{background:`linear-gradient(135deg, ${tmpl.c1}, ${tmpl.c2})`,color:"#FFD700",padding:"13px",fontSize:14,border:`1px solid rgba(255,215,0,0.4)`,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <span style={{fontSize:18}}>🖨</span> Print / Save as PDF
                </button>
                <button className="btn" onClick={()=>{setHistory(h=>[{...form,template,id:Date.now(),savedAt:new Date().toLocaleString()},...h]);showToast("💾 Saved to history");}} style={{background:"rgba(255,255,255,0.06)",color:"rgba(254,249,231,0.65)",padding:"11px",fontSize:13,border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <span style={{fontSize:16}}>💾</span> Save to History
                </button>
              </div>
            </div>

            {/* Certificate preview */}
            <div className="card" style={{padding:0,overflow:"hidden"}}>
              <div style={{background:"rgba(0,0,0,0.4)",padding:"13px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255,215,0,0.15)"}}>
                <div style={{fontFamily:"'Cinzel',serif",color:"#FFD700",fontSize:11,letterSpacing:2}}>✦ LIVE CERTIFICATE PREVIEW</div>
                <div style={{fontSize:10,color:"rgba(255,215,0,0.45)",fontFamily:"Lato,sans-serif"}}>1122 × 794 px · A4 Landscape · Print-Ready</div>
              </div>
              <div style={{padding:20,background:"rgba(0,0,0,0.25)"}}>
                <div style={{borderRadius:8,overflow:"hidden",boxShadow:`0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,215,0,0.2)`}}>
                  <canvas ref={canvasRef} style={{width:"100%",display:"block"}}/>
                  <img ref={logoRef} src={SCHOOL_LOGO_B64} onLoad={()=>{ if(canvasRef.current) drawCert(canvasRef.current,form,settings,template,logoRef.current); }} style={{display:"none"}} alt="logo"/>
                </div>
              </div>
              <div style={{padding:"11px 20px",background:"rgba(0,0,0,0.3)",borderTop:"1px solid rgba(255,215,0,0.1)",textAlign:"center"}}>
                <span style={{fontSize:11,color:"rgba(255,215,0,0.4)",fontFamily:"Lato,sans-serif"}}>Preview updates automatically as you fill the form ✦</span>
              </div>
            </div>
          </div>
        )}

        {/* ── BULK ─────────────────────────────────────────────────────── */}
        {tab==="bulk" && (
          <div style={{maxWidth:900}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
              <div className="card" onDrop={e=>{e.preventDefault();setDrag(false);e.dataTransfer.files[0]&&parseExcel(e.dataTransfer.files[0]);}} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} style={{textAlign:"center",padding:40,border:`2px dashed ${drag?"#FFD700":"rgba(255,215,0,0.25)"}`,background:drag?"rgba(255,215,0,0.06)":"rgba(0,0,0,0.2)",transition:"all 0.2s"}}>
                <div style={{fontSize:52,marginBottom:12}}>📁</div>
                <div style={{color:"rgba(254,249,231,0.65)",fontSize:14,marginBottom:16,fontFamily:"Lato,sans-serif"}}>Drag & drop Excel file here</div>
                <input type="file" accept=".xlsx,.xls" id="xls" style={{display:"none"}} onChange={e=>e.target.files[0]&&parseExcel(e.target.files[0])}/>
                <label htmlFor="xls" className="btn" style={{background:`linear-gradient(135deg,${tmpl.c2},${tmpl.ribbon})`,color:"#FFD700",padding:"10px 24px",fontSize:13,border:"1px solid rgba(255,215,0,0.4)",borderRadius:10,cursor:"pointer",display:"inline-block",fontFamily:"Lato,sans-serif"}}>Choose File</label>
              </div>
              <div className="card">
                <div style={{fontFamily:"'Cinzel',serif",color:"#FFD700",fontSize:11,letterSpacing:2,marginBottom:12}}>REQUIRED COLUMNS</div>
                {["Student Name","Grade","Division","Certificate Category","Activity Name","Date of Issue (optional)"].map(c=>(
                  <div key={c} style={{fontSize:12,color:"rgba(254,249,231,0.55)",padding:"5px 0",borderBottom:"1px solid rgba(255,215,0,0.08)",fontFamily:"Lato,sans-serif"}}>• {c}</div>
                ))}
                {libs.xlsx&&<button className="btn" onClick={downloadSample} style={{marginTop:14,width:"100%",background:"rgba(255,255,255,0.05)",color:"rgba(254,249,231,0.65)",padding:"9px",fontSize:12,border:"1px solid rgba(255,255,255,0.1)"}}>⬇ Download Sample Template</button>}
              </div>
            </div>
            {bulkStatus&&<div style={{background:"rgba(255,215,0,0.08)",border:"1px solid rgba(255,215,0,0.25)",borderRadius:10,padding:"12px 16px",marginBottom:14,fontSize:13,color:"#FFD700",fontFamily:"Lato,sans-serif"}}>{bulkStatus}</div>}
            {generating&&(
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5,color:"rgba(255,215,0,0.7)",fontFamily:"Lato,sans-serif"}}><span>Generating certificates…</span><span>{progress}%</span></div>
                <div style={{height:7,background:"rgba(255,255,255,0.1)",borderRadius:4,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${tmpl.c2},${tmpl.gold})`,transition:"width 0.2s",borderRadius:4}}/>
                </div>
              </div>
            )}
            {bulkRecords.length>0&&(
              <>
                <div style={{display:"flex",gap:10,marginBottom:14}}>
                  <button className="btn" onClick={generateZip} disabled={generating} style={{background:`linear-gradient(135deg,${tmpl.c2},${tmpl.ribbon})`,color:"#FFD700",padding:"11px 22px",fontSize:13,border:"1px solid rgba(255,215,0,0.4)"}}>
                    {generating?`⏳ ${progress}%…`:`📦 Download ZIP (${bulkRecords.length} certs)`}
                  </button>
                  <button className="btn" onClick={()=>{setBulkRecords([]);setBulkStatus("");}} style={{background:"rgba(255,255,255,0.06)",color:"rgba(254,249,231,0.55)",padding:"11px 16px",fontSize:13,border:"1px solid rgba(255,255,255,0.1)"}}>Clear</button>
                </div>
                <div className="card" style={{padding:0,overflow:"hidden"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,fontFamily:"Lato,sans-serif"}}>
                    <thead>
                      <tr style={{background:"rgba(255,215,0,0.1)"}}>
                        {["#","Student Name","Grade","Div","Category","Activity","Date","Cert No"].map(h=><th key={h} style={{padding:"10px 12px",textAlign:"left",color:"#FFD700",fontWeight:700,fontSize:10,letterSpacing:1,borderBottom:"1px solid rgba(255,215,0,0.15)"}}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {bulkRecords.map((r,i)=>(
                        <tr key={i} style={{borderBottom:"1px solid rgba(255,215,0,0.07)",background:i%2?"rgba(255,255,255,0.02)":"transparent"}}>
                          <td style={{padding:"7px 12px",color:"rgba(255,215,0,0.35)"}}>{i+1}</td>
                          <td style={{padding:"7px 12px",color:"#FEF9E7",fontWeight:700}}>{r.studentName}</td>
                          <td style={{padding:"7px 12px",color:"rgba(254,249,231,0.6)"}}>{r.grade}</td>
                          <td style={{padding:"7px 12px",color:"rgba(254,249,231,0.6)"}}>{r.division}</td>
                          <td style={{padding:"7px 12px"}}><span style={{background:"rgba(255,215,0,0.12)",color:"#FFD700",padding:"2px 8px",borderRadius:4,fontSize:10}}>{r.category}</span></td>
                          <td style={{padding:"7px 12px",color:"rgba(254,249,231,0.55)"}}>{r.activityName}</td>
                          <td style={{padding:"7px 12px",color:"rgba(254,249,231,0.45)"}}>{r.dateOfIssue}</td>
                          <td style={{padding:"7px 12px",fontFamily:"monospace",fontSize:10,color:"#FFD700"}}>{r.certNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── HISTORY ──────────────────────────────────────────────────── */}
        {tab==="history" && (
          <div style={{maxWidth:800}}>
            {history.length===0
              ?<div style={{textAlign:"center",padding:80,color:"rgba(255,215,0,0.35)"}}>
                <div style={{fontSize:60,marginBottom:16}}>📋</div>
                <div style={{fontFamily:"'Cinzel',serif",letterSpacing:2}}>No certificates saved yet</div>
              </div>
              :<>
                <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
                  <button className="btn" onClick={()=>setHistory([])} style={{background:"rgba(255,255,255,0.06)",color:"rgba(254,249,231,0.55)",padding:"8px 16px",fontSize:12,border:"1px solid rgba(255,255,255,0.1)"}}>Clear All</button>
                </div>
                {history.map(h=>(
                  <div key={h.id} className="card" style={{marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontFamily:"'Cinzel',serif",color:"#FFD700",fontSize:14}}>{h.studentName}</div>
                      <div style={{fontSize:12,color:"rgba(254,249,231,0.45)",fontFamily:"Lato,sans-serif",marginTop:4}}>Grade {h.grade}{h.division} • {h.activityName}</div>
                      <div style={{fontSize:10,color:"rgba(254,249,231,0.3)",fontFamily:"Lato,sans-serif",marginTop:2}}>{h.savedAt} • {h.certNumber}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{background:"rgba(255,215,0,0.1)",color:"#FFD700",padding:"3px 10px",borderRadius:4,fontSize:10,fontFamily:"Lato,sans-serif"}}>{h.category}</span>
                      <span style={{fontSize:24}}>{TEMPLATES.find(t=>t.id===h.template)?.emoji||"🎓"}</span>
                    </div>
                  </div>
                ))}
              </>
            }
          </div>
        )}

        {/* ── SETTINGS ─────────────────────────────────────────────────── */}
        {tab==="settings" && (
          <div style={{maxWidth:520}}>
            <div className="card">
              <div style={{fontFamily:"'Cinzel',serif",color:"#FFD700",fontSize:12,letterSpacing:2,marginBottom:18}}>✦ SCHOOL CONFIGURATION</div>
              {[
                {label:"School Name",key:"schoolName"},
                {label:"Principal Name",key:"principalName"},
              ].map(({label,key})=>(
                <div key={key} style={{marginBottom:14}}>
                  <div style={{fontSize:10,color:"rgba(255,215,0,0.75)",marginBottom:4,fontFamily:"Lato,sans-serif",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{label}</div>
                  <input className="fi" value={settingsLocal[key]||""} onChange={e=>setSettingsLocal(s=>({...s,[key]:e.target.value}))}/>
                </div>
              ))}
              <button className="btn" onClick={()=>{
                setSettings(settingsLocal);
                localStorage.setItem("sis_s",JSON.stringify(settingsLocal));
                showToast("✅ Settings saved!");
              }} style={{marginTop:8,background:`linear-gradient(135deg,${tmpl.c2},${tmpl.ribbon})`,color:"#FFD700",padding:"12px 28px",fontSize:13,border:"1px solid rgba(255,215,0,0.4)"}}>
                💾 Save Settings
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
