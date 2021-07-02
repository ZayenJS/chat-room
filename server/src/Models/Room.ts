import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './Message';
import { User } from './User';

@ObjectType()
@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @Field(() => String, { nullable: false })
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Field(() => String, { nullable: false })
  @Column('varchar', { nullable: false, unique: true })
  public name!: string;

  @Field(() => String, { nullable: false })
  @Column('varchar', { nullable: false, unique: true })
  public type!: string;

  @Field(() => Date, { nullable: false })
  @Column('timestamp', { nullable: true, default: new Date() })
  public created_at?: Date;

  @Field(() => Date)
  @Column('timestamp', { nullable: true, default: new Date() })
  public updated_at?: Date;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.room, { eager: true })
  public messages?: Message[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.created_rooms, { eager: true })
  public creator?: User;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.current_room)
  public guests?: User[];
}
