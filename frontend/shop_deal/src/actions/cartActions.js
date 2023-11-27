// actions/cartActions.js
export const addToCart = (productId, quantity) => ({
    type: 'ADD_TO_CART',
    payload: { productId, quantity },
  });