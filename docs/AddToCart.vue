<template>
  <button-full v-if="!product.stock.is_in_stock && isLoggedIn" @click.native="notifyUserForStock(product)" data-testid="notifyMe" class="add-to-cart">
    {{ $t('Notify me') }}
  </button-full>
  <button-full v-else @click.native="addToCart(product)" :disabled="isProductDisabled" data-testid="addToCart" class="add-to-cart">
    {{ $t('Add to cart') }}
  </button-full>
</template>

<script>
import { formatProductMessages } from '@vue-storefront/core/filters/product-messages'
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { AddToCart } from '@vue-storefront/core/modules/cart/components/AddToCart'
import { mapGetters, mapActions } from 'vuex'
import i18n from '@vue-storefront/i18n'

export default {
  mixins: [AddToCart],
  directives: { focusClean },
  components: { ButtonFull },
  methods: {
    ...mapActions('productStockAlert', ['requestProductStockAlert']),
    onAfterRemovedVariant () {
      this.$forceUpdate()
    },
    notifyUser (notificationData) {
      this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
    },
    notifyUserForStock (product) {
      this.isAddingToCart = true
      this.requestProductStockAlert(product.id)
      this.isAddingToCart = false
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    isProductDisabled () {
      return this.disabled || formatProductMessages(this.product.errors) !== '' || this.isAddingToCart
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-removevariant', this.onAfterRemovedVariant)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
  }
}
</script>
