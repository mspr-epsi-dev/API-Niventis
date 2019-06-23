#------------------------------------------------------------
# Table: pharmacy
#------------------------------------------------------------

CREATE TABLE pharmacy(
        id       Int  Auto_increment  NOT NULL ,
        name     Varchar (255) NOT NULL ,
        turnover Float NOT NULL
	,CONSTRAINT pharmacy_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: employee
#------------------------------------------------------------

CREATE TABLE employee(
        id        Int  Auto_increment  NOT NULL ,
        name      Varchar (125) NOT NULL ,
        firstName Varchar (125) NOT NULL
	,CONSTRAINT employee_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: closeQuestion
#------------------------------------------------------------

CREATE TABLE closeQuestion(
        id Int  Auto_increment  NOT NULL
	,CONSTRAINT closeQuestion_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: answerOpenQuestion
#------------------------------------------------------------

CREATE TABLE answerOpenQuestion(
        id     Int  Auto_increment  NOT NULL ,
        answer Varchar (5) NOT NULL
	,CONSTRAINT answerOpenQuestion_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: product
#------------------------------------------------------------

CREATE TABLE product(
        id                     Int  Auto_increment  NOT NULL ,
        name                   Varchar (255) NOT NULL ,
        quantityBoughtPerMonth Int NOT NULL ,
        price                  Float NOT NULL
	,CONSTRAINT product_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: openQuestion
#------------------------------------------------------------

CREATE TABLE openQuestion(
        id Int  Auto_increment  NOT NULL
	,CONSTRAINT openQuestion_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: formular
#------------------------------------------------------------

CREATE TABLE formular(
        id Int  Auto_increment  NOT NULL
	,CONSTRAINT formular_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: answerCloseQuestion
#------------------------------------------------------------

CREATE TABLE answerCloseQuestion(
        id        Int  Auto_increment  NOT NULL ,
        libelle   Varchar (255) NOT NULL ,
        isChecked Bool NOT NULL
	,CONSTRAINT answerCloseQuestion_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: libelleQuestion
#------------------------------------------------------------

CREATE TABLE libelleQuestion(
        id      Int  Auto_increment  NOT NULL ,
        libelle Varchar (125) NOT NULL
	,CONSTRAINT libelleQuestion_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: address
#------------------------------------------------------------

CREATE TABLE address(
        id        Int  Auto_increment  NOT NULL ,
        number    Int NOT NULL ,
        street    Varchar (255) NOT NULL ,
        zipCode   Int NOT NULL ,
        City      Varchar (255) NOT NULL ,
        lattitude Float NOT NULL ,
        longitude Float NOT NULL
	,CONSTRAINT address_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: training
#------------------------------------------------------------

CREATE TABLE training(
        id   Int  Auto_increment  NOT NULL ,
        name Varchar (10) NOT NULL
	,CONSTRAINT training_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: answer
#------------------------------------------------------------

CREATE TABLE answer(
        id                    Int NOT NULL ,
        id_libelleQuestion    Int NOT NULL ,
        id_answerOpenQuestion Int NOT NULL
	,CONSTRAINT answer_PK PRIMARY KEY (id,id_libelleQuestion,id_answerOpenQuestion)

)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: composed
#------------------------------------------------------------

CREATE TABLE composed(
    id               Int NOT NULL ,
    id_closeQuestion Int NOT NULL ,
    id_openQuestion  Int NOT NULL,
    CONSTRAINT composed_PK PRIMARY KEY (id,id_closeQuestion,id_openQuestion)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: need
#------------------------------------------------------------

CREATE TABLE need(
    id               Int NOT NULL ,
    id_pharmacy      Int NOT NULL ,
    CONSTRAINT composed_PK PRIMARY KEY (id,id_pharmacy)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: work
#------------------------------------------------------------

CREATE TABLE work(
    id               Int NOT NULL ,
    id_pharmacy      Int NOT NULL ,
    CONSTRAINT composed_PK PRIMARY KEY (id,id_pharmacy)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: sell
#------------------------------------------------------------

CREATE TABLE sell(
    id               Int NOT NULL ,
    id_pharmacy      Int NOT NULL ,
    CONSTRAINT composed_PK PRIMARY KEY (id,id_pharmacy)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: train
#------------------------------------------------------------

CREATE TABLE train(
    id               Int NOT NULL ,
    id_training      Int NOT NULL ,
    CONSTRAINT composed_PK PRIMARY KEY (id,id_training)
)ENGINE=InnoDB;

#------------------------------------------------------------
# Table: reply
#------------------------------------------------------------

CREATE TABLE reply(
    id               Int NOT NULL ,
    id_employee      Int NOT NULL ,
    CONSTRAINT composed_PK PRIMARY KEY (id,id_employee)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: include
#------------------------------------------------------------

CREATE TABLE include(
    id               Int NOT NULL ,
    id_answerCloseQuestion Int NOT NULL ,
    id_libelleQuestion Int NOT NULL,
    CONSTRAINT composed_PK PRIMARY KEY (id,id_answerCloseQuestion,id_libelleQuestion)
)ENGINE=InnoDB;


#------------------------------------------------------------
#création des contraintes de clef étrangères
#------------------------------------------------------------
ALTER TABLE pharmacy ADD address_fk Int NOT NULL;
ALTER TABLE pharmacy ADD CONSTRAINT pharmacy_fk_address FOREIGN KEY (address_fk) REFERENCES address(id);

ALTER TABLE need ADD CONSTRAINT need_fk_pharmacy FOREIGN KEY (id_pharmacy) REFERENCES pharmacy(id);

ALTER TABLE training ADD need_fk Int NOT NULL;
ALTER TABLE training ADD CONSTRAINT training_fk_need FOREIGN KEY (need_fk) REFERENCES need(id);

ALTER TABLE work ADD CONSTRAINT work_fk_pharmacy FOREIGN KEY (id_pharmacy) REFERENCES pharmacy(id);

ALTER TABLE work ADD employee_fk int NOT NULL;
ALTER TABLE work ADD CONSTRAINT work_fk_employee FOREIGN KEY (employee_fk) REFERENCES employee(id);

ALTER TABLE train ADD product_fk int NOT NULL;
ALTER TABLE train ADD CONSTRAINT train_fk_product FOREIGN KEY (product_fk) REFERENCES product(id);
ALTER TABLE train ADD CONSTRAINT train_fk_training FOREIGN KEY (id_training) REFERENCES training(id);

ALTER TABLE sell ADD product_fk int NOT NULL;
ALTER TABLE sell ADD CONSTRAINT sell_fk_product FOREIGN KEY (product_fk) REFERENCES product(id);
ALTER TABLE sell ADD CONSTRAINT sell_fk_pharmacy FOREIGN KEY (id_pharmacy) REFERENCES pharmacy(id);

ALTER TABLE reply ADD formular_fk int NOT NULL;
ALTER TABLE reply ADD CONSTRAINT reply_fk_formular FOREIGN KEY (formular_fk) REFERENCES formular(id);
ALTER TABLE reply ADD CONSTRAINT reply_fk_employee FOREIGN KEY (id_employee) REFERENCES employee(id);

ALTER TABLE composed ADD formular_fk int NOT NULL;
ALTER TABLE composed ADD CONSTRAINT composed_fk_formular FOREIGN KEY (formular_fk) REFERENCES formular(id);
ALTER TABLE composed ADD CONSTRAINT composed_fk_closeQuestion FOREIGN KEY (id_closeQuestion) REFERENCES closeQuestion(id);
ALTER TABLE composed ADD CONSTRAINT composed_fk_openQuestion FOREIGN KEY (id_openQuestion) REFERENCES openQuestion(id);

ALTER TABLE include ADD closeQuestion_fk int NOT NULL;
ALTER TABLE include ADD CONSTRAINT include_fk_closeQuestion FOREIGN KEY(closeQuestion_fk) REFERENCES closeQuestion(id);
ALTER TABLE include ADD CONSTRAINT include_fk_answerCloseQuestion FOREIGN KEY(id_answerCloseQuestion) REFERENCES answerCloseQuestion(id);
ALTER TABLE include ADD CONSTRAINT include_fk_libelleQuestion FOREIGN KEY(id_libelleQuestion) REFERENCES libelleQuestion(id);

ALTER TABLE answer ADD openQuestion_fk int NOT NULL;
ALTER TABLE answer ADD CONSTRAINT answer_fk_openQuestion FOREIGN KEY(openQuestion_fk) REFERENCES openQuestion(id);
ALTER TABLE answer ADD CONSTRAINT answer_fk_libelleQuestion FOREIGN KEY(id_libelleQuestion) REFERENCES libelleQuestion(id);
ALTER TABLE answer ADD CONSTRAINT answer_fk_answerOpenQuestion FOREIGN KEY(id_answerOpenQuestion) REFERENCES answerOpenQuestion(id);



