import RNFS from 'react-native-fs';

const writeBack = async (data) => {
    const path = RNFS.ExternalDirectoryPath + '/utils.json';
    let response = 0;
    await RNFS.writeFile(path, JSON.stringify({ units: data }))
        .then(success => response = 1)
        .catch(err => response = 0)

    return response;
}   

export default writeBack;