import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateRoomParams {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => Int, { nullable: false })
  userId!: number;
}
