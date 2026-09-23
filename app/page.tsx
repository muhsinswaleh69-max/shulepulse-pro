"use client"
import { useState } from "react"

const menu = [
  { title: "MAIN", items: ["Dashboard","Learners G10-G12","Pathway Classes","Senior Boarding","Alumni & Exit"] },
  { title: "ACADEMICS - SENIOR", items: ["Marks Entry","CBE Senior Assessment","Pathway Tracking","Learner Portfolio","Rankings","Attendance","Labs & Practicals","Timetable"] },
  { title: "CAREER & PLACEMENT", items: ["Career Guidance","KUCCPS Placement","Internship / Attachment","University Reports"] },
  { title: "FINANCE - SENIOR", items: ["Fees G10-G12","Bursaries & Capitation","Transport"] },
  { title: "PEOPLE", items: ["Parents","Teachers - Senior","Staff"] },
  { title: "SYSTEM", items: ["Reports - MOE","Analytics","Settings","Logout"] },
]

export default function Page() {
  const [active, setActive] = useState("Dashboard")
  const [grade, setGrade] = useState("All")

  return (
    <div style={{display:"flex", minHeight:"100vh", fontFamily:"sans-serif"}}>
      <div style={{width:"300px", background:"#0e2f2b", color:"white", padding:"16px", overflowY:"auto"}}>
        <h1 style={{fontWeight:"bold", fontSize:"22px"}}>ShulePulse Pro</h1>
        <p style={{fontSize:"10px", background:"#1a4d45", padding:"6px", borderRadius:"6px", marginTop:"6px", color:"#a3f3a3", fontWeight:"bold"}}>SENIOR SCHOOL ONLY • G10-G12 • CBE</p>
        
        <div style={{display:"flex", gap:"6px", marginTop:"16px"}}>
          {["All","G10","G11","G12"].map(g => (
            <button key={g} onClick={()=>setGrade(g)} style={{flex:1, padding:"6px", borderRadius:"20px", fontSize:"12px", fontWeight:"bold", background: grade===g ? "#7a8a4a" : "#1a4d45", color:"white", border:"none"}}>{g}</button>
          ))}
        </div>

        <div style={{marginTop:"20px"}}>
          {menu.map(s => (
            <div key={s.title} style={{marginBottom:"18px"}}>
              <p style={{fontSize:"10px", color:"#7fb07f", fontWeight:"bold", letterSpacing:"1px"}}>{s.title}</p>
              {s.items.map(it => (
                <button key={it} onClick={()=>setActive(it)} style={{display:"block", width:"100%", textAlign:"left", padding:"9px 12px", borderRadius:"20px", marginTop:"4px", fontSize:"13px", background: active===it ? "#7a8a4a" : "transparent", color:"white", border:"none", cursor:"pointer"}}>{it}</button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main style={{flex:1, padding:"24px", background:"#f3f4f6", overflowY:"auto"}}>
        <div style={{background:"white", borderRadius:"16px", padding:"24px", minHeight:"90vh"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <h2 style={{fontSize:"26px", fontWeight:"bold", color:"#0e2f2b"}}>{active}</h2>
              <p style={{color:"gray", fontSize:"13px"}}>Senior School • {grade} • Pathways: STEM | Arts & Sports | Social Sciences</p>
            </div>
            <div style={{background:"#0e2f2b", color:"white", padding:"8px 16px", borderRadius:"20px", fontSize:"12px"}}>{grade} Filter Active</div>
          </div>

          {active==="Dashboard" && (
            <>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px", marginTop:"24px"}}>
                <div style={{background:"#e8f5e9", padding:"18px", borderRadius:"14px", borderLeft:"4px solid #2e7d32"}}><p style={{fontSize:"11px", color:"gray"}}>TOTAL SENIOR LEARNERS</p><h3 style={{fontSize:"28px", fontWeight:"bold"}}>486</h3><p style={{fontSize:"11px"}}>G10: 182 | G11: 165 | G12: 139</p></div>
                <div style={{background:"#e3f2fd", padding:"18px", borderRadius:"14px", borderLeft:"4px solid #1565c0"}}><p style={{fontSize:"11px", color:"gray"}}>PATHWAYS</p><h3 style={{fontSize:"18px", fontWeight:"bold"}}>STEM 58% | Arts 22% | Social 20%</h3><p style={{fontSize:"11px", marginTop:"6px"}}>Most popular: STEM</p></div>
                <div style={{background:"#fff8e1", padding:"18px", borderRadius:"14px", borderLeft:"4px solid #f9a825"}}><p style={{fontSize:"11px", color:"gray"}}>FEES COLLECTED (G10-G12)</p><h3 style={{fontSize:"28px", fontWeight:"bold"}}>KES 8.2M</h3><p style={{fontSize:"11px"}}>92% collection</p></div>
                <div style={{background:"#f3e5f5", padding:"18px", borderRadius:"14px", borderLeft:"4px solid #6a1b9a"}}><p style={{fontSize:"11px", color:"gray"}}>BOARDING - SENIOR</p><h3 style={{fontSize:"28px", fontWeight:"bold"}}>312</h3><p style={{fontSize:"11px"}}>Dorm A,B,C occupied</p></div>
                <div style={{background:"#ffebee", padding:"18px", borderRadius:"14px", borderLeft:"4px solid #c62828"}}><p style={{fontSize:"11px", color:"gray"}}>KUCCPS READY (G12)</p><h3 style={{fontSize:"28px", fontWeight:"bold"}}>124 / 139</h3><p style={{fontSize:"11px"}}>89% qualified</p></div>
                <div style={{background:"#e0f2f1", padding:"18px", borderRadius:"14px", borderLeft:"4px solid #00695c"}}><p style={{fontSize:"11px", color:"gray"}}>ATTENDANCE TODAY</p><h3 style={{fontSize:"28px", fontWeight:"bold"}}>96.4%</h3><p style={{fontSize:"11px"}}>G10-G12 average</p></div>
              </div>

              <div style={{marginTop:"20px", background:"#0e2f2b", color:"white", padding:"20px", borderRadius:"14px"}}>
                <h3 style={{fontWeight:"bold"}}>✓ CBE Senior School Compliant</h3>
                <p style={{fontSize:"12px", color:"#a3c4a3", marginTop:"6px"}}>Competency-Based Assessment for Senior School • Pathway Tracking • MOE SLIM Reports • No Primary / Junior Content</p>
              </div>
            </>
          )}

          {active!=="Dashboard" && (
            <div style={{marginTop:"24px", textAlign:"center", padding:"60px 20px", background:"#f9fafb", borderRadius:"14px", border:"2px dashed #ddd"}}>
              <p style={{fontSize:"40px"}}>🎓</p>
              <p style={{fontWeight:"bold", fontSize:"16px"}}>{active} • Senior School Module</p>
              <p style={{fontSize:"13px", color:"gray", marginTop:"6px"}}>This will handle {active} for Grade 10-12 only. Filter: {grade}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
