import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { GetAuthorAgrs } from './dto/get-author.args';

@Injectable()
export class AuthorService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public find(authorAgrs: GetAuthorAgrs = {}) {
    return this.entityManager.find(Author, { where: authorAgrs });
  }

  public async create(data: CreateAuthorInput) {
    const author = this.entityManager.create(Author, data);
    return this.entityManager.save(author);
  }
}
