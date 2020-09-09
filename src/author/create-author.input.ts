import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
export class CreateAuthorInput {
  @Field(type => String)
  public name: string;
}

@ArgsType()
export class GetUserAgrs {
  @Field({ nullable: true })
  public id?: string;

  @Field({ nullable: true })
  public name?: string;
}
