import {
  SET_CURRENT_FONT_SIZE, SET_USER_DEVICE_TYPE,
} from 'store/actions/actionTypes'

export const setFontSize = data => {
  return {
    type: SET_CURRENT_FONT_SIZE,
    payload: data
  }
}

export const setDeviceType = type => {
  return {
    type: SET_USER_DEVICE_TYPE,
    payload: type
  }
}
