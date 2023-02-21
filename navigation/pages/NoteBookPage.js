import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'
import firebase from "./components/firebaseDB"
import { getFirestore, collection, getDocs, addDoc, setDoc, deleteDoc, doc } from 'firebase/firestore/lite';

/* import useGlobalStyles from './components/useGlobalStyles' */
const NoteBookPage = ({ navigation }) => {
    const [counter, setCounter] = useState(0);
    const [notes, setNotes] = useState([]);
    /* const globalStyles = useGlobalStyles(); */
    const db = getFirestore(firebase);

    useEffect(() => {
        initializeData();
    }, [])


    async function initializeData() {
        const notesCol = collection(db, 'notes');
        const noteSnapshot = await getDocs(notesCol);
        const noteList = noteSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotes([...noteList]);
    }


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

    const addNote = async (title, note) => {
        try {
            const docRef = await addDoc(collection(db, "notes"), {
                title: title,
                note: note
            });
            setNotes([...notes, { id: docRef.id, title, note }]);
            setCounter(counter + 1);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };


    const deleteNote = async (id) => {
        setNotes(notes.filter(note => note.id !== id));
        await deleteDoc(doc(db, "notes", id));
    };

    const editNote = async (id, title, note) => {
        let newNotes = [...notes];
        let index = newNotes.findIndex(n => n.id === id);
        newNotes[index] = { title, note };
        setNotes(newNotes);

        await setDoc(doc(db, "notes", id), {
            title: title,
            note: note
        })
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
