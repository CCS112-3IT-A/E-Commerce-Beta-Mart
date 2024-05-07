// productService.js
export const getProductInfo = async (productId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/product/${productId}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.productName,
      price: data.productPrice,
      quantity: 1, // Set the initial quantity to 1
      // Include any other relevant properties from the product
    };
  } catch (error) {
    console.error('Error fetching product info:', error);
    throw error;
  }
};