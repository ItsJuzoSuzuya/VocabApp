import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import TopBar from "./TopBar";
import styles from "../scripts/style";
import NavBar from "./NavBar";

const ChooseModeBody = ({navigation, route}) => {
    const { currentLanguage } = route.params;
    const { currentTopic } = route.params;

    const renderView = () => {
        return ModePage()
    }

    const navigateToMode = ( mode ) => {
        navigation.navigate(mode + "Page", {currentLanguage: currentLanguage, currentTopic: currentTopic });
    };


    const ModePage = () => {
        return (
            <View style={{flex: 1}}>
                <TopBar navigation={navigation}/>
                <ScrollView style={styles.body}>
                    <Pressable style={bodyStyles.addButton} onPress={() => navigateToMode("Word")}>
                        <Text> a </Text>
                    </Pressable>
                    <Pressable style={bodyStyles.addButton} onPress={() => navigateToMode("Word")}>
                        <Text> b </Text>
                    </Pressable>
                    <Pressable style={bodyStyles.addButton} onPress={() => navigateToMode("Word")}>
                        <Text> c </Text>
                    </Pressable>
                    <Pressable style={bodyStyles.addButton} onPress={() => navigateToMode("Word")}>
                        <Text> d </Text>
                    </Pressable>
                    <Pressable style={bodyStyles.addButton} onPress={() => navigateToMode("Word")}>
                        <Text> e </Text>
                    </Pressable>
                    <Pressable style={bodyStyles.addButton} onPress={() => navigateToMode("Word")}>
                        <Text> f </Text>
                    </Pressable>
                </ScrollView>
                <NavBar navigation={navigation}/>
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

export default ChooseModeBody;