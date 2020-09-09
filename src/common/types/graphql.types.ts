import { authorsLoader } from '../../author/authors.loader';

export interface IGraphQLContext {
  authorsLoader: ReturnType<typeof authorsLoader>;
}
