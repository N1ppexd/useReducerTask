import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

type TodoRowProps = {
    id: number,
    task: string,
    onDelete: (id: number) => void,
}

const TodoRow = ({ id, task, onDelete } : TodoRowProps) => {
    return (
        <View style={styles.row}>
            <Text style={styles.taskText}>{task}</Text>
            <Pressable
            style={styles.deleteButton}
            onPress={() => onDelete(id)}>
                <AntDesign name="close" size={24} color="black" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        marginTop:10
    },
    deleteButton:{
        backgroundColor:'#ffa5a5ff',
        marginLeft: 10,
        padding: 5,
        alignItems:'center',
        justifyContent:'center'
    },
    taskText:{
        color:'#000000ff',
        fontSize: 24
    }
})

export default TodoRow