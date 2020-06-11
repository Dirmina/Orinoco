orderID = localStorage.getItem('orderId');
total = Number(localStorage.getItem('total'));
const p = document.querySelector('p');
p.className = "padding";

p.textContent = "Votre commande ID : " + orderID + " pour un total de " + total.toLocaleString() +" $ a bien été effectuée ! Merci pour votre achat !";