export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDto {
  title: string;
  content: string;
  authorId: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
}