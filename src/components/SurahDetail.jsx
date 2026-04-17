import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, Play, Pause, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const SurahDetail = ({ surahId, onBack, isDarkMode }) => {
  const [detail, setDetail] = useState(null);
  const [playingId, setPlayingId] = useState(null); // ID ayat yang lagi diputar
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios.get(`https://equran.id/api/v2/surat/${surahId}`);
      setDetail(res.data.data);
    };
    fetchDetail();
    window.scrollTo(0, 0);
    return () => { audioRef.current.pause(); };
  }, [surahId]);

  // Fungsi putar satu ayat
  const playAyat = (url, id) => {
    setIsFullPlaying(false);
    if (playingId === id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      setPlayingId(id);
      audioRef.current.src = url;
      audioRef.current.play();
    }
  };

  // Fungsi putar Full Surah (Auto lanjut)
  const playFullSurah = () => {
    if (isFullPlaying) {
      audioRef.current.pause();
      setIsFullPlaying(false);
      setPlayingId(null);
    } else {
      setIsFullPlaying(true);
      playSequence(0);
    }
  };

  const playSequence = (index) => {
    if (index >= detail.ayat.length) {
      setIsFullPlaying(false);
      setPlayingId(null);
      return;
    }
    const currentAyat = detail.ayat[index];
    setPlayingId(currentAyat.nomorAyat);
    audioRef.current.src = currentAyat.audio['05'];
    audioRef.current.play();
    audioRef.current.onended = () => playSequence(index + 1);
  };

  if (!detail) return <div className="text-center py-20 text-s-plus-yellow font-black animate-pulse">LOADING DIVINE WORDS...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button onClick={() => {audioRef.current.pause(); onBack();}} className="flex items-center gap-2 text-s-plus-yellow mb-8 font-black uppercase text-xs tracking-[0.2em] hover:ml-2 transition-all">
        <ChevronLeft size={20}/> Back to Home
      </button>

      {/* HERO HEADER DETAIL */}
      <div className="glass-yellow p-10 rounded-[3rem] mb-12 text-center relative overflow-hidden border-b-8 border-s-plus-yellow/10">
        <h2 className="text-6xl font-black text-white italic tracking-tighter mb-2">{detail.namaLatin}</h2>
        <p className="text-s-plus-yellow font-bold uppercase tracking-[0.4em] text-sm opacity-80 mb-6">{detail.arti}</p>
        
        {/* Tombol Play Full Surah */}
        <button 
          onClick={playFullSurah}
          className={`mx-auto flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all ${isFullPlaying ? 'bg-white text-black scale-95' : 'bg-s-plus-yellow text-black hover:scale-105 shadow-[0_10px_30px_rgba(253,224,71,0.3)]'}`}
        >
          {isFullPlaying ? <Pause size={20} fill="currentColor"/> : <Headphones size={20} />}
          {isFullPlaying ? "PAUSE FULL SURAH" : "PLAY FULL SURAH"}
        </button>
        
        <div className="mt-8 font-arabic text-5xl text-white/10 select-none">{detail.nama}</div>
      </div>

      {/* LIST AYAT */}
      <div className="space-y-6 pb-32">
        {detail.ayat.map((item) => (
          <motion.div key={item.nomorAyat} className={`glass-yellow p-8 rounded-[2.5rem] transition-all border-l-4 ${playingId === item.nomorAyat ? 'border-s-plus-yellow bg-s-plus-yellow/5' : 'border-transparent'}`}>
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-s-plus-yellow text-black flex items-center justify-center font-black text-xl shadow-lg">{item.nomorAyat}</span>
                  <button onClick={() => playAyat(item.audio['05'], item.nomorAyat)} className={`p-4 rounded-2xl transition-all ${playingId === item.nomorAyat ? 'bg-white text-black' : 'bg-white/5 text-s-plus-yellow hover:bg-white/10'}`}>
                    {playingId === item.nomorAyat ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>
                </div>
                <p className={`font-arabic text-4xl leading-[4.5rem] text-right flex-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{item.teksArab}</p>
              </div>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                <p className="text-s-plus-yellow text-lg font-medium leading-relaxed italic">"{item.teksIndonesia}"</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SurahDetail;