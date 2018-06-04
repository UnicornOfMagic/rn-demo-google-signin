/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import firebase from 'react-native-firebase'
import Login from './screens/login'
import styles from './styles'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

GoogleSignin.configure({
    iosClientId: '503833222662-v6m2d2bm1fcvpjn3h5f6kfok1b5u1g4m.apps.googleusercontent.com'
});

type Props = {};
export default class App extends Component<Props> {

    constructor() {
        super();
        this.unsubscriber = null;
        this.state = {
            user: '',
        };
    }

    /**
     * Listen for any auth state changes and update component state
     */
    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    render() {
        if (!this.state.user) {
            return (
                <View style={styles.container}>
                    <Text>Unauth</Text>
                    <Login />
                </View>
            );

        }

        return (
            <View style={styles.container}>
                <Text>Auth</Text>
                <Login />
            </View>
        );
    }
}
