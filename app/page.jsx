<div style={{background:"#fff",borderRadius:"12px",overflowX:"auto"}}>
<div style={{padding:"10px"}}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Assessment No, Learner, Parent, UPI..." style={{padding:"10px 14px",borderRadius:"20px",border:"1px solid #ddd",width:"320px"}}/></div>
<table style={{width:"100%",minWidth:"1350px",borderCollapse:"collapse",fontSize:"13px"}}>
<thead><tr style={{background:"#f1f5f9",textAlign:"left"}}>
<th style={{padding:"10px",minWidth:"120px"}}>Assessment No</th>
<th style={{padding:"10px",minWidth:"160px"}}>Learner Name</th>
<th style={{padding:"10px",minWidth:"160px"}}>Parent Name</th>
<th style={{padding:"10px",minWidth:"60px"}}>Grade</th>
<th style={{padding:"10px",minWidth:"90px"}}>Stream</th>
<th style={{padding:"10px",minWidth:"80px"}}>Pathway</th>
<th style={{padding:"10px",minWidth:"110px"}}>UPI</th>
<th style={{padding:"10px",minWidth:"110px"}}>Phone</th>
<th style={{padding:"10px",minWidth:"80px"}}>Boarding</th>
<th style={{padding:"10px",minWidth:"120px"}}>Requirements</th>
<th style={{padding:"10px",minWidth:"80px"}}>Actions</th>
</tr></thead>
<tbody>
{filtered("students").map((s,i)=><tr key={i} style={{borderTop:"1px solid #eee"}}>
<td style={{padding:"10px"}}><b style={{background:"#eef2ff",padding:"4px 8px",borderRadius:"8px"}}>{s.assNo}</b></td>
<td style={{padding:"10px",fontWeight:"bold"}}>{s.name}<br/><small style={{color:"#666",fontWeight:"normal"}}>{s.gender}</small></td>
<td style={{padding:"10px"}}>{s.parentName||"ORONJE JUMA"}</td>
<td style={{padding:"10px"}}>{s.cls}</td>
<td style={{padding:"10px"}}>{s.stream}</td>
<td style={{padding:"10px",fontSize:"11px"}}>{s.pathway}</td>
<td style={{padding:"10px",fontFamily:"monospace"}}>{s.upi}</td>
<td style={{padding:"10px"}}>{s.phone}</td>
<td style={{padding:"10px"}}><span style={{background:s.board==="Boarding"?"#0f2e2a":"#e5e7eb",color:s.board==="Boarding"?"#fff":"#000",padding:"3px 8px",borderRadius:"8px",fontSize:"11px"}}>{s.board}</span></td>
<td style={{padding:"10px",fontSize:"11px",maxWidth:"120px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.requirements}</td>
<td style={{padding:"10px"}}><button onClick={()=>{ setForm(s); setEdit({type:"students",idx:store.students.indexOf(s)}); setModals({student:true}) }} style={{border:"none",background:"none",cursor:"pointer"}}>✏️</button> <button onClick={()=>toTrash("students",store.students.indexOf(s))} style={{border:"none",background:"none",cursor:"pointer"}}>🗑️</button></td>
</tr>)}
{filtered("students").length===0 && <tr><td colSpan={11} style={{padding:"30px",textAlign:"center",color:"#999"}}>No students. LUQMAN SALIM will appear here after recovery if saved before.</td></tr>}
</tbody></table></div>
