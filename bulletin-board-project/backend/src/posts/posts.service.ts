import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
    private posts: PostEntity[] = [];

    create(createPostDto: CreatePostDto): PostEntity {
        const newPost = { id: Date.now(), ...createPostDto };
        this.posts.push(newPost);
        return newPost;
    }

    findAll(): PostEntity[] {
        return this.posts;
    }

    findOne(id: number): PostEntity {
        return this.posts.find(post => post.id === id);
    }

    update(id: number, updatePostDto: UpdatePostDto): PostEntity {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts[postIndex] = { ...this.posts[postIndex], ...updatePostDto };
            return this.posts[postIndex];
        }
        return null;
    }

    remove(id: number): boolean {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts.splice(postIndex, 1);
            return true;
        }
        return false;
    }
}