const items = document.querySelectorAll('[data-showId]');
let totalEl = document.querySelector('.order-total-price');

if(items.length) {
 items.forEach(item => {
  const ticketSelector = item.querySelector('#tickets');
  const price = parseInt(item.querySelector('.item-price').innerHTML);
  const subTotalEl = item.querySelector('.subtotal');
  let finalPrice;

  let numTickets = parseInt(ticketSelector.options.selectedIndex + 1);
  let subTotal = price * numTickets;

  item.addEventListener('change', e => {
    numTickets = ticketSelector.options.selectedIndex + 1;
    subTotal = price * numTickets;

    subTotalEl.innerHTML = subTotal;

    finalPrice = getTotalPrice(items);

    totalEl.innerHTML = finalPrice;
  });

  subTotalEl.innerHTML = subTotal;
  finalPrice = getTotalPrice(items);

  totalEl.innerHTML = finalPrice;

 })
}

function getTotalPrice(shoppingItems) {
  let total = 0;
  shoppingItems.forEach(item => {
    let subTotal =  parseInt(item.querySelector('.subtotal').innerHTML);
    total += subTotal;
  })

  return total.toLocaleString('en');
}