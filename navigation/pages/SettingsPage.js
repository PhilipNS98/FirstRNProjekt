import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

const SettingsPage = ({navigation, logout}) => {
    return (
        <View>
            <Button mode="contained"
                onPress={() => logout()}>Log out
            </Button>
        </View>
    )
}

export default SettingsPage
