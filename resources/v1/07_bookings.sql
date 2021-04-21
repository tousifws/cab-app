CREATE TABLE bookings 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     status          VARCHAR (32) NOT NULL, 
     initial_location GEOMETRY NOT NULL SRID 4326, 
     final_location  GEOMETRY NOT NULL SRID 4326, 
     amount          INT NOT NULL,
     user_id         INT NOT NULL,
     car_id          INT NOT NULL,
     created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at      DATETIME ON UPDATE CURRENT_TIMESTAMP, 
     CONSTRAINT bookings_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
     CONSTRAINT bookings_car_id_fk FOREIGN KEY (car_id) REFERENCES cars (id) ON UPDATE CASCADE  
  ); 