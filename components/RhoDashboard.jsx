"use client";
import { useState, useMemo, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Treemap, PieChart, Pie, Cell } from "recharts";
import { monthlyData, resumenGeneral, centrosNegocio, detalleCompleto, aportesCapital, presupuestoGeneral, fondosMutuos, totales, flujoProyectadoReal, comparativa, proyectos, ultimasTxns, valorUF, totalMW, fichaEmpresa, equipoRho, proveedores, saldosMensuales, saldoContableDetalle, flujoRealProyecto, accionesPagadas, pptoProgramado } from "./data";

const fmt=(n)=>{if(n==null||isNaN(n))return"$0";const a=Math.abs(n),s=n<0?"-":"";if(a>=1e9)return`${s}$${(a/1e9).toFixed(2)}B`;if(a>=1e6)return`${s}$${(a/1e6).toFixed(1)}M`;if(a>=1e3)return`${s}$${(a/1e3).toFixed(0)}K`;return`${s}$${a.toLocaleString("es-CL")}`};
const ff=(n)=>{if(n==null||isNaN(n))return"$0";return`$${Number(n).toLocaleString("es-CL")}`};

const I={
  grid:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  bar:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  table:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
  bldg:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><path d="M9 22v-4h6v4"/></svg>,
  dollar:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  fund:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M9 20v-4h6v4"/></svg>,
  layers:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  target:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  zap:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  list:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  scale:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/></svg>,
  bell:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  search:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  filter:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
};

const COLORS=["#2E7D32","#1F2937","#10B981","#3B82F6","#8B5CF6","#EF4444","#06B6D4","#EC4899","#84CC16"];
const TIPO_C={operacional:"#1F2937",tesoreria:"#2E7D32",ajuste:"#9CA3AF",capital:"#10B981",financiero:"#8B5CF6"};
const TIPO_L={operacional:"Operacional",tesoreria:"Tesorería",ajuste:"Ajuste",capital:"Capital",financiero:"Financiero"};
const EST_C={["En desarrollo"]:"#10B981",Planificación:"#3B82F6",Permitting:"#2E7D32"};

