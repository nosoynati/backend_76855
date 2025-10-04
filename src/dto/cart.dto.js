
export function createCartDto(body, user) {
  const { id } = user ?? user.id ?? {};
  if (!String(id)) throw new Error("Missing session 🧨");
  const { productId, qty } = body ?? body.items ?? {};
  if (!String(id)) throw new Error("Missing data 💦");
  return { user: id, productId, qty };
}
export function createProductDto(body) {
  const { title, description, unitPrice, stock } = body ?? {};
  if (!title || !unitPrice || !stock) throw new Error("Missing data 💦");
  return { title, description, unitPrice, stock };
}

export function updateCartDto(body, user) {
  const { id } = user ?? user.id ?? {};
  if (!String(id)) throw new Error("Missing session 🧨");
  const updt = {};
  if (body?.items) updt.items = body.items;
  if (body?.qty) updt.qty = body.qty;
  return updt;
}

export function addProduct(productId, cart = {}, qty) {
  const prod = cart?.items?.find((p) => p.product.toString() == productId);
  if (prod) {
    prod.qty += qty;
  } else {
    cart.items.push({ product: productId, qty });
  }
}
