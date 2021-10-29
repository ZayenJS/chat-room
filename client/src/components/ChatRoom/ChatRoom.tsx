import { FC, FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';

import Loading from '../../components/Loading/Loading';
import Field from '../../containers/components/Field/Field';

import { ChatRoomPropsFromRedux } from '../../containers/ChatRoom';

import styles from './ChatRoom.module.scss';
import { useClickOutside } from '../../hooks/useClickOutside';

const ChatRoom: FC<ChatRoomPropsFromRedux> = ({
  match,
  addChatMessage,
  addEmoji,
  getRoomById,
  joinRoom,
  room,
  user,
}) => {
  const [state, setState] = useState({ isLoading: true, isEmojiPickerVisible: false });

  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    addChatMessage();
    closeEmojiPicker();
  };

  const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    addEmoji({ reducer: 'chat', name: 'message', emojiObject });
  };

  const toggleEmojiPicker = () => {
    setState((prevState) => ({ ...prevState, isEmojiPickerVisible: !state.isEmojiPickerVisible }));
  };

  const closeEmojiPicker = () => {
    setState((prevState) => ({ ...prevState, isEmojiPickerVisible: false }));
  };

  const onKeyUpHandler = (
    event: KeyboardEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      addChatMessage();
      closeEmojiPicker();
    }
  };

  // TODO: add ref button to trigger opeing of emoji picker
  useClickOutside(emojiPickerRef, emojiPickerRef, closeEmojiPicker);

  useEffect(() => {
    if (!room?.messages?.length && match.params?.id) {
      getRoomById(match.params.id);
      joinRoom(match.params.id);
    }
  }, [match.params, room?.messages?.length, getRoomById, joinRoom]);

  return room?.id ? (
    <div className={styles.Container}>
      {state.isLoading ? (
        <Loading
          onAnimationStart={() => setState((prevState) => ({ ...prevState, isLoading: true }))}
          onAnimationEnd={() => setState((prevState) => ({ ...prevState, isLoading: false }))}
        />
      ) : null}
      <ul>
        {room?.messages?.map((message: any) => (
          <li
            className={[styles.Message, user?.id === message.user.id ? styles.Self : ''].join(' ')}
            key={message.id}>
            <pre>{message.content}</pre>
          </li>
        ))}
      </ul>

      <form className={styles.Form} onSubmit={formSubmitHandler}>
        <button onClick={toggleEmojiPicker} type="button">
          😁
        </button>
        <div
          ref={emojiPickerRef}
          className={[styles.Picker, state.isEmojiPickerVisible ? styles.Visible : ''].join(' ')}>
          <Picker
            onEmojiClick={onEmojiClick}
            groupNames={{
              smileys_people: 'Smileys',
              animals_nature: 'cute dogs and also trees',
              food_drink: 'milkshakes and more',
              travel_places: 'I love trains',
              activities: 'lets play a game',
              objects: 'stuff',
              symbols: 'more stuff',
              flags: "S'amuser avec les drapeaux",
              recently_used: 'Récemment utilisés',
            }}
            preload
            // native
          />
        </div>
        <Field onKeyUp={onKeyUpHandler} name="message" reducerName="chat" type="textarea" />
        <button className={styles.Btn}>envoyer</button>
      </form>
    </div>
  ) : null;
};

export default ChatRoom;
