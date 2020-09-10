import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class GetBookAgrs {
  @Field(type => Int,{ nullable: true })
  public bookId?: number;

  @Field(type => Int,{ nullable: true })
  public authorId?: number;

  @Field({ nullable: true })
  public name?: string;
}
