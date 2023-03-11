import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos';
import { useNavigate } from 'react-router-dom';
import { checkPermission } from 'api/auth';



const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  const handleChange = (value) => {
    setInputValue(value)
  }
  const handleAddTodo = async () => {
    // 當使用者輸入的內容為空值，就直接 return 不新增
    if(inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
      title: inputValue,
      isDone: false,
    })
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false
        }
      ]
    })
    // 將輸入的值在新增完畢後從輸入框消失。
    setInputValue('')
    } catch (error) {
      console.error(error);
    }
    
  }

  const handleKeyDown = async () => {
    if(inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
      title: inputValue,
      isDone: false,
    })
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false
        }
      ]
    })
    // 將輸入的值在新增完畢後從輸入框消失。
    setInputValue('')
    } catch (error) {
      console.error(error);
    }
  }
  // 切換完成/未完成狀態
  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id)
    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone
      })
      setTodos((prveTodos) => {
      return prveTodos.map((todo) => {
        if(todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone
          }
        }
        return todo
      })
    })
    } catch (error) {
      console.error(error);
    }
    
  }

  const handleChangeMode = ({id, isEdit}) => {
    setTodos((prveTodos) => {
      return prveTodos.map((todo) => {
        if(todo.id === id) {
          return {
            ...todo,
            isEdit
          }
        }
        return { ...todo, isEdit: false }
      })
    })
  }

  // 編輯後保存
  const handleSave = async ({id, title}) => {
    try {
      await patchTodo({
        id,
        title
      })

      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if(todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false
            }
          }
          return todo
        })
      })
    } catch (error) {
      console.error(error);
    }
    
  }
  // 刪除
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((prevTodos) => {
        if(prevTodos.id !== id) {
          return prevTodos
        }
      }))
    } catch (error) {
      console.error(error);
    }
    
  }

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos()
        setTodos(todos.map((todo) => ({...todo, isEdit: false })))
      } catch (error) {
        console.error(error);
      }
    }
    getTodosAsync()
  }, [])
  
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken')
      if(!authToken) {
        navigate('/login')
      }
      const result = await checkPermission(authToken)
      if(!result) {
        navigate('/login')
      }
    }

    checkTokenIsValid()
  },[navigate])
  
  return (
    <div>
      TodoPage
      <Header />
      <TodoInput 
        inputValue={inputValue} 
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
        />
      <TodoCollection 
        todos={todos} 
        onToggleDone={handleToggleDone} 
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
