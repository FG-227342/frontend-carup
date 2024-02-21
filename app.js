import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import 'dotenv/config'
import indexRoute from './src/routes/routes.js'
import expressLayouts from 'express-ejs-layouts'

const app = express()
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url)) // Ruta relativa al SRC

console.log("API url: ",process.env.API_SERVER);

  // Configuración de middleware para manejar las rutas y breadcrumbs
  
  app.use((req, res, next) => {
    res.locals.breadcrumbs = [];
    next();
  });
  
//------------------------------------------------------------------------

// Static Files
app.use(express.static(join(__dirname, 'src/public')))
app.set('views', join(__dirname, 'src/views'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine', 'ejs');

// para obtener valores del body al hacer un submit a un form
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Navigation
app.use(indexRoute)

app.use(function(req, res, next) {
    res.status(404).render('error/404',{layout:'error/404'});
  });



app.listen(port, () => console.info('App listening on port ' + port));