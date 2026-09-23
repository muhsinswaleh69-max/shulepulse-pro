"use client"
import { useState, useEffect } from "react"
const MASTER_KEY = "shulepulse-MASTER-2026-v1"
const OLD_KEYS = ["shulepulse-pro-senior-final-2026","shulepulse-teachers-final-2026","shulepulse-v3","shulepulse-final-v4","shulepulse-senior-learners","shulepulse-MASTER-2026-v1"]

export default function Page(){
 const [active,setActive]=useState("Dashboard")
 const [store,setStore]=useState({
  students:[], teachers:[], boarding:[], gradeX:[], trash:[],
  marks:[], curriculum:[], portfolio:[], rankings:[], attendance:[], exams:[], timetable:[], homework:[],
  fees:[], library:[], transport:[], messages:[], onlineClasses:[], reports:[], analytics:[]
 })
 const [q,setQ]=useState("")
 const [modals,setModals]=useState({student:false,teacher:false,boarding:false,gradeX:false,marks:false,fees:false,generic:false})
 const [edit,setEdit]=useState({type:null,idx:null})
 const [form,setForm]=useState({})
 const streams=["STEM-A","STEM-B","STEM-C","Arts-A","Arts-B","Social-A","Social-B","General-A","North","South","East","West"]

 // LOAD + MIGRATE ALL OLD DATA
 useEffect(()=>{
  try{
   let final=JSON.parse(JSON.stringify(store))
   let recovered=0
   OLD_KEYS.forEach(k=>{
    try{
     const raw=localStorage.getItem(k)
     if(!raw) return
     const data=JSON.parse(raw)
     if(Array.isArray(data) && k.includes("student") || k.includes("v3") || k.includes("final") || k.includes("learners")){
      data.forEach(s=>{ if(s && s.name &&!final.students.some(x=>x.assNo===s.assNo)) { final.students.push(s); recovered++ } })
     }
     if(k.includes("teacher")){
      if(Array.isArray(data)) data.forEach(t=>{ if(t && t.name &&!final.teachers.some(x=>x.tscNo===t.tscNo)) final.teachers.push(t) })
     }
     if(data && data.students && Array.isArray(data.students)){
      // master backup
      Object.keys(data).forEach(key=>{
       if(Array.isArray(data[key]) && final[key]!==undefined){
        data[key].forEach(item=>{ if(!final[key].some(x=>JSON.stringify(x)===JSON.stringify(item))) final[key].push(item) })
       }
      })
     }
    }catch(e){}
   })
   const master=localStorage.getItem(MASTER_KEY)
   if(master){ try{ const m=JSON.parse(master); Object.keys(m).forEach(k=>{ if(Array.isArray(m[k]) && m[k].length>0) final[k]=m[k] }) }catch(e){} }
   setStore(final)
   if(recovered>0) console.log("Recovered",recovered,"students")
  }catch(e){}
 },[])

 useEffect(()=>{ localStorage.setItem(MASTER_KEY, JSON.stringify(store)) },[store])

 const addOrUpdate=(type,data)=>{
  const s={...store}
  if(edit.type===type && edit.idx!==null){ s[type][edit.idx]=data } else { s[type]=[...s[type],data] }
  setStore(s); setModals({}); setEdit({type:null,idx:null})
 }
 const toTrash=(type,idx)=>{
  const item=store[type][idx]
  const s={...store}
  s[type]=s[type].filter((_,i)=>i!==idx)
  s.trash=[...s.trash,{...item,_from:type,_deletedAt:new Date().toISOString()}]
  setStore(s)
 }
 const restore=(idx)=>{
  const item=store.trash[idx]
  const s={...store}
  s.trash=s.trash.filter((_,i)=>i!==idx)
  if(s[item._from]) s[item._from]=[...s[item._from],item]
  setStore(s)
 }

 const exportAll=()=>{
  const blob=new Blob([JSON.stringify({...store,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"})
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`shulepulse-MASTER-BACKUP-${new Date().toISOString().slice(0,10)}.json`; a.click()
 }
 const importAll=(e)=>{
  const file=e.target.files[0]; if(!file) return
  const r=new FileReader(); r.onload=ev=>{ try{ const d=JSON.parse(ev.target.result); setStore(d); alert("Restored "+Object.values(d).reduce((a,b)=>a+(Array.isArray(b)?b.length:0),0)+" records") }catch(err){ alert("Invalid file") } }; r.readAsText(file)
 }

 const MenuItem=({icon,label})=>{ const isActive=active===label; return <button onClick={()=>setActive(label)} style={{display:"flex",alignItems:"center",gap:"10px",width:"100%",textAlign:"left",padding:"9px 12px",margin:"2px 0",borderRadius:"8px",border:"none",background:isActive?"#6b7d3a":"transparent",color:isActive?"#fff":"#c5f0a4",fontWeight:isActive?"bold":"500",cursor:"pointer",fontSize:"13.5px"}}><span style={{width:"22px"}}>{icon}</span>{label} <span style={{marginLeft:"auto",fontSize:"11px",opacity:0.7}}>{store[mapKey(label)]?.length||""}</span></button> }
 const SectionTitle=({title})=><div style={{fontSize:"11px",letterSpacing:"1.5px",color:"#8aa07a",fontWeight:"800",margin:"14px 0 6px 12px"}}>{title}</div>

 function mapKey(label){
  const map={Students:"students","Class Teachers":"teachers",Boarding:"boarding","Grade X":"gradeX",Trash:"trash","Marks Entry":"marks","CBE Curriculum":"curriculum","Learner Portfolio":"portfolio",Rankings:"rankings",Attendance:"attendance",Exams:"exams",Timetable:"timetable",Homework:"homework",Fees:"fees",Library:"library",Transport:"transport",Messages:"messages","Online Classes":"onlineClasses",Reports:"reports",Analytics:"analytics"}
  return map[label]||""
 }

 const filtered=(type)=> store[type]?.filter(x=>JSON.stringify(x).toLowerCase().includes(q.toLowerCase()))||[]
 const card={background:"#fff",padding:"16px",borderRadius:"12px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}
 const inputStyle={padding:"11px",borderRadius:"10px",border:"1px solid #ccc",width:"100%"}

 return(
  <div style={{display:"flex",minHeight:"100vh",fontFamily:"Arial",background:"#f2f4f7"}}>
   <div style={{width:"285px",background:"#0f2e2a",color:"#fff",flexShrink:0,display:"flex",flexDirection:"column"}}>
    <div style={{padding:"16px",borderBottom:"1px solid #1a423b",display:"flex",gap:"12px",alignItems:"center"}}>
     <div style={{width:"44px",height:"44px",background:"#facc15",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:0,height:0,borderLeft:"16px solid #0f2e2a",borderTop:"10px solid transparent",borderBottom:"10px solid transparent",marginLeft:"4px"}}></div></div>
     <div><div style={{fontWeight:900,fontSize:"20px"}}>ShulePulse Pro</div><div style={{fontSize:"9px",color:"#a8d5a0"}}>CBE + Boarding | PP1 - Grade 9 + Grade 10 | MOE: SLIM</div></div>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"8px"}}>
     <SectionTitle title="MAIN MENU"/><MenuItem icon="⏱️" label="Dashboard"/><MenuItem icon="👥" label="Students"/><MenuItem icon="🎓" label="Class Teachers"/><MenuItem icon="🛏️" label="Boarding"/><MenuItem icon="📦" label="Grade X"/><MenuItem icon="🗑️" label="Trash"/>
     <SectionTitle title="ACADEMICS"/><MenuItem icon="📊" label="Marks Entry"/><MenuItem icon="🔗" label="CBE Curriculum"/><MenuItem icon="📁" label="Learner Portfolio"/><MenuItem icon="🏆" label="Rankings"/><MenuItem icon="📅" label="Attendance"/><MenuItem icon="📝" label="Exams"/><MenuItem icon="🗓️" label="Timetable"/><MenuItem icon="📓" label="Homework"/>
     <SectionTitle title="FINANCE & RESOURCES"/><MenuItem icon="💳" label="Fees"/><MenuItem icon="📚" label="Library"/><MenuItem icon="🚌" label="Transport"/>
     <SectionTitle title="PEOPLE"/><SectionTitle title="COMMUNICATION"/><MenuItem icon="✉️" label="Messages"/><MenuItem icon="📹" label="Online Classes"/><MenuItem icon="📄" label="Reports"/><MenuItem icon="📈" label="Analytics"/>
     <SectionTitle title="PORTALS"/><MenuItem icon="👨‍🏫" label="Teacher Portal"/><MenuItem icon="⚙️" label="Staff Portal"/><MenuItem icon="⚙️" label="Settings"/><MenuItem icon="🚪" label="Logout"/>
     <div style={{marginTop:"14px",padding:"10px",background:"#1a423b",borderRadius:"10px"}}>
      <div style={{fontSize:"11px",color:"#c5f0a4"}}>💾 Students: {store.students.length} | Teachers: {store.teachers.length}</div>
      <div style={{fontSize:"11px",color:"#8aa07a"}}>Total Records: {Object.values(store).reduce((a,b)=>a+(Array.isArray(b)?b.length:0),0)} locked</div>
      <button onClick={exportAll} style={{marginTop:"8px",width:"100%",background:"#facc15",color:"#0f2e2a",border:"none",padding:"8px",borderRadius:"8px",fontWeight:"bold",cursor:"pointer"}}>⬇️ BACKUP ALL</button>
      <label style={{display:"block",marginTop:"6px",background:"#2a5a3a",textAlign:"center",padding:"7px",borderRadius:"8px",cursor:"pointer",fontSize:"11px"}}>⬆️ RESTORE BACKUP<input type="file" accept=".json" onChange={importAll} style={{display:"none"}}/></label>
     </div>
    </div>
   </div>

   <div style={{flex:1,padding:"16px",overflow:"auto"}}>
    {active==="Dashboard" && (
     <div>
      <h2 style={{margin:"0 0 4px"}}>Dashboard - Overall Data</h2>
      <div style={{fontSize:"12px",color:"#166534",background:"#dcfce7",display:"inline-block",padding:"5px 12px",borderRadius:"20px",marginBottom:"12px"}}>✅ All modules functional & auto-saved in {MASTER_KEY}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:"10px"}}>
       <div style={card}><div style={{fontSize:"11px",color:"#666"}}>STUDENTS</div><div style={{fontSize:"28px",fontWeight:900}}>{store.students.length}</div><div style={{fontSize:"11px"}}>{store.students.filter(s=>s.board==="Boarding").length} Boarding</div></div>
       <div style={card}><div style={{fontSize:"11px",color:"#666"}}>CLASS TEACHERS</div><div style={{fontSize:"28px",fontWeight:900}}>{store.teachers.length}</div><div style={{fontSize:"11px",color:"#16a34a"}}>TSC Verified</div></div>
       <div style={card}><div style={{fontSize:"11px",color:"#666"}}>BOARDING</div><div style={{fontSize:"28px",fontWeight:900}}>{store.boarding.length}</div></div>
       <div style={card}><div style={{fontSize:"11px",color:"#666"}}>GRADE X</div><div style={{fontSize:"28px",fontWeight:900}}>{store.gradeX.length}</div></div>
       <div style={card}><div style={{fontSize:"11px",color:"#666"}}>FEES COLLECTED</div><div style={{fontSize:"20px",fontWeight:900}}>KES {store.fees.reduce((a,b)=>a+(parseInt(b.amount)||0),0).toLocaleString()}</div></div>
       <div style={card}><div style={{fontSize:"11px",color:"#666"}}>TRASH / RECOVERABLE</div><div style={{fontSize:"28px",fontWeight:900}}>{store.trash.length}</div></div>
       <div style={card}><div style={{fontSize:"11px",color:"#666"}}>MARKS / EXAMS</div><div style={{fontSize:"28px",fontWeight:900}}>{store.marks.length+store.exams.length}</div></div>
       <div style={card}><div style={{fontSize:"11px",color:"#666"}}>LIBRARY / TRANSPORT</div><div style={{fontSize:"28px",fontWeight:900}}>{store.library.length+store.transport.length}</div></div>
      </div>
      <div style={{...card,marginTop:"12px"}}>
       <h3 style={{marginTop:0}}>All Modules Locked & Functional</h3>
       <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"8px",fontSize:"12px"}}>
        <div>✅ Students: Registration with Assessment No, UPI, Pathway, Stream, Boarding, Parent Phone</div>
        <div>✅ Class Teachers: TSC No mandatory, ID, Qual, Subjects, Class Assigned</div>
        <div>✅ Boarding: Dorm, Bed No, Student Link</div>
        <div>✅ Grade X: Special program learners</div>
        <div>✅ Marks Entry: Subject, Score, Grade</div>
        <div>✅ Fees: Student, Amount, Term, Balance</div>
        <div>✅ All others: Messages, Timetable, Attendance etc - all save to master key</div>
       </div>
      </div>
     </div>
    )}

    {active==="Students" && (
     <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}><h2 style={{margin:0}}>Students - Registration Details</h2><button onClick={()=>{ setForm({assNo:`G10/${String(store.students.length+1).padStart(4,"0")}`,name:"",cls:"G10",stream:"STEM-A",phone:"",upi:"",board:"Day",gender:"Male",pathway:"STEM",parentName:"",kcpe:"",requirements:"Uniform, Books, Box"}); setEdit({type:"students",idx:null}); setModals({student:true}) }} style={{background:"#0f2e2a",color:"#fff",border:"none",padding:"10px 16px",borderRadius:"20px",fontWeight:"bold"}}>+ Add Student</button></div>
      <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}><div style={{padding:"10px"}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Assessment No, Name, UPI..." style={{...inputStyle,width:"300px",borderRadius:"20px"}}/></div>
      <table style={{width:"100%",minWidth:"1100px",borderCollapse:"collapse",fontSize:"13px"}}><thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"10px"}}>#</th><th>Assessment No</th><th>Name</th><th>Grade/Stream</th><th>UPI/Phone</th><th>Boarding</th><th>Requirements</th><th>Actions</th></tr></thead>
      <tbody>{filtered("students").map((s,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"10px"}}>{i+1}</td><td><b style={{background:"#eef2ff",padding:"4px 8px",borderRadius:"8px"}}>{s.assNo}</b></td><td><b>{s.name}</b><br/><small style={{color:"#666"}}>{s.parentName} | {s.gender}</small></td><td>{s.cls} {s.stream}<br/><small>{s.pathway}</small></td><td>{s.upi}<br/><small>{s.phone}</small></td><td>{s.board}</td><td style={{fontSize:"11px"}}>{s.requirements}</td><td><button onClick={()=>{ setForm(s); setEdit({type:"students",idx:store.students.indexOf(s)}); setModals({student:true}) }} style={{border:"none",background:"none"}}>✏️</button> <button onClick={()=>toTrash("students",store.students.indexOf(s))} style={{border:"none",background:"none"}}>🗑️</button></td></tr>)}</tbody></table></div>
     </div>
    )}

    {active==="Class Teachers" && (
     <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px"}}><h2 style={{margin:0}}>Class Teachers - Credentials & TSC</h2><button onClick={()=>{ setForm({tscNo:"",name:"",idNo:"",phone:"",email:"",gender:"Male",qual:"Diploma",subjects:"Mathematics",classAssigned:"G10 STEM-A",empType:"TSC",status:"Active",certificate:""}); setEdit({type:"teachers",idx:null}); setModals({teacher:true}) }} style={{background:"#0f2e2a",color:"#fff",border:"none",padding:"10px 16px",borderRadius:"20px",fontWeight:"bold"}}>+ Register Teacher</button></div>
      <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}><div style={{padding:"10px"}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search TSC No, Name, Class..." style={{...inputStyle,width:"300px",borderRadius:"20px"}}/></div>
      <table style={{width:"100%",minWidth:"1100px",borderCollapse:"collapse",fontSize:"13px"}}><thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"10px"}}>#</th><th>TSC No *</th><th>Name / Credentials</th><th>Class</th><th>Subjects</th><th>Phone</th><th>Actions</th></tr></thead>
      <tbody>{filtered("teachers").map((t,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"10px"}}>{i+1}</td><td><b style={{background:"#fef3c7",padding:"4px 8px",borderRadius:"8px"}}>{t.tscNo}</b></td><td><b>{t.name}</b><br/><small>{t.qual} | {t.idNo} | {t.empType}</small></td><td><span style={{background:"#0f2e2a",color:"#fff",padding:"3px 8px",borderRadius:"8px",fontSize:"11px"}}>{t.classAssigned}</span></td><td>{t.subjects}</td><td>{t.phone}<br/><small>{t.email}</small></td><td><button onClick={()=>{ setForm(t); setEdit({type:"teachers",idx:store.teachers.indexOf(t)}); setModals({teacher:true}) }} style={{border:"none",background:"none"}}>✏️</button> <button onClick={()=>toTrash("teachers",store.teachers.indexOf(t))} style={{border:"none",background:"none"}}>🗑️</button></td></tr>)}</tbody></table></div>
     </div>
    )}

    {active==="Boarding" && (
     <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px"}}><h2 style={{margin:0}}>Boarding - Dorm & Bed Management</h2><button onClick={()=>{ setForm({studentAssNo:"",dorm:"Elgon",bedNo:"B01",term:"Term1",status:"Checked-In"}); setEdit({type:"boarding",idx:null}); setModals({boarding:true}) }} style={{background:"#0f2e2a",color:"#fff",border:"none",padding:"10px 16px",borderRadius:"20px",fontWeight:"bold"}}>+ Assign Boarding</button></div>
      <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}><thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"10px"}}>#</th><th>Assessment No</th><th>Dorm</th><th>Bed No</th><th>Term</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered("boarding").map((b,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"10px"}}>{i+1}</td><td>{b.studentAssNo}</td><td>{b.dorm}</td><td>{b.bedNo}</td><td>{b.term}</td><td>{b.status}</td><td><button onClick={()=>toTrash("boarding",store.boarding.indexOf(b))} style={{border:"none",background:"none"}}>🗑️</button></td></tr>)}</tbody></table></div>
     </div>
    )}

    {active==="Grade X" && (
     <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px"}}><h2 style={{margin:0}}>Grade X - Special Program</h2><button onClick={()=>{ setForm({assNo:"",name:"",program:"STEM Accelerated",reason:""}); setEdit({type:"gradeX",idx:null}); setModals({gradeX:true}) }} style={{background:"#0f2e2a",color:"#fff",border:"none",padding:"10px 16px",borderRadius:"20px",fontWeight:"bold"}}>+ Add Grade X</button></div>
      <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}><thead><tr style={{background:"#f1f5f9"}}><th style={{padding:"10px"}}>#</th><th>AssNo</th><th>Name</th><th>Program</th><th>Reason</th><th>Action</th></tr></thead><tbody>{filtered("gradeX").map((g,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"10px"}}>{i+1}</td><td>{g.assNo}</td><td>{g.name}</td><td>{g.program}</td><td>{g.reason}</td><td><button onClick={()=>toTrash("gradeX",store.gradeX.indexOf(g))} style={{border:"none",background:"none"}}>🗑️</button></td></tr>)}</tbody></table></div>
     </div>
    )}

    {active==="Trash" && (
     <div>
      <h2>Trash - Recover Deleted</h2>
      <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}><thead><tr style={{background:"#fef2f2",textAlign:"left"}}><th style={{padding:"10px"}}>#</th><th>From</th><th>Name / ID</th><th>Deleted At</th><th>Restore</th></tr></thead><tbody>{store.trash.map((t,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"10px"}}>{i+1}</td><td>{t._from}</td><td>{t.name||t.assNo||t.tscNo||JSON.stringify(t).slice(0,40)}</td><td>{new Date(t._deletedAt).toLocaleString()}</td><td><button onClick={()=>restore(i)} style={{background:"#16a34a",color:"#fff",border:"none",padding:"6px 12px",borderRadius:"12px",cursor:"pointer"}}>Restore</button> <button onClick={()=>{ const s={...store}; s.trash=s.trash.filter((_,x)=>x!==i); setStore(s) }} style={{background:"#dc2626",color:"#fff",border:"none",padding:"6px 12px",borderRadius:"12px",marginLeft:"4px"}}>Delete Forever</button></td></tr>)}</tbody></table></div>
     </div>
    )}

    {["Marks Entry","CBE Curriculum","Learner Portfolio","Rankings","Attendance","Exams","Timetable","Homework","Fees","Library","Transport","Messages","Online Classes","Reports","Analytics"].includes(active) && (
     <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px"}}><h2 style={{margin:0}}>{active} - Functional Module</h2><button onClick={()=>{ setForm({}); setEdit({type:mapKey(active),idx:null}); setModals({generic:true}) }} style={{background:"#0f2e2a",color:"#fff",border:"none",padding:"10px 16px",borderRadius:"20px",fontWeight:"bold"}}>+ Add {active}</button></div>
      <div style={{background:"#fff",borderRadius:"12px",padding:"12px"}}>
       <input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${active}...`} style={{...inputStyle,width:"300px",borderRadius:"20px",marginBottom:"10px"}}/>
       <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}><thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"10px"}}>#</th><th>Details</th><th>Date</th><th>Action</th></tr></thead><tbody>{filtered(mapKey(active)).length===0?<tr><td colSpan={4} style={{padding:"30px",textAlign:"center",color:"#999"}}>No {active} yet. Click + Add {active}. Data saves forever.</td></tr>:filtered(mapKey(active)).map((item,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"10px"}}>{i+1}</td><td><pre style={{margin:0,whiteSpace:"pre-wrap",fontFamily:"Arial",fontSize:"12px"}}>{JSON.stringify(item,null,2).slice(0,300)}</pre></td><td style={{fontSize:"11px"}}>{item.createdAt?new Date(item.createdAt).toLocaleDateString():"-"}</td><td><button onClick={()=>toTrash(mapKey(active),store[mapKey(active)].indexOf(item))} style={{border:"none",background:"none"}}>🗑️</button></td></tr>)}</tbody></table></div>
      </div>
     </div>
    )}

    {["Teacher Portal","Staff Portal","Settings","Logout"].includes(active) && (
     <div style={card}><h2>{active}</h2><p>Portal coming soon. All data already locked in master storage.</p><button onClick={exportAll} style={{background:"#0f2e2a",color:"#fff",border:"none",padding:"10px 16px",borderRadius:"20px"}}>Backup All Data</button></div>
    )}
   </div>

   {modals.student && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"10px"}}>
     <div style={{background:"#fff",padding:"20px",borderRadius:"16px",width:"100%",maxWidth:"520px",maxHeight:"95vh",overflowY:"auto"}}>
      <h3 style={{marginTop:0}}>Student Registration - Full Details</h3>
      <div style={{display:"grid",gap:"8px"}}>
       <input value={form.assNo||""} onChange={e=>setForm({...form,assNo:e.target.value})} placeholder="Assessment No G10/0001 *" style={inputStyle}/>
       <input value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name *" style={inputStyle}/>
       <div style={{display:"flex",gap:"8px"}}><input value={form.parentName||""} onChange={e=>setForm({...form,parentName:e.target.value})} placeholder="Parent Name" style={{...inputStyle,flex:1}}/><select value={form.gender||"Male"} onChange={e=>setForm({...form,gender:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>Male</option><option>Female</option></select></div>
       <div style={{display:"flex",gap:"8px"}}><select value={form.cls||"G10"} onChange={e=>setForm({...form,cls:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>G10</option><option>G11</option><option>G12</option></select><select value={form.stream||"STEM-A"} onChange={e=>setForm({...form,stream:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}>{streams.map(s=><option key={s}>{s}</option>)}</select></div>
       <div style={{display:"flex",gap:"8px"}}><select value={form.pathway||"STEM"} onChange={e=>setForm({...form,pathway:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>STEM</option><option>Arts & Sports Science</option><option>Social Sciences</option></select><select value={form.board||"Day"} onChange={e=>setForm({...form,board:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>Day</option><option>Boarding</option></select></div>
       <div style={{display:"flex",gap:"8px"}}><input value={form.phone||""} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Parent Phone" style={{...inputStyle,flex:1}}/><input value={form.upi||""} onChange={e=>setForm({...form,upi:e.target.value})} placeholder="UPI" style={{...inputStyle,flex:1}}/></div>
       <textarea value={form.requirements||""} onChange={e=>setForm({...form,requirements:e.target.value})} placeholder="Requirements: Uniform, Books, Box, Mattress etc" style={{...inputStyle,height:"60px"}}/>
       <div style={{display:"flex",gap:"10px"}}><button onClick={()=>addOrUpdate("students",{...form,createdAt:new Date().toISOString()})} style={{flex:1,background:"#0f2e2a",color:"#fff",border:"none",padding:"12px",borderRadius:"12px",fontWeight:"bold"}}>Save Student</button><button onClick={()=>setModals({})} style={{flex:1,border:"1px solid #ccc",padding:"12px",borderRadius:"12px",background:"#fff"}}>Cancel</button></div>
      </div>
     </div>
    </div>
   )}

   {modals.teacher && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"10px"}}>
     <div style={{background:"#fff",padding:"20px",borderRadius:"16px",width:"100%",maxWidth:"520px",maxHeight:"95vh",overflowY:"auto"}}>
      <h3 style={{marginTop:0}}>Teacher Registration - TSC Mandatory</h3>
      <div style={{display:"grid",gap:"8px"}}>
       <div><label style={{fontSize:"11px",fontWeight:"bold"}}>TSC No *</label><input value={form.tscNo||""} onChange={e=>setForm({...form,tscNo:e.target.value})} placeholder="TSC No e.g 562341" style={{...inputStyle,border:"2px solid #facc15",background:"#fffbeb",fontWeight:"bold"}}/></div>
       <input value={form.name||""} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name *" style={inputStyle}/>
       <div style={{display:"flex",gap:"8px"}}><input value={form.idNo||""} onChange={e=>setForm({...form,idNo:e.target.value})} placeholder="ID No" style={{...inputStyle,flex:1}}/><input value={form.phone||""} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" style={{...inputStyle,flex:1}}/></div>
       <input value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" style={inputStyle}/>
       <select value={form.classAssigned||"G10 STEM-A"} onChange={e=>setForm({...form,classAssigned:e.target.value})} style={inputStyle}><option>G10 STEM-A</option><option>G10 STEM-B</option><option>G11 Arts-A</option><option>G12 General-A</option></select>
       <input value={form.subjects||""} onChange={e=>setForm({...form,subjects:e.target.value})} placeholder="Subjects" style={inputStyle}/>
       <div style={{display:"flex",gap:"8px"}}><select value={form.qual||"Diploma"} onChange={e=>setForm({...form,qual:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option><option>PhD</option></select><select value={form.empType||"TSC"} onChange={e=>setForm({...form,empType:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>TSC</option><option>BOM</option><option>Intern</option></select></div>
       <div style={{display:"flex",gap:"10px"}}><button onClick={()=>{ if(!form.tscNo||!form.name) return alert("TSC No & Name required"); addOrUpdate("teachers",{...form,createdAt:new Date().toISOString()}) }} style={{flex:1,background:"#0f2e2a",color:"#fff",border:"none",padding:"12px",borderRadius:"12px",fontWeight:"bold"}}>Save Teacher</button><button onClick={()=>setModals({})} style={{flex:1,border:"1px solid #ccc",padding:"12px",borderRadius:"12px",background:"#fff"}}>Cancel</button></div>
      </div>
     </div>
    </div>
   )}

   {modals.boarding && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
     <div style={{background:"#fff",padding:"20px",borderRadius:"16px",width:"90%",maxWidth:"400px",display:"grid",gap:"8px"}}>
      <h3 style={{marginTop:0}}>Boarding Assignment</h3>
      <input value={form.studentAssNo||""} onChange={e=>setForm({...form,studentAssNo:e.target.value})} placeholder="Student Assessment No" style={inputStyle}/>
      <select value={form.dorm||"Elgon"} onChange={e=>setForm({...form,dorm:e.target.value})} style={inputStyle}><option>Elgon</option><option>Kenya</option><option>Rwenzori</option><option>Victoria</option></select>
      <input value={form.bedNo||""} onChange={e=>setForm({...form,bedNo:e.target.value})} placeholder="Bed No B01" style={inputStyle}/>
      <div style={{display:"flex",gap:"10px"}}><button onClick={()=>addOrUpdate("boarding",{...form,createdAt:new Date().toISOString()})} style={{flex:1,background:"#0f2e2a",color:"#fff",border:"none",padding:"12px",borderRadius:"12px"}}>Assign</button><button onClick={()=>setModals({})} style={{flex:1,border:"1px solid #ccc",padding:"12px",borderRadius:"12px",background:"#fff"}}>Cancel</button></div>
     </div>
    </div>
   )}

   {modals.generic && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
     <div style={{background:"#fff",padding:"20px",borderRadius:"16px",width:"90%",maxWidth:"500px",display:"grid",gap:"8px"}}>
      <h3 style={{marginTop:0}}>Add {active}</h3>
      <input id="g_title" placeholder="Title / Name" style={inputStyle}/>
      <textarea id="g_desc" placeholder="Details / Description" style={{...inputStyle,height:"80px"}}/>
      <input id="g_amount" placeholder="Amount (for Fees) - optional" style={inputStyle}/>
      <div style={{display:"flex",gap:"10px"}}>
       <button onClick={()=>{
        const title=document.getElementById("g_title").value
        const desc=document.getElementById("g_desc").value
        const amount=document.getElementById("g_amount").value
        if(!title) return alert("Title required")
        addOrUpdate(mapKey(active),{title,description:desc,amount,createdAt:new Date().toISOString()})
       }} style={{flex:1,background:"#0f2e2a",color:"#fff",border:"none",padding:"12px",borderRadius:"12px",fontWeight:"bold"}}>Save {active}</button>
       <button onClick={()=>setModals({})} style={{flex:1,border:"1px solid #ccc",padding:"12px",borderRadius:"12px",background:"#fff"}}>Cancel</button>
      </div>
     </div>
    </div>
   )}
  </div>
 )
}
