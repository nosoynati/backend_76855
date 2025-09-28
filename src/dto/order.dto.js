export function createOrderDto(body){
  const {} = body ?? {};

 }

export function updateOrder(body){
  const updOrder = {};
  if(body?.orderId) updOrder.orderId = body.orderId
  return updOrder
}