import React from 'react';
import { STYLES } from '../constants';
import { StyleConfig } from '../types';

interface StyleSelectorProps {
  selectedStyle: StyleConfig;
  onSelect: (style: StyleConfig) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <span className="w-1 h-6 bg-power-red rounded-full"></span>
        1. Chọn Phong Cách
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style)}
            className={`
              relative group flex flex-col items-start p-3 rounded-xl border transition-all duration-300
              ${selectedStyle.id === style.id 
                ? 'bg-power-red/10 border-power-red ring-1 ring-power-red' 
                : 'bg-power-gray border-transparent hover:border-gray-600 hover:bg-neutral-800'
              }
            `}
          >
            <div className="w-full aspect-video rounded-md overflow-hidden mb-2 bg-black relative">
               <img 
                 src={style.thumbnailUrl} 
                 alt={style.label} 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
               />
               {selectedStyle.id === style.id && (
                 <div className="absolute inset-0 bg-power-red/20 border-2 border-power-red"></div>
               )}
            </div>
            <span className={`text-sm font-bold ${selectedStyle.id === style.id ? 'text-power-red' : 'text-gray-200'}`}>
              {style.label}
            </span>
            <span className="text-xs text-gray-500 text-left line-clamp-2 mt-1">
              {style.description}
            </span>
            
            {selectedStyle.id === style.id && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-power-red rounded-full shadow-[0_0_8px_#D00000]"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};