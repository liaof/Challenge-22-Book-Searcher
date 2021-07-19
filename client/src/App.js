import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import Auth from './utils/auth';


// establish a connection to the server @ /graphql endpoint(graphql playground)
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({// instantiate the Apollo Client
  link:  authLink.concat(httpLink),// connect Apollo Client to the graphql endpoint
  cache: new InMemoryCache()//instantiate cache object
});

const loggedIn = Auth.loggedIn();
function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </ApolloProvider>
    </Router>
  );
}

export default App;
