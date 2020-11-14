const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'MzknBGuMTBDL8FZN',
    database: 'products'
})

let sql = 'CREATE TABLE `products`.`products` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(32) NOT NULL , `cost` INT(32) NOT NULL , `type` VARCHAR(32) NOT NULL , `parameter` VARCHAR(32) NOT NULL , `CKU` VARCHAR(32) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`CKU`)) ENGINE = InnoDB;'
let query = connection.query(sql, (err, result) => {
    if (err) throw err;
})