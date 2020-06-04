

function urlDynamique(camera) {
    //Déf d'une nouvelle URL 
    var url = new URL(window.location.href + "/../product.html");
    //Raccourci pour une recherche dans les paramètres :
    var UrlSearchParams = url.searchParams;
    //ajout de l'id dans l'URL
    UrlSearchParams.set('id', camera._id);
    //ObjectId devient une string, la recherche d'ID s'introduit dans l'url sous la forme "?id="
    url.search = UrlSearchParams.toString();
    //nouvelle url product.html personnalisée:
    return newUrl = url.toString();
}

const regexMail = /[A-Za-z0-9_'~-]+(?:\.[A-Za-z0-9_'~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[a-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/g;
const regexFirstName = /^[A-Za-zàâäéèêëïîôöùûüç]+([-']{1}[A-Za-zàâäéèêëïîôöùûüç]+)*$/g;
const regexLastName = /^[A-Za-zàâäéèêëïîôöùûüç]+([ \-']{1}[A-Za-zàâäéèêëïîôöùûüç]+)*$/g;
const regexCity = /^[A-Za-zàâäéèêëïîôöùûüç]+([ \-']{1}[A-Za-zàâäéèêëïîôöùûüç]+)*$/g;
const regexAdress = /^[0-9]+[ ]?[A-Za-zàâäéèêëïîôöùûüç'-]+([ ]?[A-Za-zàâäéèêëïîôöùûüç '-]+)+$/g;

const section = document.querySelector("section");
const panierVide = document.getElementById('panierVide');
const clearStorage = document.getElementById('clearStorage');
let total = 0;




//Appel du localStorage
var panier = JSON.parse(window.localStorage.getItem('item'));

if (panier) {
    panierVide.style.display = "none";
    clearStorage.style.display = "inline";
    clearStorage.textContent = 'Vider le panier';
    document.getElementById('form').style.display = 'block';

    uniqueIDs = new Set(panier);
     //Vider le panier :
     clearStorage.addEventListener('click', function() {
        if (confirm("Votre panier va disparaître ! Vous êtes sûr ?")) {
            alert('1, 2, 3 DJANGO !');
        
        localStorage.clear();
        //On redéclare panier dans son état d'origine :
        panier =  JSON.parse(window.localStorage.getItem('item')) || [];

        section.innerHTML = "<p>Votre panier est vide !!</p>";
        clearStorage.style.display = "none";
        Total.style.display = "none";
        document.getElementById('form').style.display = "none";
        }
    })


    //Envoi des données :
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        if(!confirm("Veillez à ce que vos coordonnées soit bonnes ! Si c'est le cas, Appuyer sur 'Ok' sinon 'Annuler'.")) {
            alert("Validation annulée !");
        }
        else {
            //Si tout est rempli correctement (voir variables Regex) : 
            if (regexFirstName.test(document.getElementById('prenom').value)
            && regexLastName.test(document.getElementById('nom').value)
            && regexMail.test(document.getElementById('mail').value) 
            && regexCity.test(document.getElementById('ville').value) 
            && regexAdress.test(document.getElementById('adresse').value)) {
                if(confirm("Veillez à ce que vos coordonnées soit bonnes ! Si c'est le cas, Appuyer sur 'Ok' sinon 'Annuler'.")) {
                    fetch("http://localhost:3000/api/cameras/order", {
                        method: 'post',
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify({

                        // Objet contact :
                            contact: {
                                firstName: document.getElementById('prenom').value,
                                lastName: document.getElementById('nom').value,
                                address: document.getElementById('adresse').value,
                                city: document.getElementById('ville').value,
                            email: document.getElementById('mail').value
                        },
            
                            // tableau de string products
                            products: panier
                        })
                    })
                    .then(function(response) { // ¨romesse de réponse 
                        if (response.ok) {
                            response.json() 
                            .then(function(data) { //Promesse de JSON to JS
                                // Suppression des anciennes informations de commandes et du panier actuel si présentes
                                if (localStorage.getItem("orderId") &&
                                localStorage.getItem("total") &&
                                localStorage.getItem("item"))
                                {     
                                    localStorage.removeItem("orderId");
                                    localStorage.removeItem("total");
                                    localStorage.removeItem("item");
                                }

                                // Stockage des info commandes 
                                localStorage.setItem("total", total);
                                localStorage.setItem("orderId", data.orderId);

                                // Redirection sur la page de confirmation de commande
                                document.location.href = "confirmation.html";
                            })
                        }
                    })
                }
            }
        }
       
    })
    for (var id of uniqueIDs) {

        let quantity = 0;

        for (let i = 0; i < panier.length; i++) {
            if (id == panier[i]) {
                quantity++;
            }
        }

        fetch("http://localhost:3000/api/cameras/" + id)
        .then(function(response) {
            if (response.ok) {
                response.json()
                .then(function (camera) {

                    urlDynamique(camera);
                
                    //Création des articles :
                    section.className = 'd-flex-column';
                    let article = document.createElement('article');
                    article.className = 'd-flex-between-align-center padding_panier border-b';
                    
                    
                    let sousTotal = camera.price * quantity;

                    //création de l'article 'camera'
                    article.innerHTML ="<img/><div class='d-flex'><div class='title-price'><a href=" + newUrl +"><h2></h2></a><p></p><small id ='quantite'></small><p id ='sousTotal" + camera._id + "'></p></div></div><div class='button'><button id='removeItem" + camera._id + "'>En retirer un</button><button id='clearItem" + camera._id +"'>Retirer du panier</button></div>";
                    section.appendChild(article);

                    //Traitement de l'image :
                    var image = article.querySelector("img");
                    image.src = camera.imageUrl;
                    image.alt = camera.name;  
                    image.className = "image_panier";

                    //Titre :
                    const titre = article.querySelector("h2");
                    titre.textContent = camera.name;
                    
                    //Prix :
                    const price_item = article.querySelector('p');
                    price_item.textContent = camera.price.toLocaleString() + " $";

                    //Combien ?
                    const howMany = article.querySelector('small');
                    howMany.textContent = "Quantité : " + quantity.toLocaleString();

                    //A quel prix ?
                    const howMuchforOne = document.getElementById(`sousTotal${camera._id}`);
                    howMuchforOne.textContent = "Sous-total : " + sousTotal.toLocaleString() + " $";
                    total += sousTotal;

                    //Total à payer:
                    Total = document.getElementById('Total');
                    Total.textContent = "Total à payer : " + total.toLocaleString() + " $";          

                    //Quantité - 1 :
                    //ajout de camera._id pour ciblé le bon bouton et rendre chaque ID unique :
                    remove_Button = document.getElementById(`removeItem${camera._id}`);

                    remove_Button.addEventListener('click', function(id) {
                        //retirer camera._id à l'index donné dans panier
                        panier.splice(panier.indexOf(camera._id), 1);
                        quantity--;
                        
                        //Remplacement de l'ancien panier par le panier mise à jour
                        localStorage.removeItem('item');
                        localStorage.setItem('item', [JSON.stringify(panier)]);
                        
                        //MAJ Combien ?
                        howMany.textContent = "Quantité : " + quantity.toLocaleString();

                        //MAJ A quel prix ?
                        sousTotal = camera.price * quantity;
                        howMuchforOne.textContent = "Sous-total : " + sousTotal.toLocaleString() + " $";
                        total -= camera.price;
                        
                        //MAJ Total à payer :
                        Total.textContent = "Total à payer : " + total.toLocaleString() + " $";
                        
                        //Si l'article est supprimé à force de baisser la quantité d'item :
                        if (quantity == 0) {
                            section.removeChild(article);
                        }
                        //Si le panier ne contient plus d'articles : 
                        if (!panier[0]) {
                            section.innerHTML = "<p>Votre panier est vide !!</p>";
                            clearStorage.style.display = "none";
                            Total.style.display = "none";
                            document.getElementById('form').style.display = "none";
                        }
                    })

                    //Suppression d'un article du panier :
                    const clearItem = document.getElementById(`clearItem${camera._id}`);
                    clearItem.addEventListener('click', function() {
                        alert("Article retiré du panier !");
                        section.removeChild(article);
                        for (i = 0; i < panier.length; i++) {
                            //Toutes les id de la caméra ciblé trouvé dans le panier sont supprimées.
                            if (camera._id == panier[i]) {
                                panier.splice(panier.indexOf(camera._id), 1);
                                i--; //si panier[0] est supprimé alors panier[0] = panier[1],panier[1] = panier[2]...Donc i--;
                            }
                        }

                        //MAJ du panier
                        localStorage.removeItem('item');
                        localStorage.setItem('item', [JSON.stringify(panier)]);

                        //MAJ Total à payer :
                        total -= sousTotal;
                        Total = document.getElementById('Total');
                        Total.textContent = "Total à payer : " + total.toLocaleString() + " $";

                        //Si plus d'articles : avertissement User & disparition formulaire + bouton.
                        if (!panier[0]) {
                            section.innerHTML = "<p>Votre panier est vide !!</p>";
                            clearStorage.style.display = "none";
                            Total.style.display = "none";
                            document.getElementById('form').style.display = "none";
                        }
                    })       
                })
            }
        })
    }
}