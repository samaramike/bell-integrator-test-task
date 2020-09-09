import { ArgsType, Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateBookInput {
  @Field(type => String)
  public name: string;

  @Field(type => Int)
  public pageCount: number;

  @Field(type => Int)
  public authorId: number;
}

@ArgsType()
export class GetBookAgrs {
  @Field({ nullable: true })
  public id?: string;

  @Field({ nullable: true })
  public name?: string;
}
