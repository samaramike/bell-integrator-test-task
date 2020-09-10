import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../book/book.entity';

@ObjectType('Author')
@Entity({ name: 'authors' })
export class Author extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn({ name: 'id' })
  public authorId: number;

  @Field(type => String)
  @Column()
  public name: string;

  @Field(type => [Book])
  @OneToMany(type => Book, book => book.author)
  public books: Promise<Book[]>;
}
