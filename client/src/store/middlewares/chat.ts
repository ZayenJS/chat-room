import { MiddlewareAPI, Dispatch } from 'redux';
import { gql } from '@apollo/client';

import { apolloClient } from '../../utils/apollo';
import { ADD_CHAT_MESSAGE, ChatActions, GET_ROOM_BY_ID } from '../actions';
import { State } from '../reducers';

export const chatMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch<ChatActions>) => async (action: ChatActions) => {
    switch (action.type) {
      case GET_ROOM_BY_ID:
        {
          const { data } = await apolloClient.query({
            query: gql`
            query getRoomById {
              room(id: "${action.roomId}") {
								id
                name
                type
                creator {
									id
                  username
                }
                messages {
                  id
                  content
                  user {
										id
                    username
                  }
                }
              }
            }
          `,
          });

          action.room = data.room;

          next(action);
        }
        break;
      case ADD_CHAT_MESSAGE: {
        const { chat, user } = store.getState() as State;

        await apolloClient.mutate({
          mutation: gql`
            mutation addMessage {
              addMessage(
                data: {
                  content: """${chat.message}"""
                  user_id: ${user.user?.id}
                  room_id: "${chat?.room?.id}"
                }
              ) {
                id
              }
            }
          `,
        });

        next(action);
        break;
      }

      default:
        next(action);
    }
  };
