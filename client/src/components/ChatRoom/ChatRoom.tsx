import { FC, FormEvent, useEffect } from 'react';

import Field from '../../containers/components/Field/Field';

import { ChatRoomPropsFromRedux } from '../../containers/ChatRoom';

import styles from './ChatRoom.module.scss';

const ChatRoom: FC<ChatRoomPropsFromRedux> = ({
  match,
  addChatMessage,
  getRoomById,
  joinRoom,
  room,
}) => {
  useEffect(() => {
    if (!room?.messages?.length && match.params.id) {
      getRoomById(match.params.id);
      joinRoom(match.params.id);
    }
  }, [match.params, room?.messages?.length, getRoomById, joinRoom]);

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    addChatMessage();
  };

  return room ? (
    <div className={styles.ChatRoom}>
      <ul>
        {room?.messages?.map((message: any) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>

      <form className={styles.Form} onSubmit={formSubmitHandler}>
        <Field name="message" reducerName="chat" type="text" />
        <button className={styles.Btn}>envoyer</button>
      </form>
    </div>
  ) : null;
};

export default ChatRoom;
