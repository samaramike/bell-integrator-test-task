import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class GetAuthorAgrs {
  @Field(type => Int,{ nullable: true })
  public authorId?: string;

  @Field(type => Int,{ nullable: true })
  public name?: string;
}
