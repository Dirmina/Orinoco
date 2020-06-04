
//Vérification Mail
document.getElementById("mail").addEventListener("blur", function(e) {
    var validiteMail = "";
    if (/[A-Za-z0-9_'~-]+(?:\.[A-Za-z0-9_'~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[a-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/g.test(e.target.value)) {
        validiteMail = "Valide";
    }
    else {
        validiteMail = "Non Valide";
    }
    document.getElementById("aideMail").textContent = validiteMail;
})

/*Vérification prénom*/
document.getElementById("prenom").addEventListener("blur", function (e) {
    var regexPrenom = /^[A-Za-zàâäéèêëïîôöùûüç]+([-']{1}[A-Za-zàâäéèêëïîôöùûüç]+)*$/g
    var validitePrenom = "";
    if (!regexPrenom.test(e.target.value)) {
        validitePrenom = "Prénom invalide";
    }
    else if (regexPrenom.test(e.target.value)) {
      validitePrenom = "";
    }
    document.getElementById("aidePrenom").textContent = validitePrenom;
});

/*Vérification nom*/
document.getElementById("nom").addEventListener("blur", function (e) {
    var regexNom = /^[A-Za-zàâäéèêëïîôöùûüç]+([ \-']{1}[A-Za-zàâäéèêëïîôöùûüç]+)*$/g
    var validiteNom = "";
    if (!regexNom.test(e.target.value)) {
        validiteNom = "Nom invalide";
    }
    else if (regexNom.test(e.target.value)) {
      validiteNom = "";
    }
    document.getElementById("aideNom").textContent = validiteNom;
});

/*Vérification adresse*/
document.getElementById("adresse").addEventListener("blur", function (e) {
    var regexAdresse =  /^[0-9]+[ ]?[A-Za-zàâäéèêëïîôöùûüç'-]+([ ]?[A-Za-zàâäéèêëïîôöùûüç '-]+)+$/g;
    var validiteAdresse = "";
    if (!regexAdresse.test(e.target.value)) {
        validiteAdresse = "Adresse invalide";
    }
    else if (regexAdresse.test(e.target.value)) {
      validiteAdresse = "";
    }
    document.getElementById("aideAdresse").textContent = validiteAdresse;
});

//Vérification ville
document.getElementById("ville").addEventListener("blur", function (e) {
    var regexVille = /^[A-Za-zàâäéèêëïîôöùûüç]+([ \-']{1}[A-Za-zàâäéèêëïîôöùûüç]+)*$/g
    var validiteVille = "";
    if (!regexVille.test(e.target.value)) {
        validiteVille = "Ville invalide";
    }
    else if (regexVille.test(e.target.value)) {
      validiteVille = "";
    }
    document.getElementById("aideVille").textContent = validiteVille;
});