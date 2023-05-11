import { View, Text, StyleSheet, FlatList, TouchableOpacity, Touchable, Pressable } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const SelectUnit = ({ selected, setVisibility, handleOnSelect }) => {
    const units = useSelector(state => state.units)
    
    return (
        <>
            <View style={[style.blurLayout, style.absolute]} />
            <Pressable style={[style.body, style.absolute]} onPress={()=>setVisibility(false)} >
                <View style={style.list} >

                    <FlatList
                        data={units}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{ backgroundColor: selected.value === item ? '#2d8665' : '#b3e5d3' }} onPress={() => handleOnSelect(selected.index, item)} >
                                <Text style={style.listItem} >{item}</Text>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <Text style={style.separator} />}
                    />
                </View>
            </Pressable>
        </>
    )
}

const style = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    blurLayout: {

        backgroundColor: 'white',
        zIndex: 100,
        opacity: 0.7
    },
    body: {
        // backgroundColor: 'red',
        zIndex: 101,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        backgroundColor: 'white',
        maxHeight: '60%',
        width: '80%',
        elevation: 5,
        borderRadius: 5
    },
    listItem: {
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        // borderBottomWidth: 2,
        // borderBottomColor: '#79d2a6'
    },
    separator: {
        borderWidth: 1,
        borderColor: '#79d2a6',
        height: 0
    }
})

export default SelectUnit