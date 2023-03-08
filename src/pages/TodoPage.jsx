import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';
import { getTodos, createTodo } from 'api/todos';



const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])

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

  const handleToggleDone = (id) => {
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

  const handleSave = ({id, title}) => {
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
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((prevTodos) => {
      if(prevTodos.id !== id) {
        return prevTodos
      }
    }))
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
