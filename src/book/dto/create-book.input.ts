import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateBookInput {
  @Field(type => String)
  public name: string;

  @Field(type => Int)
  public pageCount: number;

  @Field(type => Int)
  public authorId: number;
}
