export interface Project {
  id: number;
  name: string;
  product_type: string;
  status: string;
  created_at: string;
  video: {
    url: string | null;
    thumbnail: string | null;
    duration: number | null;
    resolution: string | null;
    status: string;
    completed_at: string | null;
  };
  image_count: number;
  first_image_url: string | null;
  site_url: string | null;
  progress: number;
  views_count: number;
} 