// duplication.js
const handleAddToCart = (productId, cartItems, updateQuantity, addToCart) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === productId);

    if (existingItemIndex !== -1) {
        const existingItem = cartItems[existingItemIndex];
        updateQuantity(existingItem, existingItem.quantity + 1);
      } else {
        addToCart(productId);
      }
    };
    
    export default handleAddToCart;