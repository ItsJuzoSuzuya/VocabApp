import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import TopBar from "./TopBar";
import styles from "../scripts/style";
import NavBar from "./NavBar";

const WordBody = ({navigation, route}) => {

    const { currentLanguage } = route.params;
    const { currentTopic } = route.params;
    const [showNewWord, setShowNewWord] = useState(false);
    const [words, setWords] = useState([]);
    const [wordInput, setWordInput] = useState("")

    useEffect(() => {
        async function fetchWords() {
            try {
                const storedWords = await AsyncStorage.getItem(currentLanguage + currentTopic + "words");
                if (storedWords) {
                    setWords(JSON.parse(storedWords));
                }
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        }
        fetchWords();
    }, []);

    const saveWord = (word) => {
        if (!words.includes(word)) {
            const updatedWords = [...words, word];
            localStorage.setItem(currentLanguage + currentTopic + 'words', JSON.stringify(updatedWords));
            setWords(updatedWords);
        }
        setWordInput('');
    }

    const renderView = () => {
        if (showNewWord) {
            return newWord();
        } else {
            return defaultWorldPage();
        }
    };

    const WordButton = ({ word }) => {
        const navigateToWordPage = () => {
            navigation.navigate("ChooseGamePage", {currentLanguage: currentLanguage, currentTopic: currentTopic});
        };

        return(
            <Pressable style={bodyStyles.addButton} onPress={navigateToWordPage}>
                <Text> {word} </Text>
            </Pressable>
        )
    }

    const defaultWorldPage = () => {
        return (
            <View style={{ flex: 1 }}>
                <TopBar navigation={navigation}/>
                <ScrollView style={styles.body}>
                    <Text> Welcome! </Text>
                    {words.map((word) => (
                        <WordButton word={words} />
                    ))}
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={() => setShowNewWord(true)}
                    >
                        <Text> + Add Word</Text>
                    </Pressable>
                </ScrollView>
                <NavBar navigation={navigation}/>
            </View>
        );
    }

    const newWord = () => {
        return (
            <View style={{flex: 1}}>
                <TopBar navigation={navigation}/>
                <View style={styles.body}>
                    <TextInput
                        value={wordInput}
                        onChangeText={setWordInput}
                        placeholder="Enter word"
                    />
                    <Pressable onPress={() => {
                        saveWord(wordInput);
                        setShowNewWord(false)
                    }}>
                        <Text> Save </Text>
                    </Pressable>
                    <Pressable onPress={() => setShowNewWord(false)}>
                        <Text> Cancel </Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return renderView();
}

const bodyStyles = StyleSheet.create({
    addButton: {
        alignSelf: 'center'
    }
})

export default WordBody;