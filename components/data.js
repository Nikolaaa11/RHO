// ═══════════════════════════════════════════════════════
// DATA COMPLETA — Rho Generación SpA (RUT: 77.931.386-7)
// Fuentes: CC Santander + Libro Contable + Reportes CORFO
// 607 txns CC · 484 txns contables · Sept 2024 – Mar 2026
// ═══════════════════════════════════════════════════════

// ── Ficha Empresa ──
export const fichaEmpresa = {
  nombre:"Rho Generación SpA", rut:"77.931.386-7", cc:94278899, banco:"Santander",
  sector:"Energía-Agricultura Sostenible", participacionFondo:85,
  inversionUF:45405, inversionUSD:1915773,
  aporteUF:20504, aporteUSD:865019, pctPagado:44,
  accionesPagadas:"2.514 / 5.665", primerDesembolso:"Feb 2025",
  activos:[
    {nombre:"La Ligua 110 kV",uf:84264,usd:3555273},
    {nombre:"Codegua 66 kV",uf:14044,usd:592546},
    {nombre:"Ranguil III",uf:2949,usd:124432},
    {nombre:"Panimávida",uf:2949,usd:124432},
  ],
  patrimonioUF:279110, patrimonioUSD:11776565,
  valorCuotaUF:1801, valorCuotaUSD:75979, rentabilidad:414,
};

// ── Equipo Rho (de Transferencias + Prompt Maestro) ──
export const equipoRho = [
  {nombre:"Javier Alvarez A.",cargo:"Gerente General",rut:"17.064.671-1",email:"j.alvarez@rhoingenieria.cl",pagos:10005670,txns:17,tipo:"directivo"},
  {nombre:"Victoria Alvarez A.",cargo:"Gerenta Operaciones",rut:"17.681.358-K",email:"victoria.alvarez@rhoingenieria.cl",pagos:8313547,txns:10,tipo:"directivo"},
  {nombre:"Erick Sánchez Z.",cargo:"Ingeniero Desarrollo",rut:"10.906.653-2",email:"e.sanchez@rhoingenieria.cl",pagos:7726632,txns:5,tipo:"equipo"},
  {nombre:"Guido Rietta G.",cargo:"Gerente General AFIS",rut:"15.341.198-0",email:"grietta@cenergy.cl",pagos:10000,txns:1,tipo:"fondo"},
];

// ── Proveedores principales (de Transferencias) ──
export const proveedores = [
  {nombre:"Roberto Lagos N.",monto:20000000,txns:2,email:"api_ale@hotmail.com",servicio:"Terrenos"},
  {nombre:"Elmoin SpA",monto:18417996,txns:2,email:"jvaldebenito@elmoin.cl",servicio:"Estudios Eléctricos"},
  {nombre:"CG Metrics SpA",monto:17850000,txns:1,email:"cgmetrics@gmail.com",servicio:"Devolución Guido"},
  {nombre:"Dinamo SpA",monto:11668156,txns:2,email:"patriciacarrera.dinamo@gmail.com",servicio:"Estudios Ambientales"},
  {nombre:"Interconekta Ing. SpA",monto:10330000,txns:5,email:"felipe.cabrera@inteconekta.cl",servicio:"Conexión Eléctrica"},
  {nombre:"Mejores Prácticas SpA",monto:4968858,txns:1,email:"administracion@mejores-practicas.com",servicio:"Asesoría"},
  {nombre:"IPD Ambiental Ltda",monto:3883410,txns:2,email:"contacto@ipdambiental.cl",servicio:"Permisos Ambientales"},
  {nombre:"MCG Auditores SpA",monto:1290012,txns:8,email:"mgcontreras@mcg.cl",servicio:"Contabilidad"},
  {nombre:"Jorge Brown V.",monto:910000,txns:1,email:"jorgeabrown@hotmail.com",servicio:"Topografía"},
  {nombre:"Carlos Romo V.",monto:560000,txns:1,email:"carlos.romovalencia@gmail.com",servicio:"Ingeniería"},
];

