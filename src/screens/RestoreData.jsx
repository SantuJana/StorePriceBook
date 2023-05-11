import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React from 'react'
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useDispatch } from 'react-redux';
import { setProducts } from '../store/slices/productsSlice';
import { setUnits } from '../store/slices/unitsSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const RestoreData = () => {

  const dispatch = useDispatch();

  const handleSelect = () => {
    DocumentPicker.pickMultiple()
      .then(async (res) => {
        res.forEach(async (item) => {
          item.name === 'store.json' && (
            await RNFS.readFile(item.uri)
              .then(data => dispatch(setProducts(JSON.parse(data))))
          )

          item.name === 'utils.json' && (
            await RNFS.readFile(item.uri)
              .then(data => dispatch(setUnits(JSON.parse(data).units)))
          )
        })
        Alert.alert("Success", "Backup restored successfully.");
      })
      .catch(err => {
        if (!DocumentPicker.isCancel(err)) {
          Alert.alert("Failure", "Failed to restore backup.");
        }
      })
  }

  return (
    <>
      <View style={style.body} >
        <Icon name='backup-restore' size={100} />
        <Text style={{fontSize: 18, marginBottom: 10}} >Restore data from store.json and utils.json file</Text>
        <TouchableOpacity onPress={() => handleSelect()} style={style.btn} >
          <Text style={style.btnText} >Select Files</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#2d8652',
    width: '80%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
})

export default RestoreData