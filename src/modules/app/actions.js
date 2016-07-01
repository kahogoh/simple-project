import {
  ADD,
  REMOVE,
  FILTER,
  UNFILTER,
} from './constants'

export const add = (color) => ({
  type: ADD,
  payload: {
    color,
  },
})

export const remove = (id) => ({
  type: REMOVE,
  payload: {
    id,
  },
})

export const filter = (color) => ({
  type: FILTER,
  payload: {
    color,
  },
})

export const unfilter = () => ({
  type: UNFILTER,
})
