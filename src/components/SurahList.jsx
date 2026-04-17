import React from 'react';
import { motion } from 'framer-motion';

const SurahList = ({ surahs, search, onSelect }) => {
  const filtered = surahs.filter(s => s.namaLatin.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((surah) => (
        <motion.div key={surah.nomor} whileHover={{ y: -8, scale: 1.02 }} onClick={() => onSelect(surah.nomor)} className="glass-yellow p-6 rounded-[2rem] flex flex-col justify-between h-48 cursor-pointer relative overflow-hidden group">
          <span className="absolute -right-2 -bottom-4 text-9xl font-black text-white/[0.03] italic group-hover:text-s-plus-yellow/[0.07] transition-all">
            {surah.nomor}
          </span>
          <div className="flex justify-between items-start z-10">
            <div className="bg-s-plus-yellow text-black text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Surah {surah.nomor}</div>
            <div className="font-arabic text-3xl text-s-plus-yellow drop-shadow-[0_0_8px_rgba(253,224,71,0.3)]">{surah.nama}</div>
          </div>
          <div className="relative z-10">
            <h3 className="font-bold text-2xl text-white group-hover:text-s-plus-yellow transition-colors italic">{surah.namaLatin}</h3>
            <p className="text-xs text-slate-400 font-medium uppercase mt-1">{surah.arti} • {surah.jumlahAyat} AYAT</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SurahList;