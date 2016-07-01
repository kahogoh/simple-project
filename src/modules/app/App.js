import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native'
import { isEmpty } from 'lodash/fp'
import { connect } from 'react-redux'
import * as actions from './actions'
import Box from './components/Box'
import Button from './components/Button'

const { object, array, func } = PropTypes
const COLOURS = [
  'black',
  'red',
  'blue',
  'orange',
  'green',
  'grey',
  'purple',
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    textAlign: 'center',
    color: '#333333',
    fontWeight: 'bold',
    margin: 5,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  bottomBar: {
    height: 150,
    alignItems: 'center',
  },
  colorPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPanel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

class App extends Component {
  static propTypes = {
    colors: object.isRequired,
    filteredColors: array.isRequired,
    add: func.isRequired,
    remove: func.isRequired,
    filter: func.isRequired,
    unfilter: func.isRequired,
  }
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }).cloneWithRows([]),
    index: 0,
  }

  componentWillReceiveProps = (nextProps) => {
    let title = 'Colour List'
    let targetList = nextProps.colors
    if (!isEmpty(nextProps.filteredColors)) {
      title = 'Filtered List'
      targetList = nextProps.filteredColors
    }
    this.setState({
      title,
      dataSource: this.state.dataSource.cloneWithRows(targetList),
    })
  }

  addColor = () => {
    this.props.add('red')
  }

  renderHeader = () => (
    <Text style={styles.title}>
      {this.state.title}
    </Text>
  )

  renderRow = (data) => {
    const removeThis = () => {
      this.props.remove(data.id)
    }
    return (
      <Box
        color={data.color}
        id={data.id}
        onPress={removeThis}
      />
    )
  }

  renderBottomBar = () => {
    const color = COLOURS[this.state.index]
    const prevColor = () => {
      const { index } = this.state
      const prevIndex = index - 1 < 0 ? COLOURS.length - 1 : index - 1
      this.setState({ index: prevIndex })
    }
    const nextColor = () => {
      const { index } = this.state
      const nextIndex = index + 1 >= COLOURS.length ? 0 : index + 1
      this.setState({ index: nextIndex })
    }
    const addThis = () => {
      this.props.add(color)
    }
    const filterThis = () => {
      this.props.filter(color)
    }
    const unfilterThis = () => {
      this.props.unfilter()
    }

    return (
      <View style={styles.bottomBar}>
        <View style={styles.colorPanel}>
          <Button title='< ' onPress={prevColor} />
          <Box color={color} />
          <Button title=' >' onPress={nextColor} />
        </View>
        <View style={styles.buttonPanel}>
          <Button title='Add' onPress={addThis} />
          <Button title='Filter' onPress={filterThis} />
          <Button title='Clear Filter' onPress={unfilterThis} />
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        {this.renderHeader()}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          contentContainerStyle={styles.scrollContainer}
          enableEmptySections
        />
        {this.renderBottomBar()}
      </View>
    )
  }
}

export default connect(
  (state) => ({
    colors: state.app.colors,
    filteredColors: state.app.filteredColors,
  }),
  (dispatch) => ({
    add: (color) => dispatch(actions.add(color)),
    remove: (id) => dispatch(actions.remove(id)),
    filter: (color) => dispatch(actions.filter(color)),
    unfilter: () => dispatch(actions.unfilter()),
  })
)(App)
