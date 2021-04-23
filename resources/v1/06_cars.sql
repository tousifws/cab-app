CREATE TABLE cars 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     model           VARCHAR (32) NOT NULL, 
     type            VARCHAR(32) NOT NULL, 
     status          VARCHAR(32) NOT NULL,
     location        GEOMETRY NOT NULL SRID 4326, 
     registration_no VARCHAR(32) NOT NULL UNIQUE,
     user_id         INT NOT NULL,
     created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at      DATETIME ON UPDATE CURRENT_TIMESTAMP,  
     CONSTRAINT cars_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE 
  ); 