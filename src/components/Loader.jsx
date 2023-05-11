import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Loader = () => {
    return (
        <>
            <View style={style.background} />
            <View style={style.center} >
                <Text style={style.loaderText} >Loading ...</Text>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.4,
        backgroundColor: '#b3e5d3'
    },
    center:{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText:{
        fontSize: 24,
        fontWeight: 'bold',
    }
});

export default Loader