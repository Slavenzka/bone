import { LangOptions, Themes } from 'utils/const'
import { SET_BUTTON_TYPE, SET_LANG, SET_THEME, TOGGLE_MODAL } from 'store/actions/actionTypes'
import { updateObject } from 'utils'
import { ActionButtonTypes } from 'utils/ActionButtonTypes'

const initialState = {
  lang: LangOptions.find(item => item.value === 'EN'),
  modal: {
    status: false,
    content: null,
  },
  theme: Themes.DARK,
  submitButtonType: ActionButtonTypes.CONNECT
}

export function uiReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LANG: return updateObject(state, { lang: action.payload })
    case TOGGLE_MODAL:
      return updateObject(state, { modal: {
        status: action.payload.status,
        content: action.payload.content,
      }})
    case SET_THEME: return updateObject(state, { theme: action.payload })
    case SET_BUTTON_TYPE: return updateObject(state, { submitButtonType: action.payload })
    default: return state
  }
}
