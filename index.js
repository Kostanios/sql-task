const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const router = require('./routes/router');
const path = require('path');
const exphbs = require('express-handlebars');

const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'MzknBGuMTBDL8FZN',
    database: 'products'
})

//hamdlebars helpers, layout and file extension
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
      parameterHandler: function (type) {
          if(type == 'book'){
            return ' KG'
          }
          if(type == 'DVD'){
            return ' MB'
          }
          if(type == 'book'){
            return 'W x H x L'
          }
      }
    }
})
// urlencoded for post requests 
app.use(express.urlencoded({extended: true}));

//set hamdlebars engine and directory
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

//include routes
app.use(router);
//set static files
app.use(express.static(path.join(__dirname, 'views')));



async function start () {
    try{
        await connection.connect();
        app.listen(PORT, ()=>{
        })
    } catch (e) {
        console.log(e)
    }
}

start()
connection.end();