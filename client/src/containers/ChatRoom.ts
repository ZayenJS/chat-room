import { connect } from 'react-redux';
import { joinRoom, leaveRoom, SocketActions } from '../store/actions';
import ChatRoom from '../components/ChatRoom/ChatRoom';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'react';
import { State } from '../store/reducers';
import {
  addChatMessage,
  addEmoji,
  ChatActions,
  getRoomById,
  IAddEmoji,
} from '../store/actions/chat';
import { User } from '../models/User';

interface StateToProps {
  room: any;
  user: User | null;
}

interface ownProps extends RouteComponentProps {
  match: {
    params: {
      [key: string]: any;
    };
    isExact: boolean;
    path: string;
    url: string;
  };
}

interface DispatchToProps {
  getRoomById: (roomId: string) => void;
  joinRoom: (roomId: string) => void;
  addChatMessage: () => void;
  addEmoji: (payload: IAddEmoji) => void;
  leaveRoom: (roomId: string) => void;
}

const mapStateToProps = (state: State, ownProps: ownProps): StateToProps => ({
  room: state.chat.room,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch<SocketActions | ChatActions>): DispatchToProps => ({
  getRoomById: (roomId: string) => dispatch(getRoomById(roomId)),
  joinRoom: (roomId: string) => dispatch(joinRoom(roomId)),
  addChatMessage: () => dispatch(addChatMessage()),
  addEmoji: (payload: IAddEmoji) => dispatch(addEmoji(payload)),
  leaveRoom: (roomId: string) => dispatch(leaveRoom(roomId)),
});

export type ChatRoomPropsFromRedux = StateToProps & DispatchToProps & ownProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
