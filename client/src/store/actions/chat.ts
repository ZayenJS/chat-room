import { IEmojiData } from 'emoji-picker-react';

import { Message } from '../../models/Message';

export interface IAddEmoji {
  reducer: string;
  name: string;
  emojiObject: IEmojiData;
}

export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
export const ADD_EMOJI = 'ADD_EMOJI';
export const GET_ROOM_BY_ID = 'GET_ROOM_BY_ID';
export const UPDATE_CHAT = 'UPDATE_CHAT';

export interface AddChatMessageAction {
  type: typeof ADD_CHAT_MESSAGE;
}
export interface AddEmojiAction {
  type: typeof ADD_EMOJI;
  payload: IAddEmoji;
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
export const addEmoji = (payload: IAddEmoji): AddEmojiAction => ({ type: ADD_EMOJI, payload });
export const getRoomById = (roomId: string, room?: any): GetRoomByIdAction => ({
  type: GET_ROOM_BY_ID,
  roomId,
  room,
});
export const updateChat = (message: Message): UpdateChatAction => ({
  type: UPDATE_CHAT,
  message,
});

export type ChatActions =
  | AddChatMessageAction
  | AddEmojiAction
  | GetRoomByIdAction
  | UpdateChatAction;
