export function createOrderDto(body, user) {
  const { email, first_name, last_name } = user ?? null;
  if (!email || !first_name) throw new Error("Missing session 🧨");
  const { code, items } = body ?? {};
  if (!code) throw new Error("Missing data 💦");
  const fullname = first_name.concat(last_name ?? "");
  return { code, items, email, fullname };
}

export function updateOrder(body) {
  const updOrder = {};
  if (body?.items) updOrder.items = body.items;
  if (body?.status) updOrder.status = body.status;
  return updOrder;
}
