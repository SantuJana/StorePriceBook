import RNFS from 'react-native-fs';
import { Alert } from 'react-native';

const checkExistence = async () => {
    const path = await RNFS.ExternalDirectoryPath + '/utils.json';
    await RNFS.exists(path)
        .then(async (exists) => {
            !exists && (
                await RNFS.writeFile(path, JSON.stringify({ units: [] }))
                    .catch(err => (
                        Alert.alert("Failure", "Failed to create utils.json file.")
                    ))
            )
        })
}

const readUnits = async () => {
    const path = await RNFS.ExternalDirectoryPath + '/utils.json';

    await checkExistence();
    let result = [];

    await RNFS.readFile(path)
        .then(data => (
            result = JSON.parse(data).units
        ))
        .catch(err => ((
            Alert.alert("Failure", "Failed to read utils data.")
        )))
    return result;
}

export default readUnits;