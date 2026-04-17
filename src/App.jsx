import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, LayoutGrid, Sun, Moon, ImportIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SurahList from './components/SurahList';
import SurahDetail from './components/SurahDetail';
import './index.css'

const App = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurahId, setSelectedSurahId] = useState(null);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      const res = await axios.get('https://equran.id/api/v2/surat');
      setSurahs(res.data.data);
    };
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (search.length > 1) {
      const filtered = surahs.filter(s => s.namaLatin.toLowerCase().includes(search.toLowerCase())).slice(0, 5);
      setSuggestions(filtered);
    } else { setSuggestions([]); }
  }, [search, surahs]);

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDarkMode ? 'bg-[#05070a]' : 'bg-slate-200'}`}>
      <div className="max-w-6xl mx-auto p-6">
        
        {/* HEADER */}
        <header className="flex items-center justify-between mb-12 mt-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => {setSelectedSurahId(null); setSearch('')}}>
            <img src="./logo1.png" alt="S+" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(253,224,71,0.4)]" />
            <div className="hidden sm:block">
               <h1 className={`text-3xl font-black tracking-tighter italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>S+ <span className="text-s-plus-yellow not-italic">QURAN</span></h1>
               <p className="text-[10px] uppercase tracking-[0.3em] text-s-plus-yellow/60 font-bold">Premium Digital Al-Quran</p>
            </div>
          </div>

          <div className="flex gap-3">
             <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 rounded-xl glass-yellow text-s-plus-yellow transition-all">
                {isDarkMode ? <Sun size={24} fill="currentColor" /> : <Moon size={24} className="text-slate-600"/>}
             </button>
             <button onClick={() => {setSelectedSurahId(null); setSearch('')}} className="p-3 rounded-xl glass-yellow text-s-plus-yellow hover:scale-110 transition-all">
                <LayoutGrid size={24}/>
             </button>
          </div>
        </header>

        {/* SEARCH & SUGGEST */}
        {!selectedSurahId && (
          <div className="relative mb-14 max-w-2xl mx-auto z-50">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-s-plus-yellow transition-all" size={22} />
              <input 
                type="text"
                placeholder="Search for a surah..."
                className={`w-full glass-yellow py-5 pl-14 pr-6 rounded-2xl outline-none focus:ring-1 focus:ring-s-plus-yellow/50 text-lg transition-all ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute w-full mt-2 bg-[#0a0f1a] glass-yellow rounded-2xl overflow-hidden shadow-2xl border border-s-plus-yellow/20">
                  {suggestions.map((s) => (
                    <div key={s.nomor} className="px-6 py-4 hover:bg-s-plus-yellow/10 cursor-pointer flex justify-between items-center group transition-colors border-b border-white/5 last:border-0"
                      onClick={() => { setSelectedSurahId(s.nomor); setSearch(''); setSuggestions([]); }}>
                      <div className="flex items-center gap-3">
                        <Search size={14} className="text-slate-500 group-hover:text-s-plus-yellow" />
                        <span className="font-bold text-slate-200 group-hover:text-s-plus-yellow transition-colors">{s.namaLatin}</span>
                      </div>
                      <span className="font-arabic text-s-plus-yellow opacity-70">{s.nama}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence mode="wait">
          {selectedSurahId ? (
            <SurahDetail key="detail" surahId={selectedSurahId} onBack={() => setSelectedSurahId(null)} isDarkMode={isDarkMode} />
          ) : (
            <SurahList key="list" surahs={surahs} search={search} onSelect={(id) => setSelectedSurahId(id)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;

// let count = 0; 

// function Counter() { 
//   const [setCount, count]  = useState(0);
//   const handleAdd = () => {
//     setCount(count + 1);
//   }}
// return <button onClick={handleAdd}> Angka: {count}</button>;



// function Counter() {
//   const [count, setCount] = useState(0); 

//   const handleAdd = () => {
//     setCount(count + 1); 
//   }
//   return <button onClick={handleAdd}>Angka: {count}</button>;
// }