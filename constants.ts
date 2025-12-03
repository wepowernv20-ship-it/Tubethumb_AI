import { ThumbnailStyle, StyleConfig } from './types';

export const STYLES: StyleConfig[] = [
  {
    id: ThumbnailStyle.CLICKBAIT,
    label: "Gây Sốc (Clickbait)",
    description: "Màu sắc rực rỡ, biểu cảm phóng đại, độ tương phản cực cao.",
    promptModifier: "YouTube thumbnail style, hyper-expressive face, high contrast, vibrant red and yellow arrows, big bold text placeholders, shocking atmosphere, high quality.",
    thumbnailUrl: "https://picsum.photos/seed/clickbait/300/169"
  },
  {
    id: ThumbnailStyle.GAMING,
    label: "Gaming",
    description: "Hiệu ứng Neon, nhân vật hành động, đậm chất game thủ.",
    promptModifier: "YouTube gaming thumbnail, neon lights, dynamic action pose, intense atmosphere, glow effects, esports style, high quality.",
    thumbnailUrl: "https://picsum.photos/seed/gaming/300/169"
  },
  {
    id: ThumbnailStyle.VS,
    label: "Đối Đầu (VS)",
    description: "Chia đôi màn hình, sự đối lập giữa hai chủ thể.",
    promptModifier: "YouTube thumbnail, split screen composition, versus battle, fire and ice contrast, lightning effects in the middle, intense rivalry, high quality.",
    thumbnailUrl: "https://picsum.photos/seed/versus/300/169"
  },
  {
    id: ThumbnailStyle.MINIMALIST,
    label: "Tối Giản",
    description: "Sạch sẽ, tập trung vào chủ thể chính, ít chi tiết thừa.",
    promptModifier: "Minimalist YouTube thumbnail, clean background, single focal point, professional lighting, high quality photography, modern aesthetic, high quality.",
    thumbnailUrl: "https://picsum.photos/seed/minimal/300/169"
  },
  {
    id: ThumbnailStyle.REACTION,
    label: "Cận Cảnh Cảm Xúc",
    description: "Gương mặt chiếm ưu thế với cảm xúc mạnh.",
    promptModifier: "Close-up YouTube thumbnail, extreme facial expression, emotional eyes, blurred background, studio lighting, high quality.",
    thumbnailUrl: "https://picsum.photos/seed/react/300/169"
  },
  {
    id: ThumbnailStyle.CINEMATIC,
    label: "Điện Ảnh",
    description: "Màu phim, ánh sáng nghệ thuật, kịch tính.",
    promptModifier: "Cinematic YouTube thumbnail, movie poster quality, dramatic lighting, color grading, depth of field, epic composition, high quality.",
    thumbnailUrl: "https://picsum.photos/seed/cinema/300/169"
  },
];