// ── Saldo Contable Mensual (Libro Contable: Resumen) ──
export const saldosMensuales = [
  {mes:"Sep'24",contable:32811},{mes:"Oct'24",contable:13404},{mes:"Nov'24",contable:125404},{mes:"Dic'24",contable:20200},
  {mes:"Ene",contable:24317},{mes:"Feb",contable:84317},{mes:"Mar",contable:83060506},{mes:"Abr",contable:35831430},
  {mes:"May",contable:11026899},{mes:"Jun",contable:5003649},{mes:"Jul",contable:3994907},{mes:"Ago",contable:2610832},
  {mes:"Sep",contable:1376792},{mes:"Oct",contable:460928},{mes:"Nov",contable:8307187},{mes:"Dic",contable:4427841},
  {mes:"Ene'26",contable:3777963},
];

// ── Saldo Contable snapshot (from Saldo Contable sheet) ──
export const saldoContableDetalle = [
  {mes:"Ago",contable:125755116,cehta:88270705},
  {mes:"Sep",contable:66507925,cehta:76270705},
  {mes:"Oct",contable:97208145,cehta:122811932},
  {mes:"Nov",contable:75717766,cehta:130552637},
  {mes:"Dic",contable:66503919,cehta:135552637},
  {mes:"Ene'26",contable:66450919,cehta:158052637},
  {mes:"Feb'26",contable:66882688,cehta:null},
];

// ── Flujo Real por Proyecto (from Libro Contable: Flujo Real) ──
export const flujoRealProyecto = [
  {proyecto:"BESS RHO (Panimávida)",mar:51430870,abr:25691204,may:10200000,jun:35551024},
  {proyecto:"San Expedito 110kV (La Ligua)",mar:74439088,abr:8695011,may:0,jun:1306424},
  {proyecto:"Codegua (Explícito)",mar:29304376,abr:0,may:27495740,jun:0},
  {proyecto:"Santa Victoria 15 MW",mar:27304376,abr:0,may:0,jun:0},
  {proyecto:"RUIL",mar:0,abr:0,may:0,jun:3000000},
  {proyecto:"Gastos Salariales",mar:0,abr:11911411,may:13232803,jun:18597265},
  {proyecto:"Gastos Generales",mar:267738,abr:213500,may:751839,jun:262215794},
  {proyecto:"Impuestos",mar:367454,abr:586865,may:336005,jun:2922502},
  {proyecto:"Comisiones Bancarias",mar:339027,abr:38505,may:38685,jun:0},
  {proyecto:"Contabilidad",mar:456239,abr:92580,may:0,jun:93015},
  {proyecto:"Dev. Préstamos",mar:36074460,abr:0,may:0,jun:0},
];

// ── Acciones Pagadas (from Libro Contable) ──
export const accionesPagadas = {
  pagoAcciones:294811932,
  financiamiento:84000000,
  total:378811932,
};

// ── Presupuesto Programado por concepto (from PPTO PROGRAMADO) ──
export const pptoProgramado = [
  {concepto:"BESS RHO (Panimávida)",total:182805090},
  {concepto:"Gastos Salariales",total:105843928},
  {concepto:"San Expedito 110kV (La Ligua)",total:93698626},
  {concepto:"RUIL",total:61500000},
  {concepto:"Codegua (Explícito)",total:60804376},
  {concepto:"Santa Victoria 15 MW",total:27304376},
  {concepto:"Gastos Generales",total:3921900},
  {concepto:"Impuestos",total:2951126},
  {concepto:"Viáticos",total:1890000},
  {concepto:"Dev. Préstamos",total:1344317},
  {concepto:"Contabilidad",total:570000},
  {concepto:"Comisiones Bancarias",total:500765},
];

// ══════════════════════════════════════════════
// (previous data preserved)
// ══════════════════════════════════════════════

