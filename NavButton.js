'use strict';

var React = require('react-native');

var {
	TouchableHighlight,
	Text,
} = React

var NavButton = React.createClass ({
	render() {
		return (
			<TouchableHighlight
				style={this.props.style}
				underlayColor={this.props.underlayColor}
				onPress={this.props.onPress}>
				<Text style={this.props.textStyle}>{this.props.text}</Text>
			</TouchableHighlight>
		);
	}
});

module.exports = NavButton;
