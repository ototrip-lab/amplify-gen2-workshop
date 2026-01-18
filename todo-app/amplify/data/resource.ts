import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      status: a.enum(['pending', 'in_progress', 'completed']),
      category: a.string().array(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
