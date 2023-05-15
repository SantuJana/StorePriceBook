import { View, Text, StyleSheet, FlatList, TouchableOpacity, Touchable, Pressable } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const SelectUnit = ({ selected, setVisibility, handleOnSelect }) => {
    const units = useSelector(state => state.units)
    
    return (
        <>
            <Pressable style={[style.blurLayout]} onPress={()=>setVisibility(false)} >
            <View style={[style.body]} >
                
                    {units.length === 0 && <Text  >No Unit Available. Please Add.</Text>}
                    <FlatList
                        data={units}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{ backgroundColor: selected.value === item ? '#2d8665' : '#b3e5d3' }} onPress={() => handleOnSelect(selected.index, item)} >
                                <Text style={[style.listItem, { color: selected.value === item ? '#b3e5d3' : '#2d8665' }]} >{item}</Text>
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
    
    blurLayout: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 101,
    },
    body: {
        backgroundColor: 'white',
        height: '60%',
        width: '80%',
        elevation: 5,
    },
    list: {
        borderRadius: 115
    },
    listItem: {
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
    },
    separator: {
        borderWidth: 1,
        borderColor: '#79d2a6',
        height: 0
    }
})

export default SelectUnit