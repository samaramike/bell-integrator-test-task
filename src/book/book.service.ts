import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput } from './create-book.input';

@Injectable()
export class BookService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public find(filter = {}) {
    return this.entityManager.find(Book, { where: filter });
  }

  public create(data: CreateBookInput) {
    const book = this.entityManager.create(Book, data);
    return this.entityManager.save(book);
  }
}
