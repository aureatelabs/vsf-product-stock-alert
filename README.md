# Vue Storefront Product Stock Alert Notification extension

Product Stock Alert Notification Extension for [vue-storefront](https://github.com/aureatelabs/vsf-google-recaptcha), by [Aureate Labs Pvt. Ltd.](https://aureatelabs.com/).

This module is developed for Product Stock Alert for your store's customer in the vue storefront using Magento.

Here is the demo for the product stock alert notification.
![Demo](docs/preview.gif)

## Installation

### 1. Clone the repository

Clone the vsf-product-stock-alert repository into your VSF installation.

```shell
$git clone git@github.com:aureatelabs/vsf-product-stock-alert.git vue-storefront/src/modules/product-stock-alert
```

### 2. Add the extension config to your local VSF configuration file

Add the following JSON config snippet into your desired config, eg. `config/local.json`

```json
"users" : {
  ...
  "productStockAlert": {
    "endpoint": "/api/ext/product-stock-alert/notify-me"
  }
}
```

### 3. Register the Product Stock Alert extension

Open up your `../vue-storefront/src/modules/index.ts` and add the following code. Adding it inside this file the registers the extension so it can be used in your Vue Storefront.

```js
import { ProductStockAlert } from './product-stock-alert'
...
export const registerModules: VueStorefrontModule[] = [
  ...
  ProductStockAlert
]
```

### 4. What to change in your Vue storefront theme

In your theme template file you can find your ![AddToCart.vue](docs/AddToCart.vue) and make mentioned changes ![AddToCart.vue](docs/AddToCart.vue).
Full Path of AddToCart.vue: `<root>/src/themes/default/components/core/AddToCart.vue`

How to check product is In stock or not in AddToCart template?
Using `product` object you can easily check, Please refer below code.

```js
product.stock.is_in_stock
```

How to check product is Customer logged in or not in AddToCart template?
Using below code you can easily find it & after implementing this code You can check with method `isLoggedIn`.

```js
<script>
...
import { mapGetters, mapActions } from 'vuex'
...
export default {
  ...
  computed: {
      ...mapGetters('user', ['isLoggedIn']),
  }
  ...
}
<script>
```

How to call `requestProductStockAlert` method within your template?
It's quite easy to call & store user's request for stock notification.

```js
<script>
...
import { mapGetters, mapActions } from 'vuex'
...
export default {
  ...
  methods: {
    ...mapActions('productStockAlert', ['requestProductStockAlert']),
  }
  ...
}
<script>
```

and after this You can directly called function `requestProductStockAlert(product.id)` with parameter product ID.

### 5. Now, Clone Product stock alert API extension to your local vue-storefront-api

Copy extension to your /path/to/vue-storefront-api/src/api/extensions/

```shell
$cp -f ./API/product-stock-alert /path/to/vue-storefront-api/src/api/extensions/
```

### 6. Register this new extension in your `config/local.json` of  your local VSF API's configuration file

```json
"registeredExtensions": [
  ...
  "product-stock-alert"
],
```

### 7. Now, Last step for the Magento side, You need to add our extension and also easy to install

[Magento Product Stock Alert](https://github.com/aureatelabs/magento2-vsf-product-stock-alert)

### 8. Enjoy

Thats it! It's easy, plug and play!

## License

This project is licensed under the MIT License.
