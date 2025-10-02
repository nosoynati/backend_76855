export function createCartDto(body, user) {
  const { id } = user ?? {};
  if (!id) throw new Error("Missing session 🧨");
  const { items, qty } = body ?? {};
  if (!id) throw new Error("Missing data 💦");
  return { user: id, items, qty};
}
export function createProductDto(body) {
  const { title, description, unitPrice, stock } = body ?? {};
  if (!title || !unitPrice || !stock ) throw new Error("Missing data 💦");
  return { title, description, unitPrice, stock};
}

export function updateCartDto(body, user) {
  const { id } = user ?? {};
  if (!id) throw new Error("Missing session 🧨");
  if (body?.items) updt.items = body.items;
  if (body?.qty) updt.qty = qty;
  return updt;
}