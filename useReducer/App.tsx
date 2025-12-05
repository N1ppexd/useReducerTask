import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useReducer } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput,  ScrollView } from 'react-native';
import TodoRow from './components/TodoRow';
import { TodoData } from './data/todoData';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as SQLite from 'expo-sqlite';


type TodoState = {
  todos: TodoData[],
}

type TodoAction = 
  |{type: 'ADD', payload: TodoData}
  |{type: 'CHECK', payload: number}
  |{type: 'DELETE', payload: number}


const initialState : TodoState = {todos: []}

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch(action.type){
    case 'ADD':
      return  {
        ...state,
        todos:[...state.todos, action.payload]
      }
    case 'CHECK':
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

export default function App() {


  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null)

  const [newTask, addNewTask] = useState<string>("")
  const [tasks, setTasks] = useState<Array<TodoData>>([])

  useEffect(() => {
    const initDb = async() => {
      const database = await SQLite.openDatabaseAsync('todos.db')
      setDb(database)

      await database.execAsync(
        `CREATE TABLE IF NOT EXISTS (tasks) (
          id INTEGER PRIMARY KEY AUTO INCREMENT,
          task TEXT NOT NULL
        )`
      )

      loadTasks(database)
    }
    initDb()
  },[])

  const loadTasks = async(database: SQLite.SQLiteDatabase) => {
    const result = await database.getAllAsync<TodoData>('SELECT * FROM tasks ORDER BY id DESC')

    setTasks(result)
  }

  const addTask = async() => {

    if(newTask==='' || !newTask.trim() || !db) return

    await db.runAsync(`INSERT INTO tasks (task) VALUES (?)`, newTask)

    addNewTask("")
    loadTasks(db)
  }

  const deleteTask = async(id: number) => {

    await db?.runAsync('DELETE * FROM tasks WHERE id=(?)', id)
    //setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <View style={styles.container}>

      <Text style={styles.todoTitle}>TODO</Text>

      <View style={styles.addTaskContainer}>
        <TextInput 
        style={styles.taskInput}
        placeholder='Enter a task'
        value={newTask}
        onChangeText={addNewTask}
        />
      
        <Pressable
        style={styles.submitButton}
        onPress={addTask}>
          <AntDesign name="enter" size={24} color="black" />
        </Pressable>
      </View>
      
      <StatusBar style="auto" />

      <Text style={styles.tasksTitle}>Tasks:</Text>

      <ScrollView>
        {
          tasks.map(task => (
            <TodoRow key={task.id} id={task.id} task={task.task} onDelete={deleteTask} />
          ))
        }
      </ScrollView>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    backgroundColor: '#ffffffff',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  todoTitle:{
    marginTop:20,
    fontSize: 32,
  },
  tasksTitle:{
    marginTop:20,
    fontSize:28,
  },
  addTaskContainer:{
    marginTop: 10,
    flexDirection:'row',
    height: 42,
  },
  taskInput : {
    color : "#000000ff",
    backgroundColor: '#c8c8c8ff',
    alignItems: 'baseline',
    justifyContent: 'center',
    width: 200,
    fontSize: 24,
    padding: 5,
  },
  submitButton : {
    padding: 5,
    marginLeft: 5,
    backgroundColor: '#ff6868ff',
    alignItems: 'center',
    justifyContent: 'center',
    width:64,
  },
  submitText:{
    color: "#fff",
    fontSize: 18,
  }
});
