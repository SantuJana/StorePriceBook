import { View, Text, StyleSheet, Alert, TouchableHighlight } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const ShareData = () => {

  const handleShare = async () => {
    const path1 = await RNFS.ExternalDirectoryPath + '/store.json';
    const path2 = await RNFS.ExternalDirectoryPath + '/utils.json';

    const shareOptions = {
      title: "Store Price Book",
      message: "You can find StorePriceBook data file along with this",
      urls: ["file://" + path1, "file://" + path2],
    }

    Share.open(shareOptions)
      .then(success => Alert.alert("Success", "You have successfully shared your data."))
      .catch(err => Alert.alert("Failure", "Something went wrong, unable to share your data."));
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={style.fileView} >
        <View style={style.fileContainer} >
          <Icon name='file-text' type='feather' size={72} />
          <Text style={style.fileName} >store.json</Text>
          <Text style={{ fontSize: 18, color: '#697689', padding: 20, textAlign: 'center' }} >
            Now share your Store Price Book data to anyone through any platform.
            Anyone can easily restore your data to his Store Price Book.
          </Text>
        </View>
      </View>

      <View style={style.iconsContainer} >
        <Icon
          name='whatsapp'
          type='material-community'
          color='#075E54'
          raised
          reverse
        />

        <Icon
          name='gmail'
          type='material-community'
          color='#4285f4'
          reverse
          raised />
        <Icon
          name='share'
          type='material-community'
          color='#a185eb'
          reverse
          raised />
        <Icon
          name='bluetooth'
          type='material-community'
          color='#00bcd4'
          reverse
          raised />
        <Icon
          name='google-drive'
          type='material-community'
          color='#fcc400'
          reverse
          raised />
      </View>
      <View style={style.btnContainer} >
        <Text style={{ fontSize: 16, marginBottom: 50 }} >Click on Share Now to share your store data</Text>
        <TouchableHighlight style={style.btn} onPress={handleShare} >
          <Text style={style.btnText} >Share Now</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  iconsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btnContainer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
    alignSelf: 'center'
  },
  btn: {
    backgroundColor: '#2d8652',
    width: '100%',
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
  fileContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  fileName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555'
  },
  fileView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ShareData