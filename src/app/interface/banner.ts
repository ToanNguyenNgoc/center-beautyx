export interface IBanner {
  id: number;
  name: string;
  type: string | null;
  imageURL: string;
  htmlTemplate?: string;
  url: string;
  target: string | null;
  width: string | number;
  height: string | number;
  view_count: string | number;
  expires_at: string;
  origin_type: string | null;
  origin_id: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  platform: string;
  priority: number
}