import { appDispatcher } from './Dispatcher'

import lib from '../Library/Library'

export const ActionType = {
  TOAST_SHOW: 'TOAST_SHOW'
}

export const Actions = {
  toastShow: (message) => {
    appDispatcher.dispatch({
      actionType: ActionType.TOAST_SHOW,
      message: message
    })
  }
}