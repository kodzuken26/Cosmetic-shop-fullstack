export interface BlogBlock {
    id: number;
    block_type: 'text' | 'image' | 'video' | 'quote';
    order: number;
    text_content?: string;
    image?: string;
    image_alt?: string;
    video_url?: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    author: string;
    created_at: string;
    updated_at: string;
    is_published: boolean;
    blocks: BlogBlock[];
}

export interface BlogState {
    posts: BlogPost[];
    currentPost: BlogPost | null;
    loading: boolean;
    error: string | null;
}