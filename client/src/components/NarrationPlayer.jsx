import React, { useState, useEffect } from 'react';

const NarrationPlayer = ({ script }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    setSynth(window.speechSynthesis);
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleSpeak = () => {
    if (!synth) return;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(script);
    
    utterance.pitch = 0.9; 
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    synth.speak(utterance);
  };

  return (
    <div className="mt-12 bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Narrated Experience</h2>
          <p className="text-indigo-200 italic leading-relaxed">
            "{script}"
          </p>
        </div>
        
        <button
          onClick={handleSpeak}
          className={`h-20 w-20 flex items-center justify-center rounded-full transition-all transform hover:scale-105 ${
            isSpeaking ? 'bg-red-500 animate-pulse' : 'bg-white text-indigo-900'
          }`}
        >
          {isSpeaking ? (
            <span className="text-2xl font-bold">Stop</span>
          ) : (
            <span className="text-4xl ml-1">▶</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default NarrationPlayer;