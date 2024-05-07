// duplication.js
const handleAddToCart = (productId, cartItems, updateQuantity, addToCart) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);