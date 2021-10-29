import { FC, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from '../../hoc/Layout/Layout';
import Loading from '../../components/Loading/Loading';
import ProtectedRoute from '../../containers/hoc/ProtectedRoute';
import ChatRoomHome from '../../components/ChatRoomHome/ChatRoomHome';
import ChatRoom from '../../containers/ChatRoom';
import Home from './Home/Home';

interface PublicProps {}

const Public: FC<PublicProps> = () => (
  <Layout>
    <Route
      render={({ location }) => (
        <AnimatePresence initial={true} exitBeforeEnter key={location.pathname}>
          <Switch location={location} key={location.pathname}>
            {location.pathname}
            <ProtectedRoute redirectionRoute="/auth/connexion" exact path="/" component={Home} />
            <ProtectedRoute
              redirectionRoute="/auth/connexion"
              exact
              path="/chats"
              component={ChatRoomHome}
            />
            <ProtectedRoute
              redirectionRoute="/auth/connexion"
              path="/chats/:id"
              component={ChatRoom}
            />
            <Route render={() => <h1>404 !</h1>} />
          </Switch>
        </AnimatePresence>
      )}
    />
  </Layout>
);

export default Public;
