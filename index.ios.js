/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React       = require('react-native');
var Firebase    = require('firebase');
var LoginView   = require('./loginView');
var TodayView   = require('./todayView');
// var LoadingView = require('./loadingView');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage,
} = React;

var Fuck_My_Life = React.createClass({
	
    _renderScene: function(route, navigator) {
		console.log("component ", route.component);

		if (route.component) {
			return React.createElement(route.component, { navigator });
		}
    },

	getInitialState: function() {
		return {
			componentToMount: null,
			loading: true,
		}
	},

	componentWillMount: function() {
		this.findLoginToken();
	},

    render: function() {
		console.log('render state ', this.state.componentToMount);
		var self = this;

		if (this.state.loading) {
			return this.renderLoadingView();
		} 

		return (
			<Navigator
				style={styles.container}
				initialRoute={{
					name:'Initial View',
					component: self.state.componentToMount,
				}}
				renderScene={(route, navigator) => this._renderScene(route, navigator)}>
			</Navigator>
		);
    },

	renderLoadingView: function() {
	    return (
			<View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
				<Text>
					Loading...
				</Text>
			</View>
		);
	},

	findLoginToken: function() {
		AsyncStorage.getItem('TOKEN', (error, result) => {

			console.log('error: ', error, 'result: ', result);

			if (!result || error) {
				console.log('login token not found :( ');

				this.setState({
					componentToMount: LoginView,
					loading: false,
				});

			} else {
				console.log("authToken --> " + result);

				var ref = new Firebase("https://pomodor0.firebaseio.com/");
				ref.authWithCustomToken(result, (error, authData) => {
					
					if (error) {
						console.log('error logging in - authData: ' + authData);
					} else {
						console.log("Authenticated successfully with payload: ", authData);

						this.setState({
							componentToMount: TodayView,
							loading: false,
						});
					}
				});
			}
		});
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

AppRegistry.registerComponent('Project', () => Fuck_My_Life);
