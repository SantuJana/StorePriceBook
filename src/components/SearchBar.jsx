import { View, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setViewProducts } from '../store/slices/viewProductsSlice';
import Icon from 'react-native-vector-icons/Feather'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = ({navigation}) => {
  const dispatch = useDispatch();

  // States
  const [searchValue, setSearchValue] = useState('');
  const products = useSelector(state => state.products);

  // On search filter data
  useEffect(() => {
    if (searchValue !== '') {
      let keys = Object.keys(products);
      let filteredKeys = keys.filter((key) =>
        key.replace(" ", "").toLowerCase().indexOf(searchValue.replace(" ", "").toLocaleLowerCase()) !== -1
      )
      let filteredProducts = {};
      filteredKeys.map(product => filteredProducts[product] = products[product]);
      dispatch(setViewProducts(filteredProducts));
    } else {
      dispatch(setViewProducts(products));
    }
  }, [searchValue])

  return (
    <View style={style.searchView} >
      <TouchableOpacity onPress={()=>navigation.openDrawer()} >
        <Icon name='menu' size={32} />
      </TouchableOpacity>
      <TextInput style={style.searchBox} placeholder='search here...' value={searchValue} onChangeText={setSearchValue} />

    </View>
  )
}

const style = StyleSheet.create({
  searchView: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  searchBox: {
    borderWidth: 2,
    borderColor: '#2d8665',
    borderRadius: 25,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: '#b3e5d3',
    elevation: 10,
    color: '#194d3a',
    fontSize: 16,
    width: '88%'
  },
})

export default SearchBar