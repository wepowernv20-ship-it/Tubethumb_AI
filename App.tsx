import React, { useState } from 'react';
import { Header } from './components/Header';
import { StyleSelector } from './components/StyleSelector';
import { ImageUploader } from './components/ImageUploader';
import { STYLES } from './constants';
import { StyleConfig } from './types';
import { generateThumbnail } from './services/geminiService';

const App: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<StyleConfig>(STYLES[0]);
  const [images, setImages] = useState<File[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // Changed from single string to array of strings
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0);
  
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Vui lòng nhập mô tả ý tưởng.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResultImages([]);
    setSelectedResultIndex(0);

    try {
      const generatedUrls = await generateThumbnail(prompt, selectedStyle.promptModifier, images);
      setResultImages(generatedUrls);
    } catch (err: any) {
      console.error(err);
      setError("Có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const currentImage = resultImages.length > 0 ? resultImages[selectedResultIndex] : null;

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-gray-100 selection:bg-power-red selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Controls */}
            <div className="lg:col-span-4 space-y-8">
              
              <StyleSelector selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
              
              <ImageUploader images={images} setImages={setImages} />
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-power-red rounded-full"></span>
                  3. Mô Tả Nội Dung
                </h3>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ví dụ: Reaction sốc khi nhìn thấy iPhone 16 mới..."
                  className="w-full h-32 bg-power-gray border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-power-red focus:ring-1 focus:ring-power-red transition-all resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`
                  w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider shadow-lg transition-all transform
                  ${isGenerating 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-700 to-power-red text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(208,0,0,0.4)]'
                  }
                `}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang Vẽ (2x)...
                  </span>
                ) : (
                  "Tạo 2 Thumbnail Ngay"
                )}
              </button>
              
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-900 text-red-200 text-sm rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-8 space-y-4">
              {/* Main Preview */}
              <div className="bg-power-gray rounded-2xl p-1 border border-gray-800 shadow-2xl min-h-[400px] flex flex-col relative">
                 <div className="flex-1 bg-black rounded-xl overflow-hidden relative group flex items-center justify-center aspect-video">
                    {currentImage ? (
                      <>
                        <img 
                          src={currentImage} 
                          alt="Generated Thumbnail" 
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a 
                            href={currentImage} 
                            download={`thumbnail-option-${selectedResultIndex + 1}.png`}
                            className="bg-power-red text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-white hover:text-power-red transition-colors flex items-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m0 0l3-3m-3 3h7.5" />
                            </svg>
                            Tải Xuống #{selectedResultIndex + 1}
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-12 opacity-30">
                        {isGenerating ? (
                           <div className="space-y-4">
                             <div className="w-16 h-16 border-4 border-power-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                             <p className="text-xl font-bold">AI đang vẽ 2 phương án...</p>
                           </div>
                        ) : (
                          <div className="space-y-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-32 h-32 mx-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <p className="text-2xl font-bold">Khu Vực Hiển Thị</p>
                            <p className="text-sm">Kết quả sẽ hiển thị 2 phương án để bạn chọn</p>
                          </div>
                        )}
                      </div>
                    )}
                 </div>
              </div>

              {/* Thumbnails Selection Grid */}
              {resultImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {resultImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedResultIndex(idx)}
                      className={`
                        relative rounded-xl overflow-hidden border-2 transition-all duration-300 aspect-video group
                        ${selectedResultIndex === idx 
                          ? 'border-power-red ring-2 ring-power-red ring-offset-2 ring-offset-neutral-900' 
                          : 'border-gray-700 hover:border-gray-500 opacity-70 hover:opacity-100'
                        }
                      `}
                    >
                      <img src={img} alt={`Option ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-bold backdrop-blur-sm">
                        Phương án #{idx + 1}
                      </div>
                      {selectedResultIndex === idx && (
                         <div className="absolute inset-0 bg-power-red/10 pointer-events-none"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-gray-500 text-sm px-1">
                  <div>
                    Resolution: 16:9 Standard
                  </div>
                  <div>
                    Model: gemini-2.5-flash-image
                  </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default App;