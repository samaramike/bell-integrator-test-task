import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorInput } from './create-author.input';

@Injectable()
export class AuthorService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public find(filter = {}) {
    return this.entityManager.find(Author, { where: filter });
  }

  public async create(data: CreateAuthorInput) {
    const author = this.entityManager.create(Author, data);
    return this.entityManager.save(author);
  }
}
