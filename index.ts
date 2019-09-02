import { module } from './store'
import { createModule } from '@vue-storefront/core/lib/module'

const KEY = 'productStockAlert'
export const ProductStockAlert = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
})
