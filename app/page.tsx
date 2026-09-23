"use client"
import { useState } from "react"

export default function Page(){
  const [active,setActive]=useState("Dashboard")
  return(
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"sans-serif"}}>
      <div style={{width:"260px",background:"#0e2f2b",color:"white",padding:"16px"}}>
        <h2>ShulePulse Pro</h2>
        <p style={{fontSize:"10px",background:"#1a4d45",padding:"5px",borderRadius:"6px"}}>SENIOR ONLY G10-G12 CBE</p>
        <div style={{marginTop:"20px"}}>
          {["Dashboard","Learners G10-G12","CBE Senior Assessment","Pathway Tracking","Senior Boarding","Fees G10-G12","KUCCPS","MOE Reports"].map(i=>(
            <button key={i} onClick={()=>setActive(i)} style={{display:"block",width:"100%",textAlign:"left",padding:"10px",marginTop:"6px",borderRadius:"20px",border:"none",background:active===i?"#7a8a4a":"transparent",color:"white"}}>{i}</button>
          ))}
        </div>
      </div>
      <main style={{flex:1,padding:"20px",background:"#f3f4f6"}}>
        <div style={{background:"white",padding:"24px",borderRadius:"16px"}}>
          <h1>{active}</h1>
          <p>Pathways: STEM | Arts & Sports | Social Sciences</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"16px"}}>
            <div style={{background:"#e8f5e9",padding:"16px",borderRadius:"12px"}}>486 Learners<br/>G10:182 G11:165 G12:139</div>
            <div style={{background:"#e3f2fd",padding:"16px",borderRadius:"12px"}}>Pathways<br/>STEM 58% Arts 22% Social 20%</div>
          </div>
        </div>
      </main>
    </div>
  )
}
