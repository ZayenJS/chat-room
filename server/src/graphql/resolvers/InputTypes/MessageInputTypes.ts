import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class AddMessageData {
  @Field(() => String, { nullable: false })
  content!: string;

  @Field(() => ID, { nullable: false })
  user_id!: number;

  @Field(() => ID, { nullable: false })
  room_id!: string;
}
