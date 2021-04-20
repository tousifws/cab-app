CREATE TABLE bookings 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     status          VARCHAR (32) NOT NULL, 
     intial_location GEOMETRY NOT NULL, 
     final_location  GEOMETRY NOT NULL, 
     amount          INT NOT NULL,
     location        GEOMETRY NOT NULL, 
     user_id         INT NOT NULL,
     car_id          INT NOT NULL,
     FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
     FOREIGN KEY (car_id) REFERENCES cars (id) ON UPDATE CASCADE  
  ); 