export const monthlyData = [
  {mes:"Sep'24",egreso:37189,abonos:70000,presupuesto:0},{mes:"Oct'24",egreso:1144572,abonos:1125165,presupuesto:0},{mes:"Nov'24",egreso:238000,abonos:350000,presupuesto:0},{mes:"Dic'24",egreso:165204,abonos:60000,presupuesto:0},
  {mes:"Ene",egreso:875883,abonos:880000,presupuesto:0},{mes:"Feb",egreso:38001,abonos:300558969,presupuesto:0},{mes:"Mar",egreso:217484779,abonos:0,presupuesto:184739941},{mes:"Abr",egreso:48897232,abonos:1668156,presupuesto:54169676},
  {mes:"May",egreso:389795326,abonos:682692364,presupuesto:152669676},{mes:"Jun",egreso:323724819,abonos:0,presupuesto:89323876},{mes:"Jul",egreso:35199430,abonos:42490610,presupuesto:80146700},{mes:"Ago",egreso:39683997,abonos:30000000,presupuesto:18646700},
  {mes:"Sep",egreso:57393507,abonos:86000000,presupuesto:18646700},{mes:"Oct",egreso:48756397,abonos:19000000,presupuesto:19523892},{mes:"Nov",egreso:270873572,abonos:295642629,presupuesto:26722193},{mes:"Dic",egreso:55392921,abonos:33590777,presupuesto:61186889},
  {mes:"Ene'26",egreso:35202413,abonos:34043400,presupuesto:69722668},{mes:"Feb'26",egreso:26329519,abonos:54500000,presupuesto:23409696},{mes:"Mar'26",egreso:37439578,abonos:7429251,presupuesto:21809696},
];

export const resumenGeneral = [
  {general:"Capital",egreso:0,abonos:799372557,tipo:"capital"},{general:"Fondos_Mutuos",egreso:437000000,abonos:359929251,tipo:"tesoreria"},{general:"Reversa",egreso:367254443,abonos:367254443,tipo:"ajuste"},
  {general:"Desarrollo_Proyecto",egreso:453076421,abonos:27490610,tipo:"operacional"},{general:"RRHH",egreso:219739017,abonos:0,tipo:"operacional"},{general:"Préstamos",egreso:65074460,abonos:36054460,tipo:"financiero"},
  {general:"Administración",egreso:44364695,abonos:0,tipo:"operacional"},{general:"Operación",egreso:2160523,abonos:0,tipo:"operacional"},{general:"Ventas",egreso:2780,abonos:0,tipo:"operacional"},
];

export const centrosNegocio = [
  {name:"Oficina",egreso:768341475,abonos:1195356268,presupuesto:258492288},{name:"Reversa",egreso:367254443,abonos:367254443,presupuesto:0},
  {name:"La Ligua (San Expedito)",egreso:178183949,abonos:0,presupuesto:216059638},{name:"Panimávida (BESS RHO)",egreso:174415262,abonos:0,presupuesto:141602625},
  {name:"Codegua (Explícito)",egreso:42416764,abonos:0,presupuesto:71304376},{name:"Santa Victoria 15 MW",egreso:27304376,abonos:27490610,presupuesto:27304376},
  {name:"PMGD Quebrada Escobar",egreso:26807064,abonos:0,presupuesto:35850000},{name:"RUIL",egreso:3508772,abonos:0,presupuesto:58000000},
  {name:"PMGD Ranguil III",egreso:323275,abonos:0,presupuesto:11850000},{name:"Agua Santa (Expedito II)",egreso:116959,abonos:0,presupuesto:0},
];

