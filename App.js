import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LanguageBody from './CustomComponents/LanguageBody';
import ProfileBody from './CustomComponents/ProfileBody';
import TopicBody from './CustomComponents/TopicBody';
import WordBody from './CustomComponents/WordBody';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='LanguagePage' component={LanguageBody} options={{ headerShown: false }} />
                <Stack.Screen name='TopicPage' component={TopicBody} options={{ headerShown: false }} />
                <Stack.Screen name='ProfilePage' component={ProfileBody} options={{ headerShown: false }} />
                <Stack.Screen name='WordPage' component={WordBody} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
