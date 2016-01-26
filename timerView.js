'use-strict';

var React = require('react-native');
var NavButton = require('./NavButton');
var TimerMixin = require('react-timer-mixin')
var {
	Text,
	View,
	StyleSheet,
} = React

var TimerView = React.createClass({
	mixins: [TimerMixin],

	getInitialState: function() {
		return {
			secondsRemaining: 1500,
			poms: 3,
			textDisplayed: '',
			brake: false,
		};
	},

	_navigateToTodayView: function() {
		this.props.navigator.pop();
	},

	tick: function() {
		this.setState({ secondsRemaining: this.state.secondsRemaining - 1});

		if (this.state.secondsRemaining <= 0 && this.state.poms <= 0) {
			clearInterval(this.interval);
			this.setState({
				textDisplayed: 'All done!'
			});
		}

		if (this.state.secondsRemaining <= 0 && this.state.poms != 0) {
			this.setState({
				poms: this.state.poms - 1,
				textDisplayed: this.state.brake ? '' : 'Go take a break!',
				secondsRemaining: this.state.brake ? 1500 : 300,
				brake: this.state.brake ? false : true,
			});
		}

		console.log(this.state.secondsRemaining + ' end tick');
	},

	componentDidMount: function() {
		this.setState({
			// secondsRemaining: this.props.secondsRemaining,
		    poms: this.props.poms,
		});

		this.setInterval(this.tick, 1000);
	},

	render: function() {
		var _minutes =  Math.floor(this.state.secondsRemaining / 60);
		var _seconds =  this.state.secondsRemaining - _minutes * 60;
		if (_seconds <= 9) { _seconds = '0' + _seconds }

		return (
			<View style={styles.container}>
				<Text style={styles.titleText}>
					{this.state.textDisplayed}
				</Text>
				<Text style={styles.timeText}>
					{'' + _minutes + ':' + _seconds}
				</Text>
				<NavButton style={styles.stopButton}
						   text='◼︎'
						   textStyle={styles.buttonText}
						   onPress={this._navigateToTodayView}>
				</NavButton>
			</View>
		);
	},
});

var styles = StyleSheet.create({

	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#00796B',
	},

	timeText: {
		flex: 2,
		paddingTop: 30,
		fontSize: 65,
		textAlign: 'center',
		color: '#2ecc71',
		// textShadowColor: '#000000',
		// textShadowOpacity: 0.8,
		// textShadowRadius: 1,
		// textShadowOffset: { width: 0, height: 1},
	},
	
	titleText: {
		flex: 1,
		fontSize: 15,
		textAlign: 'center',
		paddingTop: 140,
		color: '#2ecc71'
	},

	stopButton: {
		backgroundColor: '#2ecc71',
		width: 64,
		height: 64,
		marginBottom: 40,
		borderRadius: 32,
		justifyContent: 'center',
		paddingBottom: 15,
		paddingLeft: 1,
		shadowColor: '#000000',
		shadowOpacity: 0.6,
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 2},
	},

	buttonText: {
		height: 37,
		width: 37,
		fontSize: 33,
		textAlign: 'center',
		alignSelf: 'center',
	},
})

module.exports = TimerView;