export const detalleCompleto = [
  {general:"Capital",detallado:"Aumento de Capital",egreso:0,abonos:799372557,txns:10,solicitado:0},{general:"Fondos_Mutuos",detallado:"Serie (Inversión/Rescate)",egreso:437000000,abonos:359929251,txns:37,solicitado:0},
  {general:"Reversa",detallado:"Movimientos Reversados",egreso:367254443,abonos:367254443,txns:16,solicitado:0},{general:"Desarrollo_Proyecto",detallado:"Conexión",egreso:173567981,abonos:27490610,txns:22,solicitado:224662468},
  {general:"RRHH",detallado:"Administrativo",egreso:150911386,abonos:0,txns:80,solicitado:154991904},{general:"Desarrollo_Proyecto",detallado:"Terreno",egreso:91406726,abonos:0,txns:15,solicitado:175000000},
  {general:"Desarrollo_Proyecto",detallado:"Gestión Permisos",egreso:76286796,abonos:0,txns:56,solicitado:103291979},{general:"Préstamos",detallado:"Préstamos Comerciales",egreso:65074460,abonos:36054460,txns:25,solicitado:0},
  {general:"Desarrollo_Proyecto",detallado:"Gestión",egreso:54829734,abonos:0,txns:70,solicitado:52758771},{general:"Desarrollo_Proyecto",detallado:"Estudios Eléctricos",egreso:45873463,abonos:0,txns:34,solicitado:21917996},
  {general:"RRHH",detallado:"Directorio",egreso:34500000,abonos:0,txns:28,solicitado:39000000},{general:"RRHH",detallado:"Operaciones",egreso:34327631,abonos:0,txns:33,solicitado:47500000},
  {general:"Administración",detallado:"Gastos Varios",egreso:32272647,abonos:0,txns:98,solicitado:3033600},{general:"Administración",detallado:"Arriendo",egreso:7205271,abonos:0,txns:18,solicitado:6350000},
  {general:"Desarrollo_Proyecto",detallado:"Estudios Técnicos",egreso:5915911,abonos:0,txns:15,solicitado:1189801},{general:"Desarrollo_Proyecto",detallado:"Otros Desarrollo",egreso:5195810,abonos:0,txns:3,solicitado:0},
  {general:"Administración",detallado:"Viáticos",egreso:4886777,abonos:0,txns:15,solicitado:5000000},{general:"Operación",detallado:"Contabilidad",egreso:1392709,abonos:0,txns:11,solicitado:2016784},
  {general:"Operación",detallado:"Banco",egreso:767814,abonos:0,txns:20,solicitado:600000},{general:"Ventas",detallado:"Venta",egreso:2780,abonos:0,txns:1,solicitado:0},
];

export const aportesCapital = [
  {name:"FFMM",egreso:437000000,abonos:359929251},{name:"Reversa",egreso:367257223,abonos:367254443},
  {name:"Segundo Abono CORFO",egreso:245605308,abonos:345230864},{name:"Primer Abono CORFO",egreso:227585630,abonos:299248969},
  {name:"Tercer Abono CORFO",egreso:246149718,abonos:182383334},{name:"Préstamos",egreso:65074460,abonos:36054460},
];

export const presupuestoGeneral = {RRHH:241491904,Administración:14383600,Operación:2616784,Desarrollo_Proyecto:595035015};

export const fondosMutuos = [
  {fondo:"Renta Corto Plazo-Ejecutivo",abonos:167000000,egreso:260000000,intereses:4796886,saldo:97796886},
  {fondo:"Tesorería-Digital",abonos:135500000,egreso:177000000,intereses:5329492,saldo:46829492},
];

export const totales = {
  egresoTotal:1588672339,abonosTotal:1590101321,presupuesto:853527303,
  egresoOp:784417896,abonosOp:862917627,saldoCC:1428982,txCount:607,
  ffmm:{invertido:437000000,rescatado:359929251,intereses:10126378,saldo:144626378},reversa:367254443,
};

