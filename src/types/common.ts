export interface Notification {
  status: string;
  message: string;
}
export interface Avatar {
  small: string;
  medium: string;
  large: string;
}

export interface User {
  url: string;
  username: string;
  about: string;
  home_page: string;
  avatar: Avatar;
  date_joined: string;
  num_sounds: number;
  sounds: string;
  num_packs: number;
  packs: string;
  num_posts: number;
  num_comments: number;
  bookmark_categories: string;
  email: string;
  unique_id: number;
  ref: string;
  ts: number;
}

export type Upload = {
  ref?: string;
  name: string;
  key: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
  file: File;
};
