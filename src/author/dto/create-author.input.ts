import { ArgsType, Field, InputType } from 'type-graphql';

@InputType()
export class CreateAuthorInput {
  @Field(type => String)
  public name: string;
}
