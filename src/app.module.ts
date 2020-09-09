import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { authorsLoader } from './author/authors.loader';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    AuthorModule,
    BookModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: {
        authorsLoader: authorsLoader(),
      },
    }),
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
