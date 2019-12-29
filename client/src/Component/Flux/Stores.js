import { appDispatcher } from './Dispatcher'
import { ActionType, Actions } from './Actions'

import lib from '../Library/Library'

export const toastStore = {message: undefined, show: null}
appDispatcher.register(payload => {
  if (payload.actionType === ActionType.TOAST_SHOW) {
    toastStore.message = payload.message
    toastStore.show()
  }
})