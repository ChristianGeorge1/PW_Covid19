const express = require('express');
const app = express(); 
const port = 4000;

//?Mapeo (para no saber el directo real del public)
app.use("/assets", express.static(__dirname + '/public'));

//?Utilizar el ejs 
app.set('view engine', 'ejs');


//?Ruta del handler para la ruta raiz 
app.get('/', (req, res)=>{ 
    res.render('index');
})

//?Ruta para obtener un dato especifico
app.get('/person/:id', (req, res)=>{ 
    res.render('index', { ID: req.params.id });
})

app.listen(port, ()=>{
    console.log(`Corriendo en el puerto: ${port}`);
})