export const flujoProyectadoReal = [
  {mes:"Mar",cat:"RRHH",proyectado:10747976,real:0},{mes:"Mar",cat:"Administración",proyectado:421700,real:335626},{mes:"Mar",cat:"Operación",proyectado:712765,real:795266},{mes:"Mar",cat:"Desarrollo_Proyecto",proyectado:81807378,real:155566420},
  {mes:"Abr",cat:"RRHH",proyectado:13747976,real:12248977},{mes:"Abr",cat:"Administración",proyectado:421700,real:213500},{mes:"Abr",cat:"Operación",proyectado:134000,real:131085},{mes:"Abr",cat:"Desarrollo_Proyecto",proyectado:0,real:34635514},
  {mes:"May",cat:"RRHH",proyectado:13747976,real:13568808},{mes:"May",cat:"Administración",proyectado:421700,real:751839},{mes:"May",cat:"Operación",proyectado:134000,real:38685},{mes:"May",cat:"Desarrollo_Proyecto",proyectado:7214639,real:37695740},
  {mes:"Jun",cat:"RRHH",proyectado:17500000,real:17880293},{mes:"Jun",cat:"Administración",proyectado:1011700,real:2224580},{mes:"Jun",cat:"Operación",proyectado:135000,real:131810},{mes:"Jun",cat:"Desarrollo_Proyecto",proyectado:34359441,real:43488136},
  {mes:"Jul",cat:"RRHH",proyectado:17500000,real:17468402},{mes:"Jul",cat:"Administración",proyectado:1011700,real:2122281},{mes:"Jul",cat:"Operación",proyectado:135000,real:225613},{mes:"Jul",cat:"Desarrollo_Proyecto",proyectado:63081719,real:15383134},
  {mes:"Ago",cat:"RRHH",proyectado:17500000,real:17911599},{mes:"Ago",cat:"Administración",proyectado:1011700,real:19231997},{mes:"Ago",cat:"Operación",proyectado:135000,real:132021},{mes:"Ago",cat:"Desarrollo_Proyecto",proyectado:19639069,real:2408380},
  {mes:"Sep",cat:"RRHH",proyectado:17500000,real:17788502},{mes:"Sep",cat:"Administración",proyectado:1011700,real:2371343},{mes:"Sep",cat:"Operación",proyectado:135000,real:132726},{mes:"Sep",cat:"Desarrollo_Proyecto",proyectado:18348910,real:18100936},
  {mes:"Oct",cat:"RRHH",proyectado:20500000,real:18496120},{mes:"Oct",cat:"Administración",proyectado:1435000,real:2033595},{mes:"Oct",cat:"Operación",proyectado:135000,real:133066},{mes:"Oct",cat:"Desarrollo_Proyecto",proyectado:25461343,real:21093616},
  {mes:"Nov",cat:"RRHH",proyectado:20500000,real:28323202},{mes:"Nov",cat:"Administración",proyectado:1435000,real:3127607},{mes:"Nov",cat:"Operación",proyectado:135000,real:133452},{mes:"Nov",cat:"Desarrollo_Proyecto",proyectado:99537695,real:59289311},
  {mes:"Dic",cat:"RRHH",proyectado:22700000,real:31837530},{mes:"Dic",cat:"Administración",proyectado:1781000,real:3649784},{mes:"Dic",cat:"Operación",proyectado:135000,real:133599},{mes:"Dic",cat:"Desarrollo_Proyecto",proyectado:39603993,real:19181231},
];

export const comparativa = [
  {concepto:"RRHH",item:"Equipo de Trabajo",gastado:25481780,solicitado:48091977,solicitadoUF:1251},
  {concepto:"Desarrollo_Proyecto",item:"Estudios Técnicos",gastado:30445367,solicitado:24334310,solicitadoUF:633},
  {concepto:"Desarrollo_Proyecto",item:"Gestión Permisos Amb. y Sectoriales",gastado:38610730,solicitado:47092464,solicitadoUF:1225},
  {concepto:"Desarrollo_Proyecto",item:"Gestión y Arriendos Terrenos",gastado:22423030,solicitado:26487108,solicitadoUF:689},
  {concepto:"Desarrollo_Proyecto",item:"Puntos de Conexión",gastado:0,solicitado:133242840,solicitadoUF:3466},
  {concepto:"Administración",item:"Asesorías Legales, Contratos, RRHH y Contab.",gastado:775565,solicitado:9802921,solicitadoUF:255},
  {concepto:"Operación",item:"Gastos Operativos Oficina",gastado:926351,solicitado:3421412,solicitadoUF:89},
  {concepto:"Operación",item:"Gastos Operativos Visita Terreno",gastado:0,solicitado:6765938,solicitadoUF:176},
];

