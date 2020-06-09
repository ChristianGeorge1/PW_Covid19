const mongoose = require('mongoose');
const express = require('express');

mongoose.connect('mongodb+srv://christian:Lencho312@cluster0-camto.mongodb.net/test?retryWrites=true&w=majority', {dbName: 'test'});

var Schema = mongoose.Schema;

var usuarios = new Schema({
    userName: String,
    password: String
});

var user1 = mongoose.model('user', usuarios);

//*Busca dentro de la colección
/*user1.findOne({ userName: 'Susana' }, function (err, data) {
    // doc is a Document
    if (err) {
        console.log('ocurrio un error');

    } else {
        // res.send(data);
        console.log(data);
    }
});
*/

var myUser = user1({
    userName: 'Christian',
    password: "CG"
});

//*Promises 
const promise = new Promise((resolve, reject)=>{ 
    myUser.save((err) => {
        reject(new Error(`Se ha producico un error ${err}`))
    });
})

promise
    .then(result => console.log('salio chido'))
    .catch(result => console.log())

//*Validar contra el error
