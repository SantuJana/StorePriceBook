import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import ItemCard from './ItemCard'

const ProductList = () => {
    // States
    const viewProducts = useSelector(state => state.viewProducts);
    return (
        <>
            {Object.keys(viewProducts).length === 0 && <Text style={{ textAlign: 'center' }} >No Product Available. Please Add One</Text>}
            <FlatList
                data={Object.keys(viewProducts)}
                renderItem={({ item, index }) =>
                    <ItemCard key={index} productName={item} index={index} />
                }
            />
        </>
    )
}

export default ProductList