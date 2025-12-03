export enum ThumbnailStyle {
  CLICKBAIT = 'Clickbait (Sốc & Tương phản cao)',
  MINIMALIST = 'Tối giản (Sang trọng & Sạch)',
  VS = 'Đối đầu (Versus/Battle)',
  REACTION = 'Biểu cảm khuôn mặt (Cận cảnh)',
  GAMING = 'Gaming (Neon & Hành động)',
  EXPLAINER = 'Giải thích (Đồ họa & Mũi tên)',
  VLOG = 'Vlog (Đời sống & Chân thực)',
  CINEMATIC = 'Điện ảnh (Ánh sáng & Màu phim)'
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface StyleConfig {
  id: ThumbnailStyle;
  label: string;
  description: string;
  promptModifier: string;
  thumbnailUrl: string;
}
