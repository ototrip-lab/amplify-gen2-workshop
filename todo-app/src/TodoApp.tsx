import { useState, useEffect } from 'react'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../amplify/data/resource'

const client = generateClient<Schema>()

type Todo = Schema['Todo']['type']

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const { data } = await client.models.Todo.list()
    setTodos(data)
  }

  const createTodo = async () => {
    if (!title.trim() || !content.trim()) return
    
    await client.models.Todo.create({
      title,
      content,
      status,
      category: category.split(',').map(c => c.trim()).filter(c => c)
    })
    
    setTitle('')
    setContent('')
    setStatus('pending')
    setCategory('')
    fetchTodos()
  }

  const updateTodo = async (id: string, newStatus: 'pending' | 'in_progress' | 'completed') => {
    await client.models.Todo.update({ id, status: newStatus })
    fetchTodos()
  }

  const deleteTodo = async (id: string) => {
    await client.models.Todo.delete({ id })
    fetchTodos()
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo アプリ</h1>
      
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>新しいTodoを追加</h3>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px', minHeight: '60px' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          style={{ marginBottom: '10px', padding: '8px' }}
        >
          <option value="pending">未着手</option>
          <option value="in_progress">進行中</option>
          <option value="completed">完了</option>
        </select>
        <input
          type="text"
          placeholder="カテゴリ (カンマ区切り)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button onClick={createTodo} style={{ padding: '10px 20px' }}>
          追加
        </button>
      </div>

      <div>
        <h3>Todo一覧</h3>
        {todos.map((todo) => (
          <div key={todo.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h4>{todo.title}</h4>
            <p>{todo.content}</p>
            <p>ステータス: 
              <select
                value={todo.status || 'pending'}
                onChange={(e) => updateTodo(todo.id, e.target.value as any)}
                style={{ marginLeft: '10px', padding: '4px' }}
              >
                <option value="pending">未着手</option>
                <option value="in_progress">進行中</option>
                <option value="completed">完了</option>
              </select>
            </p>
            {todo.category && todo.category.length > 0 && (
              <p>カテゴリ: {todo.category.join(', ')}</p>
            )}
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
