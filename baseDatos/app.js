const mongoose = require('mongoose');
const express = require('express');
//const router = express.Router();

const app = express();
const port = process.env.PORT || 3003



mongoose.connect('mongodb+srv://admin:admin@beducluster-eiuzk.mongodb.net/test?retryWrites=true&w=majority');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: String,
    password: String
});

//*Mandar a llamar
app.get('/', (req, res)=>{ 
    var user = mongoose.model('User', userSchema);
    user.find({ userName: 'Oscar' }, function (err, data) {
        // doc is a Document
        if (err) {
            console.log('ocurrio un error');
    
        } else {
            // res.send(data);
            console.log(data);
            res.send(data);
        }
    });
})

/*var myUser = user({
    userName: 'Christian',
    password: "George"
});/*
/*
//*Validar contra el error
myUser.save((err) => {
    if (err) {
        console.log('algo salio mal' + err);
    } else {
        console.log('todo ok');
    }
});



*/
 
app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))




