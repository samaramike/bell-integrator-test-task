import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../author/author.entity';

@ObjectType('Book')
@Entity({ name: 'books' })
export class Book extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn({ name: 'id' })
  public bookId: number;

  @Field(type => String)
  @Column()
  public name: string;

  @Field(type => Int)
  @Column({ name: 'page_count' })
  public pageCount: number;

  @Field(type => Author)
  @ManyToOne(type => Author, author => author.books)
  @JoinColumn({ name: 'author_id' })
  public author: Author;

  @Field(type => Int)
  @Column({ name: 'author_id' })
  public authorId: number;
}
