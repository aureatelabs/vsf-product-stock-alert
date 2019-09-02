import ProductStockAlertState from '../types/ProductStockAlertState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<ProductStockAlertState, any> = {
  checkAlreadyNotify: (state) => (customerID, productID) => state.notifyUserInfo.find(notifyData => notifyData.customer_id === customerID && notifyData.product_id === productID)
}
