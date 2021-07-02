import { Field, ObjectType } from 'type-graphql';
import { Error } from '../../../@types/Error';
import { User } from '../../../Models/User';

@ObjectType()
export class UserResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => User, { nullable: true })
  user?: User;
}
