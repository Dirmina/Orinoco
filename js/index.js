//Fonctions :
function urlDynamique(cameraId) {
    //Déf d'une nouvelle URL 
    var url = new URL(window.location.href + "/../product.html");
    //Raccourci pour une recherche dans les paramètres :
    var UrlSearchParams = url.searchParams;
    //ajout de l'id dans l'URL
    UrlSearchParams.set('id', cameraId);
    //ObjectId devient une string, la recherche d'ID s'introduit dans l'url sous la forme "?id="
    url.search = UrlSearchParams.toString();
    //nouvelle url product.html personnalisée:
    return newUrl = url.toString();
}

function generationArticle(cameras) {
    for (const camera of cameras) {
        urlDynamique(camera._id);

        //Création des articles :
        const section = document.querySelector("section");
        const article = document.createElement('article');

        section.className = 'd-flex-column';
        article.className = 'd-flex-between-align-center padding border-b';

        //création de l'article 'camera' avec newUrl de urlDynamique();
        article.innerHTML ="<img/><div><a href=" + newUrl +"><h2></h2></a><p></p></div><p id='description" + camera._id + "'></p>";
        section.appendChild(article);

        //Traitement image :
        const image = article.querySelector("img");
        image.src = camera.imageUrl;
        image.alt = camera.name;
        image.className = 'image';

        //traitement div title-price :
        const groupTitlePrice = article.querySelector('div');
        groupTitlePrice.className = 'title-price w-25';

        //Titre :
        const title = article.querySelector("h2");
        title.textContent = camera.name;

        //Prix :
        const price = article.querySelector("p");
        price.textContent = camera.price.toLocaleString() + " $";

        //Description :
        const description = document.getElementById(`description${camera._id}`);
        description.className = "description w-50";
        description.textContent = camera.description;
    }
}



//Programme :
fetch("http://localhost:3000/api/cameras/")
.then(function(response) { //promesse de réponse serveur
    if (response.ok) {
        response.json()
        .then(function(cameras) { //promesse de conversion
             generationArticle(cameras);
        });
    }
})
.catch(function() {
    alert("Le serveur ne répond pas ! Nos équipes travaillent au bon rétablissement des services ! Merci de votre patience.")
});