CREATE TABLE bookings 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     status          VARCHAR (32) NOT NULL, 
     initial_location GEOMETRY NOT NULL SRID 4326, 
     final_location  GEOMETRY NOT NULL SRID 4326, 
     amount          INT NOT NULL,
     user_id         INT NOT NULL,
     car_id          INT NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
     FOREIGN KEY (car_id) REFERENCES cars (id) ON UPDATE CASCADE  
  ); 