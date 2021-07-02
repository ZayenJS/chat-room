import { Message } from '../../models/Message';

export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
export const GET_ROOM_BY_ID = 'GET_ROOM_BY_ID';
export const UPDATE_CHAT = 'UPDATE_CHAT';

export interface AddChatMessageAction {
  type: typeof ADD_CHAT_MESSAGE;
}
export interface GetRoomByIdAction {
  type: typeof GET_ROOM_BY_ID;
  roomId: string;
  room?: any;
}
export interface UpdateChatAction {
  type: typeof UPDATE_CHAT;
  message: Message;
}

export const addChatMessage = (): AddChatMessageAction => ({
  type: ADD_CHAT_MESSAGE,
});
export const getRoomById = (roomId: string, room?: any): GetRoomByIdAction => ({
  type: GET_ROOM_BY_ID,
  roomId,
  room,
});
export const updateChat = (message: Message): UpdateChatAction => ({
  type: UPDATE_CHAT,
  message,
});

export type ChatActions = AddChatMessageAction | GetRoomByIdAction | UpdateChatAction;
