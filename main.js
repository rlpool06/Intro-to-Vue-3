const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: false,
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            this.cart.splice(this.cart.indexOf(id),
                1)
        },
    },
})