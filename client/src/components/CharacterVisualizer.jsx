import React from 'react';

const CharacterVisualizer = ({ characters }) => {
  if (!characters || characters.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="bg-indigo-100 p-2 rounded-lg text-xl">👥</span>
        Key Characters
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {characters.map((char, index) => (
          <div 
            key={index} 
            className="bg-white border-l-4 border-indigo-500 p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="font-bold text-indigo-900 text-lg">{char.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mt-1">
              {char.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterVisualizer;