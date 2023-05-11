import {PermissionsAndroid} from 'react-native'

const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Store Price Book Storage Permission',
          message:
            'Store Price Book App needs access to your storage ' +
            'so you can take backup your data.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      
    }
  };

  export default requestStoragePermission;