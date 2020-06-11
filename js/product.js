//Fonctions :

function articlePersonnalise(camera) {

    const section = document.querySelector("section");
    const article = document.createElement('article');
    article.className = 'd-flex-between-align-center d-flex-between-responsive-product padding padding_product border-b';

    //création de l'article 'camera' :
    article.innerHTML ="<img/><div class='w-50'><h2></h2><p class='price'></p><button id='storage' class='button_product'>Ajouter au panier</button><p class='description'></p><form method='get'><label for='lenses'>Lentilles:</label><select class='lenses'></select></form></div>";
    section.appendChild(article);

    const image = article.querySelector("img");
    image.src = camera.imageUrl;
    image.alt = camera.name;
    image.className = 'image_product';
    
    const groupTitlePrice = article.querySelector('div');
    groupTitlePrice.className = 'title-price';

    const titre = article.querySelector("h2");
    titre.textContent = camera.name;

    const description = document.querySelector('.description');
    description.textContent = camera.description;

    const price = article.querySelector(".price");
    price.textContent = camera.price.toLocaleString() + " $";

    const personalize = article.querySelector('select');
    for (i=0; i < camera.lenses.length; i++) {
         personalize.innerHTML += "<option>" + camera.lenses[i] + "</option>" ;
    }

    const panierButton = document.querySelector('button');      
    //le panier contient le localStorage sous forme d'objet JS
    var panier = JSON.parse(window.localStorage.getItem('item')) || [];
    console.log(panier);


    panierButton.addEventListener('click', function() {
            alert(" Article ajouté au panier !");
            if (!panier) {
               panier = localStorage.setItem('item', [JSON.stringify(id)]);
            }
            else {
                panier.push(id);
                localStorage.setItem('item', [JSON.stringify(panier)]);
                console.log(localStorage.getItem('item'));
            }
    })
}




//page dynamique avec l'élément selectionné par l'user
    //Récupération de l'id dans l'URL
    var parsedUrl = new URL(window.location.href);
    var id = parsedUrl.searchParams.get("id");
    //ajout de l'id dans la requête, récupération de l'objet, Fetch version
    fetch("http://localhost:3000/api/cameras/" + id)
    .then(function (response) { //promesse de réponse serveur
        if (response.ok) {
            response.json()
            .then(function (camera) { //promesse de json parsed
                articlePersonnalise(camera);
            })
            }
        })