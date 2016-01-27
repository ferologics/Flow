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
											key= 'email'/>
							</View>

							<View style={[ styles.pwdContainer, styles.lightGreen, styles.center, styles.shadow, styles.border ]}>

								<View style={[ styles.flex, {}, styles.lightGreen, styles.border ]}>
									<TextInput  style={[ styles.flex, styles.textFieldInset, styles.textFieldPadding, styles.lightGreen, styles.border ]}
												placeholder='password'
												key= 'pwd'/>
								</View>

								<View style={[ styles.flex,  styles.lightGreen, styles.border, styles.border ]}>
									<TextInput  style={[ styles.flex, styles.textFieldInset, styles.textFieldPadding, styles.lightGreen, styles.border ]}
												placeholder='confirm password'
												key= 'confirmPWD'/>
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
									onPress={ () => this.navigateToTodayView()}>
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
