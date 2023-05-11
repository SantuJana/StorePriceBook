import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hide } from '../store/slices/showModalSlice';
import { resetEditIndex } from '../store/slices/editProductIndex';
import { addProduct, deleteProduct } from '../store/slices/productsSlice';
import SelectUnit from './SelectUnit';

const Modal = () => {
  const dispatch = useDispatch();

  // States
  const editProductIndex = useSelector(state => state.editProductIndex);
  const viewProducts = useSelector(state => state.viewProducts);
  const [priceList, setPriceList] = useState([{ "unit": "", "price": "" }]);
  const [productName, setProductName] = useState('');
  const [lastProductName, setLastProductName] = useState('');
  const [showSelectUnit, setShowSelectUnit] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (editProductIndex !== -1) {
      setProductName(Object.keys(viewProducts)[editProductIndex]);
      setLastProductName(Object.keys(viewProducts)[editProductIndex]);
    }
  }, []);

  useEffect(() => {
    if (editProductIndex !== -1 && productName) {
      let pl = [];
      Object.keys(viewProducts[lastProductName]).forEach((key) => {
        pl.push({ unit: key, price: viewProducts[lastProductName][key].toString() });
      })
      setPriceList(pl);
    }
  }, [productName]);

  // Add price row on + button click
  const addPriceRow = () => {
    setPriceList([...priceList, { "unit": "", "price": "" }]);
  }

  // On price change
  const updatePrice = (v, index) => {
    let arr = [...priceList];
    arr[index].price = v;
    setPriceList(arr);
  }

  // On unit change
  const updateUnit = (v, index) => {
    let arr = [...priceList];
    arr[index].unit = v;
    setPriceList(arr);
  }

  // Modal Close
  const closeModal = () => {
    dispatch(hide());
    dispatch(resetEditIndex());
  }

  // Add product
  const addProductHandler = () => {
    let obj = {};
    priceList.map((row) => {
      if (row.unit !== '' && row.price !== '')
        obj[row.unit] = row.price;
    })
    if (productName === '') {
      Alert.alert("Alert", "Please enter a product name")
      return;
    }
    if (editProductIndex !== -1 && lastProductName !== productName) {
      dispatch(deleteProduct(lastProductName));
    }
    dispatch(addProduct({ productName, obj }));
    dispatch(hide());
    dispatch(resetEditIndex());
  }

  // Show select on focus
  const handleSelectView = (unit, index) => {
    Keyboard.dismiss();
    setSelected({ value: unit, index: index });
    setShowSelectUnit(true);
  }

  // handleOnSelect
  const handleOnSelect = (index, value) =>{
    let obj = [...priceList];
    obj[index].unit = value;
    setShowSelectUnit(false);
    setSelected({});
  }

  return (
    <View style={style.bg} >
      <View style={style.body} />
      {showSelectUnit && <SelectUnit selected={selected} setVisibility={setShowSelectUnit} handleOnSelect={handleOnSelect} />}
      <View style={style.modal} >
        <Text style={style.heading} >{editProductIndex === -1 ? 'Add Product' : 'Edit Product'}</Text>
        <TextInput placeholder='Product Name' style={style.inputText} value={productName} onChangeText={setProductName} ></TextInput>
        <View  >
          <Text style={style.heading} >Price List</Text>
          <TouchableOpacity style={style.addIcon} onPress={addPriceRow} >
            <Text style={style.addIconText} >+</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ height: '50%' }} >
          {priceList.map((row, index) => {
            return (
              <View key={index} style={style.priceRow} >
                <TextInput  placeholder='Unit' style={[style.inputText, style.unitColumn]} value={row.unit} onChangeText={(v) => updateUnit(v, index)} onFocus={() => handleSelectView(row.unit, index)} />
                <TextInput placeholder='Price' keyboardType='numeric' style={[style.inputText, style.priceColumn]} onChangeText={(v) => updatePrice(v, index)} value={row.price} />
              </View>
            );
          })}
        </ScrollView>
        <View style={style.btnContainer} >
          <TouchableOpacity style={[style.btn, { backgroundColor: '#f44336' }]} onPress={closeModal} >
            <Text style={style.btnText} >Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.btn, { backgroundColor: '#4caf50' }]} onPress={addProductHandler} >
            <Text style={style.btnText} >{editProductIndex !== -1 ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  dropdown: {
    borderWidth: 2,
    borderColor: '#40bf75',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    position: 'absolute',
    backgroundColor: '#d9e3f0',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: .7,
  },
  modal: {
    width: '90%',
    minHeight: 500,
    backgroundColor: '#b3e5c8',
    opacity: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 8,
  },
  heading: {
    fontFamily: 'serif',
    fontSize: 18,
    color: '#194d2f',
    fontWeight: '700',
    marginBottom: 15,
  },
  inputText: {
    borderWidth: 2,
    borderColor: '#40bf75',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#2d8652',
    marginVertical: 5,
  },
  addIcon: {
    position: 'absolute',
    right: 10,
    top: 0,
  },
  addIconText: {
    fontSize: 32,
  },
  priceRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  priceColumn: {
    width: '65%'
  },
  unitColumn: {
    width: '30%'
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    padding: 10,
  },
  btn: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 3,
    // backgroundColor: '#00cd84',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  }
})

export default Modal