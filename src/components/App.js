import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import store from 'utils/store';
import history from 'utils/history';

import Header from 'components/Header';
import AddBooks from 'components/AddBooks';
import BooksList from 'components/BooksList';
import ViewBook from 'components/ViewBook';

class App extends Component {  
  render() {
    return (
      <BrowserRouter basename={'/'}>
        <ConnectedRouter
          store={store}
          history={history}>
          <div>
            <Header />

              <Switch>
                <Route
                  component={BooksList}
                  exact={true}
                  path={'/'}
                />

                <Route
                  component={AddBooks}
                  path={'/AddBooks'}
                />

                <Route
                  component={ViewBook}
                  path={'/ViewBook/:book_id'}
                />

                <Route
                  component={AddBooks}
                  path={'/EditBook/:book_id'}
                />
              </Switch>
          </div>
        </ConnectedRouter>
      </BrowserRouter>
    );
  }
}

export default App;