import 'dotenv/config';
// tslint:disable-next-line:ordered-imports
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Application tests', () => {
  let server;
  let createdAuthorId;
  const authorName = 'Пушкин';

  const sendRequest = async (query: string) => {
    return request(server)
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query,
      }) as any;
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();

    // const dbConnection = getConnection();
    // const entityManager = dbConnection.createEntityManager();
    // await entityManager.remove(Book);
    // await entityManager.remove(Author);
  });

  describe('AuthorModule tests', async () => {
    it('mutation createAuthor', async () => {
      const query = `mutation {
        createAuthor(data: {
          name: "${authorName}"
        }) {
          authorId,
          name
        }
      }
    `;
      const response = await sendRequest(query);
      expect(response.status).toBe(200);

      const createdAuthor = (JSON.parse(response.res.text)).data.createAuthor;
      createdAuthorId = createdAuthor.authorId;
      expect(createdAuthorId).toBeGreaterThan(0);
      expect(createdAuthor.name).toBe(authorName);
    });

    it('getAuthors', async () => {
      const query = `{
        authors {
          authorId
          name
        }
      }
    `;
      const response = await sendRequest(query);
      expect(response.status).toBe(200);
    });
  });

  describe('BookModule tests', async () => {
    const newBooks = [
      { name: 'Евгений Онегин', pageCount: 600 },
      { name: 'Капитанская дочка', pageCount: 500 },
    ];

    for (const book of newBooks) {
      it('mutation createBook', async () => {
        const query = `mutation {
            createBook(data: {
              name: "${book.name}"
              pageCount: ${book.pageCount}
              authorId: ${createdAuthorId}
            }) {
              bookId
              name
              pageCount
            }
          }
        `;
        const response = await sendRequest(query);
        expect(response.status).toBe(200);

        const createdBook = (JSON.parse(response.res.text)).data.createBook;
        expect(createdBook.bookId).toBeGreaterThan(0);
        expect(createdBook.name).toBe(book.name);
        expect(createdBook.pageCount).toBe(book.pageCount);
      });
    }

    it('Get books with authors', async () => {
      const query = `{
        books {
          name
          author {
            name
          }
        }
      }
    `;
      const response = await sendRequest(query);
      expect(response.status).toBe(200);

      const foundBook = (JSON.parse(response.res.text)).data.books[0];
      expect(foundBook.author).toBeDefined();
      expect(foundBook.author.name).toBeDefined();
    });

    it('Get books without authors', async () => {
      const query = `{
        books {
          name
        }
      }
    `;
      const response = await sendRequest(query);
      expect(response.status).toBe(200);

      const foundBook = (JSON.parse(response.res.text)).data.books[0];
      expect(foundBook.author).toBeUndefined();
    });
  });
});
