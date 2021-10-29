import { Room } from '../../models/Room';
import {
  ADD_CHAT_MESSAGE,
  ADD_EMOJI,
  ChatActions,
  GET_ROOM_BY_ID,
  GlobalActions,
  INPUT_CHANGE,
  UPDATE_CHAT,
} from '../actions';

export interface ChatReducerState {
  room: Room | null;
  message: string;
}

const INITIAL_STATE: ChatReducerState = {
  room: null,
  message: '',
};

const reducer = (
  state: ChatReducerState = INITIAL_STATE,
  action: ChatActions | GlobalActions,
): ChatReducerState => {
  switch (action.type) {
    case GET_ROOM_BY_ID:
      return {
        ...state,
        room: action.room,
      };
    case ADD_CHAT_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case ADD_EMOJI:
      if (action.payload.reducer === 'chat') {
        return {
          ...state,
          message: state.message + action.payload.emojiObject.emoji,
        };
      }
      return state;
    case UPDATE_CHAT:
      const room = { ...state.room } as Room;
      console.log(action);

      if (room.messages?.length) room.messages = [...room.messages, action.message];

      return {
        ...state,
        room,
      };
    case INPUT_CHANGE:
      if (action.reducerName === 'chat') return { ...state, [action.name]: action.value };

      return state;
    default:
      return state;
  }
};

export default reducer;
