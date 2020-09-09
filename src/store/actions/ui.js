import { SET_LANG, SET_THEME, TOGGLE_MODAL } from 'store/actions/actionTypes'

export const setLang = lang => {
  return {
    type: SET_LANG,
    payload: lang
  }
}

export const toggleModal = (status, content) => {
  return {
    type: TOGGLE_MODAL,
    payload: {
      status,
      content
    }
  }
}

export const setTheme = theme => {
  return {
    type: SET_THEME,
    payload: theme
  }
}
