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

    const user = await User.findOne({ id: +user_id });
    const room = await Room.findOne({ id: room_id });

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

      io.in(room.id).emit('new_message', message);

      return message;
    }

    return room;
  }
}
