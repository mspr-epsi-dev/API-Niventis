#-----------------------------------------
#pharmacy
#-----------------------------------------

#save pharmacie and address
BEGIN;
    INSERT INTO address (number, street, zipCode, city, lattitude, longitude) 
        VALUES(10, 'test', 34230, 'Montpellier', 10.0, 10.0);
    INSERT INTO pharmacy (name, turnover, address_fk)
        VALUES('test', 10.0, (
            SELECT id FROM address WHERE lattitude = 10.0 AND longitude = 10.0
        ));
COMMIT;


#get all pharmacies with address
SELECT * FROM address, pharmacy;

#get pharmacie with address by id
SELECT * FROM address, pharmacy WHERE pharmacy.id=1;


#update pharmacie with address by id
BEGIN;
    UPDATE pharmacy 
        SET name = "pharmacie du village"
    WHERE id = 1;
    UPDATE address
        SET zipCode = 34070
    WHERE id = 3;
COMMIT;


#delete pharmacie with address by id
BEGIN;
    DELETE FROM pharmacy WHERE id = 1;
    DELETE FROM address WHERE id = 3;
COMMIT;

#search pharmacie with geolocalisation

#-----------------------------------------
#formular
#-----------------------------------------

#save closeQuest (libelle and answers)

#get all formular (with libelleQuestion, openquestion, closeQuestion, answerOpenQuestion , answerCloseQuestion)

#get formular by id (with libelleQuestion, openquestion, closeQuestion, answerOpenQuestion , answerCloseQuestion)

#update formular by id (with libelleQuestion, openquestion, closeQuestion, answerOpenQuestion , answerCloseQuestion)

#delete formular by id (with libelleQuestion, openquestion, closeQuestion, answerOpenQuestion , answerCloseQuestion)

#update formular to save answers to questions

