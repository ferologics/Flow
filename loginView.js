// static login View component

'use strict';

import Dimensions from 'Dimensions';

var React          = require( 'react-native' );
var ReactFireMixin = require(    'reactfire' );
var Firebase       = require(     'firebase' );
var TodayView      = require(  './todayView' );
var NavButton      = require(  './NavButton' );

var {
	StyleSheet,
	TextInput,
	View,
	Alert,
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
			<View style={[ styles.flex, styles.rows, styles.darkGreen ]}>
				<View style={[ styles.fields, styles.center, styles.darkGreen ]}>
					<View style={[ styles.flex, styles.center, styles.fieldsContainer, styles.darkGreen ]}>

							<View style={[ styles.emailView, styles.flex, styles.shadow, styles.darkGreen ]}>
								<TextInput  style={[ styles.flex, styles.textFieldInset, styles.textFieldPadding, styles.lightGreen, styles.border ]}
											placeholder='email'
											value={ this.state.email }
											onChangeText={ (text) => this.setState({ email: text}) }
											autoCapitalize='none'
											key= 'email'/>
							</View>

							<View style={[ styles.pwdContainer, styles.lightGreen, styles.center, styles.shadow, styles.border ]}>

								<View style={[ styles.flex, styles.lightGreen, styles.border ]}>
									<TextInput  style={[ styles.flex, styles.textFieldInset, styles.textFieldPadding, styles.lightGreen, styles.border ]}
												placeholder='password'
												secureTextEntry={true}
												value={ this.state.pwd1 }
												onChangeText={ (text) => this.setState({ pwd1: text }) }
												testID= 'pwd'/>
								</View>

								<View style={[ styles.flex,  styles.lightGreen, styles.border, styles.border ]}>
									<TextInput  style={[ styles.flex, styles.textFieldInset, styles.textFieldPadding, styles.lightGreen, styles.border ]}
												placeholder='confirm password'
												secureTextEntry={true}
												value={this.state.pwd2}
												onChangeText={ (text) => this.setState({ pwd2: text }) }
												testID= 'confirmPWD'/>
								</View>
							</View>
					</View>
				</View>

				<View style={[ styles.buttons, styles.center ]}>
					<View style={[ styles.buttonsContainer, styles.flex, styles.center ]}>
						<NavButton
									style={[  styles.signUpButton, styles.shadow, styles.lightGreen, styles.center, styles.border ]}
									underlayColor='#99d9f4'
									text='Sign Up'
									textStyle={styles.signUpButtonText}
									onPress={ () => this.startSignup()}>
						</NavButton>

						<NavButton
									style={[ styles.flex, styles.loginButton, styles.darkGreen, styles.border ]}
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

	startSignup: function() {

		// check passwords & email
		if (this.checkCredentials()) {
			// register user
			this.registerUser();

			this.loginUser();

			// (tbd) onboarding

			// go to today view
			this.navigateToTodayView();
		}
	},

	checkCredentials: function() {
		// check email
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(this.state.email)) {
			// check passwords
			if (this.state.pwd1 === this.state.pwd2) {
				return true;
			} else { 
				return this.displayAlert("password", "The passwords don't match.");
			}
		} else { 
			return this.displayAlert("email", "The specified email is not valid.");
		}
	},

	displayAlert: function(title, text) {
		var button = [];
		if      (title === 'email'   ) { button= [ { text: 'OK', onPress: () => this.clearEmail() } ] }
		else if (title === 'password') { button= [ { text: 'OK', onPress: () => this.clearPwd()   } ] }
				
		Alert.alert(
			'Invalid ' + title,
			text,
			button
		);
		return false;
	},

	clearEmail: function() {
		console.log('invalid email');
		// this.setState({
		// 	email: '',
		// });
	},
	clearPwd: function() {
		this.setState({
			pwd1: '',
			pwd2: '',
		});
	},

	registerUser() {
		// add child to users
		this.ref.createUser({
			email:    this.state.email,
			password: this.state.pwd1
		}, function(error, userData) {
			if (error) {
				console.log('error creating user: ', error); // TODO add alerts
			} else {
				console.log('success! UID: ', userData.uid);
			}
		});
	},

	loginUser() {
		console.log('authenticating the user to log in')
		this.ref.authWithPassword({
			email: this.state.email,
			password: this.state.pwd1
		}, function(error, authData) {
			if (error) {
				console.log('Error logging in -- ', error); // TODO add alerts
			} else {
				console.log('Success logging in! -- ', authData);
			}
		}, { 
			remember: 'default'
		});
	},

	navigateToTodayView: function() {
		this.props.navigator.push({
			name:'TodayView',
			component:TodayView,
		});
    },

	handlePwdChange: function(index, text) {
		var stars='';
		var pwd = '';
		for (var i=0, len=text.length; i<len; i++) {
			stars += '*';
		}

		switch (index) {
			case 1:
				if (this.state.actualPwd1.length < text.length) {
					pwd = this.state.actualPwd1 + text.charAt(text.length -1);
				} else { 
					pwd = this.state.actualPwd1.slice(0, -1);
				}
				this.setState({
					pwd1: stars,
					actualPwd1: pwd 
				});
				break;
			case 2:
				if (this.state.actualPwd2.length < text.length) {
					pwd = this.state.actualPwd2 + text.charAt(text.length -1);
				} else { 
					pwd = this.state.actualPwd2.slice(0, -1);
				}
				this.setState({
					pwd2: stars,
					actualPwd2: pwd 
				});
				break;
		}
		console.log('1: ' + this.state.actualPwd1 + ' 2: ' + this.state.actualPwd2 );
	},
});

var styles = StyleSheet.create({
	// field related view styles
	fields: {
		flex: 77,
	},
	fieldsContainer: {
		margin: (Dimensions.get('window').width * 0.14),
	},
	pwdContainer: {
		flex: 2,
	},
	emailView: {
		marginTop: (Dimensions.get('window').height * 0.245),
		marginBottom: (Dimensions.get('window').height * 0.05),
	},

	// button related view styles
	buttons: {
		flex: 38,
	},
	buttonsContainer: {
		margin: (Dimensions.get('window').width * 0.1),
	},
	signUpButton: {
		padding: 4,

		marginTop: (Dimensions.get('window').height * 0.116),
		height: (Dimensions.get('window').height * 0.08),
	},
	loginButton: {
		marginTop: 7,
		alignSelf: 'center',

		height: (Dimensions.get('window').height * 0.026),
		width: (Dimensions.get('window').width * 0.35),
	},
	signUpButtonText: {
		fontSize: 18,
		textAlign: 'center',
    },
	loginButtonText: {
		fontSize: 11,
		textAlign: 'center',
    },

	// colors
	lightGreen: { backgroundColor : '#2ecc71' },
	darkGreen:  { backgroundColor : '#00796B' },

	// reusable styles
	flex:	 { flex           : 1        },
	border:  { borderRadius   : 2        },
	center:  { justifyContent : 'center' },
	columns: { flexDirection  : 'row'    },
	rows:	 { flexDirection  : 'column' },

	// finishing touches
	shadow:  {
		shadowColor   : '#000000',
		shadowOpacity : 0.4,
		shadowRadius  : 1.7,
		shadowOffset  : { width: 0, height: 3},
	},

	// misc
	textFieldInset: { paddingLeft: 8 },
	textFieldPadding: { padding: 2}
});

module.exports = LoginView;
