import { ActionTree } from 'vuex';
import ProductStockAlertState from '../types/ProductStockAlertState'
import rootStore from '@vue-storefront/core/store'
import * as types from './mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'
import i18n from '@vue-storefront/i18n'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { adjustMultistoreApiUrl } from '@vue-storefront/core/lib/multistore'

const actions: ActionTree<ProductStockAlertState, any> = {
  async requestProductStockAlert (context, productID) {
    const moduleLoggerName = 'product-stock-alert'
    try {
      let url = rootStore.state.config.users.productStockAlert.endpoint
      if (rootStore.state.config.storeViews.multistore) {
        url = adjustMultistoreApiUrl(url)
      }
      Logger.info('Magento 2 request data', moduleLoggerName, { productID })()
      let storeView = currentStoreView()
      let currentUser = rootStore.state.user.current
      let notifyData = {
        customer_id: currentUser.id, // Logged in user
        product_id: productID, // out of stock product ID
        store_code: storeView.storeCode ? storeView.storeCode : 'default' // Current store code
      }
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notifyData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            Logger.info('Magento 2 REST API Response Data', moduleLoggerName, { data })()
            if (data.result.code === 200) {
              context.commit(types.ADD_NOTIFY_USER, notifyData)
              rootStore.dispatch('notification/spawnNotification', {
                type: 'success',
                message: i18n.t('You will be notified once the product has been back to stock'),
                action1: { label: i18n.t('OK') }
              })
            } else {
              rootStore.dispatch('notification/spawnNotification', {
                type: 'error',
                message: i18n.t('Something went wrong, Please try again letter.'),
                action1: { label: i18n.t('OK') }
              })
            }
          } else {
            Logger.error('Something went wrong. Try again in a few seconds.', moduleLoggerName)()
            rootStore.dispatch('notification/spawnNotification', {
              type: 'error',
              message: i18n.t('Something went wrong, Please try again letter.'),
              action1: { label: i18n.t('OK') }
            })
          }
        })
    } catch (e) {
      Logger.error('Something went wrong.', moduleLoggerName)()
    }
  }

}

export default actions
