/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var LoginView = require('./loginView');
var TodayView = require('./todayView');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

var Flow = React.createClass({
  render: function() {
    return (
		<Navigator
			style={styles.container}
			initialRoute={{
				name:'meh',
				component:LoginView,
			}}>
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
