// Session 60 regression suite: the Session 50/51/56/57 guarantees, plus cache
// and determinism for the new layers.
const { connect, boot } = require("./cdp.js");

const R = (name, pass, detail) =>
  console.log(`  ${pass ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);

(async () => {
  const s = await connect();
  await boot(s, process.env.MR_URL || "http://localhost:8899/index.html");
  let allPass = true;
  const chk = (n, p, d) => { if (!p) allPass = false; R(n, p, d); };

  // ---- Session 56: geometry contract, all production masters ----
  console.log("\n[Session 56] tall edge-prop geometry contract");
  const geo = await s.eval(`(() => {
    __mr.goLevel(1);
    const out = {};
    const P = __mr.edgeProps.placements;
    for (const k of ["mumbai_vadapav_cart_fixed_canopy_right",
                     "mumbai_chai_counter_shallow_awning_right",
                     "mumbai_vadapav_cart_fixed_canopy_left"]) {
      const p = P[k], d = __mr.edgePropDef(k);
      out[k] = { intrusion:+p.roadIntrusion.toFixed(3), cap:p.maxRoadIntrusion,
                 intrusionOk:p.intrusionOk, footprintClear:p.footprintClear,
                 ok:p.ok, mirrored:p.mirrored, scale:p.scale, edge:p.edge,
                 heightPx:d.heightPx };
    }
    return out;
  })()`);
  for (const [k, v] of Object.entries(geo)) {
    chk(k.replace("mumbai_", ""),
        v.ok && v.intrusion <= 8 && !v.mirrored,
        `intrusion ${v.intrusion}px <= ${v.cap}, footprintClear ${v.footprintClear}, mirrored ${v.mirrored}, h ${v.heightPx}`);
  }

  // ---- Session 50 Test B: same-edge vada-pav + chai ----
  console.log("\n[Session 50] Test B — same-edge production pair de-confliction");
  const tb = await s.eval(`(async () => {
    const c = __mr.config.edgeProps;
    c.distribute=false; c.testC=false; c.test54.on=false; c.testB=true;
    __mr.goLevel(1); __mr.config.corridor.camLerp=400;
    for(let i=0;i<200;i++){__mr.player.maxHp=__mr.player.hp=99;
      __mr.player.y=__mr.route.startY-260;__mr.tick(1/60);
      if(i%6===0)await new Promise(r=>requestAnimationFrame(r));}
    __mr.tick(0); await new Promise(r=>requestAnimationFrame(r));
    const inst=__mr.edgeProps.instances;
    const segs=__mr.edgeComposer.segments;
    // Dedupe by id: a claim straddling a tile joint is intentionally present on
    // BOTH tiles (claims are in world y), so the raw list double-counts it.
    const seen={}, prod=[];
    for(const sg of segs) for(const e of ["left","right"])
      for(const cl of sg[e].claims) if(cl.source==="production"){
        const k=e+cl.id+Math.round(cl.y0);
        if(seen[k])continue; seen[k]=1;
        prod.push({id:cl.id,edge:e,y0:cl.y0,y1:cl.y1,anchor:cl.anchor,weight:cl.weight});
      }
    return { instances: inst.map(i=>i.key), admitted: prod };
  })()`);
  const tbKeys = tb.instances.map(k => k.replace("mumbai_", ""));
  chk("Test B draws both masters on the right edge",
      tb.instances.length === 2 &&
      tb.instances.includes("mumbai_vadapav_cart_fixed_canopy_right") &&
      tb.instances.includes("mumbai_chai_counter_shallow_awning_right"),
      tbKeys.join(" + "));
  const tbAdm = tb.admitted.filter(a => a.edge === "right");
  if (tbAdm.length >= 2) {
    const [a, b] = tbAdm.sort((x, y) => x.y0 - y.y0);
    chk("Test B pair does not overlap", b.y0 > a.y1, `gap ${(b.y0 - a.y1).toFixed(1)}px`);
  } else {
    chk("Test B pair both admitted", false, `only ${tbAdm.length} admitted on right`);
  }

  // ---- Session 51 Test C: opposing edges, dedicated masters ----
  console.log("\n[Session 51] Test C — opposing-edge dedicated masters");
  const tc = await s.eval(`(async () => {
    const c=__mr.config.edgeProps;
    c.testB=false; c.distribute=false; c.test54.on=false; c.testC=true;
    __mr.goLevel(1); __mr.config.corridor.camLerp=400;
    for(let i=0;i<200;i++){__mr.player.maxHp=__mr.player.hp=99;
      __mr.player.y=__mr.route.startY-260;__mr.tick(1/60);
      if(i%6===0)await new Promise(r=>requestAnimationFrame(r));}
    __mr.tick(0); await new Promise(r=>requestAnimationFrame(r));
    const P=__mr.edgeProps.placements;
    const L=P.mumbai_vadapav_cart_fixed_canopy_left, Rr=P.mumbai_vadapav_cart_fixed_canopy_right;
    const segs=__mr.edgeComposer.segments;
    const byEdge={left:[],right:[]};
    for(const sg of segs) for(const e of ["left","right"])
      for(const cl of sg[e].claims) if(cl.source==="production") byEdge[e].push(cl.id);
    return { instances:__mr.edgeProps.instances.map(i=>i.key),
             leftOk:L.ok, rightOk:Rr.ok, leftMirrored:L.mirrored, rightMirrored:Rr.mirrored,
             leftEdge:L.edge, rightEdge:Rr.edge, byEdge,
             leftIntr:+L.roadIntrusion.toFixed(3), rightIntr:+Rr.roadIntrusion.toFixed(3) };
  })()`);
  chk("Test C places one master per edge",
      tc.instances.length === 2, tc.instances.map(k=>k.replace("mumbai_","")).join(" + "));
  chk("Test C left+right both geometry-valid, neither mirrored",
      tc.leftOk && tc.rightOk && !tc.leftMirrored && !tc.rightMirrored,
      `left intrusion ${tc.leftIntr}, right ${tc.rightIntr}`);
  chk("Test C claims land on independent edges",
      tc.byEdge.left.length >= 1 && tc.byEdge.right.length >= 1,
      `left ${tc.byEdge.left.length}, right ${tc.byEdge.right.length}`);

  // ---- Session 57: deterministic multi-segment distribution ----
  console.log("\n[Session 57] deterministic multi-segment distribution");
  const d57 = await s.eval(`(() => {
    const c=__mr.config.edgeProps;
    c.testB=false; c.testC=false; c.test54.on=false; c.distribute=true;
    c.attachments.on=false;
    const sig=(lv)=>{ __mr.goLevel(lv);
      return __mr.productionDistribution.map(p=>p.eligible?
        (p.idx+":"+p.edge+":"+p.key+":"+p.y):(p.idx+":-"+p.reason)).join("|"); };
    const a=[1,2,3,4,5].map(sig);
    const b=[1,2,3,4,5].map(sig);
    __mr.goLevel(1);
    const cc=[1,2,3,4,5].map(sig);
    return { stable: JSON.stringify(a)===JSON.stringify(b) &&
                     JSON.stringify(a)===JSON.stringify(cc),
             breathing: a.map(z=>({ elig:(z.match(/:left:|:right:/g)||[]).length,
                                    total:z.split("|").length })) };
  })()`);
  chk("distribution identical across repeat calls + level re-entry", d57.stable);
  const noBackToBack = await s.eval(`(() => {
    __mr.goLevel(3);
    const el = __mr.productionDistribution.filter(p=>p.eligible).map(p=>p.idx);
    let ok=true; for(let i=1;i<el.length;i++) if(el[i]-el[i-1]<=1) ok=false;
    return { ok, idx: el };
  })()`);
  chk("breathing gaps: no back-to-back eligible segments",
      noBackToBack.ok, "eligible idx " + noBackToBack.idx.join(","));
  chk("not every segment carries a prop",
      d57.breathing.every(z => z.elig < z.total),
      d57.breathing.map(z => z.elig + "/" + z.total).join("  "));

  // ---- Cache: signature reacts to every new input ----
  console.log("\n[Session 60] cache identity");
  const cache = await s.eval(`(async () => {
    __mr.goLevel(3); __mr.config.corridor.camLerp=400;
    for(let i=0;i<160;i++){__mr.player.maxHp=__mr.player.hp=99;
      __mr.player.y=__mr.route.startY-600;__mr.tick(1/60);
      if(i%6===0)await new Promise(r=>requestAnimationFrame(r));}
    const snap=()=>{__mr.tick(0);
      const sg=__mr.edgeComposer.segments[0];
      return sg ? JSON.stringify(sg.left.claims.map(c=>c.id))+"/"+sg.idx : "none"; };
    const base=snap();
    __mr.config.frontage.bayMin=90; const fr=snap();
    __mr.config.frontage.bayMin=54;  const frBack=snap();
    __mr.config.roadOverlays.count=12; const ov=snap();
    __mr.config.roadOverlays.count=5;  const ovBack=snap();
    // Attachment check: pick a segment the PLAN places one on, then WALK THE
    // CAMERA THERE — edgeComposer only reports segments currently on screen, so
    // reading a distant idx returns nothing and proves nothing.
    const a=__mr.config.edgeProps.attachments;
    a.on=true; a.testKeys=true;
    const tgt=__mr.productionDistribution.find(p=>p.eligible&&(p.attachments||[]).length);
    if(!tgt) return { base, restoredFrontage: base===frBack, restoredOverlay: base===ovBack,
                      noTarget:true };
    for(let i=0;i<220;i++){__mr.player.maxHp=__mr.player.hp=99;
      __mr.player.y=tgt.y; __mr.tick(1/60);
      if(i%6===0)await new Promise(r=>requestAnimationFrame(r));}
    const read=async()=>{ __mr.tick(0); await new Promise(r=>requestAnimationFrame(r));
      const sg=__mr.edgeComposer.segments.find(x=>x.idx===tgt.idx);
      return sg?JSON.stringify(sg[tgt.edge].claims.filter(c=>c.source==="production").map(c=>c.id)):"none"; };
    const at=await read();
    a.testKeys=false; const atOff=await read();
    a.testKeys=true;  const atBack=await read();
    a.testKeys=false; a.on=true;
    return { base, restoredFrontage: base===frBack, restoredOverlay: base===ovBack,
             tgtIdx:tgt.idx, tgtEdge:tgt.edge, at, atOff,
             attachmentChanged: at!==atOff, restoredAttachment: atBack===at };
  })()`);
  chk("frontage config change round-trips to identical composition", cache.restoredFrontage);
  chk("road-overlay config change round-trips", cache.restoredOverlay);
  chk("attachment toggle changes composition", cache.attachmentChanged,
      `seg ${cache.tgtIdx}/${cache.tgtEdge}: on=${cache.at} off=${cache.atOff}`);
  chk("attachment toggle round-trips", cache.restoredAttachment);

  // ---- Night treatment state ----
  console.log("\n[Session 60] night treatment");
  const nt = await s.eval(`(() => {
    __mr.goLevel(3); const day = __mr.nightTreatment;
    __mr.goLevel(4); const night = __mr.nightTreatment;
    return { dayNight: day.zoneNight, dayApplies: day.applies,
             nightNight: night.zoneNight, nightApplies: night.applies };
  })()`);
  chk("night treatment inactive in a day zone", !nt.dayApplies && !nt.dayNight);
  chk("night treatment active in Mumbai zone 4", nt.nightApplies && nt.nightNight);

  console.log("\n" + (allPass ? "ALL REGRESSION CHECKS PASS" : "SOME CHECKS FAILED"));
  console.log("console errors:", s.errors.length ? s.errors : "none");
  process.exit(allPass ? 0 : 1);
})().catch(e => { console.error("FAILED:", e.message); process.exit(1); });
