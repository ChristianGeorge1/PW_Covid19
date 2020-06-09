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
                        res.send("Se añadio la persona correctamente")
                        console.log('Salio chido')

                    }
                }); 

             }
        }
    });
})

//?Método post 
app.post('/person', urlencodedParser, (req, res)=>{
    var user = mongoose.model('User', userSchema);

    // res.send('Thanks');
    console.log(req.body.userName);
    // console.log(req.body.lastname);
    //aqui empieza la busqueda
   // var user = mongoose.model('User', userSchema);
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