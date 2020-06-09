const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@beducluster-eiuzk.mongodb.net/test?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: String,
    password: String
});


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
app.post('/person', urlencodedParser, (req, res) => {
    // res.send('Thanks');
    console.log(req.body.userName);
    // console.log(req.body.lastname);
    //aqui empieza la busqueda
    var user = mongoose.model('User', userSchema);
    user.find({ userName: req.body.userName }, function (err, data) {
        // doc is a Document
        if (err) {
            console.log('Hubo un error');
        } else {
            if (data.length > 0) {
                // console.log(data);
                res.render('results', { data });
                // console.log(doc);
            } else { res.send('no hay coincidencias para el criterio de busqueda'); }
        }
    });
});


//?Método post 2
app.post('/personJson', jsonParser, (req, res)=>{
    res.send('Thanks from JsonParser'); 
    console.log(req.body.firstname);
    console.log(req.body.lastname);
})


app.listen(port, ()=>{
    console.log(`Corriendo en el puerto: ${port}`);
})