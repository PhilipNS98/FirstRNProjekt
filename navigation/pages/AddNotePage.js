import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import  { Button } from 'react-native-paper'

const AddNotePage = ({ navigation, route }) => {
    const [title, setTitle] = useState(route.params?.note?.title || '')
    const [note, setNote] = useState(route.params?.note?.note || '')

    navigation.setOptions({
        headerRight: () => (
            <Button
            mode='contained'
            textColor='rgb(60, 130, 246)'
            buttonColor='transparent'
            icon={addNote ? 'plus-circle' : ''}
            onPress={handleSave}
            labelStyle={styles.buttonText}
            >{addNote ? 'Add' : 'Save'}</Button>
        )
    })

    const addNote = route.params?.addNote || null;
    const editNote = route.params?.editNote || null;
    const noteId = route.params?.note?.id;
    const counter = route.params?.counter;

    const handleSave = () => {
        if(addNote) {
            if(title === '') {
                addNote('Note ' + (counter + 1), note);
            } else {
                addNote(title, note);
            }
        } else if (editNote) {
            editNote(noteId, title, note);
        }
        navigation.goBack();
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container]}>
            <TextInput 
            value={title}
            onChangeText={setTitle}
            placeholder='Title'
            placeholderTextColor='#999'
            style={styles.titleInput}
            onBlur={Keyboard.dismiss}
            />
            <View style={{ backgroundColor: 'grey', height: 1, marginBottom: 10 }} />
            <TextInput 
            value={note}
            onChangeText={setNote}
            placeholder='Title'
            placeholderTextColor='#999'
            multiline={true}
            style={styles.noteInput}
            onBlur={Keyboard.dismiss}
            />
            <Button
            mode='contained'
            buttonColor='tomato'
            onPress={handleSave}
            contentStyle={{ fontSize: 20 }}
            style={styles.buttonText}
            >{addNote ? 'Add' : 'Edit'} Note</Button>
        </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    titleInput: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    noteInput: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
        paddingTop: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '330',
    }
});

export default AddNotePage
