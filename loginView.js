// static login View component

'use strict';

import Dimensions from 'Dimensions';

var React = require('react-native');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var TodayView = require('./todayView');
var NavButton = require('./NavButton');

var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	Component,
	Navigator,
} = React

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
		});
    }

    renderLoginButtons() {
		return (
			<View style={styles.loginButtons}>
				<NavButton
					style={styles.loginButton}
					uderlayColor='#99d9f4'
					text='Login'
					textStyle={styles.buttonText}
					onPress={ () => this.navigateToTodayView()}>
				</NavButton>
			</View>
		);
    }
}

var styles = StyleSheet.create({

    loginView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00796B',
    },

    loginInterfaceContainer: {
		width:  (Dimensions.get('window').width * 0.8),
		height: (Dimensions.get('window').height * 0.4),
		backgroundColor: '#00796B',
		// justifyContent: 'center',
		// alignItems: 'center',
		// marginTop: (Dimensions.get('window').height / 4),
		// marginLeft: (Dimensions.get('window').height / 6),
    },

    loginFields: {
		backgroundColor: '#2ecc71',
		// flexDirection : 'column',
		// justifyContent: 'center',
		// alignSelf: 'stretch',
		// marginLeft: (Dimensions.get('window').width / 6),
		// marginRight: (Dimensions.get('window').width / 6,
		borderRadius: 2,
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: { width: 0, height: 2},
    },

    loginField: {
		height: 36,
		padding: 4,
		margin: 5,
		fontSize: 18,
		// borderWidth: 1,
		// borderColor: '#48BBEC',
		borderRadius: 2,
    },

    loginButtons: {
		justifyContent: 'center',
		marginTop: (Dimensions.get('window').height * 0.15),
		backgroundColor: '#2ecc71',
		borderRadius: 2,
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: { width: 0, height: 2},
    },
	
    loginButton: {
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
		textAlign: 'center',
		paddingTop: 3,
    },
});

module.exports = LoginView;
