"use client"
import { useState } from "react"

const learners=[
 {code:"2976",name:"DEOGRACIOUS MACHEMBE",cls:"PP2",stream:"North",phone:"0718899014",upi:"A000264719",avg:26.8,board:"Day"},
 {code:"297",name:"LINTONEL OKINDA",cls:"G10",stream:"East",phone:"0718899014",upi:"A000264711",avg:11.2,board:"Boarding"},
 {code:"12",name:"VICTOR OLWICHI",cls:"G10",stream:"West",phone:"0722001122",upi:"A000264712",avg:25.6,board:"Day"},
 {code:"23",name:"ELVIS OPWORA",cls:"G11",stream:"North",phone:"0718899014",upi:"A000264713",avg:0,board:"Day"},
 {code:"SP/11/45",name:"BRIAN WEKESA - STEM",cls:"G11",stream:"STEM-A",phone:"0712345678",upi:"A000264714",avg:82.4,board:"Boarding"},
 {code:"SP/12/10",name:"FAITH NAFULA - SOCIAL",cls:"G12",stream:"Social-B",phone:"0700112233",upi:"A000264715",avg:68.5,board:"Day"},
]

export default function Page(){
 const [a,setA]=useState("Learners")
 const [q,setQ]=useState("")
 const f=learners.filter(l=>l.name.toLowerCase().includes(q.toLowerCase())||l.code.includes(q))

 return(
  <div style={{display:"flex",minHeight:"100vh",fontFamily:"sans-serif",background:"#f6f7f9"}}>
   <div style={{width:"250px",background:"#0e2f2b",color:"#fff",padding:"16px"}}>
    <h2 style={{margin:"0 0 4px",color:"#ffcc33"}}>🎓 ShulePulse Pro</h2>
    <small style={{background:"#1a4d45",padding:"4px 8px",borderRadius:"10px"}}>SENIOR G10-G12</small>
    <div style={{marginTop:"24px"}}>{["Dashboard","Learners","CBE Assessment","Pathways","Boarding","Fees","KUCCPS","MOE Reports"].map(m=><button key={m} onClick={()=>setA(m)} style={{display:"block",width:"100%",textAlign:"left",padding:"12px",margin:"6px 0",borderRadius:"20px",border:"none",background:a===m?"#4a5a2a":"transparent",color:a===m?"#ffeb8a":"#fff",cursor:"pointer",fontWeight:a===m?"bold":"normal"}}>{m==="Dashboard"?"📊":"👥"} {m}</button>)}</div>
   </div>

   <div style={{flex:1,padding:"16px",overflowX:"auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px"}}>
     <h2 style={{margin:0}}>{a}</h2>
     <button style={{padding:"8px 16px",borderRadius:"20px",border:"1px solid #ccc",background:"#fff"}}>Reset</button>
    </div>

    {a==="Learners" && (
     <div style={{background:"#fff",borderRadius:"12px",padding:"8px",overflowX:"auto"}}>
      <input placeholder="Search name or code..." value={q} onChange={e=>setQ(e.target.value)} style={{padding:"10px",width:"300px",borderRadius:"20px",border:"1px solid #ddd",margin:"10px"}}/>
      <table style={{width:"100%",minWidth:"1100px",borderCollapse:"collapse",fontSize:"14px"}}>
       <thead><tr style={{background:"#f8fafc",textAlign:"left"}}><th style={{padding:"12px"}}>#</th><th>Student Code</th><th>Name</th><th>Class</th><th>Stream</th><th>Parent Phone</th><th>UPI</th><th>Avg%</th><th>Boarding</th><th>Actions</th></tr></thead>
       <tbody>
        {f.map((l,i)=><tr key={l.code} style={{borderBottom:"1px solid #eee",background:i%2===1?"#fcfcfc":"#fff"}}>
         <td style={{padding:"14px"}}>{i+1}</td>
         <td><span style={{background:"#eef2ff",padding:"4px 10px",borderRadius:"12px"}}>{l.code}</span></td>
         <td style={{fontWeight:"bold"}}>{l.name}</td>
         <td>{l.cls}</td>
         <td>{l.stream}</td>
         <td>{l.phone}</td>
         <td>{l.upi}</td>
         <td><div style={{fontWeight:"bold"}}>{l.avg.toFixed(1)}%</div><span style={{background:l.avg>=50?"#16a34a":l.avg>0?"#ef4444":"#dc2626",color:"#fff",padding:"2px 10px",borderRadius:"10px",fontSize:"11px"}}>{l.avg>=50?"EE":l.avg>=40?"ME":l.avg>0?"AE":"BE"}</span></td>
         <td><div style={{background:"#64748b",color:"#fff",padding:"3px 10px",borderRadius:"12px",width:"fit-content",fontSize:"12px"}}>{l.board}</div><button style={{background:"#0284c7",color:"#fff",border:"none",padding:"4px 10px",borderRadius:"12px",marginTop:"4px",cursor:"pointer"}}>Toggle</button></td>
         <td>✏️ 🖨️ 🗑️</td>
        </tr>)}
       </tbody>
      </table>
      <div style={{padding:"10px",fontSize:"12px",color:"#666",textAlign:"right"}}>CONTACT US; 0718899014</div>
     </div>
    )}

    {a==="Dashboard" && <div style={{background:"#fff",padding:"20px",borderRadius:"12px"}}><h3>Dashboard</h3><p>486 Learners | G10 182 G11 165 G12 139</p><p>Click Learners to see FULL details table like EduNexa Pro</p></div>}
    {a!=="Learners" && a!=="Dashboard" && <div style={{background:"#fff",padding:"20px",borderRadius:"12px"}}>{a} module - ready to customize</div>}
   </div>
  </div>
 )
}
