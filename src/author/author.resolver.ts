import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorInput } from './create-author.input';

@Resolver(of => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => [Author])
  public async authors(): Promise<Author[]> {
    return this.authorService.find();
  }

  @Mutation(returns => Author)
  public async createAuthor(
    @Args('data') createAuthorInput: CreateAuthorInput,
  ): Promise<Author> {
    return this.authorService.create(createAuthorInput);
  }
}
