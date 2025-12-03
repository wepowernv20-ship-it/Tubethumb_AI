import React, { useRef } from 'react';

interface ImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => {
        const combined = [...prev, ...newFiles];
        return combined.slice(0, 3); // Max 3 images
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <span className="w-1 h-6 bg-power-red rounded-full"></span>
        2. Ảnh Đầu Vào (Tối đa 3)
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {/* Preview Slots */}
        {images.map((file, idx) => (
          <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 group">
            <img 
              src={URL.createObjectURL(file)} 
              alt="preview" 
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full hover:bg-power-red transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {/* Upload Button */}
        {images.length < 3 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg hover:border-power-red hover:bg-power-red/5 transition-all text-gray-500 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="text-xs">Thêm ảnh</span>
          </button>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*" 
        multiple 
      />
      <p className="text-xs text-gray-500">
        *Sử dụng ảnh chân dung hoặc sản phẩm để AI lấy cảm hứng.
      </p>
    </div>
  );
};