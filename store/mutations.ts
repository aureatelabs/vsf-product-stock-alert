import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.ADD_NOTIFY_USER] (state, payload) {
    state.notifyUserInfo.push(payload)
  },
  [types.REMOVE_NOTIFY_USER] (state, customerID) {
    if (customerID) {
      if (state.notifyUserInfo[customerID]) {
        delete state.notifyUserInfo[customerID]
      }
    } else {
      state.notifyUserInfo = []
    }
  }
}
