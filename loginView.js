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

var LoginView = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			email: '',
			pwd1: '',
			pwd2: '',
		}
	},
  
	componentWillMount: function() {
		this.ref = new Firebase('https://pomodor0.firebaseio.com/');
		this.bindAsArray(this.ref, 'storage');
		console.log(this.ref.storage);
	},

	render: function() {
		return (
			<View style={styles.loginView}>
				<View style={styles.fields}>
					<View style={styles.fieldsContainer}>
						<TextInput
									style={styles.emailField}
									placeholder='email'/>

						<View style={styles.pwdContainer}>
							<TextInput
										style={styles.pwdField}
										placeholder='password'
										key= 'pwd'/>
							<TextInput
										style={styles.pwdField}
										placeholder='confirm password'
										key= 'confirmPWD'/>
						</View>
					</View>
				</View>

				<View style={styles.buttons}>
					<View style={styles.buttonsContainer}>
						<NavButton
							style={styles.signUpButton}
							underlayColor='#99d9f4'
							text='Sign Up'
							textStyle={styles.signUpButtonText}
							onPress={ () => this.navigateToTodayView()}>
						</NavButton>

						<NavButton
							style={styles.loginButton}
							underlayColor='transparent'
							text='Already a member?'
							textStyle={styles.loginButtonText}
							onPress={ () => this.navigateToTodayView()}>
						</NavButton>
					</View>
				</View>
			</View>
		);
    },

	navigateToTodayView: function() {
		this.props.navigator.push({
			name:'TodayView',
			component:TodayView,
		});
    },

	authHandler: function(error, authData) {
		if (error) {
			console.log(" the error " + error);
		} else {
			console.log("user authenticated " + authData);
		}
	},
});

var styles = StyleSheet.create({

	// the parent of all views in the login view
    loginView: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#00796B',
    },

	// the parent of all the field related views
	fields: {
		flex: 72,
		justifyContent: 'center',
		backgroundColor: '#00796B',
	},

	// the parent of all the button related views
	buttons: {
		flex: 38,
		justifyContent: 'center',
		backgroundColor: '#00796B',
	},

	// Login fields setup
	fieldsContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',

		margin: (Dimensions.get('window').width * 0.1),
		borderRadius: 2,
	},
	pwdContainer: {
		flex: 2,
		justifyContent: 'center',
		backgroundColor: 'white',

		borderRadius: 2,
		// backgroundColor: '#00796B',
	},
    emailField: {
		flex: 1,
		backgroundColor: '#2ecc71',

		margin: 3,
		marginTop: (Dimensions.get('window').height * 0.285),
		marginBottom: (Dimensions.get('window').height * 0.05),
		borderRadius: 2,

		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: { width: 0, height: 2},
    },
	pwdField: {
		flex: 1,
		backgroundColor: '#2ecc71',

		margin: 3,
		borderRadius: 2,

		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: { width: 0, height: 2},
	},

	// Buttons setup
	buttonsContainer: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: '#00796B',

		margin: (Dimensions.get('window').width * 0.1),
		borderRadius: 2,
	},
	signUpButton: {
		height: (Dimensions.get('window').height * 0.08),
		justifyContent: 'center',
		backgroundColor: '#2ecc71',

		padding: 4,
		margin: 3,
		borderRadius: 2,

		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 1,
		shadowOffset: { width: 0, height: 2},
	},
	loginButton: {
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#00796B',

		height: (Dimensions.get('window').height * 0.026),
		width: (Dimensions.get('window').width * 0.35),

		marginTop: 7,
	},
	signUpButtonText: {
		fontSize: 18,
		alignSelf: 'center',
		textAlign: 'center',
    },
	loginButtonText: {
		fontSize: 11,
		alignSelf: 'center',
		textAlign: 'center',
    },
});

module.exports = LoginView;
