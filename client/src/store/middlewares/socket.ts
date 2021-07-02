import {
  ChatActions,
  JOIN_ROOM,
  LEAVE_ROOM,
  SocketActions,
  updateChat,
  WS_CONNECT,
} from '../actions';
import { MiddlewareAPI, Dispatch } from 'redux';
import socketIOClient from 'socket.io-client';
import { Message } from '../../models/Message';

const socket = socketIOClient('http://localhost:8080');

export const socketMiddleware =
  (store: MiddlewareAPI) =>
  (next: Dispatch<SocketActions | ChatActions>) =>
  async (action: SocketActions | ChatActions) => {
    switch (action.type) {
      case WS_CONNECT:
        socket.on('connected_user', (message) => {
          console.log(message);
        });

        socket.on('new_message', (message: Message) => {
          store.dispatch(updateChat(message));
        });

        socket.on('join_room', (room) => {
          console.log(room);
        });

        socket.on('user_joined', (message) => console.log(message));
        socket.on('user_left', (message) => console.log(message));
        next(action);

        break;
      case JOIN_ROOM:
        socket.emit('join_room', action.roomId, { username: 'Zayen' });

        next(action);
        break;
      case LEAVE_ROOM:
        socket.emit('leave_room', action.roomId, { username: 'Zayen' });

        next(action);
        break;

      default:
        next(action);
    }
  };
