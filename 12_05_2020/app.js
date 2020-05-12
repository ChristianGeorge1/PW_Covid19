const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

const port = 4000;

//?Mapeo (para no saber el directo real del public)
app.use("/assets", express.static(__dirname + '/public'));

//?Utilizar el ejs 
app.set('view engine', 'ejs');


//?Ruta del handler para la ruta raiz 
app.get('/', (req, res)=>{ 
    res.render('personData');
})

//?Ruta para obtener un dato especifico
app.get('/person/:id', (req, res)=>{ 
    res.render('person', { 
        ID: req.params.id, 
        Qstr: req.query.Qstr
    });
})

//?Método post 
app.post('/person', urlencodedParser, (req, res)=>{
    res.send('Thanks'); 
    console.log(req.body.firstname);
    console.log(req.body.lastname);
})

//?Método post 2
app.post('/personJson', jsonParser, (req, res)=>{
    res.send('Thanks from JsonParser'); 
    console.log(req.body.firstname);
    console.log(req.body.lastname);
})


app.listen(port, ()=>{
    console.log(`Corriendo en el puerto: ${port}`);
})