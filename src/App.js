import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewtodo] = useState(null)
  const [update, setUpdate] = useState(null)
  const [isCompleted, setIsCompleted] = useState([])
  const [dueDate, setDueDate] = useState(null)

  useEffect(() => {
    const fetchingData = () => {
      const todos = JSON.parse(localStorage.getItem("todoList"));
      if (todos || todos !== null) {
        setTodoList(todos)
      }
    }
    fetchingData()
  }, [])

  useEffect(() => {
    const fetchingData = () => {
      const todos = JSON.parse(localStorage.getItem("completedTodos"));
      if (todos || todos !== null) {
        setIsCompleted(todos)
      }
    }
    fetchingData()
  }, [])

  const todoObj = {
    id: Date.now(),
    todo: todo,
    date: ''
  }

  const addTodo = () => {
    setTodoList(prev => [...prev, todoObj]);
    setTodo("")
  }

  const updateTodo = (item) => {
    setUpdate(item)
  }

  const updateTodoText = (item) => {
    const updatedTodos = todoList.map((todoItem) => {
      if (todoItem.id === item.id) {
        return ({ ...todoItem, todo: newTodo !== null ? newTodo : item.todo , date: dueDate !== null ? dueDate : item.date})
      } else {
        return todoItem
      }
    })
    setTodoList(updatedTodos);
    setUpdate(null);
    setNewtodo(null)
    setDueDate(null)
  }

  const deleteTodo = (item) => {
    const deletedTodo = todoList.filter((todoItem) => todoItem.id !== item.id)
    setTodoList(deletedTodo);
  }

  const deleteCompTodo = (item) => {
    const deletedTodo = isCompleted.filter((todoItem) => todoItem.id !== item.id)
    setIsCompleted(deletedTodo);
  }

  const setTaskComplete = (item) => {
    setIsCompleted(prev => [...prev, item])
    const filteredItems = todoList.filter((Item) => Item !== item)
    setTodoList(filteredItems)
  }

  const setTaskInComplete = (item) => {
    setTodoList(prev => [...prev, item])
    const filteredItems = isCompleted.filter((Item) => Item !== item)
    setIsCompleted(filteredItems)
  }


  if (todoList !== null && todoList.length !== 0) {
    localStorage.setItem("todoList", JSON.stringify(todoList))
  }


  if (isCompleted !== null && todoList.length !== 0) {
    localStorage.setItem("completedTodos", JSON.stringify(isCompleted))
  }


  return (
    <>
      <div className="container">
        <div className='todo-app'>
          <div className='todo-heading'>TodoList</div>
          <div className='input-todo'>
            <input type='text' placeholder='Add Todo' required value={todo} onChange={(e) => setTodo(e.target.value)} />
            {todo !== '' ? <i className="fa-solid fa-plus" onClick={addTodo} /> : <i className="fa-solid fa-plus" />}
          </div>
          {todoList && todoList.map((item) => {
            return (
              <>
                <div className='added-todo-container' key={item.id}>
                  <div className='added-todo'>
                    <input className='checkbox' type='checkbox' value={isCompleted} onChange={(e) => setTaskComplete(item)} />

                    {update === item ?
                      <input type='text' required className='todo-txt-input' defaultValue={item.todo} onChange={(e) => setNewtodo(e.target.value)} />
                      : <div className={isCompleted.find((Item) => Item === item) ? 'todo-text-comp' : 'todo-txt'}>{item.todo}</div>}


                    {update === item ? <i className="fa-solid fa-check todo-update" onClick={() => updateTodoText(item)}></i>
                      : <i className="fa-solid fa-pen todo-update" onClick={() => updateTodo(item)} />}


                    <i className="fa-solid fa-trash todo-trash" onClick={() => deleteTodo(item)} />
                  </div>

                  {update === item ? <input type="date" className="DatePicker" required defaultValue={item.date} onChange={(e) => setDueDate(e.target.value)} />
                    : <div className='date-picker-box'>
                      <div className='inner-dates'>
                        <label>Due Date : </label>
                        <div className='inner-dates-num'>{item.date}</div>
                      </div>
                    </div>}

                </div>

              </>
            )
          })}


          {isCompleted && isCompleted.map((item) => {
            return (
              <>
                <div className='added-todo-container' key={item.id}>

                  <div className='added-todo'>

                    <input className='checkbox' checked type='checkbox' defaultValue={isCompleted} onChange={(e) => setTaskInComplete(item)} />

                    <div className={isCompleted.find((Item) => Item === item) ? 'todo-text-comp' : 'todo-txt'}>{item.todo}</div>

                    <i className="fa-solid fa-trash todo-trash" onClick={() => deleteCompTodo(item)} />
                  </div>

                  <div className='date-picker-box'>
                    <div className='inner-dates'>
                      <label>Due Date:</label>
                      <div className='inner-dates-num'>{item.date}</div>
                    </div>

                    <div className='inner-dates'>
                      <label>Task completed:</label>
                      <div className='inner-dates-num'>{(new Date()).toLocaleDateString()}</div>
                    </div>

                  </div>
                </div>

              </>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App;
