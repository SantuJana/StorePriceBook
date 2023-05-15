import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';
import { addUnits, deleteUnit } from '../store/slices/unitsSlice';
import writeBack from '../utils/writeBackUnits';

const AddUnit = () => {
    const dispatch = useDispatch();
    const units = useSelector(state => state.units);
    const [inputValue, setInputValue] = useState('');

    // ON unit add delete write back to file
    const handleWriteBack = async () => {
        await writeBack(units)
            .then(response => {
                response === 0 && (
                    Alert.alert("Failure", "Failed to write back.")
                )
            })
    }
    useEffect(() => {
        units.length !== 0 && (
            handleWriteBack()
        )
    }, [units])

    // add unit
    const handleAdd = () => {
        inputValue !== '' && dispatch(addUnits(inputValue));
        setInputValue('');
    }

    // Delete unit
    const handleDelete = (unit) => {
        Alert.alert("Alert", "Are you sure, want to delete the unit.", [
            {
                text: "No",
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => {
                    dispatch(deleteUnit(unit));
                }
            }
        ])
    }

    return (
        <>
            <View style={style.topInputContainer} >
                <TextInput style={style.input} placeholder='Add unit here' value={inputValue} onChangeText={setInputValue} />
                <TouchableOpacity style={style.btn} onPress={handleAdd} >
                    <Text style={style.btnText} >Add</Text>
                </TouchableOpacity>
            </View>


            <View style={style.unitsContainer} >
                <FlatList style={style.list}
                    data={units}
                    renderItem={({ item, index }) => (
                        <View key={index} style={style.item} >
                            <View style={style.unit} >
                                <Text style={{ fontSize: 18}} >{item}</Text>
                            </View>
                            <TouchableOpacity style={style.delete} onPress={() => handleDelete(item)} >
                                <Icon name='trash' size={28} style={{alignSelf: 'center'}} />
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={3}
                    contentContainerStyle={{ flex: 1, }}
                />

            </View>
        </>
    )
}

const style = StyleSheet.create({
    input: {
        flex: 8,
        borderWidth: 2,
        borderColor: '#2d8665',
        borderRadius: 25,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#b3e5d3',
        elevation: 10,
        color: '#194d3a',
        fontSize: 16,
    },
    btn: {
        flex: 1.5,
        borderWidth: 2,
        borderColor: '#2d8665',
        borderRadius: 25,
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#b3e5d3',
        elevation: 10,
        width: 80
    },
    btnText: {
        color: '#194d3a',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    topInputContainer: {
        flexDirection: 'row',
        gap: 10,
        padding: 10
    },
    unitsContainer: {
        height: '100%',
        padding: 10,
    },
    item: {
        backgroundColor: '#79d2a6',
        borderRadius: 10,
        margin: 2,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    list: {

    },
    delete: {
        backgroundColor: '#e49091',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    unit:{
        flex: 1,
        alignSelf: 'center',
        paddingRight: 3,
        padding: 5,
    }
})

export default AddUnit