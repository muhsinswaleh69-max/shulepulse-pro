"use client"
import { useState } from "react"
export default function Page(){
 const [a,setA]=useState("Dashboard")
 const menu=["Dashboard","Learners","CBE Assessment","Pathways","Boarding","Fees","KUCCPS","MOE Reports"]
 return(
  <div style={{display:"flex",minHeight:"100vh",fontFamily:"sans-serif"}}>
   <div style={{width:"240px",background:"#0e2f2b",color:"#fff",padding:"16px"}}>
    <h2 style={{margin:"0 0 4px"}}>ShulePulse Pro</h2>
    <span style={{fontSize:"10px",background:"#1a4d45",padding:"4px 8px",borderRadius:"10px"}}>SENIOR G10-G12</span>
    <div style={{marginTop:"20px"}}>{menu.map(m=><button key={m} onClick={()=>setA(m)} style={{display:"block",width:"100%",textAlign:"left",padding:"10px",margin:"6px 0",borderRadius:"20px",border:"none",background:a===m?"#7a8a4a":"transparent",color:"#fff",cursor:"pointer"}}>{m}</button>)}</div>
   </div>
   <div style={{flex:1,background:"#f3f4f6",padding:"20px"}}>
    <div style={{background:"#fff",padding:"20px",borderRadius:"14px"}}>
     <h1>{a}</h1>
     {a==="Dashboard" && <><p><b>486 Learners</b> | G10:182 G11:165 G12:139</p><p>STEM 58% (282) | Arts 22% (107) | Social 20% (97)</p><p>Fees: KES 8.2M / 12.5M | Boarding: 312</p><p style={{color:"green"}}>✅ System LIVE at shulepulse-pro-three.vercel.app</p></>}
     {a==="Learners" && <p>Grade 10-12 list with pathways & CBC transition tracking</p>}
     {a==="CBE Assessment" && <p>CBE rubrics - Exceeding / Meeting / Approaching</p>}
     {a==="Pathways" && <p>STEM, Arts & Sports Science, Social Sciences placement</p>}
     {a==="Boarding" && <p>312 boarders - Dorms, meals, check-in/out</p>}
     {a==="Fees" && <p>Senior fees: 65% collected. M-Pesa integration ready</p>}
     {a==="KUCCPS" && <p>Career guidance for G12 university placement</p>}
     {a==="MOE Reports" && <p>NEMIS & KEMIS reports export</p>}
    </div>
   </div>
  </div>
 )
}
