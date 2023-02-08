import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
/* import useGlobalStyles from './components/useGlobalStyles' */
const NoteBookPage = ({ navigation }) => {
    const [counter, setCounter] = useState(0);
    const [notes, setNotes] = useState([]);
    /* const globalStyles = useGlobalStyles(); */

    navigation.setOptions({
        headerRight: () => (
            <Button
                mode='contained'
                textColor='rgb(60, 130, 246)'
                buttonColor='transparent'
                icon='plus-circle'
                onPress={() => navigation.navigate('AddNote', { counter: counter, addNote: addNote })}
                labelStyle={styles.buttonText}
            >Add</Button>
        )
    })

    const addNote = (title, note) => {
        setNotes([...notes, { id: counter + 1, title, note }]);
        setCounter(counter + 1);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const editNote = (id, title, note) => {
        let newNotes = [...notes];
        let index = newNotes.findIndex(n => n.id === id);
        newNotes[index] = { id, title, note };
        console.log(newNotes)
        setNotes(newNotes);
    };

    const renderNote = ({ item }) => (
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => navigation.navigate('AddNote', { note: item, editNote: editNote })}>
            <View style={styles.note}>
                <View style={styles.noteContainer}>
                    <Text style={styles.noteTitle}>{item.title}</Text>
                    <Text style={styles.noteText} numberOfLines={3} ellipsizeMode="tail">{item.note}</Text>
                </View>
                <TouchableOpacity style={styles.noteContainer}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(item.id)}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#ddd', height: 1, marginBottom: 10 }} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container/* , globalStyles.container */]}>
            <FlatList
                data={notes}
                renderItem={renderNote}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    noteContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 5,
    },
    note: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        justifyContent: 'space-between',
        borderRadius: 15,
    },
    noteTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    noteText: {
        color: 'black',
        fontSize: 16,
        marginTop: 10,
        maxWidth: 180
    },
    deleteButton: {
        backgroundColor: '#f00',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '330',
    }
});

export default NoteBookPage