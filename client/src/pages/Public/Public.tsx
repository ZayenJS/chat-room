import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../../hoc/Layout/Layout';
import ProtectedRoute from '../../containers/hoc/ProtectedRoute';
import ChatRoom from '../../containers/ChatRoom';
import Home from './Home/Home';

interface PublicProps {}

const Public: FC<PublicProps> = () => {
  return (
    <>
      <Layout>
        <Switch>
          <ProtectedRoute redirectionRoute="/auth" exact path="/" component={Home} />
          <ProtectedRoute redirectionRoute="/" path="/chat/:id" component={ChatRoom} />
          <Route render={() => <h1>404 !</h1>} />
        </Switch>
      </Layout>
    </>
  );
};

export default Public;
