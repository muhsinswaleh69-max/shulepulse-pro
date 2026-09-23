"use client"
import { useState } from "react"
const menu = [
  { title: "MAIN", items: ["Dashboard","Learners G10-G12","Pathway Classes","Senior Boarding","Alumni & Exit"] },
  { title: "ACADEMICS - SENIOR", items: ["Marks Entry","CBE Senior Assessment","Pathway Tracking","Learner Portfolio","Rankings","Attendance","Labs & Practicals","Timetable"] },
  { title: "CAREER & PLACEMENT", items: ["Career Guidance","KUCCPS Placement","Internship"] },
  { title: "FINANCE", items: ["Fees G10-G12","Bursaries","Transport"] },
  { title: "SYSTEM", items: ["MOE Reports","Analytics","Settings"] },
]
export default function Page(){
  const [active,setActive]=useState("Dashboard")
  const [grade,setGrade]=useState("All")
  return(
    <div style={{display:"flex",minHeight:"100vh",fontFamily:"sans-serif"}}>
      <div style={{width:"280px",background:"#0e2f2b",color:"white",padding:"16px"}}>
        <h1>ShulePulse Pro</h1>
        <p style={{fontSize:"10px",background:"#1a4d45",padding:"6px",borderRadius:"6px",color:"#a3f3a3",fontWeight:"bold"}}>SENIOR ONLY • G10-G12 • CBE</p>
        <div style={{display:"flex",gap:"6px",marginTop:"14px"}}>
          {["All","G10","G11","G12"].map(g=><button key={g} onClick={()=>setGrade(g)} style={{flex:1,padding:"6px",borderRadius:"20px",fontSize:"12px",background:grade===g?"#7a8a4a":"#1a4d45",color:"white",border:"none"}}>{g}</button>)}
        </div>
        <div style={{marginTop:"18px"}}>
          {menu.map(s=><div key={s.title} style={{marginBottom:"14px"}}><p style={{fontSize:"10px",color:"#7fb07f",fontWeight:"bold"}}>{s.title}</p>{s.items.map(it=><button key={it} onClick={()=>setActive(it)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",borderRadius:"20px",marginTop:"4px",fontSize:"13px",background:active===it?"#7a8a4a":"transparent",color:"white",border:"none"}}>{it}</button>)}</div>)}
        </div>
      </div>
      <main style={{flex:1,padding:"20px",background:"#f3f4f6"}}>
        <div style={{background:"white",borderRadius:"16px",padding:"24px"}}>
          <h2 style={{fontSize:"24px",fontWeight:"bold"}}>{active} • {grade}</h2>
          <p style={{color:"gray",fontSize:"12px"}}>Senior Pathways: STEM | Arts & Sports | Social Sciences</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"20px"}}>
            <div style={{background:"#e8f5e9",padding:"16px",borderRadius:"12px"}}><b>486 Learners</b><br/>G10:182 G11:165 G12:139</div>
            <div style={{background:"#e3f2fd",padding:"16px",borderRadius:"12px"}}><b>Pathways</b><br/>STEM 58% Arts 22% Social 20%</div>
            <div style={{background:"#fff8e1",padding:"16px",borderRadius:"12px"}}><b>Fees G10-G12</b><br/>KES 8.2M Collected</div>
            <div style={{background:"#f3e5f5",padding:"16px",borderRadius:"12px"}}><b>Boarding Senior</b><br/>312 Boarders</div>
          </div>
        </div>
      </main>
    </div>
  )
}
