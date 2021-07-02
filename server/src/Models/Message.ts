import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@ObjectType()
@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @Field(() => String, { nullable: false })
  @Column('varchar', { nullable: false })
  content!: string;

  @Field(() => Date, { nullable: false })
  @Column('timestamp', { nullable: true, default: new Date() })
  created_at?: Date;

  @Field(() => Date)
  @Column('timestamp', { nullable: true })
  updated_at?: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @Field(() => Room)
  @ManyToOne(() => Room, (room) => room.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room?: Room;
}
