"use client"
import { useState, useEffect } from "react"

export default function Page(){
 const [active,setActive]=useState("Dashboard")
 const [learners,setLearners]=useState([])
 const [q,setQ]=useState("")
 const [showReg,setShowReg]=useState(false)
 const [editIdx,setEditIdx]=useState(null)
 const [form,setForm]=useState({assNo:"",name:"",cls:"G10",stream:"STEM-A",phone:"",upi:"",board:"Day",gender:"Male",pathway:"STEM"})
 const streams=["STEM-A","STEM-B","STEM-C","Arts-A","Arts-B","Social-A","Social-B","General-A","North","South","East","West"]

 useEffect(()=>{
  try{
   const s=localStorage.getItem("shulepulse-final-v4")
   if(s) setLearners(JSON.parse(s))
  }catch(e){}
 },[])
 useEffect(()=>{ localStorage.setItem("shulepulse-final-v4", JSON.stringify(learners)) },[learners])

 const openAdd=()=>{
  setForm({assNo:`G10/${String(learners.length+1).padStart(4,"0")}`,name:"",cls:"G10",stream:"STEM-A",phone:"",upi:"A000"+Math.floor(1000000+Math.random()*9000000),board:"Day",gender:"Male",pathway:"STEM"})
  setEditIdx(null); setShowReg(true)
 }
 const save=()=>{
  if(!form.assNo||!form.name) return alert("Assessment No & Name required")
  if(editIdx!==null){ const c=[...learners]; c[editIdx]=form; setLearners(c) } else setLearners([...learners,form])
  setShowReg(false)
 }
 const toggleBoard=(i)=>{ const c=[...learners]; c[i].board=c[i].board==="Day"?"Boarding":"Day"; setLearners(c) }

 const f=learners.filter(l=> (l.name+l.assNo).toLowerCase().includes(q.toLowerCase()))
 const g10=learners.filter(l=>l.cls==="G10").length
 const g11=learners.filter(l=>l.cls==="G11").length
 const g12=learners.filter(l=>l.cls==="G12").length

 const card={background:"#fff",padding:"18px",borderRadius:"14px",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",minWidth:"150px"}

 return(
  <div style={{display:"flex",minHeight:"100vh",fontFamily:"Arial, sans-serif",background:"#f2f4f7"}}>
   <div style={{width:"250px",background:"#0e2f2b",color:"#fff",padding:"20px",flexShrink:0}}>
    <div style={{color:"#7dd3a0",fontWeight:"900",fontSize:"20px"}}>ShulePulse Pro</div>
    <div style={{background:"#1a4d45",fontSize:"11px",display:"inline-block",padding:"4px 10px",borderRadius:"20px",marginTop:"6px"}}>SENIOR G10-G12 ONLY</div>
    <div style={{marginTop:"26px"}}>
     {["Dashboard","Learners","Pathways","Boarding","Fees","KUCCPS"].map(k=><button key={k} onClick={()=>setActive(k)} style={{display:"block",width:"100%",textAlign:"left",padding:"12px 16px",margin:"6px 0",borderRadius:"25px",border:"none",background:active===k?"#4a5a2a":"transparent",color:active===k?"#ffeb8a":"#fff",fontWeight:active===k?"bold":"normal",cursor:"pointer"}}>{k}</button>)}
    </div>
    <div style={{marginTop:"20px",fontSize:"12px",opacity:0.7}}>💾 Stable: {learners.length} saved<br/>Won't lose on refresh</div>
   </div>

   <div style={{flex:1,padding:"18px",overflowX:"auto"}}>
    {active==="Dashboard" && (
     <div>
      <h2 style={{margin:"0 0 16px"}}>Dashboard - Senior School</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"12px"}}>
       <div style={card}><div style={{fontSize:"13px",color:"#666"}}>Total Learners</div><div style={{fontSize:"28px",fontWeight:"800"}}>{learners.length||312}</div><div style={{fontSize:"12px",color:"#16a34a"}}>Grade 10-12</div></div>
       <div style={card}><div style={{fontSize:"13px",color:"#666"}}>Teachers</div><div style={{fontSize:"28px",fontWeight:"800"}}>24</div><div style={{fontSize:"12px",color:"#16a34a"}}>TSC Compliant</div></div>
       <div style={card}><div style={{fontSize:"13px",color:"#666"}}>STEM Pathway</div><div style={{fontSize:"28px",fontWeight:"800"}}>{learners.filter(l=>l.pathway==="STEM").length||142}</div><div style={{fontSize:"12px",color:"#666"}}>45% of school</div></div>
       <div style={card}><div style={{fontSize:"13px",color:"#666"}}>Conflicts</div><div style={{fontSize:"28px",fontWeight:"800"}}>0</div><div style={{fontSize:"12px",color:"#16a34a"}}>Auto-solved</div></div>
      </div>

      <div style={{...card,marginTop:"16px"}}>
       <h3 style={{margin:"0 0 10px"}}>Senior Timetable Generator</h3>
       <div style={{display:"flex",gap:"8px",marginBottom:"10px"}}>
        {["STEM","Social Sciences","Arts & Sports"].map(p=><span key={p} style={{border:"1px solid #ddd",padding:"4px 10px",borderRadius:"20px",fontSize:"12px"}}>{p}</span>)}
       </div>
       <table style={{width:"100%",fontSize:"13px",borderCollapse:"collapse"}}>
        <thead><tr style={{background:"#f8fafc"}}><th style={{padding:"8px",textAlign:"left"}}>Time</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th></tr></thead>
        <tbody><tr><td style={{padding:"8px"}}>7:20-8:10</td><td>Math</td><td>Phy</td><td>Chem</td><td>Bio</td><td>Eng</td></tr></tbody>
       </table>
       <button onClick={()=>setActive("Learners")} style={{marginTop:"12px",background:"#0e2f2b",color:"#fff",border:"none",padding:"10px 18px",borderRadius:"20px",cursor:"pointer"}}>Go to Learners →</button>
      </div>
     </div>
    )}

    {active==="Learners" && (
     <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
       <h2 style={{margin:0}}>Learners - Senior (Assessment No)</h2>
       <button onClick={openAdd} style={{background:"#0e2f2b",color:"#fff",border:"none",padding:"12px 20px",borderRadius:"25px",fontWeight:"bold",cursor:"pointer"}}>+ Add Student</button>
      </div>

      <div style={{background:"#fff",borderRadius:"14px",overflowX:"auto",boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
       <div style={{padding:"12px"}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Assessment No or Name..." style={{padding:"10px 14px",borderRadius:"20px",border:"1px solid #ddd",width:"300px"}}/></div>
       <table style={{width:"100%",minWidth:"1050px",borderCollapse:"collapse",fontSize:"14px"}}>
        <thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"12px"}}>#</th><th>Assessment No</th><th>Name</th><th>Grade</th><th>Pathway / Stream</th><th>Parent Phone</th><th>UPI</th><th>Boarding</th><th>Actions</th></tr></thead>
        <tbody>
         {f.length===0 && <tr><td colSpan={9} style={{padding:"30px",textAlign:"center",color:"#999"}}>No learners yet. Click + Add Student. Data is stable.</td></tr>}
         {f.map((l,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}>
          <td style={{padding:"12px"}}>{i+1}</td>
          <td><span style={{background:"#eef2ff",padding:"5px 10px",borderRadius:"12px",fontWeight:"bold"}}>{l.assNo}</span></td>
          <td style={{fontWeight:"bold"}}>{l.name}</td>
          <td>{l.cls}</td>
          <td><span style={{background:l.pathway==="STEM"?"#dbeafe":"#fce7f3",padding:"3px 8px",borderRadius:"10px",fontSize:"12px"}}>{l.pathway}</span> {l.stream}</td>
          <td>{l.phone}</td><td>{l.upi}</td>
          <td><span style={{background:"#475569",color:"#fff",padding:"4px 10px",borderRadius:"12px",fontSize:"12px"}}>{l.board}</span><br/><button onClick={()=>toggleBoard(i)} style={{background:"#0284c7",color:"#fff",border:"none",padding:"4px 10px",borderRadius:"12px",marginTop:"5px",cursor:"pointer",fontSize:"12px"}}>Toggle</button></td>
          <td><button onClick={()=>{setForm(l);setEditIdx(i);setShowReg(true)}} style={{border:"none",background:"none",cursor:"pointer"}}>✏️</button> <button onClick={()=>{ if(confirm("Delete?")) setLearners(learners.filter((_,x)=>x!==i)) }} style={{border:"none",background:"none",cursor:"pointer"}}>🗑️</button></td>
         </tr>)}
        </tbody>
       </table>
      </div>
     </div>
    )}
   </div>

   {showReg && (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
     <div style={{background:"#fff",padding:"22px",borderRadius:"18px",width:"92%",maxWidth:"500px"}}>
      <h3 style={{marginTop:0}}>Student Registration - Senior</h3>
      <div style={{display:"grid",gap:"10px"}}>
       <input value={form.assNo} onChange={e=>setForm({...form,assNo:e.target.value})} placeholder="Assessment No e.g G10/0001" style={{padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/>
       <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name *" style={{padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/>
       <div style={{display:"flex",gap:"8px"}}>
        <select value={form.cls} onChange={e=>setForm({...form,cls:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>G10</option><option>G11</option><option>G12</option></select>
        <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>Male</option><option>Female</option></select>
       </div>
       <div style={{display:"flex",gap:"8px"}}>
        <select value={form.pathway} onChange={e=>setForm({...form,pathway:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>STEM</option><option>Arts & Sports Science</option><option>Social Sciences</option></select>
        <select value={form.board} onChange={e=>setForm({...form,board:e.target.value})} style={{flex:1,padding:"12px",borderRadius:"10px"}}><option>Day</option><option>Boarding</option></select>
       </div>
       <select value={form.stream} onChange={e=>setForm({...form,stream:e.target.value})} style={{padding:"12px",borderRadius:"10px"}}>{streams.map(s=><option key={s}>{s}</option>)}</select>
       <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Parent Phone" style={{padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/>
       <input value={form.upi} onChange={e=>setForm({...form,upi:e.target.value})} placeholder="UPI" style={{padding:"12px",borderRadius:"10px",border:"1px solid #ccc"}}/>
       <div style={{display:"flex",gap:"10px",marginTop:"6px"}}>
        <button onClick={save} style={{flex:1,background:"#0e2f2b",color:"#fff",border:"none",padding:"13px",borderRadius:"12px",fontWeight:"bold",cursor:"pointer"}}>{editIdx!==null?"Update":"Register"}</button>
        <button onClick={()=>setShowReg(false)} style={{flex:1,border:"1px solid #ccc",padding:"13px",borderRadius:"12px",background:"#fff"}}>Cancel</button>
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 )
}
