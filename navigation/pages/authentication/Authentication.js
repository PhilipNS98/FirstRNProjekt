import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const Authentication = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
    <View style={styles.screen}>
        <Text style={styles.title}>Log In/Sign Up</Text>
            <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
            keyboardType='email-address'
            autoComplete='off'
            />
            <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                secureTextEntry={true}
            />
            {props.error && <Text style={styles.error}>{props.error}</Text>}
            <View style={styles.buttons}>
                <Button title='SignIn' onPress={() => props.signIn(email, password)} />
                <Button title='Create' onPress={() => props.createUser(email, password)} />
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(18, 18, 18)',
    },
    title: {
        fontSize: 21,
        marginBottom: 30,
        color: 'white',
    },
    input: {
        width: 300,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#6d69c3',
        marginVertical: 10,
        padding: 15,
        color: 'white',
    },
    buttons: {
        width: 150,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    error: {
        marginBottom: 20,
        color: 'red',
    }
});

export default Authentication
