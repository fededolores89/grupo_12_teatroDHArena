CREATE TABLE `dharena`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `show_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `show_idx` (`show_id` ASC),
  INDEX `user_idx` (`user_id` ASC),
  CONSTRAINT `show`
    FOREIGN KEY (`show_id`)
    REFERENCES `dharena`.`shows` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user`
    FOREIGN KEY (`user_id`)
    REFERENCES `dharena`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


