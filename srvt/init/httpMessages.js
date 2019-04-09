module.exports =  {

    "200": {
        saveSuccess : "Pharmacie successfuly added !",
        deleteSucess : "Pharmacie successfuly deleted !",
        updateSuccess : "Pharmacie successfuly updated !",
        searchSucess: "Pharmacie(s) found nearby!"
    },
    
    "400": {
        missformedRessource : "the ressource you sent is incorrectly formed",
        missformedId : "incorrect pharmacie id, check the id property",
        incorrectQueryParam : "incorrect or missing parameters in the http request you sent"
    },
    
    "404": {
        pharmacieNotFound : "No pharmacie found, multiple causes : no pharmacie in the database, id missing or missformed, pharmacie deleted",
        noPharmacieAround: "no pharmacie found, try again with a larger perimeter",
        idNotFound : ""
    },
    
    "500" : {
        somethingWrong : "something wen wrong on our side... sorry duuuuude"
    }


}