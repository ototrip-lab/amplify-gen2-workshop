import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import TodoApp from './TodoApp';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <div style={{ textAlign: 'right', padding: '10px' }}>
            <span>こんにちは、{user?.signInDetails?.loginId}さん！</span>
            <button onClick={signOut} style={{ marginLeft: '10px' }}>
              サインアウト
            </button>
          </div>
          <TodoApp />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
