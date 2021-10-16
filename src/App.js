import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const Signup = React.lazy(() => {
  return import('./containers/Signup');
});

const app = props => {
  let routes = (
    <Switch>
      <Route path="/" exact render={(props) => <Signup {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Suspense fallback=''>{routes}</Suspense>
    </div>
  );
}

export default withRouter(app);