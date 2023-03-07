import React, { useState, useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import firebase from './firebaseDB';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const FirebaseStorageImage = ({ item }) => {
    const storage = getStorage(firebase);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const urls = await Promise.all(item.images.map(async image => {
                const reference = ref(storage, image.uri);
                const url = await getDownloadURL(reference);
                return url;
            }));
            setImages(urls);
        };
        getImages();
    }, [item.images]);

    return (
        <View style={{ flexDirection: 'row' }}>
            {images.map((url, index) => (
                <Image key={index} source={{ uri: url }} style={{ width: 100, height: 100, marginTop: 10, marginHorizontal: 5 }} />
            ))}
        </View>
    )
}

export default FirebaseStorageImage;
