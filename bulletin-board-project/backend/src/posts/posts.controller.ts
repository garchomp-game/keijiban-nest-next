export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  async create(createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  async findAll() {
    return this.postsService.findAll();
  }

  async findOne(id: string) {
    return this.postsService.findOne(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  async remove(id: string) {
    return this.postsService.remove(id);
  }
}