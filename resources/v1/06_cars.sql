CREATE TABLE cars 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     model           VARCHAR (32) NOT NULL, 
     type            VARCHAR(32) NOT NULL, 
     status          VARCHAR(32) NOT NULL,
     location        GEOMETRY NOT NULL, 
     registrationNo  VARCHAR(32) NOT NULL,
     user_id          INT NOT NULL
     FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE 
  ); 