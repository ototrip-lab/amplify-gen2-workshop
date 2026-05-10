import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import TodoApp from './TodoApp';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <TodoApp signOut={signOut || (() => {})} user={user} />
      )}
    </Authenticator>
  );
}

export default App;
