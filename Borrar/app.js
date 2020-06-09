const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admi:admi@cluster0-06sjf.mongodb.net/test?retryWrites=true&w=majority')
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
    res.render('index');
})

//?Ruta para insertar 
app.get('/insertar',(req,res)=>{
    res.render('insertar')
})

//?Ruta para buscar 
app.get('/buscar',(req,res)=>{
    res.render('buscar')
})

//?Ruta para obtener un dato especifico
app.get('/person/:id', (req, res)=>{ 
    res.render('person', { 
        ID: req.params.id, 
        Qstr: req.query.Qstr
    });
})

//?Ruta para obtener  datos en modo listado 
app.get('/tabla', (req, res) => { 
    var user = mongoose.model('User', userSchema); 

    user.find({}, function (err, users){ 
        res.render('tabla', {users})

    })
})

//?Método de borrar mediante el ID 
app.post('/eliminar/:id', function(req, res){ 
    var user = mongoose.model('User', userSchema);
    
    user.findByIdAndDelete(req.params.id, (err, users) => {
        if(err){ 
            res.send('Algo salio mal')
        }else{ 
            res.redirect('/tabla');
        }
    }); 
    
})

//?Editar 
app.post('/update/:id', (req, res) => { 

    res.render('update2', {
        id: req.params.id
    })

})
//?Editar 2
app.post('/updateOne', urlencodedParser, (req, res) => {

    var user = mongoose.model('User', userSchema);

    user.findByIdAndUpdate(req.body.id, { 
        userName: req.body.userName, 
        password: req.body.password
    }, (err) => {
        if(err){
            res.send('Hubo un error en el cambio')
        }else{
            res.redirect('/tabla')
        }
    })
})

//?Validar 
app.post('/validar', urlencodedParser, (req, res)=>{
    var user = mongoose.model('User', userSchema);

    user.find({ userName: req.body.userName }, function (err, data) {
        // doc is a Document
        if (err) {
            console.log('Hubo un error');
        } else {
            if (data.length > 0) {
                // console.log(data);
                res.send('Existe un usuario con ese nombre ,no se puede añadir...')
                // console.log(doc);
            } else { 
                //res.send('Se añadio el nuevo usuario'); 
                var myUser = user({
                    userName: req.body.userName,
                    password: req.body.password
                })

                myUser.save((err)=>{
                    if(err){
                        console.log('Salio un error')
                    }else{
                        res.redirect('/tabla');

                    }
                }); 

             }
        }
    });
})

//?Método post 
app.post('/person', urlencodedParser, (req, res)=>{
    var user = mongoose.model('User', userSchema);

    console.log(req.body.userName);
    user.find({ userName: req.body.userName }, function (err, data) {
        if (err) {
            console.log('Hubo un error');
        } else {
            if (data.length > 0) {
                res.render('results', { data });
            } else { res.send('no hay coincidencias para el criterio de busqueda'); }
        }
    });
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