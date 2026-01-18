import { useState, useEffect } from 'react'
import { generateClient } from 'aws-amplify/data'
import { Flex, Button, TextField, SelectField, TextAreaField, Badge } from '@aws-amplify/ui-react'
import type { Schema } from '../amplify/data/resource'

const client = generateClient<Schema>()

type Todo = Schema['Todo']['type']

interface TodoAppProps {
  signOut: () => void
  user: any
}

export default function TodoApp({ signOut, user }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending')
  const [category, setCategory] = useState('')
  const [currentFilter, setCurrentFilter] = useState('all')

  useEffect(() => {
    fetchTodos()
  }, [])

  useEffect(() => {
    filterTodos()
  }, [todos, currentFilter])

  const fetchTodos = async () => {
    const { data } = await client.models.Todo.list()
    setTodos(data)
  }

  const filterTodos = () => {
    let filtered = todos
    if (currentFilter === 'pending') {
      filtered = todos.filter(todo => todo.status === 'pending')
    } else if (currentFilter === 'in_progress') {
      filtered = todos.filter(todo => todo.status === 'in_progress')
    } else if (currentFilter === 'completed') {
      filtered = todos.filter(todo => todo.status === 'completed')
    }
    setFilteredTodos(filtered)
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

  const getStatusBadgeVariation = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in_progress': return 'warning'
      default: return 'info'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '未着手'
      case 'in_progress': return '進行中'
      case 'completed': return '完了'
      default: return status
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Todo アプリ</h1>
          <div className="header-user">
            <span className="header-user-text">
              こんにちは、{user?.signInDetails?.loginId}さん！
            </span>
            <Button onClick={signOut} variation="primary" size="small">
              サインアウト
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-title">ナビゲーション</h2>
            <nav>
              <ul className="nav-menu">
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('all')}
                  >
                    全てのTodo
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('pending')}
                  >
                    未着手
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentFilter === 'in_progress' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('in_progress')}
                  >
                    進行中
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentFilter === 'completed' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('completed')}
                  >
                    完了済み
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-container">
            {/* Todo Creation Form */}
            <div className="form-card">
              <h2 className="form-title">新しいTodoを追加</h2>
              <Flex direction="column" gap="1.5rem">
                <TextField
                  label="タイトル"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Todoのタイトルを入力"
                />
                <TextAreaField
                  label="内容"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Todoの詳細を入力"
                  rows={3}
                />
                <Flex gap="1rem">
                  <SelectField
                    label="ステータス"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                  >
                    <option value="pending">未着手</option>
                    <option value="in_progress">進行中</option>
                    <option value="completed">完了</option>
                  </SelectField>
                  <TextField
                    label="カテゴリ"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="カテゴリをカンマ区切りで入力"
                  />
                </Flex>
                <Button onClick={createTodo} variation="primary" size="large">
                  追加
                </Button>
              </Flex>
            </div>

            {/* Todo List */}
            <div>
              <h2 className="section-title">
                Todo一覧 <span className="todo-count">({filteredTodos.length}件)</span>
              </h2>
              <div>
                {filteredTodos.map((todo) => (
                  <div key={todo.id} className="todo-card">
                    <div className="todo-header">
                      <h3 className="todo-title">{todo.title}</h3>
                      <Badge variation={getStatusBadgeVariation(todo.status || 'pending')}>
                        {getStatusText(todo.status || 'pending')}
                      </Badge>
                    </div>
                    <p className="todo-content">{todo.content}</p>
                    {todo.category && todo.category.length > 0 && (
                      <div className="todo-categories">
                        {todo.category.map((cat, index) => (
                          <Badge key={index} variation="info" size="small">{cat}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="todo-actions">
                      <SelectField
                        label="ステータス"
                        value={todo.status || 'pending'}
                        onChange={(e) => updateTodo(todo.id, e.target.value as any)}
                        size="small"
                      >
                        <option value="pending">未着手</option>
                        <option value="in_progress">進行中</option>
                        <option value="completed">完了</option>
                      </SelectField>
                      <Button 
                        onClick={() => deleteTodo(todo.id)}
                        variation="destructive"
                        size="small"
                      >
                        削除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
