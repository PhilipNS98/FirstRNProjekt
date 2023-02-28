import React, { useDebugValue, useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import { Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import firebase from './components/firebaseDB'
import uuid from 'react-native-uuid'

const AddNotePage = ({ navigation, route }) => {
    const [title, setTitle] = useState(route.params?.note?.title || '')
    const [note, setNote] = useState(route.params?.note?.note || '')
    const [images, setImages] = useState(route.params?.note?.images || []);
    const [removeImages, setRemoveImages] = useState([]);
    const [uries, setUries] = useState([]);
    const storage = getStorage(firebase);

    useEffect(() => {
        initializeData();
    }, [])

    const initializeData = async () => {
        const imagesUri = [];
        console.log(images)
        await images.map((images) => (convertRefName(images.uri, imagesUri)));
    }

    const convertRefName = async (image, imagesUri) => {
        const reference = ref(storage, image);

        await getDownloadURL(reference).then((uri) => {
            imagesUri.push({ uri: uri, filename: image });
            setUries([...imagesUri])
        })
    }

    React.useLayoutEffect(() => {

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
        });
    });

    const addNote = route.params?.addNote || null;
    const editNote = route.params?.editNote || null;
    const noteId = route.params?.note?.id;
    const counter = route.params?.counter;

    const handleSave = () => {
        if (addNote) {
            if (title === '') {
                addNote('Note ' + (counter + 1), note);
            } else {
                addNote(title, note, images);
            }
        } else if (editNote) {
            isRemove();
            editNote(noteId, title, note, images);
        }
        navigation.goBack();
    }

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            const source = { uri: result.assets[0].uri }
            uploadImage(source);
        } else {
            alert('You did not select any image.');
        }
    };

    const uploadImage = async (e) => {
        try {
            const file = e.uri
            let uniqueUriName = uuid.v4();
            const response = await fetch(file);
            const blobFile = await response.blob();

            const reference = ref(storage, uniqueUriName)
            const result = await uploadBytes(reference, blobFile);
            setImages([...images, { uri: uniqueUriName }]);
            // Downloads newest upload to show in note
            const url = await getDownloadURL(result.ref);
            setUries([...uries, { uri: url }]);
        } catch (error) {

        }
    }


    const deleteImage = (e) => {
        setRemoveImages([...removeImages, { uri: e.uri, isRemove: true }]);
        setImages(images.filter(images => images.uri !== e.filename));
        setUries((prevUries) => {
            const updatedUries = prevUries.filter((uri) => uri.filename !== e.filename);
            return updatedUries;
        });
    }

    const isRemove = () => {
        if (removeImages.isRemove) {
            const desertRef = ref(storage, removeImages.uri);

            // Delete the file
            deleteObject(desertRef).then(() => {
                console.log('File deleted successfully');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const renderNote = ({ item }) => (
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => navigation.navigate('AddNote', { note: item, editNote: editNote })}>
            <View style={styles.imageContainer}>
                {item !== null ? (
                    <Image source={{ uri: item.uri }} style={styles.imageBox} />
                ) : null}
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(item)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <TouchableWithoutFeedback>
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
                    onPress={handleImagePicker}
                    contentStyle={{ fontSize: 20 }}
                    style={styles.buttonText}
                >Add Image
                </Button>
                <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={uries}
                    renderItem={renderNote}
                    keyExtractor={(item, index) => index.toString()}
                />
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
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    imageButton: {
        backgroundColor: '#32CD32',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    imageButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageBox: {
        width: 300,
        height: 300
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    },
    deleteButton: {
        backgroundColor: '#f00',
        padding: 10,
        borderRadius: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AddNotePage
