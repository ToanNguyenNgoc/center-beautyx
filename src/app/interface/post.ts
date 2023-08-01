import { IOrganization } from "app/interface/organization";
import { IService } from "app/interface/service";
import { Tag } from "app/interface/tag";
import { User } from "app/interface/user";

export interface Post {
  id: number,
  content: string,
  status: number,
  organization_id: number,
  tag_id: number,
  user_id: number,
  created_at: string,
  updated_at: string,
  is_favorite: boolean,
  list_service: IService[],
  media_url: string[],
  tag?: Tag,
  user: User,
  organization?: IOrganization,
  media: any[],
  favorite_count: number,
  comment_count: number
}