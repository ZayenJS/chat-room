import http from 'http';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Message } from '../Models/Message';
import { Room } from '../Models/Room';
import { User } from '../Models/User';

export class SocketIO extends Server {
  private static io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> | null = null;

  public static init(server: http.Server) {
    console.log('Socket init !');

    SocketIO.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    SocketIO.io.on('connection', (socket) => {
      console.log('A user has joined.');

      socket.on('join_room', (room, user: User) => {
        socket.join(room);
        socket.to(room).emit('user_joined', `${user.username} a rejoint !`);
      });

      socket.on('leave_room', (room, user: User) => {
        socket.leave(room);
        socket.to(room).emit('user_left', `${user.username} est parti...`);
      });
    });

    return SocketIO;
  }

  public static getIo = () => {
    if (!SocketIO.io) {
      throw new Error('Socket was not initialized !');
    }

    return SocketIO.io;
  };
}
