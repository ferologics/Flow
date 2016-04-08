'use strict';

import Dimensions from 'Dimensions';

var React = require('react-native');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var NavButton = require('./NavButton');
var TimerView = require('./timerView');
var _ = require('underscore');

var {
  ListView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Component
} = React

var TodayView = React.createClass({

	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			storage: [],
			newTodoText: '',
			email: '',
			pwd1: '',
			pwd2: '',
		}
	},

	componentWillMount: function() {
		this.ref = new Firebase('https://pomodor0.firebaseio.com/tasks');
		this.bindAsArray(this.ref, 'storage');
	},

	componentDidMount: function() {

	},

	render: function() {
		console.log(this.state.storage);

		return (
			<View style={{flex: 1, paddingTop: 22, backgroundColor: '#f1c40f'}}>
				<View style={{ flex: 1, backgroundColor: '#00796B'}}>
					{this.renderListView()}
					<NavButton style={styles.timerButton}
							onPress={ this.startTimer }
							textStyle={styles.buttonText}
							text='▷'>
					</NavButton>
				</View>
			</View>
		);
	},

	returnNumberOfPomodoros: function() {
		var poms = 0;
		var stuff = this.state.storage['tasks'];

		for (var i = 0; i < stuff.length; i++) {
			if (stuff[i].count != "") { poms = poms + stuff[i].count }
		}

		console.log(poms);
		return poms;
	},

	startTimer: function() {
		// console.log( 'start timer ' + this.props.navigator.getCurrentRoutes());
		this.props.navigator.push({
			name:'TimerView',
			component:TimerView,
		});
	},

	renderListView: function() {
		console.log('list view ' + this.state.storage);

		return (
			<View style={{flex:1}}>
				<ListView
					dataSource={this.state.dataSource.cloneWithRows(this.state.storage)}
					renderRow={this.renderTask}
					style={styles.task}>
				</ListView>
			</View>
		);
	},

	renderTask: function(task) {
		return (
			<View style={styles.taskViewContainer}>
				<TextInput style={styles.taskText} value={task.title}>
				</TextInput>

				<TextInput style={styles.countText} value={'' + task.count} keyboardType='numeric' >
				</TextInput>
			</View>
		)
	},
});

var styles = StyleSheet.create({

	taskViewContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		marginTop: 1,
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 1},
	},
	task: {
		flex: 1,
		flexDirection: 'column',
		// height: (Dimensions.get('window').height / 8),
		backgroundColor: '#00796B',
	},
	taskText: {
		backgroundColor: '#f1c40f',
		fontSize: 18,
		flex: 5,
		// marginTop: (Dimensions.get('window').height*(1/(8*5))),
		// marginBottom: (Dimensions.get('window').height*(1/(8*5))),
		paddingLeft: (Dimensions.get('window').width*(1/(8*5))),
		textAlign: 'left',
		height: 60,
	},
	countText: {
		flex: 1,
		fontSize: 18,
		// marginTop: (Dimensions.get('window').height*(1/(8*5))),
		// marginBottom: (Dimensions.get('window').height*(1/(8*5))),
		textAlign: 'center',
		height: 60,
		backgroundColor: '#2ecc71',
		marginLeft: 1,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	timerButton: {
		backgroundColor: '#2ecc71',
		height: 64,
		width: 64, 
		marginBottom: 32,
		borderRadius: 32,
		justifyContent: 'center',
		alignSelf: 'center',
		shadowColor: '#000000',
		shadowOpacity: 0.6,
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 2},
	},

	buttonText: {
		height: 30,
		width: 30,
		fontSize: 28,
		alignSelf: 'center',
		textAlign: 'center',
		paddingTop: 2,
		paddingLeft: 4,
    },
});

module.exports = TodayView;
