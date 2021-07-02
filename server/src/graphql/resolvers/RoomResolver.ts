import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Room } from '../../Models/Room';
import { User } from '../../Models/User';
import { SocketIO } from '../../utils/Socket';
import { CreateRoomParams } from './InputTypes/RoomInputTypes';

@Resolver()
export class RoomResolver {
  @Query(() => [Room])
  rooms() {
    return Room.find({ order: { created_at: 'ASC' }, relations: ['messages'] });
  }

  @Query(() => Room || null)
  async room(@Arg('id') id: string) {
    const room = await Room.findOne({ where: { id } });

    const io = SocketIO.getIo();

    io.sockets.to(room!.id).emit('join_room', room);

    return room ?? null;
  }

  @Mutation(() => Room || null)
  async createRoom(@Arg('data') data: CreateRoomParams) {
    const { name, type, userId } = data;
    const user = await User.findOne(userId);
    const room = Room.create({ name, type, creator: user });

    return room.save();
  }
}
