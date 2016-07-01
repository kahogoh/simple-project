import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

const { func, string } = PropTypes

const styles = StyleSheet.create({
  button: {
    height: 20,
    padding: 20,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
})

class Button extends Component {
  static propTypes = {
    title: string.isRequired,
    onPress: func.isRequired,
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

export default Button
