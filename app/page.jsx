"use client"
import { useState } from "react"
const learners=[
 {adm:"SP/10/001",name:"Brian Wekesa",grade:"G10",path:"STEM",fee:45000,paid:40000},
 {adm:"SP/10/002",name:"Faith Nafula",grade:"G10",path:"Social",fee:45000,paid:45000},
 {adm:"SP/11/045",name:"Kevin Omondi",grade:"G11",path:"STEM",fee:48000,paid:20000},
 {adm:"SP/11/046",name:"Mercy Akinyi",grade:"G11",path:"Arts",fee:48000,paid:48000},
 {adm:"SP/12/101",name:"Victor Mutiso",grade:"G12",path:"STEM",fee:52000,paid:50000},
 {adm:"SP/12/102",name:"Sharon Chebet",grade:"G12",path:"Social",fee:52000,paid:52000},
]
export default function Page(){
 const [a,setA]=useState("Dashboard"); const [q,setQ]=useState("")
 const filtered=learners.filter(l=>l.name.toLowerCase().includes(q.toLowerCase())||l.adm.includes(q))
 return(
  <div style={{display:"flex",minHeight:"100vh",fontFamily:"sans-serif"}}>
   <div style={{width:"240px",background:"#0e2f2b",color:"#fff",padding:"16px",position:"sticky",top:0,height:"100vh"}}>
    <h2 style={{margin:0}}>ShulePulse Pro</h2><small style={{background:"#1a4d45",padding:"4px 8px",borderRadius:"10px",fontSize:"10px"}}>SENIOR G10-G12</small>
    <div style={{marginTop:"20px"}}>{["Dashboard","Learners","CBE Assessment","Pathways","Boarding","Fees","KUCCPS","MOE Reports"].map(m=><button key={m} onClick={()=>setA(m)} style={{display:"block",width:"100%",textAlign:"left",padding:"10px",margin:"6px 0",borderRadius:"20px",border:"none",background:a===m?"#7a8a4a":"transparent",color:"#fff",cursor:"pointer"}}>{m}</button>)}</div>
   </div>
   <div style={{flex:1,background:"#f3f4f6",padding:"16px"}}>
    {a==="Dashboard" && <div style={{background:"#fff",padding:"20px",borderRadius:"14px"}}><h1>Dashboard</h1><p><b>{learners.length} Sample + 480 more</b> | G10:182 G11:165 G12:139</p><p>STEM 58% | Arts 22% | Social 20%</p><p>Fees: KES 8.2M Collected / 12.5M Expected</p><p style={{color:"green"}}>✅ LIVE: shulepulse-pro-three.vercel.app</p></div>}
    
    {a==="Learners" && <div style={{background:"#fff",padding:"16px",borderRadius:"14px"}}><h2>Learners - Senior</h2><input placeholder="Search name or ADM..." value={q} onChange={e=>setQ(e.target.value)} style={{padding:"10px",width:"100%",borderRadius:"8px",border:"1px solid #ccc",margin:"10px 0"}}/><table style={{width:"100%",fontSize:"14px",borderCollapse:"collapse"}}><tr style={{background:"#f0f0f0"}}><th style={{textAlign:"left",padding:"8px"}}>ADM</th><th style={{textAlign:"left"}}>Name</th><th>Grade</th><th>Path</th></tr>{filtered.map(l=><tr key={l.adm} style={{borderBottom:"1px solid #eee"}}><td style={{padding:"8px"}}>{l.adm}</td><td>{l.name}</td><td>{l.grade}</td><td><span style={{background:l.path==="STEM"?"#dbeafe":l.path==="Arts"?"#fce7f3":"#dcfce7",padding:"3px 8px",borderRadius:"10px",fontSize:"11px"}}>{l.path}</span></td></tr>)}</table></div>}

    {a==="Fees" && <div style={{background:"#fff",padding:"16px",borderRadius:"14px"}}><h2>Fees Management</h2><table style={{width:"100%",fontSize:"14px",borderCollapse:"collapse"}}><tr style={{background:"#f0f0f0"}}><th style={{padding:"8px",textAlign:"left"}}>Learner</th><th>Expected</th><th>Paid</th><th>Balance</th></tr>{learners.map(l=><tr key={l.adm} style={{borderBottom:"1px solid #eee"}}><td style={{padding:"8px"}}>{l.name}</td><td>KES {l.fee.toLocaleString()}</td><td style={{color:"green"}}>{l.paid.toLocaleString()}</td><td style={{color:l.fee-l.paid>0?"red":"green",fontWeight:"bold"}}>{(l.fee-l.paid).toLocaleString()}</td></tr>)}</table></div>}

    {a==="CBE Assessment" && <div style={{background:"#fff",padding:"16px",borderRadius:"14px"}}><h2>CBE Assessment G10-G12</h2><p>Competency Based - 4 Levels</p><table style={{width:"100%",borderCollapse:"collapse",fontSize:"13px"}}><tr style={{background:"#0e2f2b",color:"#fff"}}><th style={{padding:"8px"}}>Learner</th><th>Math</th><th>Bio</th><th>Pathway Subj</th></tr><tr><td style={{padding:"8px"}}>Brian Wekesa</td><td>EE</td><td>ME</td><td>EE</td></tr><tr><td style={{padding:"8px"}}>Faith Nafula</td><td>ME</td><td>EE</td><td>ME</td></tr></table><small>EE=Exceeding Expectation, ME=Meeting, AE=Approaching, BE=Below</small></div>}

    {a!=="Dashboard" && a!=="Learners" && a!=="Fees" && a!=="CBE Assessment" && <div style={{background:"#fff",padding:"20px",borderRadius:"14px"}}><h1>{a}</h1><p>{a} module ready - tell me what fields you want here.</p></div>}
   </div>
  </div>
 )
}