export const proyectos = [
  {nombre:"BESS RHO (Panimávida)",mw:9,uf:700,estado:"En desarrollo",boleta:27198626,boletaPagada:true},
  {nombre:"San Expedito (La Ligua 110kV)",mw:90,uf:1400,estado:"En desarrollo",boleta:54305090,boletaPagada:true},
  {nombre:"Codegua (Explícito 66kV)",mw:20,uf:700,estado:"En desarrollo",boleta:27304376,boletaPagada:true},
  {nombre:"Chocalán",mw:20,uf:700,estado:"Planificación",boleta:0,boletaPagada:false},
  {nombre:"Santa Victoria 15 MW",mw:15,uf:0,estado:"En desarrollo",boleta:27304376,boletaPagada:true},
  {nombre:"PMGD Quebrada Escobar",mw:9,uf:0,estado:"Permitting",boleta:0,boletaPagada:false},
  {nombre:"RUIL",mw:0,uf:0,estado:"Planificación",boleta:0,boletaPagada:false},
  {nombre:"PMGD Ranguil III",mw:0,uf:0,estado:"Planificación",boleta:0,boletaPagada:false},
];

export const ultimasTxns = [
  {fecha:"2026-03-12",desc:"OC0067 Soc Vera Leon FX 197 — Revisión Ingeniería",egreso:596519,abonos:0,saldo:1041433,cat:"Desarrollo_Proyecto"},
  {fecha:"2026-03-12",desc:"Patente Concesión Exploración Panimávida",egreso:419334,abonos:0,saldo:622099,cat:"Desarrollo_Proyecto"},
  {fecha:"2026-03-12",desc:"Patente Concesión Exploración San Expedito",egreso:419334,abonos:0,saldo:202765,cat:"Desarrollo_Proyecto"},
  {fecha:"2026-03-12",desc:"Certificado Prendas Vigente Rho Generación",egreso:5050,abonos:0,saldo:197715,cat:"Desarrollo_Proyecto"},
  {fecha:"2026-03-13",desc:"Rescate Fondos Mutuos TESORERIA-DIGITAL",egreso:0,abonos:3929251,saldo:4117766,cat:"Fondos_Mutuos"},
  {fecha:"2026-03-16",desc:"SOAP Camioneta Maxus T60",egreso:11990,abonos:0,saldo:4105776,cat:"Administración"},
  {fecha:"2026-03-16",desc:"Permiso de Circulación",egreso:382117,abonos:0,saldo:3723659,cat:"Administración"},
  {fecha:"2026-03-16",desc:"OC0073 Gema Asesorías — Verificación",egreso:110313,abonos:0,saldo:3613346,cat:"Desarrollo_Proyecto"},
  {fecha:"2026-03-16",desc:"OC0072 Francisco Meneses — Bus. Dev. & Finance",egreso:1000000,abonos:0,saldo:2613346,cat:"Desarrollo_Proyecto"},
  {fecha:"2026-03-16",desc:"F29 01-2026 Ret. Imp Único Javier Alvarez",egreso:468097,abonos:0,saldo:2145249,cat:"RRHH"},
  {fecha:"2026-03-16",desc:"F29 01-2026 Ret. Imp Único Victoria Alvarez",egreso:37631,abonos:0,saldo:2107618,cat:"RRHH"},
  {fecha:"2026-03-16",desc:"F29 01-2026 Imp 2da Cat. Gerardo Muñoz",egreso:215929,abonos:0,saldo:1567446,cat:"Desarrollo_Proyecto"},
  {fecha:"2026-03-16",desc:"F29 01-2026 Imp 2da Cat. Pedro Morales",egreso:111473,abonos:0,saldo:1455973,cat:"Desarrollo_Proyecto"},
  {fecha:"2026-03-16",desc:"F29 01-2026 Imp 2da Cat. Erick Mendez",egreso:26991,abonos:0,saldo:1428982,cat:"Administración"},
];

export const valorUF = 38442.83;
export const totalMW = 154;
