import { Args, Context, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Author } from '../author/author.entity';
import { IGraphQLContext } from '../common/types/graphql.types';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookInput } from './dto/create-book.input';
import { GetBookAgrs } from './dto/get-book.args';

@Resolver(of => Book)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
  ) {}

  @Query(returns => [Book])
  public async books(@Args() bookAgrs: GetBookAgrs): Promise<Book[]> {
    return this.bookService.find(bookAgrs);
  }

  @Mutation(() => Book)
  public async createBook(
    @Args('data') createBookInput: CreateBookInput,
  ): Promise<Book> {
    return this.bookService.create(createBookInput);
  }

  @ResolveProperty('author', () => Author)
  private async author(
    @Parent() book: Book,
    @Context() { authorsLoader }: IGraphQLContext,
  ): Promise<Author[]> {
    return authorsLoader.load(book.authorId.toString());
  }
}
