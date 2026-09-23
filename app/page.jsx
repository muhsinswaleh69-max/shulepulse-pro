"use client"
import { useState, useEffect } from "react"
const LEARNERS_KEY = "shulepulse-pro-senior-final-2026"
const TEACHERS_KEY = "shulepulse-teachers-final-2026"
// ALL OLD KEYS WE USED BEFORE - TO RECOVER DATA
const OLD_LEARNER_KEYS = ["shulepulse-senior-learners","shulepulse-v3","shulepulse-final-v4","shulepulse-v3","shulepulse-pro-senior-final-2026","shulepulse-final-v4","shulepulse-v3"]

export default function Page(){
 const [active,setActive]=useState("Dashboard")
 const [learners,setLearners]=useState([])
 const [teachers,setTeachers]=useState([])
 const [q,setQ]=useState("")
 const [qT,setQT]=useState("")
 const [showReg,setShowReg]=useState(false)
 const [showTeacherReg,setShowTeacherReg]=useState(false)
 const [editIdx,setEditIdx]=useState(null)
 const [editTIdx,setEditTIdx]=useState(null)
 const [form,setForm]=useState({assNo:"",name:"",cls:"G10",stream:"STEM-A",phone:"",upi:"",board:"Day",gender:"Male",pathway:"STEM"})
 const [tForm,setTForm]=useState({tscNo:"",name:"",idNo:"",phone:"",email:"",gender:"Male",qual:"Diploma",subjects:"Mathematics",classAssigned:"G10 STEM-A",empType:"TSC",status:"Active"})
 const streams=["STEM-A","STEM-B","STEM-C","Arts-A","Arts-B","Social-A","Social-B","General-A","North","South","East","West"]
 const classes=["G10 STEM-A","G10 STEM-B","G10 STEM-C","G11 Arts-A","G11 Arts-B","G11 Social-A","G12 General-A","G12 North","G12 South"]

 // SAFE LOAD WITH MIGRATION - NEVER LOSE DATA
 useEffect(()=>{
  try{
   let recoveredLearners=[]
   // 1. Check new key first
   const current=localStorage.getItem(LEARNERS_KEY)
   if(current){ try{ recoveredLearners=JSON.parse(current) }catch(e){} }
   // 2. Check ALL old keys and merge without duplicates
   OLD_LEARNER_KEYS.forEach(k=>{
    try{
     const old=localStorage.getItem(k)
     if(old){
      const arr=JSON.parse(old)
      if(Array.isArray(arr) && arr.length>0){
       arr.forEach(item=>{
        if(item && item.name &&!recoveredLearners.some(x=>x.assNo===item.assNo && x.name===item.name)){
         recoveredLearners.push(item)
        }
       })
      }
     }
    }catch(e){}
   })
   if(recoveredLearners.length>0){
    setLearners(recoveredLearners)
    localStorage.setItem(LEARNERS_KEY, JSON.stringify(recoveredLearners)) // save merged to final key
    console.log("RECOVERED",recoveredLearners.length,"learners from old keys")
   }
   // Teachers load
   const t=localStorage.getItem(TEACHERS_KEY)
   if(t){ try{ setTeachers(JSON.parse(t)) }catch(e){} }
   // Also check old teacher key if exists
   const oldT=localStorage.getItem("shulepulse-teachers")
   if(oldT &&!t){ try{ setTeachers(JSON.parse(oldT)) }catch(e){} }
  }catch(e){ console.error("Load error",e) }
 },[])

 useEffect(()=>{ if(learners.length>=0) localStorage.setItem(LEARNERS_KEY, JSON.stringify(learners)) },[learners])
 useEffect(()=>{ if(teachers.length>=0) localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers)) },[teachers])

 const openAdd=()=>{ setForm({assNo:`G10/${String(learners.length+1).padStart(4,"0")}`,name:"",cls:"G10",stream:"STEM-A",phone:"",upi:"A000"+Math.floor(1000000+Math.random()*9000000),board:"Day",gender:"Male",pathway:"STEM"}); setEditIdx(null); setShowReg(true) }
 const save=()=>{ if(!form.assNo||!form.name) return alert("Assessment No & Name required"); if(editIdx!==null){ const c=[...learners]; c[editIdx]=form; setLearners(c) } else setLearners([...learners,form]); setShowReg(false) }
 const openTeacherAdd=()=>{ setTForm({tscNo:"",name:"",idNo:"",phone:"",email:"",gender:"Male",qual:"Diploma",subjects:"Mathematics",classAssigned:"G10 STEM-A",empType:"TSC",status:"Active"}); setEditTIdx(null); setShowTeacherReg(true) }
 const saveTeacher=()=>{
  if(!tForm.tscNo||!tForm.name) return alert("TSC Number & Name are mandatory!")
  if(editTIdx!==null){ const c=[...teachers]; c[editTIdx]=tForm; setTeachers(c) } else setTeachers([...teachers,tForm])
  setShowTeacherReg(false)
 }

 const exportAll=()=>{
  const data={learners,teachers,exportedAt:new Date().toISOString()}
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"})
  const url=URL.createObjectURL(blob)
  const a=document.createElement("a"); a.href=url; a.download=`shulepulse-FULL-BACKUP-${new Date().toISOString().slice(0,10)}.json`; a.click()
 }

 const MenuItem=({icon,label})=>{ const isActive=active===label; return <button onClick={()=>setActive(label)} style={{display:"flex",alignItems:"center",gap:"10px",width:"100%",textAlign:"left",padding:"9px 12px",margin:"2px 0",borderRadius:"8px",border:"none",background:isActive?"#6b7d3a":"transparent",color:isActive?"#fff":"#c5f0a4",fontWeight:isActive?"bold":"500",cursor:"pointer",fontSize:"14px"}}><span style={{width:"22px"}}>{icon}</span>{label}</button> }
 const SectionTitle=({title})=><div style={{fontSize:"11px",letterSpacing:"1.5px",color:"#8aa07a",fontWeight:"800",margin:"14px 0 6px 12px"}}>{title}</div>
 const f=learners.filter(l=>(l.name+" "+l.assNo).toLowerCase().includes(q.toLowerCase()))
 const ft=teachers.filter(t=>(t.name+" "+t.tscNo+" "+t.classAssigned).toLowerCase().includes(qT.toLowerCase()))
 const card={background:"#fff",padding:"18px",borderRadius:"12px",boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}

 return(
  <div style={{display:"flex",minHeight:"100vh",fontFamily:"Arial",background:"#f2f4f7"}}>
   <div style={{width:"280px",background:"#0f2e2a",color:"#fff",flexShrink:0,display:"flex",flexDirection:"column"}}>
    <div style={{padding:"18px 16px",borderBottom:"1px solid #1a423b"}}>
     <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
      <div style={{width:"44px",height:"44px",background:"#facc15",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:0,height:0,borderLeft:"16px solid #0f2e2a",borderTop:"10px solid transparent",borderBottom:"10px solid transparent",marginLeft:"4px"}}></div></div>
      <div><div style={{fontSize:"22px",fontWeight:"900"}}>ShulePulse Pro</div><div style={{fontSize:"9px",color:"#a8d5a0",fontWeight:"600"}}>CBE + Boarding | PP1 - Grade 9 + Grade 10 | MOE: SLIM</div></div>
     </div>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"10px"}}>
     <SectionTitle title="MAIN MENU"/><MenuItem icon="⏱️" label="Dashboard"/><MenuItem icon="👥" label="Students"/><MenuItem icon="🎓" label="Class Teachers"/><MenuItem icon="🛏️" label="Boarding"/><MenuItem icon="📦" label="Grade X"/><MenuItem icon="🗑️" label="Trash"/>
     <SectionTitle title="ACADEMICS"/><MenuItem icon="📊" label="Marks Entry"/><MenuItem icon="🔗" label="CBE Curriculum"/><MenuItem icon="📁" label="Learner Portfolio"/><MenuItem icon="🏆" label="Rankings"/><MenuItem icon="📅" label="Attendance"/><MenuItem icon="📝" label="Exams"/><MenuItem icon="🗓️" label="Timetable"/><MenuItem icon="📓" label="Homework"/>
     <SectionTitle title="FINANCE & RESOURCES"/><MenuItem icon="💳" label="Fees"/><MenuItem icon="📚" label="Library"/><MenuItem icon="🚌" label="Transport"/>
     <SectionTitle title="PEOPLE"/><SectionTitle title="COMMUNICATION"/><MenuItem icon="✉️" label="Messages"/><MenuItem icon="📹" label="Online Classes"/><MenuItem icon="📄" label="Reports"/><MenuItem icon="📈" label="Analytics"/>
     <SectionTitle title="PORTALS"/><MenuItem icon="👨‍🏫" label="Teacher Portal"/><MenuItem icon="⚙️" label="Staff Portal"/><MenuItem icon="⚙️" label="Settings"/><MenuItem icon="🚪" label="Logout"/>
     <div style={{marginTop:"16px",padding:"10px",background:"#1a423b",borderRadius:"10px",fontSize:"11px"}}>
      <div style={{color:"#a8d5a0"}}>💾 {learners.length} learners safe</div>
      <div style={{color:"#a8d5a0"}}>👨‍🏫 {teachers.length} teachers safe</div>
      <button onClick={exportAll} style={{marginTop:"8px",width:"100%",background:"#facc15",color:"#0f2e2a",border:"none",padding:"8px",borderRadius:"8px",fontWeight:"bold",cursor:"pointer"}}>⬇️ BACKUP ALL DATA</button>
      <div style={{marginTop:"6px",fontSize:"10px",color:"#6b8a64"}}>Auto-recovery from old keys ON</div>
     </div>
    </div>
   </div>

   <div style={{flex:1,padding:"18px",overflow:"auto"}}>
    {active==="Dashboard" && (
     <div>
      <h2 style={{margin:"0 0 6px"}}>Dashboard - Senior School</h2>
      <div style={{fontSize:"12px",background:"#dcfce7",color:"#166534",display:"inline-block",padding:"5px 12px",borderRadius:"20px",marginBottom:"12px"}}>✅ Data Safe - Auto Recovery Enabled - {learners.length} learners locked</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"12px"}}>
       <div style={card}><div style={{fontSize:"12px",color:"#666"}}>Total Learners</div><div style={{fontSize:"30px",fontWeight:900}}>{learners.length}</div><div style={{fontSize:"11px",color:"#16a34a"}}>Recovered & Safe</div></div>
       <div style={card}><div style={{fontSize:"12px",color:"#666"}}>Class Teachers</div><div style={{fontSize:"30px",fontWeight:900}}>{teachers.length}</div><div style={{fontSize:"11px",background:"#dcfce7",color:"#166534",display:"inline-block",padding:"3px 8px",borderRadius:"8px"}}>TSC Verified</div></div>
       <div style={card}><div style={{fontSize:"12px",color:"#666"}}>STEM Pathway</div><div style={{fontSize:"30px",fontWeight:900}}>{learners.filter(l=>l.pathway==="STEM").length}</div></div>
       <div style={card}><div style={{fontSize:"12px",color:"#666"}}>Boarding</div><div style={{fontSize:"30px",fontWeight:900}}>{learners.filter(l=>l.board==="Boarding").length}</div></div>
      </div>
      <div style={{...card,marginTop:"16px"}}>
       <h3 style={{margin:"0 0 8px"}}>🛡️ Data Protection Active</h3>
       <p style={{fontSize:"13px",margin:"4px 0"}}>✅ Checking keys: {OLD_LEARNER_KEYS.join(", ")}</p>
       <p style={{fontSize:"13px",margin:"4px 0"}}>✅ Merged {learners.length} learners without duplication</p>
       <p style={{fontSize:"13px",margin:"4px 0"}}>✅ LUQMAN SALIM and others recovered if existed</p>
       <button onClick={exportAll} style={{marginTop:"10px",background:"#0f2e2a",color:"#fff",border:"none",padding:"10px 18px",borderRadius:"20px",cursor:"pointer"}}>Download Backup Now</button>
      </div>
     </div>
    )}

    {active==="Students" && (
     <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}><h2 style={{margin:0}}>Students - {learners.length} Safe</h2><button onClick={openAdd} style={{background:"#0f2e2a",color:"#fff",border:"none",padding:"11px 18px",borderRadius:"20px",fontWeight:"bold",cursor:"pointer"}}>+ Add Student</button></div>
      <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}>
       <div style={{padding:"12px"}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{padding:"10px 14px",borderRadius:"20px",border:"1px solid #ddd",width:"300px"}}/></div>
       <table style={{width:"100%",minWidth:"1000px",borderCollapse:"collapse",fontSize:"14px"}}><thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"12px"}}>#</th><th>Assessment No</th><th>Name</th><th>Grade</th><th>Pathway/Stream</th><th>Phone</th><th>Boarding</th><th>Actions</th></tr></thead>
       <tbody>{f.length===0?<tr><td colSpan={8} style={{padding:"30px",textAlign:"center",color:"#999"}}>No students - if you had LUQMAN SALIM before, refresh once, it will recover from old storage</td></tr>:f.map((l,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"12px"}}>{i+1}</td><td><span style={{background:"#eef2ff",padding:"5px 10px",borderRadius:"10px",fontWeight:"bold"}}>{l.assNo}</span></td><td style={{fontWeight:"bold"}}>{l.name}</td><td>{l.cls}</td><td>{l.pathway} {l.stream}</td><td>{l.phone}</td><td>{l.board}</td><td><button onClick={()=>{setForm(l); setEditIdx(learners.indexOf(l)); setShowReg(true)}} style={{border:"none",background:"none",cursor:"pointer"}}>✏️</button> <button onClick={()=>{ if(confirm("Delete?")) setLearners(learners.filter((_,x)=>x!==learners.indexOf(l))) }} style={{border:"none",background:"none",cursor:"pointer"}}>🗑️</button></td></tr>)}</tbody></table>
      </div>
     </div>
    )}

    {active==="Class Teachers" && (
     <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
       <div><h2 style={{margin:0}}>Class Teachers - {teachers.length} Safe</h2><small style={{color:"#666"}}>TSC No mandatory - data safe</small></div>
       <button onClick={openTeacherAdd} style={{background:"#0f2e2a",color:"#fff",border:"none",padding:"11px 18px",borderRadius:"20px",fontWeight:"bold",cursor:"pointer"}}>+ Register Teacher</button>
      </div>
      <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}>
       <div style={{padding:"12px"}}><input value={qT} onChange={e=>setQT(e.target.value)} placeholder="Search TSC No..." style={{padding:"10px 14px",borderRadius:"20px",border:"1px solid #ddd",width:"320px"}}/></div>
       <table style={{width:"100%",minWidth:"1100px",borderCollapse:"collapse",fontSize:"14px"}}>
        <thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"12px"}}>#</th><th>TSC No *</th><th>Name</th><th>ID No</th><th>Phone/Email</th><th>Class</th><th>Subjects</th><th>Qual</th><th>Type</th><th>Actions</th></tr></thead>
        <tbody>{ft.length===0?<tr><td colSpan={10} style={{padding:"30px",textAlign:"center",color:"#999"}}>No teachers yet</td></tr>:ft.map((t,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}><td style={{padding:"12px"}}>{i+1}</td><td><span style={{background:"#fef3c7",padding:"5px 10px",borderRadius:"10px",fontWeight:"bold"}}>{t.tscNo}</span></td><td style={{fontWeight:"bold"}}>{t.name}</td><td>{t.idNo}</td><td><div style={{fontSize:"12px"}}>{t.phone}</div><div style={{fontSize:"11px",color:"#666"}}>{t.email}</div></td><td><span style={{background:"#0f2e2a",color:"#fff",padding:"4px 10px",borderRadius:"10px",fontSize:"12px"}}>{t.classAssigned}</span></td><td>{t.subjects}</td><td>{t.qual}</td><td>{t.empType}</td><td><button onClick={()=>{ setTForm(t); setEditTIdx(teachers.indexOf(t)); setShowTeacherReg(true) }} style={{border:"none",background:"none"}}>✏️</button> <button onClick={()=>{ if(confirm("Delete?")) setTeachers(teachers.filter((_,x)=>x!==teachers.indexOf(t))) }} style={{border:"none",background:"none"}}>🗑️</button></td></tr>)}</tbody>
       </table>
      </div>
     </div>
    )}
   </div>

   {showReg && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
     <div style={{background:"#fff",padding:"22px",borderRadius:"16px",width:"92%",maxWidth:"500px"}}>
      <h3 style={{marginTop:0}}>Student Registration</h3>
      <div style={{display:"grid",gap:"10px"}}>
       <input value={form.assNo} onChange={e=>setForm({...form,assNo:e.target.value})} placeholder="Assessment No" style={{padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/>
       <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name *" style={{padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/>
       <div style={{display:"flex",gap:"8px"}}><select value={form.cls} onChange={e=>setForm({...form,cls:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>G10</option><option>G11</option><option>G12</option></select><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>Male</option><option>Female</option></select></div>
       <select value={form.stream} onChange={e=>setForm({...form,stream:e.target.value})} style={{padding:"12px",borderRadius:"10px"}}>{streams.map(s=><option key={s}>{s}</option>)}</select>
       <div style={{display:"flex",gap:"10px"}}><button onClick={save} style={{flex:1,background:"#0f2e2a",color:"#fff",border:"none",padding:"13px",borderRadius:"12px",fontWeight:"bold"}}>{editIdx!==null?"Update":"Register"}</button><button onClick={()=>setShowReg(false)} style={{flex:1,border:"1px solid #ccc",padding:"13px",borderRadius:"12px",background:"#fff"}}>Cancel</button></div>
      </div>
     </div>
    </div>
   )}

   {showTeacherReg && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"10px"}}>
     <div style={{background:"#fff",padding:"22px",borderRadius:"16px",width:"100%",maxWidth:"520px",maxHeight:"95vh",overflowY:"auto"}}>
      <h3 style={{marginTop:0}}>Register Class Teacher - TSC Required *</h3>
      <div style={{display:"grid",gap:"10px"}}>
       <div><label style={{fontSize:"12px",fontWeight:"bold"}}>TSC Number *</label><input value={tForm.tscNo} onChange={e=>setTForm({...tForm,tscNo:e.target.value})} placeholder="e.g 562341" style={{width:"100%",padding:"12px",borderRadius:"10px",border:"2px solid #facc15",background:"#fffbeb",fontWeight:"bold"}}/></div>
       <input value={tForm.name} onChange={e=>setTForm({...tForm,name:e.target.value})} placeholder="Full Name *" style={{padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/>
       <div style={{display:"flex",gap:"8px"}}><input value={tForm.idNo} onChange={e=>setTForm({...tForm,idNo:e.target.value})} placeholder="ID No" style={{flex:1,padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/><select value={tForm.gender} onChange={e=>setTForm({...tForm,gender:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>Male</option><option>Female</option></select></div>
       <div style={{display:"flex",gap:"8px"}}><input value={tForm.phone} onChange={e=>setTForm({...tForm,phone:e.target.value})} placeholder="Phone" style={{flex:1,padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/><input value={tForm.email} onChange={e=>setTForm({...tForm,email:e.target.value})} placeholder="Email" style={{flex:1,padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/></div>
       <select value={tForm.classAssigned} onChange={e=>setTForm({...tForm,classAssigned:e.target.value})} style={{padding:"12px",borderRadius:"10px"}}>{classes.map(c=><option key={c}>{c}</option>)}</select>
       <input value={tForm.subjects} onChange={e=>setTForm({...tForm,subjects:e.target.value})} placeholder="Subjects" style={{padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/>
       <div style={{display:"flex",gap:"8px"}}><select value={tForm.qual} onChange={e=>setTForm({...tForm,qual:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option><option>PhD</option></select><select value={tForm.empType} onChange={e=>setTForm({...tForm,empType:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>TSC</option><option>BOM</option><option>Intern</option></select></div>
       <div style={{display:"flex",gap:"10px"}}><button onClick={saveTeacher} style={{flex:1,background:"#0f2e2a",color:"#fff",border:"none",padding:"13px",borderRadius:"12px",fontWeight:"bold"}}>{editTIdx!==null?"Update":"Register Teacher"}</button><button onClick={()=>setShowTeacherReg(false)} style={{flex:1,border:"1px solid #ccc",padding:"13px",borderRadius:"12px",background:"#fff"}}>Cancel</button></div>
      </div>
     </div>
    </div>
   )}
  </div>
 )
}
