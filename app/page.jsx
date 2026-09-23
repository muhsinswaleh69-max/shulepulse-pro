"use client"
import { useState } from "react"

export default function Page(){
 const [learners,setLearners]=useState([])
 const [q,setQ]=useState("")
 const [showReg,setShowReg]=useState(false)
 const [editIdx,setEditIdx]=useState(null)
 const [form,setForm]=useState({assNo:"",name:"",cls:"G10",stream:"STEM",phone:"",upi:"",avg:"",board:"Day",gender:"Male",pathway:"STEM"})

 const openAdd=()=>{
  const newNo = "G10/"+String(learners.length+1).padStart(4,"0")
  setForm({assNo:newNo,name:"",cls:"G10",stream:"STEM-A",phone:"",upi:"A000"+Math.floor(1000000+Math.random()*9000000),avg:"",board:"Day",gender:"Male",pathway:"STEM"});
  setEditIdx(null); setShowReg(true)
 }
 const save=()=>{
  if(!form.assNo||!form.name) return alert("Assessment No & Name required")
  if(editIdx!==null){ const c=[...learners]; c[editIdx]=form; setLearners(c) }
  else { setLearners([...learners,form]) }
  setShowReg(false); setEditIdx(null)
 }
 const toggleBoard=(i)=>{ const c=[...learners]; c[i].board=c[i].board==="Day"?"Boarding":"Day"; setLearners(c) }
 const del=(i)=>{ if(confirm("Delete this learner?")) setLearners(learners.filter((_,x)=>x!==i)) }
 const edit=(i)=>{ setForm(learners[i]); setEditIdx(i); setShowReg(true) }
 const printOne=(l)=>{ const w=window.open(""); w.document.write(`<h2>ShulePulse Pro - Senior</h2><p>Assessment No: ${l.assNo}</p><p>Name: ${l.name}</p><p>Grade: ${l.cls} Pathway: ${l.pathway} Stream: ${l.stream}</p><p>Parent: ${l.phone} UPI: ${l.upi}</p><p>Avg: ${l.avg}% Boarding: ${l.board}</p>`); w.print() }

 const f=learners.filter(l=>l.name.toLowerCase().includes(q.toLowerCase())||l.assNo.toLowerCase().includes(q.toLowerCase()))

 return(
  <div style={{display:"flex",minHeight:"100vh",fontFamily:"sans-serif",background:"#f6f7f9"}}>
   <div style={{width:"260px",background:"#0e2f2b",color:"#fff",padding:"16px"}}>
    <h2 style={{margin:"0 0 4px",color:"#7dd3a0"}}>ShulePulse Pro</h2>
    <span style={{background:"#1a4d45",padding:"4px 10px",borderRadius:"10px",fontSize:"11px"}}>SENIOR SCHOOL G10-G12 ONLY</span>
    <p style={{fontSize:"11px",marginTop:"10px",opacity:0.8}}>CBE Pathways: STEM / Arts / Social Science</p>
    <div style={{marginTop:"20px"}}>{["Dashboard","Learners","Pathways","Boarding","Fees","KUCCPS"].map(m=><button key={m} onClick={()=>{}} style={{display:"block",width:"100%",textAlign:"left",padding:"12px",margin:"6px 0",borderRadius:"20px",border:"none",background:m==="Learners"?"#4a5a2a":"transparent",color:"#fff",cursor:"pointer",fontWeight:m==="Learners"?"bold":"normal"}}>{m}</button>)}</div>
   </div>

   <div style={{flex:1,padding:"12px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
     <div><h2 style={{margin:0}}>Learners - Senior</h2><small>G10-G12 Only | Assessment No System</small></div>
     <button onClick={openAdd} style={{background:"#0e2f2b",color:"#fff",border:"none",padding:"11px 20px",borderRadius:"20px",cursor:"pointer",fontWeight:"bold"}}>+ Add Student</button>
    </div>

    {showReg && (
     <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:50}}>
      <div style={{background:"#fff",padding:"20px",borderRadius:"16px",width:"92%",maxWidth:"520px"}}>
       <h3 style={{marginTop:0}}>ShulePulse Pro - Student Registration (Senior)</h3>
       <div style={{display:"grid",gap:"10px"}}>
        <input placeholder="Assessment Number * e.g G10/0001" value={form.assNo} onChange={e=>setForm({...form,assNo:e.target.value})} style={{padding:"11px",borderRadius:"10px",border:"1px solid #ccc"}}/>
        <input placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{padding:"11px",borderRadius:"10px",border:"1px solid #ccc"}}/>
        <div style={{display:"flex",gap:"8px"}}>
         <select value={form.cls} onChange={e=>setForm({...form,cls:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>G10</option><option>G11</option><option>G12</option></select>
         <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>Male</option><option>Female</option></select>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
         <select value={form.pathway} onChange={e=>setForm({...form,pathway:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>STEM</option><option>Arts & Sports Science</option><option>Social Sciences</option></select>
         <select value={form.board} onChange={e=>setForm({...form,board:e.target.value})} style={{flex:1,padding:"11px",borderRadius:"10px"}}><option>Day</option><option>Boarding</option></select>
        </div>
        <input placeholder="Stream e.g STEM-A" value={form.stream} onChange={e=>setForm({...form,stream:e.target.value})} style={{padding:"11px",borderRadius:"10px",border:"1px solid #ccc"}}/>
        <input placeholder="Parent Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{padding:"11px",borderRadius:"10px",border:"1px solid #ccc"}}/>
        <input placeholder="UPI Number" value={form.upi} onChange={e=>setForm({...form,upi:e.target.value})} style={{padding:"11px",borderRadius:"10px",border:"1px solid #ccc"}}/>
        <input placeholder="Avg% (e.g 68.5)" type="number" value={form.avg} onChange={e=>setForm({...form,avg:e.target.value})} style={{padding:"11px",borderRadius:"10px",border:"1px solid #ccc"}}/>
        <div style={{display:"flex",gap:"10px"}}>
         <button onClick={save} style={{flex:1,background:"#0e2f2b",color:"#fff",border:"none",padding:"12px",borderRadius:"10px",fontWeight:"bold",cursor:"pointer"}}>{editIdx!==null?"Update Learner":"Register Student"}</button>
         <button onClick={()=>setShowReg(false)} style={{flex:1,padding:"12px",borderRadius:"10px",border:"1px solid #ccc",background:"#fff"}}>Cancel</button>
        </div>
       </div>
      </div>
     </div>
    )}

    <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}>
     <input placeholder="Search name or Assessment No..." value={q} onChange={e=>setQ(e.target.value)} style={{margin:"10px",padding:"10px",width:"280px",borderRadius:"20px",border:"1px solid #ddd"}}/>
     <table style={{width:"100%",minWidth:"1150px",borderCollapse:"collapse",fontSize:"14px"}}>
      <thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"12px"}}>#</th><th>Assessment No</th><th>Name</th><th>Grade</th><th>Pathway / Stream</th><th>Parent Phone</th><th>UPI</th><th>Avg%</th><th>Boarding</th><th>Actions</th></tr></thead>
      <tbody>
       {f.length===0 && <tr><td colSpan={10} style={{padding:"30px",textAlign:"center",color:"#888"}}>No Senior learners yet. Click <b>+ Add Student</b> to register G10-G12 learners with Assessment Number.</td></tr>}
       {f.map((l,i)=><tr key={i} style={{borderBottom:"1px solid #eee"}}>
        <td style={{padding:"12px"}}>{i+1}</td>
        <td><span style={{background:"#eef2ff",padding:"4px 10px",borderRadius:"12px",fontWeight:"bold"}}>{l.assNo}</span></td>
        <td style={{fontWeight:"bold"}}>{l.name}</td>
        <td>{l.cls}</td><td><span style={{fontSize:"12px",background:l.pathway==="STEM"?"#dbeafe":l.pathway==="Arts & Sports Science"?"#fce7f3":"#dcfce7",padding:"3px 8px",borderRadius:"10px"}}>{l.pathway}</span> {l.stream}</td><td>{l.phone}</td><td>{l.upi}</td>
        <td><b>{l.avg||0}%</b><br/><span style={{background:Number(l.avg)>=50?"#16a34a":"#ef4444",color:"#fff",padding:"2px 8px",borderRadius:"8px",fontSize:"11px"}}>{Number(l.avg)>=50?"EE":"BE"}</span></td>
        <td><div style={{background:"#64748b",color:"#fff",padding:"3px 10px",borderRadius:"12px",fontSize:"12px",width:"fit-content"}}>{l.board}</div><button onClick={()=>toggleBoard(i)} style={{background:"#0284c7",color:"#fff",border:"none",padding:"4px 10px",borderRadius:"12px",marginTop:"4px",cursor:"pointer"}}>Toggle</button></td>
        <td><button onClick={()=>edit(i)} style={{border:"none",background:"transparent",cursor:"pointer"}}>✏️</button> <button onClick={()=>printOne(l)} style={{border:"none",background:"transparent",cursor:"pointer"}}>🖨️</button> <button onClick={()=>del(i)} style={{border:"none",background:"transparent",cursor:"pointer"}}>🗑️</button></td>
       </tr>)}
      </tbody>
     </table>
    </div>
   </div>
  </div>
 )
}
