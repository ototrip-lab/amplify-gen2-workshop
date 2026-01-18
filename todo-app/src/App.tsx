import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import './App.css'

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Todo アプリ</h1>
          <p>こんにちは、{user?.signInDetails?.loginId}さん！</p>
          <button onClick={signOut}>サインアウト</button>
        </main>
      )}
    </Authenticator>
  )
}

export default App
