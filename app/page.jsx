'use client'
import { useState } from 'react'

export default function SeniorDashboard() {
  const [activePathway, setActivePathway] = useState('STEM')

  return (
    <div className="min-h-screen bg-[#f5f7ff] flex">
      {/* Sidebar - EduNexa Pro style */}
      <aside className="w-64 bg-gradient-to-b from-[#2a3bff] to-[#7c3aed] text-white p-6 hidden md:block fixed h-full shadow-2xl">
        <h1 className="text-2xl font-bold tracking-wider flex items-center gap-2">
          <span className="w-2 h-8 bg-[#ffd700] rounded-full"></span>
          SENIOR SCH
        </h1>
        <p className="text-xs opacity-60 mt-1">CBC Grade 10-12 • Mumias</p>

        <nav className="mt-10 space-y-2">
          {['Dashboard','Timetable','Teachers','Students','Pathways','Labs','Reports'].map((item,i) => (
            <div key={item} className={`px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${i===1? 'bg-white/20 backdrop-blur-md shadow-lg border border-white/20' : 'hover:bg-white/10'}`}>
              <div className="w-2 h-2 bg-[#ffd700] rounded-full"></div>
              {item}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <p className="text-xs opacity-70">Online</p>
          <p className="text-sm font-semibold">● System Syncing</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 p-6">
        {/* Top Stats - Glassmorphism cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {[
            {label:'Total Learners', val:'312', sub:'Grade 10-12', grad:'from-blue-500 to-indigo-600'},
            {label:'Teachers', val:'24', sub:'TSC Compliant', grad:'from-purple-500 to-pink-600'},
            {label:'STEM Pathway', val:'142', sub:'45% of school', grad:'from-violet-500 to-purple-600'},
            {label:'Conflicts', val:'0', sub:'Auto-solved', grad:'from-amber-400 to-orange-500'},
          ].map(c => (
            <div key={c.label} className={`bg-gradient-to-br ${c.grad} rounded-[24px] p-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <p className="text-white/70 text-sm">{c.label}</p>
              <h2 className="text-4xl font-bold mt-2">{c.val}</h2>
              <p className="text-xs mt-2 bg-white/20 inline-block px-3 py-1 rounded-full">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Pathway Switcher + Timetable */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold" style={{fontFamily:'var(--font-playfair)'}}>Senior Timetable Generator</h2>
            <div className="flex gap-2 bg-gray-100 rounded-full p-1">
              {['STEM','Social Sciences','Arts & Sports'].map(p => (
                <button key={p} onClick={()=>setActivePathway(p)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activePathway===p? 'bg-gradient-to-r from-[#2a3bff] to-[#7c3aed] text-white shadow-lg' : 'text-gray-600'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Timetable Grid Mock */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-xs uppercase">
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3">Mon</th><th className="p-3">Tue</th><th className="p-3">Wed</th><th className="p-3">Thu</th><th className="p-3">Fri</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['7:30-8:10','Math','Chem Lab','English','Physics','Bio'],
                  ['8:10-8:50','Physics','Math','Kiswahili','Math','Chem'],
                  ['8:50-9:30','BREAK','BREAK','BREAK','BREAK','BREAK'],
                  ['9:30-10:50','Bio Lab','Agric','Comp Studies','Math','English'],
                ].map((row,i)=>(
                  <tr key={i} className="border-t border-gray-100">
                    {row.map((cell,j)=>(
                      <td key={j} className={`p-3 ${j===0? 'font-bold text-gray-500' : ''} ${cell.includes('Lab')? 'bg-amber-50 text-amber-700 rounded-lg font-medium' : ''}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="mt-8 w-full bg-gradient-to-r from-[#2a3bff] to-[#7c3aed] text-white py-4 rounded-2xl font-bold shadow-[0_10px_20px_rgba(42,59,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
            ✨ Auto-Generate {activePathway} Timetable (No Conflicts)
          </button>
        </div>
      </main>
    </div>
  )
}
