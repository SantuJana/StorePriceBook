import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
// Create store.json file
const createStoreFile = (path) => {
    RNFS.writeFile(path, '{}')
        .then(success => readDataFromStoreFile())
        .catch(error => {
            Alert.alert("Failure!", "Failed to create store file." + error.message);
        });
};

const readDataFromStoreFile = async () => {
    const fileNotExists = `ENOENT: /storage/emulated/0/Android/data/com.techforever.storepricebook/files/store.json: open failed: ENOENT (No such file or directory), open '/storage/emulated/0/Android/data/com.techforever.storepricebook/files/store.json'`;

    // Extracting path
    const path = RNFS.ExternalDirectoryPath + '/store.json';

    // reading data if file exists, unless create the store.json file
    let d = {}
    await RNFS.readFile(path)
        .then(data => d = JSON.parse(data))
        .catch(error => {
            if (error.message === fileNotExists) {
                createStoreFile(path);
            };
        });
       return d;
}

export default readDataFromStoreFile;