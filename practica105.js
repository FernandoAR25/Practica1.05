import express from 'express';
import exphbs from 'express-handlebars';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

//GET Principal
app.get('/', (req, res) => {
    res.send('Metodo get ejecutado correctamente');
    
});

//POST en la ruta raíz ('/') - ver con postman
app.post('/', (req, res) => {
    res.send('Metodo post ejecutado correctamente');
    
});

//PUT en la ruta raíz ('/') - ver con postman 
app.put('/', (req, res) => {
    res.send('Metodo put ejecutado correctamente');
});

//Prueba error 500
app.get('/error', (req, res, next) => {
    next(new Error('Forced 404 Error'));
});


const fotos = {
    "foto1":{img:"imagenes/ima1.jpg"},
    "foto2":{img:"imagenes/ima2.jpg"},
    "foto3":{img:"imagenes/ima3.jpg"},
    "foto4":{img:"imagenes/ima4.jpg"},
    "foto5":{img:"imagenes/ima5.jpg"},
}

//GET fotos aleatorias
app.get('/ruta1',(req,res) => {
    const llaves = Object.keys(fotos);
    res.render('rutas/ruta1',{foto: fotos[llaves[llaves.length*Math.random() << 0]]});
    
});

const Aleatorio = () => Math.floor(Math.random() * 1000) + 1;

//Ejercicios anteriores - aleatorio
app.get('/ruta2', (req, res) => {
    const num = Aleatorio();
    res.render('rutas/ruta2',{num});
});

//Ejercicios anteriores - texto plano
app.get('/ruta3', (req, res) => {
    const texto = 'Ejecución de texto de fernando y haniel';
    res.render('rutas/ruta3',{texto});
});


// Middleware para manejar el error 500
//app.use((err, req, res, next) => {
    //console.error(err.stack);
    //res.status(500).render('error/500'); // Enviar la respuesta al cliente
//});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).render('error/404'); // Enviar la respuesta al cliente
});

app.use(express.json());



//Listen
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});