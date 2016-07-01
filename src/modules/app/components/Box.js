import React, {
  Component,
  PropTypes,
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

const { func, string, number } = PropTypes

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
  },
})

class Box extends Component {
  static propTypes = {
    color: string.isRequired,
    id: number,
    onPress: func,
  }
  render() {
    const colorStyle = {
      backgroundColor: this.props.color,
    }
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.container, colorStyle]}>
          <Text style={styles.text}>
            {this.props.id}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default connect(
  (state) => ({
    colorFilter: state.app.colorFilter,
  }),
)(Box)
