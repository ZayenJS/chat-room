export const WS_CONNECT = 'WS_CONNECT';
export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';

interface WSConectAction {
  type: typeof WS_CONNECT;
}

interface JoinRoomAction {
  type: typeof JOIN_ROOM;
  roomId: string;
}

interface LeaveRoomAction {
  type: typeof LEAVE_ROOM;
  roomId: string;
}

export const wsConnect = (): WSConectAction => ({ type: WS_CONNECT });
export const joinRoom = (roomId: string): JoinRoomAction => ({ type: JOIN_ROOM, roomId });
export const leaveRoom = (roomId: string): LeaveRoomAction => ({ type: LEAVE_ROOM, roomId });

export type SocketActions = WSConectAction | JoinRoomAction | LeaveRoomAction;
