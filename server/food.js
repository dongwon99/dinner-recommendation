import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";

const app = express();
const port = 3010;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'food'
});1

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    const query = `select name from dish`
    db.query(query, (err, rows)=>{
        if(err) {
            res.send("{status:error}");
            return console.log(err)
        }
        res.send(rows);
    })
})


app.get('/dish', (req, res) => {
    var query = "select distinct dish.name, dish.kind, dish.price, dish.img from dish join flavor on dish.id = flavor.dish_id  join way on dish.id = way.dish_id  where kind in (?1) and flavor in(?2) and way in (?3)"

    query = query.replace('?1', req.query.kind);
    query = query.replace('?2', req.query.flavor);
    query = query.replace('?3', req.query.way);

    db.query(query, [], (err, rows) =>{
        if(err) return console.log(err);
        res.send(rows);
    })
})


app.listen(port, ()=>{
    console.log('success');
})
