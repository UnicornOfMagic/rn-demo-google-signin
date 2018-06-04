import React, {Component} from 'react'
import {Alert, Button, View, Text, TextInput} from 'react-native'
import styles from '../styles'
import firebase from 'react-native-firebase'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


export default class Login extends Component<Props> {
    constructor() {
        super();
        this.state = {
            userName: '',
            password: ''
        };
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                console.log(user);
                this.setState({user: user});
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
    }

    componentDidMount() {
        GoogleSignin.currentUserAsync().then((user) => {
            console.log('USER', user);
            this.setState({user: user});
        }).done();
    }

    render() {
        return (
            <View style={styles.instructions}>
                <Text>Login</Text>
                <Text>{this.state.userName + ' ' + this.state.password}</Text>
                <TextInput
                    placeholder={'E-mail'}
                    label={'E-mail'}
                    onChangeText={(text) => this.setState({userName: text, password: this.state.password})}/>
                <TextInput
                    placeholder={'Password'}
                    label={'Password'}
                    secureTextEntry
                    onChangeText={(text) => this.setState({password: text, userName: this.state.userName})}/>
                <Button onPress={() => {firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.password);
                }} title={'hello'} />'

                <GoogleSigninButton
                    style={{width: 48, height: 48}}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn.bind(this)}/>
                <Text>{this.state.user ? this.state.user.name : ''}</Text>
                <Button title={'logout'} onPress={() => {GoogleSignin.signOut().then(() => {this.setState({user: null})})}}/>
            </View>
        )
    }
}