function urlDynamique(cameraId) {
     //Déf d'une nouvelle URL 
     var url = new URL('file:///D:/ProjetsGithub/Orinoco/product.html');
     //Raccourci pour une recherche dans les paramètres :
     var search_params = url.searchParams;
     //ajout de l'id dans l'URL
     search_params.set('id', cameraId);
        
     //ObjectId devient une string, la recherche d'ID s'introduit dans l'url sous la forme "?id="
     url.search = search_params.toString();
 
     //nouvelle url product.html personnalisée:
     return new_url = url.toString();
 }