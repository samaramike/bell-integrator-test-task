import * as DataLoader from 'dataloader';
import { getRepository, In } from 'typeorm';
import { Author } from './author.entity';

const batchAuthors = async (authorIds: string[]) => {
  const authors = await getRepository(Author)
    .find({
      where: {
        authorId: In(authorIds),
      },
    });

  const authorsObj = authors.reduce((result, prev) => {
    result[prev.authorId] = prev;
    return result;
  }, {});

  return authorIds.map(id => authorsObj[id]);
};

const authorsLoader = () => new DataLoader(batchAuthors);

export {
  authorsLoader,
};
