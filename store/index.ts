import { Module } from 'vuex'
import ProductStockAlertState from '../types/ProductStockAlertState'
import actions from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

export const module: Module<any, ProductStockAlertState> = {
  namespaced: true,
  state: {
    notifyUserInfo: []
  },
  mutations,
  actions,
  getters
}
