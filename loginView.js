// static login View component

'use strict';

import Dimensions from 'Dimensions';

var React = require('react-native');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var TodayView = require('./todayView');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Component,
  Navigator,
} = React

class NavButton extends Component {

	render (){
		return(
			<TouchableHighlight
				style={this.props.style}
				underlayColor={this.props.underlayColor}	
				onPress={this.props.onPress}>
				<Text style={styles.buttonText}>{this.props.text}</Text>
			</TouchableHighlight>
		)
	}
}

class LoginView extends Component {
  
  render() {
    return (
      <View style={styles.loginView}>
        {this.renderLoginInterfaceContainer()}
      </View>
    );
  }

  renderLoginInterfaceContainer() {
    return (
      <View style={styles.loginInterfaceContainer}>
        {this.renderLoginFields()}
        {this.renderLoginButtons()}
      </View>
    );
  }

  renderLoginFields() {
    return (
      <View style={styles.loginFields}>

        <TextInput 
          style={styles.loginField}
          placeholder='username'/>

        <TextInput
          style={styles.loginField}
          placeholder='password'/>

      </View>
    );
  }

  navigateToTodayView() {
	this.props.navigator.push({
		name:'TodayView',
		component:TodayView,
	}) 
  }

  navigateToSignUpView() {
	this.props.navigator.push({
		name:'SignUpView',
		component:SignUpView,
	}) 
  }

  renderLoginButtons() {
    return (
      <View style={styles.loginButtons}>

		<NavButton
			style={styles.loginButton}
			uderlayColor='#99d9f4'
			text='Login'
			onPress={ () => this.navigateToTodayView()}>
		</NavButton>

		<NavButton
			style={styles.signUpButton}
			uderlayColor='#99d9f4'
			text='Sign Up!'
			onPress={ () => this.navigateToSignUpView()}>
		</NavButton>
      </View>
    );
  }

  moveToTodayView() {
    return(
      <NavigatorIOS
        initialRoute={{
          title: 'Today View',
          component: TodayView,
        }}
      />
    )
  }
}

var styles = StyleSheet.create({

  loginView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  loginInterfaceContainer: {
    width:  (Dimensions.get('window').width * 0.8),
    height: (Dimensions.get('window').height * 0.4),
    backgroundColor: '#EC693B',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: (Dimensions.get('window').height / 4),
    // marginLeft: (Dimensions.get('window').height / 6),
  },

  loginFields: {
    backgroundColor: '#FDC743',
    // flexDirection : 'column',
    // justifyContent: 'center',
    // alignSelf: 'stretch',
    // marginLeft: (Dimensions.get('window').width / 6),
    // marginRight: (Dimensions.get('window').width / 6),
  },

  loginField: {
    height: 36,
    padding: 4,
    margin: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 2,
    color: '#48BBEC',
  },

  loginButtons: {
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height * 0.15),
    backgroundColor: '#81C8A0',
    // flexDirection: 'column',
    // alignSelf: 'stretch',
  },

  loginButton: {
    backgroundColor: '#57C2DC',
    height: 36,
    padding: 4,
    margin: 5,
    // borderWidth: 1,
    // borderRadius: 2,
  },

  signUpButton: {
    backgroundColor: '#57C2DC',
    height: 36,
    padding: 4,
    margin: 5,
  },

  buttonText: {
    fontSize: 18,
    alignSelf: 'center',
    // textAlign: 'center',
  },
});

module.exports = LoginView
