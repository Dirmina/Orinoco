//Fonction :
function generateProduct(camera) {

    //Création de la balise article :
    const section = document.querySelector("section");
    const article = document.createElement('article');
    article.className = 'd-flex-between-align-center d-flex-between-responsive-product padding padding_product border-b';

    //création de l'article 'camera' :
    article.innerHTML ="<img/><div><h2></h2><p class='price'></p><button id='storage' class='button_product'>Ajouter au panier</button><p class='description'></p><form method='get'><label for='lenses'>Lentilles:</label><select class='lenses'></select></form></div>";
    section.appendChild(article);

    //Traitement de l'image :
    const image = article.querySelector("img");
    image.src = camera.imageUrl;
    image.alt = camera.name;
    image.className = 'image_product';
    
    //Traitement div all-without-image :
    const allWithoutImage = article.querySelector('div');
    allWithoutImage.className = 'all-without-image w-50';

    //Titre :
    const title = article.querySelector("h2");
    title.textContent = camera.name;

    //Description :
    const description = document.querySelector('.description');
    description.textContent = camera.description;

    //Prix :
    const price = article.querySelector(".price");
    price.textContent = camera.price.toLocaleString() + " $";

    //Menu déroulant des lentilles :
    const personalizeLenses = article.querySelector('select');
    for (i=0; i < camera.lenses.length; i++) {
         personalizeLenses.innerHTML += "<option>" + camera.lenses[i] + "</option>" ;
    }

    const basketButton = document.querySelector('button');      
    //le panier contient le localStorage sous forme d'objet JS
    var basket = JSON.parse(window.localStorage.getItem('item')) || [];

    basketButton.addEventListener('click', function() {
        alert(" Article ajouté au panier !");
            basket.push(id);
            localStorage.setItem('item', [JSON.stringify(basket)]);
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
                generateProduct(camera);
            })
        }
    })
    .catch(function() {
        alert("Le serveur ne répond pas ! Nos équipes travaillent au bon rétablissement des services ! Merci de votre patience.")
    });