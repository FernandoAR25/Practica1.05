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
const _dirname = dirname(_filename);

app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

//GET Principal
app.get('/', (req, res) => {
    res.send('Raiz principal');
    
});

//POST en la ruta raíz ('/') - ver con postman
app.post('/', (req, res) => {
    res.send('Raiz post');
    
});

//PUT en la ruta raíz ('/') - ver con postman 
app.put('/', (req, res) => {
    res.send('Hola, soy el método PUT');
});

//Prueba error 500
app.get('/error', (req, res, next) => {
    next(new Error('Forced 500 Error'));
});


const fotos = {
    "foto1":{img:"images/fotoc2.jpeg",url:"https://www.youtube.com/watch?v=G5bDu9D5BV4"},
    "foto2":{img:"images/fotom.jpg",url:"https://www.youtube.com/watch?v=GVk9GbK91tg"},
    "foto3":{img:"images/fotom2.jpg",url:"https://www.youtube.com/watch?v=_oXVUE2IWtA"},
    "foto4":{img:"images/image1.jpg",url:"https://www.youtube.com/watch?v=KHj8AI35hV8"},
    "foto5":{img:"images/image2.jpeg",url:"https://www.youtube.com/watch?v=IO5qwv_vJZM"}
}

//GET fotos aleatorias
app.get('/ruta-1',(req,res) => {
    const llaves = Object.keys(fotos);
    res.render('routes/route1',{foto: fotos[llaves[llaves.length*Math.random() << 0]]});
    
});

const Aleatorio = () => Math.floor(Math.random() * 1000) + 1;

//Ejercicios anteriores - aleatorio
app.get('/ruta-2', (req, res) => {
    const num = Aleatorio();
    res.render('routes/route2',{num});
});

//Ejercicios anteriores - texto plano
app.get('/ruta-3', (req, res) => {
    const texto = 'Hola, soy texto plano';
    res.render('routes/route3',{texto});
});

//Middleware para manejar el error 404
app.use((req, res) => {
    res.status(404);
    res.render('errors/404');
});

//Middleware para manejar el error 500
//app.use((err, req, res) => {
//    console.error(err.stack);
//    res.status(500);
//    res.render('errors/500');
//});

// Middleware para manejar el error 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errors/500'); // Enviar la respuesta al cliente
});

app.use(express.json());



//Listen
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});