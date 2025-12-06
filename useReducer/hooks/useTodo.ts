import { useEffect, useState, useReducer } from 'react';
import { TodoData } from '../data/todoData';

type TodoState = {
  todos: TodoData[],
}

type TodoAction = 
  |{type: 'ADD', payload: TodoData}
  |{type: 'DONE', payload: number}
  |{type: 'DELETE', payload: number}


const initialState : TodoState = {todos: []}

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch(action.type){
    case 'ADD':
      return  {
        ...state,
        todos:[...state.todos, action.payload]
      }
    case 'DONE':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if(todo.id == action.payload){
            return {
              ...todo,
              isDone: !todo.isDone
            }
          }
          return todo
        })
      }
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
  }
}

let nextId :number = 0

export const useTodo = () => {

  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [newTask, addNewTask] = useState<string>("")


  const addTask = () => {

    if(newTask==='' || !newTask.trim()) return

    addNewTask("")

    nextId++

    dispatch(
      {
        type:'ADD',
        payload: {id:nextId, task:newTask, isDone:false}
      }
    )
  }

  const setDone = (id: number) => {
    dispatch({type:'DONE', payload:id})
  }

  const deleteTask = (id: number) => {

    dispatch({type:'DELETE', payload:id})
  }

  return {state, newTask, addNewTask, addTask, setDone, deleteTask}
}