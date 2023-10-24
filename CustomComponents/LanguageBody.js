import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import styles from "../scripts/style";
import { saveLanguageToDB } from "../scripts/ajax";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SyncDataComponent} from "../scripts/sync";

const LanguageBody = ({ navigation }) => {
    const [showNewLanguage, setShowNewLanguage] = useState(false);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        async function fetchLanguages() {
            try {
                const storedLanguages = await AsyncStorage.getItem("languages");
                if (storedLanguages) {
                    setLanguages(JSON.parse(storedLanguages));
                }
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        }
        fetchLanguages();
    }, []);

    const saveLanguage = async (language) => {
        try {
            await saveLanguageToDB(language);
            if (!languages.includes(language)) {
                const updatedLanguages = [...languages, language];
                await AsyncStorage.setItem("languages", JSON.stringify(updatedLanguages));
                setLanguages(updatedLanguages);
            }
        } catch (error) {
            console.error("Error saving language:", error);
        }
    };

    const renderView = () => {
        if (showNewLanguage) {
            return newLanguage();
        } else {
            return defaultLanguagePage();
        }
    };

    const LanguageButton = ({ language }) => {
        const navigateToTopicPage = () => {
            navigation.navigate("TopicPage", { currentLanguage: language });
        };

        return (
            <Pressable style={bodyStyles.addButton} onPress={navigateToTopicPage}>
                <Text> {language} </Text>
            </Pressable>
        );
    };

    const defaultLanguagePage = () => {
        return (
            <View style={{ flex: 1 }}>
                <SyncDataComponent/>
                <TopBar navigation={navigation} />
                <ScrollView style={styles.body}>
                    <Text> Welcome! </Text>
                    {languages?.map((language, index) => (
                        <LanguageButton key={index} language={language} />
                    ))}
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={() => setShowNewLanguage(true)}
                    >
                        <Text> + Add Language</Text>
                    </Pressable>
                </ScrollView>
                <NavBar navigation={navigation} />
            </View>
        );
    };

    const newLanguage = () => {
        return (
            <View style={{ flex: 1 }}>
                <TopBar navigation={navigation} />
                <View style={styles.body}>
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={async () => {
                            await saveLanguage("German");
                            setShowNewLanguage(false);
                        }}
                    >
                        <Text> German </Text>
                    </Pressable>
                    <Pressable
                        style={bodyStyles.addButton}
                        onPress={async () => {
                            await saveLanguage("English");
                            setShowNewLanguage(false);
                        }}
                    >
                        <Text> English </Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    return renderView();
};

const bodyStyles = StyleSheet.create({
    addButton: {
        alignSelf: "center",
    },
});

export default LanguageBody;
