import { handleActions } from 'redux-actions'
import { concat, filter, omit, isEmpty, pullAllBy } from 'lodash/fp'
import {
  ADD,
  REMOVE,
  FILTER,
  UNFILTER,
} from './constants'

const initialState = {
  idGen: 1,
  colorFilter: '',
  colors: { },
  filteredColors: [],
}

export default handleActions({
  [ADD]: (state, action) => {
    const { payload: { color } } = action
    return {
      ...state,
      colors: {
        ...state.colors,
        [state.idGen]: {
          id: state.idGen,
          color,
        },
      },
      idGen: state.idGen + 1,
    }
  },
  [REMOVE]: (state, action) => {
    const { payload: { id } } = action
    const colors = omit(id, state.colors)
    return {
      ...state,
      colors,
    }
  },
  [FILTER]: (state, action) => {
    const { payload: { color } } = action
    const appliedFilteredColors = filter({ color }, state.filteredColors)

    let filteredColors
    if (!isEmpty(appliedFilteredColors)) {
      filteredColors = pullAllBy('color', appliedFilteredColors, state.filteredColors)
    } else {
      filteredColors = concat(state.filteredColors, filter({ color }, state.colors))
    }

    return {
      ...state,
      filteredColors,
    }
  },
  [UNFILTER]: (state) => ({
    ...state,
    filteredColors: [],
  }),
}, initialState)