const Tip=({active,payload,label})=>{if(!active||!payload?.length)return null;return(<div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:10,padding:"12px 16px",boxShadow:"0 4px 16px rgba(0,0,0,0.08)",fontSize:13,zIndex:50}}><div style={{fontWeight:600,color:"#111827",marginBottom:4}}>{label}</div>{payload.map((p,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",lineHeight:1.8}}><span style={{width:8,height:8,borderRadius:2,background:p.color,flexShrink:0}}/><span style={{color:"#6B7280"}}>{p.name}:</span><span style={{fontWeight:500,color:"#111827",fontVariantNumeric:"tabular-nums"}}>{ff(p.value??0)}</span></div>))}</div>);};
const TCell=(props)=>{const{x,y,width,height,name,egreso}=props||{};if(!width||!height||width<50||height<36)return null;return(<g><rect x={x} y={y} width={width} height={height} rx={6} style={{fill:"rgba(46,125,50,0.10)",stroke:"rgba(46,125,50,0.22)",strokeWidth:1}}/><text x={x+6} y={y+16} fontSize={10} fontWeight={600} fill="#111827" style={{fontFamily:"Inter,system-ui"}}>{width>110?(name||""):(name||"").split(" ")[0]}</text><text x={x+6} y={y+31} fontSize={11} fontWeight={500} fill="#1B5E20" style={{fontFamily:"Inter,system-ui"}}>{fmt(egreso)}</text></g>);};
const ExecBar=({pct,w=48})=>{const p=(pct==null||isNaN(pct)||!isFinite(pct))?0:pct;return(<div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"flex-end"}}><div style={{width:w,height:4,borderRadius:2,background:"#F3F4F6",overflow:"hidden"}}><div style={{width:`${Math.min(Math.abs(p)*100,100)}%`,height:"100%",borderRadius:2,background:p>1?"#EF4444":p>0.85?"#2E7D32":"#10B981"}}/></div><span style={{fontSize:11,fontWeight:600,fontVariantNumeric:"tabular-nums",minWidth:34,textAlign:"right",color:p>1?"#EF4444":p>0.85?"#2E7D32":"#10B981"}}>{p>0?(p*100).toFixed(0)+"%":"—"}</span></div>);};

export default function RhoDashboard(){
  const[view,setView]=useState("resumen");
  const[catFilter,setCatFilter]=useState("Todos");
  const[search,setSearch]=useState("");
  const[ufLive,setUfLive]=useState(null);
  const[usdLive,setUsdLive]=useState(null);

  // Fetch UF/USD live from mindicador.cl
  useEffect(()=>{
    fetch("https://mindicador.cl/api").then(r=>r.json()).then(d=>{
      if(d.uf)setUfLive(d.uf.valor);
      if(d.dolar)setUsdLive(d.dolar.valor);
    }).catch(()=>{});
  },[]);

  const T=totales;
  const cats=["Todos",...new Set(detalleCompleto.map(c=>c.general))];
  const filtered=useMemo(()=>{let d=detalleCompleto;if(catFilter!=="Todos")d=d.filter(r=>r.general===catFilter);if(search)d=d.filter(r=>(r.detallado+r.general).toLowerCase().includes(search.toLowerCase()));return d;},[catFilter,search]);

  // Flujo P vs R aggregated by month
  const flujoByMonth=useMemo(()=>{
    const m={};
    flujoProyectadoReal.forEach(r=>{
      if(!m[r.mes])m[r.mes]={mes:r.mes,proyectado:0,real:0};
      m[r.mes].proyectado+=r.proyectado;
      m[r.mes].real+=r.real;
    });
    return Object.values(m);
  },[]);

  const sections=[
    {id:"sep",label:"─── CUENTA CORRIENTE",disabled:true},
    {id:"resumen",label:"Resumen CC",icon:I.grid},
    {id:"flujo",label:"Flujo Mensual",icon:I.bar},
    {id:"txns",label:"Últimas Transacciones",icon:I.list},
    {id:"sep2",label:"─── PRESUPUESTO",disabled:true},
    {id:"categorias",label:"Categorías",icon:I.layers},
    {id:"detalle",label:"Detalle por Línea",icon:I.table},
    {id:"pvsreal",label:"Proyectado vs Real",icon:I.target},
    {id:"comparativa",label:"Comparativa CORFO",icon:I.scale},
    {id:"sep3",label:"─── PROYECTOS",disabled:true},
    {id:"centros",label:"Centros de Negocio",icon:I.bldg},
    {id:"pipeline",label:"Pipeline Energía",icon:I.zap},
    {id:"sep4",label:"─── CAPITAL",disabled:true},
    {id:"aportes",label:"Aportes & Fuentes",icon:I.dollar},
    {id:"fondos",label:"Fondos Mutuos",icon:I.fund},
    {id:"sep5",label:"─── EMPRESA",disabled:true},
    {id:"ficha",label:"Ficha Rho",icon:I.zap},
    {id:"equipo",label:"Equipo & Proveedores",icon:I.grid},
    {id:"contab",label:"Contabilidad",icon:I.scale},
    {id:"proyreal",label:"Flujo por Proyecto",icon:I.target},
    {id:"sep6",label:"─── AUTOMATIZACIÓN",disabled:true},
    {id:"alertas",label:"Alertas & Reglas",icon:I.bell},
  ];

  const C={background:"#fff",borderRadius:12,border:"1px solid #F3F4F6",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"};
  const TH=(a="left")=>({fontSize:10,fontWeight:500,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.05em",padding:"9px 12px",textAlign:a,whiteSpace:"nowrap"});
  const TD=(a="left",b=false)=>({padding:"9px 12px",fontSize:12.5,textAlign:a,fontWeight:b?500:400,fontVariantNumeric:"tabular-nums",color:b?"#111827":"#6B7280"});

  return(
    <div style={{display:"flex",height:"100vh",width:"100%",background:"#FFF",fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,system-ui,sans-serif",color:"#111827",overflow:"hidden"}}>

      {/* SIDEBAR */}
      <aside style={{width:240,minWidth:240,background:"#F9FAFB",borderRight:"1px solid #F3F4F6",display:"flex",flexDirection:"column",padding:"20px 10px",overflow:"auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:9,padding:"0 10px",marginBottom:20}}>
          <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 4C18 4 8 8 8 20C8 28 12 34 18 36C24 34 28 28 28 20C28 8 18 4 18 4Z" fill="#2E7D32" opacity="0.9"/>
            <path d="M26 2C26 2 30 10 28 22C26 30 22 36 18 38" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M10 6C12 12 14 24 18 36" stroke="#fff" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"/>
          </svg>
          <div><div style={{fontWeight:700,fontSize:15,letterSpacing:"-0.02em",color:"#111827"}}>Rho</div><div style={{fontSize:10,color:"#6B7280",fontWeight:400,letterSpacing:"0.04em"}}>Generación</div></div>
        </div>

        {/* UF/USD live */}
        {(ufLive||usdLive)&&<div style={{margin:"0 10px 16px",padding:"8px 10px",borderRadius:8,background:"#fff",border:"1px solid #E5E7EB",display:"flex",gap:12,fontSize:11}}>
          {ufLive&&<div><span style={{color:"#9CA3AF"}}>UF </span><span style={{fontWeight:600,fontVariantNumeric:"tabular-nums"}}>${ufLive.toLocaleString("es-CL")}</span></div>}
          {usdLive&&<div><span style={{color:"#9CA3AF"}}>USD </span><span style={{fontWeight:600,fontVariantNumeric:"tabular-nums"}}>${usdLive.toLocaleString("es-CL")}</span></div>}
        </div>}

        <nav style={{display:"flex",flexDirection:"column",gap:1}}>
          {sections.map(n=>n.disabled?(
            <div key={n.id} style={{fontSize:10,fontWeight:600,color:"#9CA3AF",padding:"12px 10px 4px",letterSpacing:"0.04em"}}>{n.label.replace("───","").trim()}</div>
          ):(
            <button key={n.id} onClick={()=>setView(n.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:7,border:"none",cursor:"pointer",fontSize:12.5,fontWeight:500,transition:"all 150ms",background:view===n.id?"rgba(46,125,50,0.08)":"transparent",color:view===n.id?"#1B5E20":"#6B7280",textAlign:"left"}}><span style={{opacity:view===n.id?1:0.5,flexShrink:0}}>{n.icon}</span>{n.label}</button>
          ))}
        </nav>

        <div style={{marginTop:"auto",padding:"12px 10px"}}>
          <div style={{padding:"10px 12px",borderRadius:8,background:"#fff",border:"1px solid #E5E7EB"}}>
            <div style={{fontSize:10,color:"#9CA3AF",fontWeight:500}}>SALDO CC SANTANDER</div>
            <div style={{fontSize:16,fontWeight:700,fontVariantNumeric:"tabular-nums",marginTop:3}}>{ff(T.saldoCC)}</div>
            <div style={{fontSize:10,color:"#9CA3AF",marginTop:2}}>607 mov. · al 16/03/2026</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{flex:1,overflow:"auto",padding:"22px 28px",background:"#FFF"}}>
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div>
            <h1 style={{fontSize:19,fontWeight:600,letterSpacing:"-0.03em",margin:0}}>{sections.find(n=>n.id===view)?.label||view}</h1>
            <p style={{fontSize:11,color:"#9CA3AF",margin:"3px 0 0"}}>CC Santander · Rho Generación SpA · {T.txCount} transacciones</p>
          </div>
          <div style={{display:"flex",gap:8}}>
            <span style={{padding:"4px 12px",borderRadius:999,background:"rgba(46,125,50,0.08)",color:"#1B5E20",fontSize:11,fontWeight:600}}>{totalMW} MW Pipeline</span>
            <span style={{padding:"4px 12px",borderRadius:999,background:"rgba(16,185,129,0.08)",color:"#10B981",fontSize:11,fontWeight:600}}>Datos Reales</span>
          </div>
        </header>

        {/* ════ RESUMEN ════ */}
        {view==="resumen"&&<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
            {[{l:"Egresos Totales CC",v:fmt(T.egresoTotal),s:"Incluye FFMM y Reversas"},{l:"Abonos Totales CC",v:fmt(T.abonosTotal),s:"Capital + rescates + abonos",vc:"#10B981"},{l:"Egresos Operacionales",v:fmt(T.egresoOp),s:"Sin FFMM ni Reversas",vc:"#2E7D32"},{l:"Presupuesto CORFO",v:fmt(T.presupuesto),s:"Solicitado total"},{l:"Ejecución Ppto.",v:`${(T.egresoOp/(T.presupuesto||1)*100).toFixed(1)}%`,s:fmt(T.presupuesto-T.egresoOp)+" disp.",vc:T.egresoOp/T.presupuesto>0.95?"#EF4444":"#2E7D32"}].map((k,i)=>(<div key={i} style={{...C,padding:"14px 16px"}}><div style={{fontSize:10,fontWeight:500,color:"#9CA3AF",marginBottom:5}}>{k.l}</div><div style={{fontSize:20,fontWeight:600,color:k.vc||"#111827",letterSpacing:"-0.03em",fontVariantNumeric:"tabular-nums",lineHeight:1}}>{k.v}</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:5}}>{k.s}</div></div>))}
          </div>
          <div style={{...C,overflow:"hidden",marginBottom:18}}>
            <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:13,fontWeight:600}}>Composición Completa CC</div></div>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["","Categoría","Egresos","Abonos","Neto","Tipo"].map(h=>(<th key={h} style={TH(["","Categoría","Tipo"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{resumenGeneral.map((r,i)=>{const n=r.abonos-r.egreso;return(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD()}><span style={{width:7,height:7,borderRadius:2,background:TIPO_C[r.tipo],display:"inline-block"}}/></td><td style={TD("left",true)}>{r.general.replace(/_/g," ")}</td><td style={TD("right")}>{r.egreso>0?ff(r.egreso):"—"}</td><td style={{...TD("right"),color:r.abonos>0?"#10B981":"#D1D5DB"}}>{r.abonos>0?ff(r.abonos):"—"}</td><td style={{...TD("right",true),color:n>=0?"#10B981":"#EF4444"}}>{n>=0?"+":""}{ff(n)}</td><td style={TD()}><span style={{padding:"2px 7px",borderRadius:5,background:`${TIPO_C[r.tipo]}10`,color:TIPO_C[r.tipo],fontSize:10,fontWeight:600}}>{TIPO_L[r.tipo]}</span></td></tr>);})}</tbody><tfoot><tr style={{background:"#F9FAFB",borderTop:"2px solid #E5E7EB"}}><td></td><td style={{padding:"9px 12px",fontSize:12,fontWeight:600}}>TOTAL</td><td style={{...TD("right",true)}}>{ff(T.egresoTotal)}</td><td style={{...TD("right",true),color:"#10B981"}}>{ff(T.abonosTotal)}</td><td style={{...TD("right",true),color:"#10B981"}}>{ff(T.abonosTotal-T.egresoTotal)}</td><td></td></tr></tfoot></table>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{...C,padding:16}}><div style={{fontSize:13,fontWeight:600,marginBottom:14}}>Egresos por Tipo</div><ResponsiveContainer width="100%" height={190}><PieChart><Pie data={resumenGeneral.filter(r=>r.egreso>0)} dataKey="egreso" nameKey="general" cx="50%" cy="50%" outerRadius={75} innerRadius={42} paddingAngle={2} label={({general,percent})=>`${general.replace(/_/g," ")} ${(percent*100).toFixed(0)}%`} style={{fontSize:9}}>{resumenGeneral.filter(r=>r.egreso>0).map((_,i)=>(<Cell key={i} fill={COLORS[i%COLORS.length]}/>))}</Pie><Tooltip content={<Tip/>}/></PieChart></ResponsiveContainer></div>
            <div style={{...C,padding:16}}><div style={{fontSize:13,fontWeight:600,marginBottom:4}}>Egresos por Proyecto</div><div style={{fontSize:10,color:"#9CA3AF",marginBottom:10}}>Excl. Oficina y Reversa</div><ResponsiveContainer width="100%" height={190}><Treemap data={centrosNegocio.filter(c=>c.name!=="Oficina"&&c.name!=="Reversa")} dataKey="egreso" nameKey="name" content={<TCell/>}/></ResponsiveContainer></div>
          </div>
        </>}

        {/* ════ FLUJO ════ */}
        {view==="flujo"&&<><div style={{...C,padding:20,marginBottom:18}}><div style={{fontSize:13,fontWeight:600,marginBottom:16}}>Flujo Mensual — Egresos / Abonos / Presupuesto</div><ResponsiveContainer width="100%" height={300}><BarChart data={monthlyData} barGap={1} barCategoryGap="12%"><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/><XAxis dataKey="mes" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)} width={50}/><Tooltip content={<Tip/>}/><Bar dataKey="abonos" name="Abonos" fill="#10B981" radius={[3,3,0,0]}/><Bar dataKey="egreso" name="Egresos" fill="#1F2937" radius={[3,3,0,0]}/><Bar dataKey="presupuesto" name="Presupuesto" fill="#2E7D32" radius={[3,3,0,0]}/></BarChart></ResponsiveContainer></div>
          <div style={{...C,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Mes","Egresos","Abonos","Ppto.","Neto"].map(h=>(<th key={h} style={TH(h==="Mes"?"left":"right")}>{h}</th>))}</tr></thead><tbody>{monthlyData.map((m,i)=>{const n=m.abonos-m.egreso;return(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{m.mes}</td><td style={TD("right",true)}>{ff(m.egreso)}</td><td style={{...TD("right"),color:m.abonos>0?"#10B981":"#D1D5DB"}}>{m.abonos>0?ff(m.abonos):"—"}</td><td style={TD("right")}>{m.presupuesto>0?ff(m.presupuesto):"—"}</td><td style={{...TD("right",true),color:n>=0?"#10B981":"#EF4444"}}>{n>=0?"+":""}{fmt(n)}</td></tr>);})}</tbody></table></div>
        </>}

        {/* ════ ÚLTIMAS TRANSACCIONES ════ */}
        {view==="txns"&&<div style={{...C,overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:13,fontWeight:600}}>Últimos Movimientos CC Santander</div><span style={{fontSize:11,color:"#9CA3AF"}}>{ultimasTxns.length} registros</span></div>
          <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Fecha","Descripción","Egreso","Abono","Saldo","Categoría"].map(h=>(<th key={h} style={TH(["Fecha","Descripción","Categoría"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{ultimasTxns.map((t,i)=>(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={{...TD(),fontSize:11,whiteSpace:"nowrap",color:"#9CA3AF"}}>{t.fecha}</td><td style={{...TD("left",true),maxWidth:280,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.desc}</td><td style={{...TD("right"),color:t.egreso>0?"#111827":"#D1D5DB"}}>{t.egreso>0?ff(t.egreso):"—"}</td><td style={{...TD("right"),color:t.abonos>0?"#10B981":"#D1D5DB"}}>{t.abonos>0?ff(t.abonos):"—"}</td><td style={TD("right",true)}>{ff(t.saldo)}</td><td style={TD()}><span style={{padding:"2px 6px",borderRadius:5,background:"#F3F4F6",fontSize:10,fontWeight:500,color:"#6B7280"}}>{t.cat.replace(/_/g," ")}</span></td></tr>))}</tbody></table>
        </div>}

        {/* ════ CATEGORÍAS ════ */}
        {view==="categorias"&&<><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>{Object.entries(presupuestoGeneral).map(([g,sol])=>{const eg=detalleCompleto.filter(c=>c.general===g).reduce((s,c)=>s+c.egreso,0);const p=eg/(sol||1);const d=sol-eg;return(<div key={g} style={{...C,padding:"16px 18px"}}><div style={{fontSize:13,fontWeight:600,marginBottom:10}}>{g.replace(/_/g," ")}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}><div><div style={{fontSize:10,color:"#9CA3AF"}}>Ppto.</div><div style={{fontSize:15,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(sol)}</div></div><div><div style={{fontSize:10,color:"#9CA3AF"}}>Egreso</div><div style={{fontSize:15,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(eg)}</div></div></div><div style={{width:"100%",height:4,borderRadius:2,background:"#F3F4F6",overflow:"hidden",marginBottom:5}}><div style={{width:`${Math.min(p*100,100)}%`,height:"100%",borderRadius:2,background:p>1?"#EF4444":p>0.85?"#2E7D32":"#10B981"}}/></div><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:10,fontWeight:600,color:d>=0?"#10B981":"#EF4444"}}>{d>=0?"Disp.":"Sobre"}: {fmt(Math.abs(d))}</span><span style={{fontSize:12,fontWeight:700,color:p>1?"#EF4444":p>0.85?"#2E7D32":"#10B981"}}>{(p*100).toFixed(0)}%</span></div></div>);})}</div>
          <div style={{...C,overflow:"hidden"}}><div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:13,fontWeight:600}}>Sin Presupuesto CORFO</div></div><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Categoría","Egresos","Abonos","Neto","Tipo"].map(h=>(<th key={h} style={TH(["Categoría","Tipo"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{resumenGeneral.filter(r=>!presupuestoGeneral[r.general]).map((r,i)=>{const n=r.abonos-r.egreso;return(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{r.general.replace(/_/g," ")}</td><td style={TD("right")}>{r.egreso>0?ff(r.egreso):"—"}</td><td style={{...TD("right"),color:r.abonos>0?"#10B981":"#D1D5DB"}}>{r.abonos>0?ff(r.abonos):"—"}</td><td style={{...TD("right",true),color:n>=0?"#10B981":"#EF4444"}}>{n>=0?"+":""}{ff(n)}</td><td style={TD()}><span style={{padding:"2px 6px",borderRadius:5,background:`${TIPO_C[r.tipo]}10`,color:TIPO_C[r.tipo],fontSize:10,fontWeight:600}}>{TIPO_L[r.tipo]}</span></td></tr>);})}</tbody></table></div>
        </>}

        {/* ════ DETALLE ════ */}
        {view==="detalle"&&<div style={{...C,overflow:"hidden"}}><div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6",display:"flex",gap:10,alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:7,border:"1px solid #E5E7EB",fontSize:12}}><span style={{color:"#9CA3AF"}}>{I.search}</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar..." style={{border:"none",outline:"none",fontSize:12,color:"#111827",background:"transparent",width:120}}/></div><select value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{padding:"5px 8px",borderRadius:7,border:"1px solid #E5E7EB",fontSize:12,color:"#374151",background:"#fff",cursor:"pointer",outline:"none"}}>{cats.map(c=><option key={c} value={c}>{c}</option>)}</select><span style={{fontSize:11,color:"#9CA3AF",marginLeft:"auto"}}>{filtered.length} líneas · {filtered.reduce((s,r)=>s+r.txns,0)} txns</span></div>
          <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["General","Detallado","Egresos","Abonos","Solicitado","Txns","Ejec."].map(h=>(<th key={h} style={TH(["General","Detallado"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{filtered.map((r,i)=>{const p=r.solicitado>0?r.egreso/r.solicitado:0;return(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD()}><span style={{padding:"2px 6px",borderRadius:5,background:"#F3F4F6",fontSize:10,fontWeight:500,color:"#6B7280"}}>{r.general.replace(/_/g," ")}</span></td><td style={TD("left",true)}>{r.detallado}</td><td style={TD("right",true)}>{r.egreso>0?ff(r.egreso):"—"}</td><td style={{...TD("right"),color:r.abonos>0?"#10B981":"#D1D5DB"}}>{r.abonos>0?ff(r.abonos):"—"}</td><td style={TD("right")}>{r.solicitado>0?ff(r.solicitado):"—"}</td><td style={{...TD("right"),color:"#9CA3AF"}}>{r.txns}</td><td style={{padding:"9px 12px"}}><ExecBar pct={p} w={40}/></td></tr>);})}</tbody><tfoot><tr style={{background:"#F9FAFB",borderTop:"2px solid #E5E7EB"}}><td colSpan={2} style={{padding:"9px 12px",fontSize:12,fontWeight:600}}>TOTAL</td><td style={{...TD("right",true)}}>{ff(filtered.reduce((s,r)=>s+r.egreso,0))}</td><td style={{...TD("right",true),color:"#10B981"}}>{ff(filtered.reduce((s,r)=>s+r.abonos,0))}</td><td style={TD("right",true)}>{ff(filtered.reduce((s,r)=>s+r.solicitado,0))}</td><td style={{...TD("right"),color:"#9CA3AF"}}>{filtered.reduce((s,r)=>s+r.txns,0)}</td><td></td></tr></tfoot></table>
        </div>}

        {/* ════ PROYECTADO VS REAL ════ */}
        {view==="pvsreal"&&<><div style={{...C,padding:20,marginBottom:18}}><div style={{fontSize:13,fontWeight:600,marginBottom:16}}>Egresos: Proyectado vs Real (Mensual Agregado)</div><ResponsiveContainer width="100%" height={280}><BarChart data={flujoByMonth} barGap={3} barCategoryGap="20%"><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/><XAxis dataKey="mes" tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)} width={50}/><Tooltip content={<Tip/>}/><Bar dataKey="proyectado" name="Proyectado" fill="#2E7D32" radius={[4,4,0,0]}/><Bar dataKey="real" name="Real" fill="#1F2937" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
          <div style={{...C,overflow:"hidden"}}><div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:13,fontWeight:600}}>Detalle por Categoría y Mes (FlujoII)</div></div><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Mes","Categoría","Proyectado","Real","Desviación","Var %"].map(h=>(<th key={h} style={TH(["Mes","Categoría"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{flujoProyectadoReal.map((r,i)=>{const d=r.real-r.proyectado;const pct=r.proyectado>0?d/r.proyectado:0;return(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{r.mes}</td><td style={TD()}><span style={{padding:"2px 6px",borderRadius:5,background:"#F3F4F6",fontSize:10,fontWeight:500,color:"#6B7280"}}>{r.cat.replace(/_/g," ")}</span></td><td style={TD("right")}>{ff(r.proyectado)}</td><td style={TD("right",true)}>{ff(r.real)}</td><td style={{...TD("right"),color:d>0?"#EF4444":"#10B981"}}>{d>0?"+":""}{fmt(d)}</td><td style={{...TD("right"),color:Math.abs(pct)>0.3?"#EF4444":Math.abs(pct)>0.15?"#2E7D32":"#10B981",fontWeight:600,fontSize:11}}>{r.proyectado>0?(pct>0?"+":"")+(pct*100).toFixed(0)+"%":"—"}</td></tr>);})}</tbody></table></div>
        </>}

        {/* ════ COMPARATIVA CORFO ════ */}
        {view==="comparativa"&&<div style={{...C,overflow:"hidden"}}><div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:13,fontWeight:600}}>Comparativa Programación CORFO (1er Abono)</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:2}}>Gastado vs Solicitado · Valor UF: ${valorUF.toLocaleString("es-CL")}</div></div>
          <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Concepto","Ítem","Gastado","Solicitado","Saldo","UF Solic.","Ejec."].map(h=>(<th key={h} style={TH(["Concepto","Ítem"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{comparativa.map((r,i)=>{const saldo=r.solicitado-r.gastado;const p=r.solicitado>0?r.gastado/r.solicitado:0;return(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD()}><span style={{padding:"2px 6px",borderRadius:5,background:"#F3F4F6",fontSize:10,fontWeight:500,color:"#6B7280"}}>{r.concepto.replace(/_/g," ")}</span></td><td style={{...TD("left",true),maxWidth:200}}>{r.item}</td><td style={TD("right",true)}>{r.gastado>0?ff(r.gastado):"—"}</td><td style={TD("right")}>{ff(r.solicitado)}</td><td style={{...TD("right"),color:saldo>=0?"#10B981":"#EF4444"}}>{saldo>=0?"+":""}{fmt(saldo)}</td><td style={{...TD("right"),color:"#9CA3AF"}}>{r.solicitadoUF.toLocaleString("es-CL")}</td><td style={{padding:"9px 12px"}}><ExecBar pct={p} w={40}/></td></tr>);})}</tbody></table>
        </div>}

        {/* ════ CENTROS ════ */}
        {view==="centros"&&<><div style={{...C,padding:20,marginBottom:18}}><div style={{fontSize:13,fontWeight:600,marginBottom:16}}>Egreso por Centro de Negocio</div><ResponsiveContainer width="100%" height={340}><BarChart data={centrosNegocio} layout="vertical" barGap={2} barCategoryGap="16%"><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false}/><XAxis type="number" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/><YAxis type="category" dataKey="name" width={180} tick={{fontSize:10,fill:"#374151"}} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Bar dataKey="presupuesto" name="Presupuesto" fill="#2E7D32" radius={[0,4,4,0]} barSize={10}/><Bar dataKey="egreso" name="Egreso" fill="#1F2937" radius={[0,4,4,0]} barSize={10}/></BarChart></ResponsiveContainer></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>{centrosNegocio.map((c,i)=>{const p=c.presupuesto>0?c.egreso/c.presupuesto:0;return(<div key={i} style={{...C,padding:"14px 16px"}}><div style={{fontSize:12,fontWeight:600,marginBottom:8}}>{c.name}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:8}}><div><div style={{fontSize:9,color:"#9CA3AF"}}>Egreso</div><div style={{fontSize:13,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(c.egreso)}</div></div><div><div style={{fontSize:9,color:"#9CA3AF"}}>Abonos</div><div style={{fontSize:13,fontWeight:600,color:c.abonos>0?"#10B981":"#D1D5DB",fontVariantNumeric:"tabular-nums"}}>{c.abonos>0?fmt(c.abonos):"—"}</div></div><div><div style={{fontSize:9,color:"#9CA3AF"}}>Ppto.</div><div style={{fontSize:13,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{c.presupuesto>0?fmt(c.presupuesto):"—"}</div></div></div>{p>0&&<ExecBar pct={p} w={999}/>}</div>);})}</div>
        </>}

        {/* ════ PIPELINE ENERGÍA ════ */}
        {view==="pipeline"&&<><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
            {[{l:"Total MW Pipeline",v:`${totalMW} MW`,vc:"#2E7D32"},{l:"Proyectos Activos",v:proyectos.filter(p=>p.estado==="En desarrollo").length.toString(),vc:"#10B981"},{l:"Boletas Garantía Pagadas",v:fmt(proyectos.reduce((s,p)=>s+p.boleta,0)),vc:"#111827"}].map((k,i)=>(<div key={i} style={{...C,padding:"14px 16px"}}><div style={{fontSize:10,color:"#9CA3AF",marginBottom:4}}>{k.l}</div><div style={{fontSize:22,fontWeight:600,color:k.vc,letterSpacing:"-0.02em"}}>{k.v}</div></div>))}
          </div>
          <div style={{...C,overflow:"hidden"}}><div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:13,fontWeight:600}}>Proyectos de Generación</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:2}}>Fuente: Programación I</div></div>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Proyecto","MW","UF Asignadas","Estado","Boleta Garantía","Pagada"].map(h=>(<th key={h} style={TH(["Proyecto","Estado","Pagada"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{proyectos.map((p,i)=>(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{p.nombre}</td><td style={{...TD("right",true),color:"#2E7D32"}}>{p.mw>0?p.mw:"—"}</td><td style={TD("right")}>{p.uf>0?p.uf.toLocaleString("es-CL"):"—"}</td><td style={TD()}><span style={{padding:"3px 8px",borderRadius:999,fontSize:10,fontWeight:600,background:`${EST_C[p.estado]||"#9CA3AF"}12`,color:EST_C[p.estado]||"#9CA3AF"}}>{p.estado}</span></td><td style={TD("right")}>{p.boleta>0?ff(p.boleta):"—"}</td><td style={TD()}>{p.boletaPagada?<span style={{color:"#10B981",fontWeight:600,fontSize:11}}>Sí</span>:<span style={{color:"#D1D5DB",fontSize:11}}>—</span>}</td></tr>))}</tbody></table>
          </div>
        </>}

        {/* ════ APORTES ════ */}
        {view==="aportes"&&<><div style={{...C,padding:20,marginBottom:18}}><div style={{fontSize:13,fontWeight:600,marginBottom:16}}>Flujo por Fuente de Capital (Aporte_K)</div><ResponsiveContainer width="100%" height={260}><BarChart data={aportesCapital} barGap={3} barCategoryGap="22%"><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/><XAxis dataKey="name" tick={{fontSize:10,fill:"#6B7280"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)} width={50}/><Tooltip content={<Tip/>}/><Bar dataKey="abonos" name="Abonos" fill="#10B981" radius={[5,5,0,0]}/><Bar dataKey="egreso" name="Egresos" fill="#1F2937" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>{aportesCapital.map((a,i)=>{const b=a.abonos-a.egreso;return(<div key={i} style={{...C,padding:"16px 18px"}}><div style={{fontSize:12,fontWeight:600,marginBottom:10}}>{a.name}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}><div><div style={{fontSize:10,color:"#9CA3AF"}}>Abonos</div><div style={{fontSize:14,fontWeight:600,color:"#10B981",fontVariantNumeric:"tabular-nums"}}>{fmt(a.abonos)}</div></div><div><div style={{fontSize:10,color:"#9CA3AF"}}>Egresos</div><div style={{fontSize:14,fontWeight:600,fontVariantNumeric:"tabular-nums"}}>{fmt(a.egreso)}</div></div></div><div style={{borderTop:"1px solid #F3F4F6",paddingTop:6,display:"flex",justifyContent:"space-between"}}><span style={{fontSize:10,color:"#9CA3AF"}}>Balance</span><span style={{fontSize:13,fontWeight:700,color:b>=0?"#10B981":"#EF4444"}}>{b>=0?"+":""}{fmt(b)}</span></div></div>);})}</div>
        </>}

        {/* ════ FONDOS MUTUOS ════ */}
        {view==="fondos"&&<><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18}}>{[{l:"Invertido",v:fmt(T.ffmm.invertido)},{l:"Rescatado",v:fmt(T.ffmm.rescatado),vc:"#2E7D32"},{l:"Intereses",v:fmt(T.ffmm.intereses),vc:"#10B981"},{l:"Saldo Fondos",v:fmt(T.ffmm.saldo)}].map((k,i)=>(<div key={i} style={{...C,padding:"14px 16px"}}><div style={{fontSize:10,color:"#9CA3AF",marginBottom:4}}>{k.l}</div><div style={{fontSize:22,fontWeight:600,color:k.vc||"#111827",letterSpacing:"-0.03em",fontVariantNumeric:"tabular-nums",lineHeight:1}}>{k.v}</div></div>))}</div>
          <div style={{...C,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Fondo","Invertido","Rescatado","Intereses","Saldo"].map(h=>(<th key={h} style={TH(h==="Fondo"?"left":"right")}>{h}</th>))}</tr></thead><tbody>{fondosMutuos.map((f,i)=>(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{f.fondo}</td><td style={TD("right")}>{ff(f.abonos)}</td><td style={TD("right",true)}>{ff(f.egreso)}</td><td style={{...TD("right"),color:"#10B981"}}>{ff(f.intereses)}</td><td style={TD("right",true)}>{ff(f.saldo)}</td></tr>))}</tbody><tfoot><tr style={{background:"#F9FAFB",borderTop:"2px solid #E5E7EB"}}><td style={{padding:"9px 12px",fontSize:12,fontWeight:600}}>Total</td><td style={TD("right",true)}>{ff(302500000)}</td><td style={TD("right",true)}>{ff(437000000)}</td><td style={{...TD("right",true),color:"#10B981"}}>{ff(10126378)}</td><td style={TD("right",true)}>{ff(144626378)}</td></tr></tfoot></table></div>
          <div style={{marginTop:12,padding:"10px 14px",borderRadius:8,background:"#FFFBEB",border:"1px solid #FDE68A",fontSize:11,color:"#92400E",lineHeight:1.5}}>Los $437M en egresos son colocaciones en fondos mutuos, no gasto operacional. Rendimiento neto: <strong>$10.1M en intereses</strong>. Saldo invertido: $144.6M.</div>
        </>}

        {/* ════ FICHA EMPRESA ════ */}
        {view==="ficha"&&<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
            <div style={{...C,padding:20}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <svg width="48" height="52" viewBox="0 0 36 40" fill="none"><path d="M18 4C18 4 8 8 8 20C8 28 12 34 18 36C24 34 28 28 28 20C28 8 18 4 18 4Z" fill="#2E7D32" opacity="0.9"/><path d="M26 2C26 2 30 10 28 22C26 30 22 36 18 38" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
                <div><div style={{fontSize:17,fontWeight:600,letterSpacing:"-0.02em"}}>{fichaEmpresa.nombre}</div><div style={{fontSize:12,color:"#9CA3AF"}}>RUT: {fichaEmpresa.rut} · CC: {fichaEmpresa.cc}</div></div>
              </div>
              <div style={{fontSize:12,color:"#6B7280",lineHeight:1.7,marginBottom:14}}>Empresa enfocada en sistemas agrovoltaicos y almacenamiento de energía BESS. Modelo "regeneramos la tierra, energizamos el futuro". Capacidad proyectada: 150 MW / 360 MWh.</div>
              {[["Sector",fichaEmpresa.sector],["Participación Fondo",fichaEmpresa.participacionFondo+"%"],["1er Desembolso",fichaEmpresa.primerDesembolso],["Acciones",fichaEmpresa.accionesPagadas+" ("+fichaEmpresa.pctPagado+"% pagado)"]].map(([l,v],i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #F9FAFB",fontSize:12}}><span style={{color:"#9CA3AF"}}>{l}</span><span style={{fontWeight:500}}>{v}</span></div>))}
            </div>
            <div style={{...C,padding:20}}>
              <div style={{fontSize:14,fontWeight:600,marginBottom:14}}>Inversión en el Fondo</div>
              {[["Inversión Suscrita",`UF ${fichaEmpresa.inversionUF.toLocaleString()} · USD ${fichaEmpresa.inversionUSD.toLocaleString()}`],["Aporte Efectivo",`UF ${fichaEmpresa.aporteUF.toLocaleString()} · USD ${fichaEmpresa.aporteUSD.toLocaleString()}`],["Patrimonio Fondo",`UF ${fichaEmpresa.patrimonioUF.toLocaleString()} · USD ${fichaEmpresa.patrimonioUSD.toLocaleString()}`],["Valor Cuota",`UF ${fichaEmpresa.valorCuotaUF.toLocaleString()} · USD ${fichaEmpresa.valorCuotaUSD.toLocaleString()}`],["Rentabilidad",`+${fichaEmpresa.rentabilidad}%`]].map(([l,v],i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #F9FAFB",fontSize:12}}><span style={{color:"#9CA3AF"}}>{l}</span><span style={{fontWeight:500,color:l==="Rentabilidad"?"#10B981":"#111827"}}>{v}</span></div>))}
            </div>
          </div>
          <div style={{...C,overflow:"hidden"}}><div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:14,fontWeight:600}}>Activos Principales (valorización CORFO)</div></div>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Proyecto/Activo","Valor UF","Valor USD"].map(h=>(<th key={h} style={TH(h==="Proyecto/Activo"?"left":"right")}>{h}</th>))}</tr></thead><tbody>{fichaEmpresa.activos.map((a,i)=>(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{a.nombre}</td><td style={TD("right")}>{a.uf.toLocaleString()}</td><td style={TD("right",true)}>{`$${a.usd.toLocaleString()}`}</td></tr>))}</tbody><tfoot><tr style={{background:"#F9FAFB",borderTop:"2px solid #E5E7EB"}}><td style={{padding:"9px 12px",fontSize:12,fontWeight:600}}>Total</td><td style={TD("right",true)}>{fichaEmpresa.activos.reduce((s,a)=>s+a.uf,0).toLocaleString()}</td><td style={TD("right",true)}>{`$${fichaEmpresa.activos.reduce((s,a)=>s+a.usd,0).toLocaleString()}`}</td></tr></tfoot></table>
          </div>
        </>}

        {/* ════ EQUIPO & PROVEEDORES ════ */}
        {view==="equipo"&&<>
          <div style={{...C,overflow:"hidden",marginBottom:18}}>
            <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:14,fontWeight:600}}>Equipo Rho Generación</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:2}}>Personas con pagos directos vía transferencia · CC Santander</div></div>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Nombre","Cargo","RUT","Email","Total Pagos","Txns"].map(h=>(<th key={h} style={TH(["Nombre","Cargo","Email"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{equipoRho.map((p,i)=>(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}>
              <td style={TD("left",true)}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:7,background:p.tipo==="directivo"?"rgba(46,125,50,0.08)":p.tipo==="fondo"?"rgba(16,185,129,0.08)":"#F3F4F6",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:p.tipo==="directivo"?"#1B5E20":p.tipo==="fondo"?"#10B981":"#6B7280"}}>{p.nombre.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>{p.nombre}</div></td>
              <td style={TD()}>{p.cargo}</td><td style={{...TD(),fontSize:11,color:"#9CA3AF"}}>{p.rut}</td><td style={{...TD(),fontSize:11,color:"#6B7280"}}>{p.email}</td>
              <td style={TD("right",true)}>{ff(p.pagos)}</td><td style={{...TD("right"),color:"#9CA3AF"}}>{p.txns}</td>
            </tr>))}</tbody></table>
          </div>
          <div style={{...C,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:14,fontWeight:600}}>Proveedores Principales</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:2}}>Top 10 beneficiarios por monto transferido</div></div>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Proveedor","Servicio","Monto Total","Txns"].map(h=>(<th key={h} style={TH(["Proveedor","Servicio"].includes(h)?"left":"right")}>{h}</th>))}</tr></thead><tbody>{proveedores.map((p,i)=>(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{p.nombre}</td><td style={TD()}><span style={{padding:"2px 6px",borderRadius:5,background:"#F3F4F6",fontSize:10,fontWeight:500,color:"#6B7280"}}>{p.servicio}</span></td><td style={TD("right",true)}>{ff(p.monto)}</td><td style={{...TD("right"),color:"#9CA3AF"}}>{p.txns}</td></tr>))}</tbody>
              <tfoot><tr style={{background:"#F9FAFB",borderTop:"2px solid #E5E7EB"}}><td colSpan={2} style={{padding:"9px 12px",fontSize:12,fontWeight:600}}>Total Proveedores</td><td style={TD("right",true)}>{ff(proveedores.reduce((s,p)=>s+p.monto,0))}</td><td style={{...TD("right"),color:"#9CA3AF"}}>{proveedores.reduce((s,p)=>s+p.txns,0)}</td></tr></tfoot></table>
          </div>
        </>}

        {/* ════ CONTABILIDAD ════ */}
        {view==="contab"&&<>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18}}>
            {[{l:"Acciones Pagadas",v:ff(accionesPagadas.pagoAcciones),s:"Capital suscrito"},{l:"Financiamiento",v:ff(accionesPagadas.financiamiento),s:"Aumento de capital"},{l:"Total Capital Ingresado",v:ff(accionesPagadas.total),s:"Acciones + Financiamiento",vc:"#10B981"}].map((k,i)=>(<div key={i} style={{...C,padding:"14px 16px"}}><div style={{fontSize:10,color:"#9CA3AF",marginBottom:5}}>{k.l}</div><div style={{fontSize:20,fontWeight:600,color:k.vc||"#111827",letterSpacing:"-0.03em",fontVariantNumeric:"tabular-nums",lineHeight:1}}>{k.v}</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:5}}>{k.s}</div></div>))}
          </div>
          <div style={{...C,padding:20,marginBottom:18}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Saldo Mínimo CC por Mes</div>
            <ResponsiveContainer width="100%" height={240}><BarChart data={saldosMensuales}><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/><XAxis dataKey="mes" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)} width={50}/><Tooltip content={<Tip/>}/><Bar dataKey="contable" name="Saldo Mín. Contable" fill="#3B82F6" radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
          </div>
          <div style={{...C,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:14,fontWeight:600}}>Saldo Contable vs CEHTA (Ago–Feb'26)</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:2}}>Del sheet "Saldo Contable" del Libro Contable</div></div>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Mes","Saldo Contable","Saldo CEHTA"].map(h=>(<th key={h} style={TH(h==="Mes"?"left":"right")}>{h}</th>))}</tr></thead><tbody>{saldoContableDetalle.map((s,i)=>(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{s.mes}</td><td style={TD("right",true)}>{ff(s.contable)}</td><td style={{...TD("right"),color:s.cehta?"#10B981":"#D1D5DB"}}>{s.cehta?ff(s.cehta):"—"}</td></tr>))}</tbody></table>
          </div>
        </>}

        {/* ════ FLUJO REAL POR PROYECTO ════ */}
        {view==="proyreal"&&<>
          <div style={{...C,padding:20,marginBottom:18}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:16}}>Gasto Real por Proyecto (Mar–Jun 2025)</div>
            <ResponsiveContainer width="100%" height={300}><BarChart data={flujoRealProyecto.filter(r=>r.mar+r.abr+r.may+r.jun>0)} layout="vertical" barCategoryGap="14%"><CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false}/><XAxis type="number" tick={{fontSize:9,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/><YAxis type="category" dataKey="proyecto" width={200} tick={{fontSize:10,fill:"#374151"}} axisLine={false} tickLine={false}/><Tooltip content={<Tip/>}/><Bar dataKey="mar" name="Marzo" fill="#2E7D32" radius={[0,3,3,0]} barSize={8}/><Bar dataKey="abr" name="Abril" fill="#3B82F6" radius={[0,3,3,0]} barSize={8}/><Bar dataKey="may" name="Mayo" fill="#10B981" radius={[0,3,3,0]} barSize={8}/><Bar dataKey="jun" name="Junio" fill="#1F2937" radius={[0,3,3,0]} barSize={8}/></BarChart></ResponsiveContainer>
          </div>
          <div style={{...C,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:14,fontWeight:600}}>Detalle Flujo Real · Libro Contable</div></div>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Concepto","Marzo","Abril","Mayo","Junio","Total"].map(h=>(<th key={h} style={TH(h==="Concepto"?"left":"right")}>{h}</th>))}</tr></thead><tbody>{flujoRealProyecto.map((r,i)=>{const t=r.mar+r.abr+r.may+r.jun;return(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{r.proyecto}</td><td style={TD("right")}>{r.mar>0?ff(r.mar):"—"}</td><td style={TD("right")}>{r.abr>0?ff(r.abr):"—"}</td><td style={TD("right")}>{r.may>0?ff(r.may):"—"}</td><td style={TD("right")}>{r.jun>0?ff(r.jun):"—"}</td><td style={TD("right",true)}>{ff(t)}</td></tr>);})}</tbody>
              <tfoot><tr style={{background:"#F9FAFB",borderTop:"2px solid #E5E7EB"}}><td style={{padding:"9px 12px",fontSize:12,fontWeight:600}}>Total</td>{["mar","abr","may","jun"].map(m=>(<td key={m} style={TD("right",true)}>{ff(flujoRealProyecto.reduce((s,r)=>s+(r[m]||0),0))}</td>))}<td style={TD("right",true)}>{ff(flujoRealProyecto.reduce((s,r)=>s+r.mar+r.abr+r.may+r.jun,0))}</td></tr></tfoot></table>
          </div>
          <div style={{...C,overflow:"hidden",marginTop:16}}>
            <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}><div style={{fontSize:14,fontWeight:600}}>Presupuesto Programado por Concepto</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:2}}>120 registros · PPTO PROGRAMADO del Libro Contable</div></div>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr style={{borderBottom:"1px solid #F3F4F6"}}>{["Concepto","Presupuesto Programado"].map(h=>(<th key={h} style={TH(h==="Concepto"?"left":"right")}>{h}</th>))}</tr></thead><tbody>{pptoProgramado.filter(p=>p.total>0).map((p,i)=>(<tr key={i} style={{borderBottom:"1px solid #F9FAFB"}}><td style={TD("left",true)}>{p.concepto}</td><td style={TD("right",true)}>{ff(p.total)}</td></tr>))}</tbody>
              <tfoot><tr style={{background:"#F9FAFB",borderTop:"2px solid #E5E7EB"}}><td style={{padding:"9px 12px",fontSize:12,fontWeight:600}}>Total Programado</td><td style={TD("right",true)}>{ff(pptoProgramado.reduce((s,p)=>s+p.total,0))}</td></tr></tfoot></table>
          </div>
        </>}

        {/* ════ ALERTAS & AUTOMATIZACIONES ════ */}
        {view==="alertas"&&(()=>{
          // Auto-compute alerts from real data
          const alerts=[];
          const execPct=T.egresoOp/(T.presupuesto||1);
          if(T.saldoCC<5000000) alerts.push({sev:"critical",title:"Saldo CC bajo",desc:`Saldo CC Santander: ${ff(T.saldoCC)}. Riesgo de no poder cubrir próximos pagos F29 y remuneraciones.`,action:"Gestionar rescate FFMM o solicitar abono CORFO"});
          if(execPct>0.9) alerts.push({sev:"warning",title:`Ejecución presupuestaria al ${(execPct*100).toFixed(0)}%`,desc:`Egresos operacionales ${fmt(T.egresoOp)} sobre presupuesto ${fmt(T.presupuesto)}. Quedan ${fmt(T.presupuesto-T.egresoOp)} disponibles.`,action:"Revisar proyecciones Q2 2026 y solicitar ampliación si necesario"});
          detalleCompleto.filter(r=>r.solicitado>0&&r.egreso/r.solicitado>1).forEach(r=>{alerts.push({sev:"critical",title:`${r.detallado}: sobrepasó presupuesto`,desc:`Egreso ${fmt(r.egreso)} vs Solicitado ${fmt(r.solicitado)} (${((r.egreso/r.solicitado)*100).toFixed(0)}%). Exceso: ${fmt(r.egreso-r.solicitado)}.`,action:`Justificar desvío en reporte CORFO · ${r.txns} transacciones`})});
          detalleCompleto.filter(r=>r.solicitado>0&&r.egreso/r.solicitado>0.85&&r.egreso/r.solicitado<=1).forEach(r=>{alerts.push({sev:"warning",title:`${r.detallado}: ${((r.egreso/r.solicitado)*100).toFixed(0)}% ejecutado`,desc:`Quedan ${fmt(r.solicitado-r.egreso)} de ${fmt(r.solicitado)} presupuestados.`,action:"Monitorear y ajustar próximas OC"})});
          centrosNegocio.filter(c=>c.presupuesto>0&&c.egreso/c.presupuesto>1&&c.name!=="Oficina"&&c.name!=="Reversa").forEach(c=>{alerts.push({sev:"critical",title:`${c.name}: sobre presupuesto`,desc:`Egreso ${fmt(c.egreso)} vs Ppto ${fmt(c.presupuesto)}.`,action:"Reasignar fondos de centros sub-ejecutados"})});
          proyectos.filter(p=>p.estado==="Planificación"&&!p.boletaPagada).forEach(p=>{alerts.push({sev:"info",title:`${p.nombre}: boleta pendiente`,desc:`Proyecto en planificación sin boleta de garantía. ${p.mw>0?p.mw+" MW":"Sin MW asignados"}.`,action:"Coordinar timing de pago de boleta con flujo de caja"})});
          if(T.ffmm.saldo>100000000) alerts.push({sev:"info",title:`$${(T.ffmm.saldo/1e6).toFixed(0)}M en Fondos Mutuos`,desc:`Saldo invertido en FFMM: ${fmt(T.ffmm.saldo)}. Intereses acumulados: ${fmt(T.ffmm.intereses)}.`,action:"Evaluar rescate parcial si se necesita liquidez operacional"});

          const sevC={critical:"#EF4444",warning:"#F59E0B",info:"#3B82F6"};
          const sevL={critical:"Crítica",warning:"Alerta",info:"Info"};
          const sevBg={critical:"rgba(239,68,68,0.06)",warning:"rgba(245,158,11,0.06)",info:"rgba(59,130,246,0.06)"};

          return(<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18}}>
              {[["critical","Críticas"],["warning","Alertas"],["info","Informativas"]].map(([sev,label])=>{const count=alerts.filter(a=>a.sev===sev).length;return(<div key={sev} style={{...C,padding:"14px 16px",borderLeft:`3px solid ${sevC[sev]}`}}><div style={{fontSize:10,color:"#9CA3AF",marginBottom:4}}>{label}</div><div style={{fontSize:28,fontWeight:600,color:sevC[sev]}}>{count}</div></div>);})}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {alerts.map((a,i)=>(<div key={i} style={{...C,padding:"14px 18px",borderLeft:`3px solid ${sevC[a.sev]}`,background:sevBg[a.sev]}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#111827"}}>{a.title}</div>
                  <span style={{padding:"2px 8px",borderRadius:999,fontSize:10,fontWeight:600,background:`${sevC[a.sev]}15`,color:sevC[a.sev],flexShrink:0}}>{sevL[a.sev]}</span>
                </div>
                <div style={{fontSize:12,color:"#6B7280",lineHeight:1.5,marginBottom:8}}>{a.desc}</div>
                <div style={{fontSize:11,color:"#2E7D32",fontWeight:500,display:"flex",alignItems:"center",gap:4}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  {a.action}
                </div>
              </div>))}
            </div>
            <div style={{marginTop:16,padding:"12px 16px",borderRadius:8,background:"#F0FDF4",border:"1px solid #BBF7D0",fontSize:11,color:"#166534",lineHeight:1.6}}>
              Las alertas se calculan automáticamente desde los datos de CC Santander, Libro Contable y presupuesto CORFO. Se actualizan cada vez que se carga la plataforma.
            </div>
          </>);
        })()}

      </main>
    </div>
  );
}
