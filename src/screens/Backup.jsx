import { View, Text, TouchableOpacity, StyleSheet, Alert, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS, { exists } from 'react-native-fs';
import { useSelector } from 'react-redux';
import requestStoragePermission from '../utils/takePermissions';

const Backup = () => {
  const [backupPath, setBackupPath] = useState('')
  const products = useSelector(state => state.products);
  const units = useSelector(state => state.units);

  // initially set backup path
  useEffect(() => {
    setBackupPath(RNFS.ExternalStorageDirectoryPath + '/Backup/StorePriceBook');
  }, []);

  const writeBackup = async () => {

    await RNFS.writeFile(backupPath + '/store.json', JSON.stringify(products))
      .then(async (success) => {
        await RNFS.writeFile(backupPath + '/utils.json', JSON.stringify({ units: units }))
          .then(success => Alert.alert("Success", "Backup successfully taken."))
          
      })
      .catch(err => {
        Alert.alert("Failure", "Unfortunately backup process not completed.");
        console.log(err.message)
      })

  }
  const handleBackup = async () => {
    await requestStoragePermission();
    await RNFS.exists(backupPath)
      .then(async (exists) => {
        if (exists) {
          writeBackup()
        } else {
          try {
            await RNFS.mkdir(backupPath)
            writeBackup()
          } catch (error) {
            Alert.alert("Failure", "Unfortunately backup process not completed.");
          }
        }
      })
  }

  return (
    <View style={{ flex: 1 }} >
      <View style={style.fileContainer} >
        <Icon name='backup' size={84} color={'#2d8665'} />
        <Text style={{ fontSize: 18 }} >store.json</Text>
        <Text style={{ fontSize: 18 }} >Backup file will be store on location {backupPath}</Text>
      </View>


      <View style={style.btnContainer} >
        <TouchableOpacity style={style.btn} onPress={handleBackup} >
          <Text style={style.btnText} >Take backup</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  btnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
  btn: {
    backgroundColor: '#2d8665',
    paddingVertical: 8,
    width: '80%',
    alignSelf: 'center',
    elevation: 8
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
  fileContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200
  }
})

export default Backup