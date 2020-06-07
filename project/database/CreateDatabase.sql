CREATE TABLE Klient(
	email varchar(50) NOT NULL,
	haslo varchar(150),
	imie varchar(30),
	nazwisko varchar(30),
	wzrost float,
	plec char,
	PRIMARY KEY (email)
);

------------------------------------------------------------

CREATE TABLE Notatnik(
	email varchar(50),
	rodzaj char,
	nr_notatki int,
	tekst varchar(350),
	FOREIGN KEY(email) REFERENCES Klient(email)
);

------------------------------------------------------------


CREATE TABLE Palenie(
	email varchar(50),
	dzien timestamptz,
	ilosc int,
	cena_za_sztuke float,
	rodzaj varchar(30),
	FOREIGN KEY(email) REFERENCES Klient(email)
);

------------------------------------------------------------


CREATE TABLE Info(
	rodzaj char,
	nazwa varchar(30),
	tekst varchar(30),
	PRIMARY KEY(rodzaj)
);

-------------------------------------------------------------
CREATE TABLE Jedzenie(
	nazwa varchar(50) NOT NULL,
	policzalne char,
	kalorie int,
	tluszcz float,
	białko float,
	cukry float,
	z_bazy varchar(50),
	PRIMARY KEY (nazwa,z_bazy)	
);
-------------------------------------------------------------

CREATE TABLE Posiłek(
	email varchar(50),
	dzien date,
	pora_dnia char,
	porcja_id int,
	FOREIGN KEY(email) REFERENCES Klient(email),
	PRIMARY KEY(porcja_id)
	
);


-------------------------------------------------------------


CREATE TABLE Porcja(
	porcja_id int,
	nazwa varchar(50),
	ilość varchar(10),
	z_bazy varchar(50),
	rodzaj boolean,
	FOREIGN KEY(nazwa,z_bazy) REFERENCES Jedzenie(nazwa,z_bazy),
	PRIMARY KEY(nazwa,z_bazy,rodzaj)	
);


-------------------------------------------------------------
CREATE TABLE Przepis(
	nazwa varchar(50),
	pora_dnia char,
	opis varchar(300),
	porcja_id int,
	z_bazy varchar(50),
	PRIMARY KEY(porcja_id),
	FOREIGN KEY(porcja_id) REFERENCES Porcja(porcja_id)
);










