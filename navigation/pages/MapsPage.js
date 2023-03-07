import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const MapsPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <MapView
                style={{ height: '100%', width: '100%' }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
            />
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapsPage
