import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLanguages, saveLanguageToDB } from './ajax';

export function SyncDataComponent() {
    useEffect(() => {
        async function fetchData() {
            let langLocalSize = JSON.parse(await AsyncStorage.getItem('languages'))?.length || 0;

            let languages = await getLanguages();

            console.log(languages);

            if (langLocalSize > languages?.length || 0) {
                let storedLanguages = JSON.parse(await AsyncStorage.getItem('languages')) || [];

                storedLanguages.forEach(language => {
                    if (!languages.includes(language)) {
                        saveLanguageToDB(language);
                    }
                });
            } else if (languages?.length || 0 > langLocalSize) {
                await AsyncStorage.setItem('languages', JSON.stringify(languages));
            }
        }

        fetchData();
    }, []);

    return null; // You don't need to render anything
}
