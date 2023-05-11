import RNFS from 'react-native-fs'

const writeBack = async (content) => {
    const path = RNFS.ExternalDirectoryPath + '/store.json';
    let response = 0;

    await RNFS.writeFile(path, JSON.stringify(content))
        .then(success => { response = 1; })
        .catch(err => { response = 0; })

    return response;
}

export default writeBack;