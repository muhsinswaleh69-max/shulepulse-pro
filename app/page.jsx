"use client"
import { useState } from "react"

export default function Page(){
 const [learners,setLearners]=useState([])
 const [q,setQ]=useState("")
 const [showReg,setShowReg]=useState(false)
 const [editIdx,setEditIdx]=useState(null)
 const [form,setForm]=useState({code:"",name:"",cls:"G10",stream:"North",phone:"",upi:"",avg:"",board:"Day",gender:"Male"})

 const openAdd=()=>{ setForm({code:"",name:"",cls:"G10",stream:"North",phone:"",upi:"A000"+Math.floor(1000000+Math.random()*9000000),avg:"",board:"Day",gender:"Male"}); setEditIdx(null); setShowReg(true) }
 const save=()=>{
  if(!form.code||!form.name) return alert("Code & Name required")
  if(editIdx!==null){ const c=[...learners]; c[editIdx]=form; setLearners(c) }
  else { setLearners([...learners,form]) }
  setShowReg(false); setEditIdx(null)
 }
 const toggleBoard=(i)=>{ const c=[...learners]; c[i].board=c[i].board==="Day"?"Boarding":"Day"; setLearners(c) }
 const del=(i)=>{ if(confirm("Delete?")) setLearners(learners.filter((_,x)=>x!==i)) }
 const edit=(i)=>{ setForm(learners[i]); setEditIdx(i); setShowReg(true) }
 const printOne=(l)=>{ const w=window.open(""); w.document.write(`<h2>Student Registration Slip</h2><p>Name: ${l.name}</p><p>Code: ${l.code}</p><p>Class: ${l.cls} Stream: ${l.stream}</p><p>Parent: ${l.phone}</p><p>UPI: ${l.upi}</p><p>Avg: ${l.avg}% Boarding: ${l.board}</p>`); w.print() }

 const f=learners.filter(l=>l.name.toLowerCase().includes(q.toLowerCase())||l.code.toLowerCase().includes(q.toLowerCase()))

 return(
  <div style={{display:"flex",minHeight:"100vh",fontFamily:"sans-serif",background:"#f6f7f9"}}>
   <div style={{width:"240px",background:"#0e2f2b",color:"#fff",padding:"16px"}}>
    <h3 style={{margin:0,color:"#ffcc33"}}>🎓 EduNexa Pro</h3><small>PP1 - Grade X + G10-12</small>
    <div style={{marginTop:"20px"}}><button style={{width:"100%",padding:"12px",borderRadius:"20px",border:"none",background:"#3a4a22",color:"#ffeb8a"}}>👥 Learners</button></div>
   </div>

   <div style={{flex:1,padding:"12px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
     <h2 style={{margin:0}}>Learners</h2>
     <div style={{display:"flex",gap:"8px"}}>
      <button onClick={openAdd} style={{background:"#0e2f2b",color:"#fff",border:"none",padding:"10px 18px",borderRadius:"20px",cursor:"pointer",fontWeight:"bold"}}>+ Add Student</button>
      <button style={{padding:"10px 16px",borderRadius:"20px",border:"1px solid #ddd",background:"#fff"}}>Reset</button>
     </div>
    </div>

    {/* REGISTRATION MODAL */}
    {showReg && (
     <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:50}}>
      <div style={{background:"#fff",padding:"20px",borderRadius:"16px",width:"90%",maxWidth:"500px",maxHeight:"90vh",overflowY:"auto"}}>
       <h3>{editIdx!==null?"Edit Student":"Student Registration"}</h3>
       <div style={{display:"grid",gap:"10px"}}>
        <input placeholder="Student Code *" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} style={{padding:"10px",borderRadius:"8px",border:"1px solid #ccc"}}/>
        <input placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{padding:"10px",borderRadius:"8px",border:"1px solid #ccc"}}/>
        <div style={{display:"flex",gap:"8px"}}>
         <select value={form.cls} onChange={e=>setForm({...form,cls:e.target.value})} style={{flex:1,padding:"10px",borderRadius:"8px"}}><option>PP1</option><option>PP2</option><option>Grade 1</option><option>Grade 9</option><option>Grade X</option><option>G10</option><option>G11</option><option>G12</option></select>
         <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} style={{flex:1,padding:"10px",borderRadius:"8px"}}><option>Male</option><option>Female</option></select>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
         <input placeholder="Stream (North/East)" value={form.stream} onChange={e=>setForm({...form,stream:e.target.value})} style={{flex:1,padding:"10px",borderRadius:"8px",border:"1px solid #ccc"}}/>
         <select value={form.board} onChange={e=>setForm({...form,board:e.target.value})} style={{flex:1,padding:"10px",borderRadius:"8px"}}><option>Day</option><option>Boarding</option></select>
        </div>
        <input placeholder="Parent Phone 07xx" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={{padding:"10px",borderRadius:"8px",border:"1px solid #ccc"}}/>
        <input placeholder="UPI (auto)" value={form.upi} onChange={e=>setForm({...form,upi:e.target.value})} style={{padding:"10px",borderRadius:"8px",border:"1px solid #ccc"}}/>
        <input placeholder="Avg % (e.g 26.8)" type="number" value={form.avg} onChange={e=>setForm({...form,avg:e.target.value})} style={{padding:"10px",borderRadius:"8px",border:"1px solid #ccc"}}/>
        <div style={{display:"flex",gap:"10px",marginTop:"10px"}}>
         <button onClick={save} style={{flex:1,background:"#0e2f2b",color:"#fff",border:"none",padding:"12px",borderRadius:"10px",cursor:"pointer",fontWeight:"bold"}}>{editIdx!==null?"Update Learner":"Register Student"}</button>
         <button onClick={()=>setShowReg(false)} style={{flex:1,padding:"12px",borderRadius:"10px",border:"1px solid #ccc",background:"#fff"}}>Cancel</button>
        </div>
       </div>
      </div>
     </div>
    )}

    <div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}>
     <input placeholder="Search name or code..." value={q} onChange={e=>setQ(e.target.value)} style={{margin:"10px",padding:"10px",width:"260px",borderRadius:"20px",border:"1px solid #ddd"}}/>
     <table style={{width:"100%",minWidth:"1150px",borderCollapse:"collapse",fontSize:"14px"}}>
      <thead><tr style={{background:"#f1f5f9",textAlign:"left"}}><th style={{padding:"12px"}}>#</th><th>Student Code</th><th>Name</th><th>Class</th><th>Stream</th><th>Parent Phone</th><th>UPI</th><th>Avg%</th><th>Boarding</th><th>Actions</th></tr></thead>
      <tbody>
       {f.length===0 && <tr><td colSpan={10} style={{padding:"30px",textAlign:"center",color:"#888"}}>No students yet. Click <b>+ Add Student</b> top right to register for sampling.</td></tr>}
       {f.map((l,i)=><tr key={i} style={{borderBottom:"1px solid #eee"}}>
        <td style={{padding:"12px"}}>{i+1}</td>
        <td><span style={{background:"#eef2ff",padding:"4px 10px",borderRadius:"12px"}}>{l.code}</span></td>
        <td style={{fontWeight:"bold"}}>{l.name}</td>
        <td>{l.cls}</td><td>{l.stream}</td><td>{l.phone}</td><td>{l.upi}</td>
        <td><b>{l.avg||0}%</b><br/><span style={{background:Number(l.avg)>=50?"#16a34a":Number(l.avg)>=20?"#ef4444":"#b91c1c",color:"#fff",padding:"2px 8px",borderRadius:"8px",fontSize:"11px"}}>{Number(l.avg)>=50?"EE":Number(l.avg)>=30?"ME":Number(l.avg)>0?"AE":"BE"}</span></td>
        <td><div style={{background:"#64748b",color:"#fff",padding:"3px 10px",borderRadius:"12px",fontSize:"12px",width:"fit-content"}}>{l.board}</div><button onClick={()=>toggleBoard(i)} style={{background:"#0284c7",color:"#fff",border:"none",padding:"4px 10px",borderRadius:"12px",marginTop:"4px",cursor:"pointer"}}>Toggle</button></td>
        <td><button onClick={()=>edit(i)} title="Edit" style={{border:"none",background:"transparent",cursor:"pointer",fontSize:"16px"}}>✏️</button> <button onClick={()=>printOne(l)} title="Print" style={{border:"none",background:"transparent",cursor:"pointer",fontSize:"16px"}}>🖨️</button> <button onClick={()=>del(i)} title="Delete" style={{border:"none",background:"transparent",cursor:"pointer",fontSize:"16px"}}>🗑️</button></td>
       </tr>)}
      </tbody>
     </table>
     <div style={{padding:"10px",textAlign:"right",fontSize:"11px",color:"#888"}}>CONTACT US: 0718899014</div>
    </div>
   </div>
  </div>
 )
}
