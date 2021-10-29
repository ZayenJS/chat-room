import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Message } from '../../Models/Message';
import { Room } from '../../Models/Room';
import { User } from '../../Models/User';
import { SocketIO } from '../../utils/Socket';
import { AddMessageData } from './InputTypes/MessageInputTypes';

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages() {
    return Message.find({ order: { id: 'ASC' }, relations: ['user', 'room'] });
  }

  @Mutation(() => Message)
  async addMessage(@Arg('data') data: AddMessageData) {
    const { content, user_id, room_id } = data;

    const userPromise = User.findOne({ id: +user_id });
    const roomPromise = Room.findOne({ id: room_id });

    const [user, room] = await Promise.all([userPromise, roomPromise]);

    if (user && room) {
      const message = Message.create({
        content,
        user,
        room,
      });

      await message.save();

      room.messages?.push(message);
      room.save();

      const io = SocketIO.getIo();

      io.in(room.id).emit('new_message', {
        ...message,
        id: +message.id,
        user: {
          ...message.user,
          id: +message.user!.id,
        },
      });

      return message;
    }

    return room;
  }
}
