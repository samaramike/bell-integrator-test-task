import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorInput } from './dto/create-author.input';
import { GetAuthorAgrs } from './dto/get-author.args';

@Resolver(of => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => [Author])
  public async authors(
    @Args() authorAgrs: GetAuthorAgrs,
  ): Promise<Author[]> {
    return this.authorService.find(authorAgrs);
  }

  @Mutation(returns => Author)
  public async createAuthor(
    @Args('data') createAuthorInput: CreateAuthorInput,
  ): Promise<Author> {
    return this.authorService.create(createAuthorInput);
  }
}
