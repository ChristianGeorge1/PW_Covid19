const express = require('express');
const app = express(); 
const port = 3000;

//*Mapeo (para no saber el directo real del public)
app.use('assets', express.static(__dirname + '/public'));

//*Ruta del handler para la ruta raiz 
app.get('/', (req, res)=>{ 
    res.send(`
    <html>
        <head>
            <title>Page Title</title>
        </head>
        <body>
            <h1>My First Heading</h1>
            <p>My first paragraph.</p>
        </body>
    </html>`
    );
})
//*Ruta para obtener un dato especifico
app.get('/person/:idProducto', (req, res)=>{ 
    console.log(`El id que me estas enviando es: ${req.params.idProducto}`); 
    res.send(`
        <html>
            <head>
                <title>Page Title</title>
                <link href=/assets/style.css type=text/css rel=stylesheet>
            </head>
            <body>
                <h1>El id enviado es : ${req.params.idProducto}</h1>
                <p>My first paragraph.</p>
            </body>
        </html>`);
})

app.listen(port, ()=>{
    console.log(`Corriendo en el puerto: ${port}`);
})