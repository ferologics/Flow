/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var LoginView = require('./loginView');
var TodayView = require('./todayView');
var TimerView = require('./timerView');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

var Flow = React.createClass({
	
    _renderScene: function(route, navigator) {
		console.log(route, navigator);

		if (route.component) {
			return React.createElement(route.component, {navigator});
		}
    },

    render: function() {
		return (
			<Navigator
				style={styles.container}
				initialRoute={{
					name:'LoginView',
					component:LoginView,
				}}
				renderScene={(route,navigator) => this._renderScene(route, navigator)}>
			</Navigator>
		);
    }
});

var styles = StyleSheet.create({

	container: {
		flex: 1,
	},
});

AppRegistry.registerComponent('Flow', () => Flow);
