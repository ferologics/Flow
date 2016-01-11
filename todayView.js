'use strict';

import Dimensions from 'Dimensions';

var React = require('react-native');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var {
  ListView,
  Text,
  View,
  StyleSheet,
  Component
} = React

var mockedTasks = 
[
  { title: 'Talk to Nick',
    count: 1, },
  { title: 'Do laundry',
    count: 3, },
  { title: 'Make static views for the app',
    count: 3, },
  { title: 'Integrate Firebase',
    count: 3, },
  { title: 'Introduce state',
    count: 7, },
]

var TodayView = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      newTodo: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: true,
      items: [],
    }
  },

  componentWillMount: function() {
    this.ref = new Firebase('https://pomodor0.firebaseio.com/tasks');
    this.bindAsArray(this.ref, 'items');
  },

  // componentDidMount: function() {

  // },
  
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return(
      <View style={{ flex: 1, paddingTop: 22, backgroundColor: '#FDC743'}}>
        {this.renderListView()}
      </View>
    );
  },

  renderListView: function() {
    return(
      <ListView 
        dataSource={this.state.dataSource.cloneWithRows(this.state.items)}
        renderRow={this.renderTask}
        style={styles.task}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Tasks...
        </Text>
      </View>
    )
  },

  renderTask: function(task) {
    return(

      <View style={styles.taskViewContainer}>
        <View style={styles.taskLabel}>
        
          <Text style={styles.taskText}>
            {task.title}
          </Text>
        </View>

        <View style={styles.pomodoroCount}>
        
          <Text style={styles.countText}>
            {task.count}
          </Text>
        </View>
      </View>
    )
  },
});

var styles = StyleSheet.create({

  taskViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  task: {
    flex: 1,
    flexDirection: 'column',
    // height: (Dimensions.get('window').height / 8),
    backgroundColor: '#EC693B',
  },
  taskLabel: {
    flex: 5,
    backgroundColor: '#FDC743',
  },
  taskText: {
    fontSize: 18,
    marginTop: (Dimensions.get('window').height*(1/(8*5))),
    marginBottom: (Dimensions.get('window').height*(1/(8*5))),
    marginLeft: (Dimensions.get('window').width*(1/(8*5))),
    textAlign: 'left',
  },
  pomodoroCount: {
    flex: 1,
    backgroundColor: '#81C8A0',
  },
  countText: {
    fontSize: 18,
    marginTop: (Dimensions.get('window').height*(1/(8*5))),
    marginBottom: (Dimensions.get('window').height*(1/(8*5))),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = TodayView;