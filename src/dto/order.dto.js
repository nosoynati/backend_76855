export function createOrderDto(body, user) {
  const { email, first_name } = user ?? {};
  if (!email || !first_name) throw new Error("Missing session 🧨");
  const { code, items } = body ?? {};
  if (!code || !items || !Array.isArray(items)) throw new Error("Missing data 💦");
  return { code, items, buyerEmail: email, buyerName: first_name };
}

export function updateOrder(body) {
  const updOrder = {};
  if (body?.items) updOrder.items = body.items;
  if (body?.status) updOrder.status = body.status;
  return updOrder;
}
