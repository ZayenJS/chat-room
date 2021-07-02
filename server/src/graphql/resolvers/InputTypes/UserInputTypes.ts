import { Field, InputType } from 'type-graphql';

@InputType()
export class UserSignupParams {
  @Field(() => String, { nullable: false })
  username!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}

@InputType()
export class UserLoginData {
  @Field(() => String, { nullable: false })
  emailOrUsername!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}
