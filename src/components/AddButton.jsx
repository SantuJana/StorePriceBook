import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { show } from '../store/slices/showModalSlice';

const AddButton = () => {

    const dispatch = useDispatch();

    // Show modal on add click
    const showAddModal = () => {
        dispatch(show());
    }

    return (
        <>
            <TouchableHighlight onPress={()=>showAddModal()} >
                <View style={style.addBtn} >
                    <Text style={style.addBtnText} >+</Text>
                </View>
            </TouchableHighlight>
        </>
    )
}

const style = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#00796b',
        height: 50,
        width: 50,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    addBtnText: {
        color: 'white',
        fontSize: 24,
    }
})

export default AddButton