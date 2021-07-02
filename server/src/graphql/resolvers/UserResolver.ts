import { Query, Resolver } from 'type-graphql';
import { User } from '../../Models/User';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find({ order: { id: 'ASC' } });
  }
}
