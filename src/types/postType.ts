export interface Like {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BaseUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: string[];
  likes: string[];
  comments: string[];
  followers: Follow[];
  following: Follow[];
  notifications: string[];
  messages: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ExtendedUser extends BaseUser {
  username?: string;
  coverImage?: string;
  coverImagePublicId?: string;
  image?: string;
  imagePublicId?: string;
}

export interface Follow {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  _id: string;
  comment: string;
  author: BaseUser;
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Channel {
  _id: string;
  name: string;
  description: string;
  authRequired: boolean;
  posts: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Post {
  _id: string;
  title: string;
  image?: string;
  imagePublicId?: string;
  likes: Like[];
  comments: Comment[];
  channel: Channel;
  author: ExtendedUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface KBONewsTypes {
  BD_SC: number;
  BD_TT: string;
  URL_LK: string;
}
