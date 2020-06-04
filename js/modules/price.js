            //ajout d'espace dans les prix pour + de lisibilité
            var price_string = camera.price.toString();
            var space = ' ';
            var price_string_space = "";

            for (var i = 0; i < price_string.length; i++) {
                //dans le cas d'un nombre à 6 chiffres ou à 5 chiffres
                if ((price_string.length == 6 && i > 0 && i % 3 == 0) || (price_string.length == 5 && i > 0 && i == 2)) {
                    price_string_space += space;
                }
                
                price_string_space += price_string.charAt(i);
            }