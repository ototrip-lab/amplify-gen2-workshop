import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import TodoApp from './TodoApp'
import './App.css'

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <TodoApp signOut={signOut || (() => {})} user={user} />
      )}
    </Authenticator>
  )
}

export default App
