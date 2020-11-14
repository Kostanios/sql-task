const { Router } = require('express');
const router = Router();
const path = require('path');
const mysql = require('mysql');

//mySql server define
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'MzknBGuMTBDL8FZN',
    database: 'products'
})

const parameterHandler = (type, body) => {
    switch (type) {
        case 'book':
            return body.weight;
        case 'DVD':
            return body.size;
        case 'furniture':
            return `${body.width}x${body.height}x${body.lenght}`
    }
}

const massDelete = (body) => {
    //body contain all 
    for (let id in body) {
        let sql = `DELETE FROM products WHERE id = ${id}`;
        let query = connection.query(sql, (err, result) => {
            if (err) throw err;
        })
    }
}

router.get('/', async (req, res)=>{
    let sql = 'SELECT * FROM products';
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', {
            title: 'shop list',
            results
        })
    })

})

router.post('/', async (req, res)=>{
    await massDelete(req.body);
    res.redirect('/');
})

router.post('/create', (req, res)=>{
    let sql = `SELECT * FROM products WHERE CKU = '${req.body.CKU}'`;
    let Testquery = connection.query(sql, (err, result) => {
        if (err) throw err
        if(result.length){
            res.render('create', {
                err: 'CKU must be unique'
            });
        }
        else{
            const special = parameterHandler(req.body.type, req.body);
            let post = {
                CKU: `${req.body.CKU}`,
                name: `${req.body.name}`,
                cost: `${req.body.cost}`,
                type: `${req.body.type}`,
                parameter: `${special}`,
            }

            sql = 'INSERT INTO products SET ?';
            let query = connection.query(sql, post, (err, result) => {
                if (err) throw err;
                res.redirect('/');
            })
        }
    })
    
})

router.get('/create', async (req, res)=>{
    res.render('create', {});
})
router.get('/createTable', async (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(225), body VARCHAR(255), PRIMARY KEY(id))';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post table created...')
    })
})

module.exports = router;

// router.get('/query/:userQuery', async (req, res)=>{
//     res.render('index', {
//         data : {
//             userQuery: req.params.userQuery
//         }
//     })
//     res.sendFile(path.join(__dirname, '../views/index.html'),{
//         title: 'main',
//     });
// })

// router.get('/addpost2', (req, res)=> {
//     let post = {
//         title: 'Post Two',
//         body: 'This is post number Two',
//     }
//     let sql = 'INSERT INTO posts SET ?';
//     let query = connection.query(sql, post, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Post 2 added...')
//     })
// })
// router.get('/getPosts', (req, res)=> {

//     let sql = 'SELECT * FROM posts';
//     let query = connection.query(sql, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         res.send('Posts...')
//     })
// })
// router.get('/updatePost/:id', (req, res)=> {
//     let newTitle = 'Updated post';
//     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
//     let query = connection.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Post updated...')
//     })
// })
// router.get('/getPost/:id', (req, res)=> {
    
//     let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
//     let query = connection.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Post fetchet...')
//     })
// })

// router.get('/deletePost/:id', (req, res)=> {
    
//     let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
//     let query = connection.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('Post deleted...')
//     })
// })

 