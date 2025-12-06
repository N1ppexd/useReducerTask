import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput,  ScrollView } from 'react-native';
import TodoRow from './components/TodoRow';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTodo } from './hooks/useTodo';



export default function App() {

  const {state, newTask, addNewTask, addTask, setDone, deleteTask} = useTodo()

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
          state.todos.map(task => (
            <TodoRow 
            key={task.id} 
            id={task.id} 
            task={task.task} 
            isDone={task.isDone}
            onDelete={deleteTask} 
            onCheck={setDone} />
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
