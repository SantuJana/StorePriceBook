import { StyleSheet, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import readDataFromStoreFile from '../utils/readDataFromStoreFile';
import { useDispatch } from 'react-redux';
import { setProducts } from '../store/slices/productsSlice';
import { setViewProducts } from '../store/slices/viewProductsSlice';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Modal from '../components/Modal';
import AddButton from '../components/AddButton';
import Loader from '../components/Loader';
import writeBack from '../utils/writeBackToStoreFile';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import requestStoragePermission from '../utils/takePermissions';
import { setUnits } from '../store/slices/unitsSlice';
import readUnits from '../utils/loadUnis';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  // States
  const products = useSelector(state => state.products);
  const showModal = useSelector(state => state.showModal);
  const [isLoading, setIsLoading] = useState(false);

  // Initially load the data.
  const readData = async () => {
    let data = await readDataFromStoreFile();
    let unitsData = await readUnits();
    dispatch(setProducts(data));
    dispatch(setUnits(unitsData));
  }
  useEffect(() => {
    requestStoragePermission();
    setIsLoading(true);
    readData();
    setIsLoading(false);
  }, [])

  // On Products Change, change the viewProducts also.
  // Write back to store file
  const writeBackToStore = async () => {

    let response = await writeBack(products);
    response === 1 ?
      dispatch(setViewProducts(products)) :
      Alert.alert("Error", "Something went wrong when storing data. ")

  };
  useEffect(() => {

    Object.keys(products).length !== 0 && writeBackToStore();

  }, [products]);


  return (
    <>
      {showModal && <Modal />}
      <SearchBar navigation={navigation} />
      <ProductList />
      <AddButton />

      {isLoading && <Loader />}
    </>
  )
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor: '#e6edf6',
  },
  searchView: {
    padding: 10,
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
  },
  itemView: {
    flex: 1,
    padding: 10,
    paddingBottom: 10,
    // backgroundColor: 'yellow'
  },
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

export default Home