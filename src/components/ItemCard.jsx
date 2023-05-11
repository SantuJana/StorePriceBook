import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons'
import { useDispatch, useSelector } from 'react-redux';
import { setEditProductIndex } from '../store/slices/editProductIndex';
import { show } from '../store/slices/showModalSlice';
import { deleteProduct } from '../store/slices/productsSlice';


export default function ItemCard({ index, productName }) {
    const dispatch = useDispatch();

    // States
    const viewProducts = useSelector(state => state.viewProducts);

    // Edit product
    const editProduct = (index) => {
        dispatch(setEditProductIndex(index));
        dispatch(show());
    }

    // Delete product
    const deleteProductHandler = (productName) => {
        Alert.alert("Caution", "Are you sure, want to delete the product " + productName, [
            {
                text: "Cancel",
                style: 'Cancel'
            }
            , {
                text: "Yes",
                onPress: () => {

                    dispatch(deleteProduct(productName))
                }
            }

        ])
    }

    return (
        <View style={style.cardBody} >
            <View style={style.edit} >
                <TouchableOpacity onPress={() => { editProduct(index) }} >
                    <Icon name='pencil' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { deleteProductHandler(productName) }} >
                    <Icon name='trash' size={30} />
                </TouchableOpacity>
            </View>

            <Text style={style.itemName} >{productName}</Text>
            <View style={style.priceView} >
                {Object.keys(viewProducts[productName])?.map((key, index) => {
                    return (
                        <View key={index} style={style.priceCard} >
                            <Text style={style.unit} >{key}</Text>
                            <Text style={style.price} >{viewProducts[productName][key]}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    cardBody: {
        backgroundColor: '#b3e5d3',
        minHeight: 150,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        marginHorizontal: 10,
        elevation: 5,
    },
    itemName: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'serif'
    },
    priceView: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    priceCard: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#40bf91',
        margin: 5,
    },
    unit: {
        backgroundColor: '#79d2b2',
        paddingVertical: 3,
        paddingHorizontal: 5,
        fontFamily: 'san-serif',
        fontWeight: '700',
        textAlign: 'center',
        color: '#194d3a',
        fontSize: 14,
    },
    price: {
        textAlign: 'center',
        paddingVertical: 3,
        paddingHorizontal: 5,
        fontSize: 16,
    },
    edit: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        right: 10,
        top: 10,
        zIndex: 100
    }
});