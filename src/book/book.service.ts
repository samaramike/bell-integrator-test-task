import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { GetBookAgrs } from './dto/get-book.args';

@Injectable()
export class BookService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  public find(bookAgrs: GetBookAgrs) {
    return this.entityManager.find(Book, { where: bookAgrs });
  }

  public create(data: CreateBookInput) {
    const book = this.entityManager.create(Book, data);
    return this.entityManager.save(book);
  }
}
