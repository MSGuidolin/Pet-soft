export const MP_CART = (cart) => {
  let auxCart = cart.map((service) => {
    return {
      title: service.name,
      description: service.provider,
      quantity: 1,
      unit_price: price,
    };
  });
  return { cart: auxCart };
};
