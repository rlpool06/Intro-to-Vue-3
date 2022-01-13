app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
    <div class="product-container">
        <div class="product-image">
            <!-- image goes here -->
            <img :src="image" :class="{ 'out-of-stock-img': !inStock }" />
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>

            <!-- Import Details Component -->
            <product-details :details="details"></product-details>
            
            <p v-if="onSale">{{ saleMessage }}</p>
            <div 
                v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)" 
                class="color-circle" 
                :style="{ backgroundColor: variant.color }">
            </div>
            <button
                class="button"
                :class="{ disabledButton: !inStock }"
                @click="addToCart"
                :disabled="!inStock">
                Add to Cart
            </button>
            <button
                class="button"
                @click="removeFromCart"
                >
                Remove
            </button>
        </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form> 
</div>
`,
data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
        ],
        reviews: [],
        onSale: true,
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index) {
        this.selectedVariant = index
    },
    addReview(review) {
        this.reviews.push(review)
    }
},
computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image() {
        return this.variants[this.selectedVariant].image
    },
    inStock() {
        return this.variants[this.selectedVariant].quantity
    },
    saleMessage() {
        return this.brand + ' ' + this.product + ' is on sale!'
    },
    shipping() {
        if(this.premium) {
            return 'Free'
        }
        return 2.99
    }
},

})