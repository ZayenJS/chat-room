import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Generated,
} from 'typeorm';
import { Message } from './Message';
import { Room } from './Room';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id!: number;

  @Field(() => String, { nullable: false })
  @Column('varchar', { nullable: false, unique: true })
  public username!: string;

  @Field(() => String, { nullable: false })
  @Column('varchar', { nullable: false, unique: true })
  public email!: string;

  @Column('varchar', { nullable: false })
  public password!: string;

  @Column('uuid', { nullable: true })
  password_reset_token?: string;

  @Field(() => Date, { nullable: false })
  @Column('timestamp', { nullable: true, default: new Date() })
  public created_at?: Date;

  @Field(() => Date)
  @Column('timestamp', { nullable: true, default: new Date() })
  public updated_at?: Date;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.user)
  public messages?: Message[];

  @Field(() => [Room])
  @OneToMany(() => Room, (room) => room.creator)
  public created_rooms?: Room[];

  @Field(() => Room)
  @ManyToOne(() => Room, (room) => room.guests)
  public current_room?: Room;
}
