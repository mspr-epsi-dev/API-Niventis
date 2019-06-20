module.exports =  {

    "200": {
        saveSuccess : "Pharmacie successfuly added !",
        deleteSucess : "Pharmacie successfuly deleted !",
        updateSuccess : "Pharmacie successfuly updated !",
        searchSucess: "Pharmacie(s) found nearby!",
        saveFormularSucess : "Formular successfully saved !",
        deleteFormularSuccess : "Formular successfuly deleted !",
        updateFormularSuccess : "Formular successfuly updated !",
    },
    
    "400": {
        missformedRessource : "the ressource you sent is incorrectly formed",
        missformedId : "incorrect pharmacie id, check the id property",
        incorrectQueryParam : "incorrect or missing parameters in the http request you sent",
        misingId : "mising id in your request"
    },
    
    "404": {
        pharmacieNotFound : "No pharmacie found, multiple causes : no pharmacie in the database, id missing or missformed, pharmacie deleted",
        noPharmacieAround: "no pharmacie found, try again with a larger perimeter",
        idNotFound : "",
        formularNotFound : "Unknow formular"
    },
    
    "500" : {
        somethingWrong : "something wen wrong on our side... sorry duuuuude"
    }


}