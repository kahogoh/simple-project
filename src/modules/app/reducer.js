import { handleActions } from 'redux-actions'
import { concat, filter, omit, pull, indexOf } from 'lodash/fp'
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
  filteredItems: [],
  filteredColors: [],
}

const updateFilterColors = (filteredItems, colors) => {
  let filteredColors = []
  filteredItems.map(color => {
    filteredColors = concat(filteredColors, filter({ color }, colors))
    return true
  })
  return filteredColors
}

export default handleActions({
  [ADD]: (state, action) => {
    const { payload: { color } } = action
    const colors = {
      ...state.colors,
      [state.idGen]: {
        id: state.idGen,
        color,
      },
    }
    return {
      ...state,
      colors,
      idGen: state.idGen + 1,
      filteredColors: updateFilterColors(state.filteredItems, colors),
    }
  },
  [REMOVE]: (state, action) => {
    const { payload: { id } } = action
    const colors = omit(id, state.colors)
    return {
      ...state,
      colors,
      filteredColors: updateFilterColors(state.filteredItems, colors),
    }
  },
  [FILTER]: (state, action) => {
    const { payload: { color } } = action
    let filteredItems
    if (indexOf(color, state.filteredItems) >= 0) { // remove from filter if exist
      filteredItems = pull(color, state.filteredItems)
    } else {
      filteredItems = concat(state.filteredItems, color)
    }
    const filteredColors = updateFilterColors(filteredItems, state.colors)

    return {
      ...state,
      filteredItems,
      filteredColors,
    }
  },
  [UNFILTER]: (state) => ({
    ...state,
    filteredItems: [],
    filteredColors: [],
  }),
}, initialState)
