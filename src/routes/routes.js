import { Router } from 'express'
import jwt from 'jsonwebtoken';
import session from 'express-session'
const router = Router()

router.use(session({
  secret: 'nrdvkortFac',
  resave: false,
  saveUninitialized: true,
}));

const verificarToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    //return res.status(401).json({ mensaje: 'Token no proporcionado' });
    return res.redirect('/');
  }

  jwt.verify(token, 'fgmjwtapiresttest@5045asdbrtyhbrtybu', (err, decoded) => {
    if (err) {
      //  return res.status(401).json({ mensaje: 'Token no válido' });
      return res.redirect('/');
    }

    // Puedes acceder a la información del usuario desde decoded
    req.usuario = decoded;
    next();
  });
};

let token = "";
let tokenStr = [];
let userData;

// LOGIN
// Ruta para el proceso de login que interactúa con una API externa
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Realiza una solicitud a la API externa para autenticar al usuario
    const response = await fetch(process.env.API_SERVER + "/authenticate",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ username: username, password: password })
      });

    if (response.status != 200) {
      res.render('login', { layout: "layouts/errorPage", error: 'Credenciales incorrectas', usrName: username });
    }

    const data = await response.json();
    //console.log("data",data)
    token = data.jwt;
    tokenStr = { tkn: token };
    const urlBackend = process.env.API_SERVER;
    const urlFrontend = process.env.API_FRONTEND;

    userData = [{ userName: data.userName, userEmail: data.mail, urlBackend, urlFrontend, tokenStr }];

    req.session.token = token;

    res.redirect('/dashboard');

  } catch (error) {

    res.render('login', { layout: "layouts/errorPage", error: 'No hay conexión con el servidor', usrName: null });
  }
});


let cliente = [];

router.get('/', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Home', url: '/' });
  res.render('login', { layout: "layouts/errorPage", error: null, usrName: null });
});
router.get('/dashboard', (req, res) => {
  console.log("Token: " + req.session.token);
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Dashboard', url: '/dashboard' });
  res.render('dashboard', { userData })
})

router.get('/descargaApk', (req, res) => res.render('descargaApk',{ layout: "layouts/errorPage"}))

router.get('/servicio', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Servicios', url: '' });
  res.locals.breadcrumbs.push({ text: 'Detalle del Servicio', url: '' });
  res.render('servicios/servicio', { userData, cliente: JSON.stringify(cliente) })
});

router.post('/servicio', (req, res) => {

  //console.log("BODY REQ");
  //console.log(req.body);
  cliente = req.body;
  res.render('servicios/servicio', { userData, cliente: JSON.stringify(cliente) });
})

let srv = [];

router.get('/modificarServicio', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Servicios', url: '' });
  res.locals.breadcrumbs.push({ text: 'Modificar Servicio', url: '' });
  res.render('servicios/modificarServicio', { userData, dataSrv: JSON.stringify(srv) });
  srv = [];
});

router.post('/modificarServicio', (req, res) => {
  srv = req.body;
  res.render('servicios/modificarServicio', { userData, dataSrv: JSON.stringify(srv) })

});

router.get('/nuevoServicio', (req, res) => {
  cliente = [];
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Servicios', url: '' });
  res.locals.breadcrumbs.push({ text: 'Nuevo Servicio', url: '' });
  res.render('servicios/seleccionServicio', { userData });
})

router.get('/analisisDeServicios', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Servicios', url: '' });
  res.locals.breadcrumbs.push({ text: 'Análisis de servicios', url: '' });
  res.render('servicios/analisisDeServicios', { userData });
})

router.get('/clientes', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Clientes', url: '' });
  res.locals.breadcrumbs.push({ text: 'Mis Clientes', url: '' });
  res.render('clientes/misclientes', { userData })
})

router.get('/nuevoCliente', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Clientes', url: '' });
  res.locals.breadcrumbs.push({ text: 'Nuevo Cliente', url: '' });
  res.render('clientes/nuevoCliente', { userData })
})

let targetCli = 0;
router.get('/modificarCliente', (req, res) => {

  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Clientes', url: '' });
  res.locals.breadcrumbs.push({ text: 'Editar Cliente', url: '' });
  res.render('clientes/fichaCliente', { userData, targetCli: targetCli });
})

router.post('/modificarCliente', (req, res) => {
  targetCli = req.body.targetCliente;
  res.render('clientes/fichaCliente', { userData, targetCli: targetCli });

});

router.get('/operaciones', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Radio', url: '' });
  res.locals.breadcrumbs.push({ text: 'Operaciones', url: '' });
  res.render('servicios/operaciones', { userData })
})

router.get('/usuariosMobile', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Configuración', url: '' });
  res.locals.breadcrumbs.push({ text: 'Usuarios de la App Móvil', url: '' });
  res.render('usuarios/usuariosMobile', { userData })
})

router.get('/moviles', verificarToken, (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Sistema', url: '' });
  res.locals.breadcrumbs.push({ text: 'Mis Móviles', url: '' });
  res.render('moviles/moviles', { userData })
})

router.get('/auxiliadores', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Sistema', url: '' });
  res.locals.breadcrumbs.push({ text: 'Mis Auxiliadores', url: '' });
  res.render('auxiliadores/auxiliadores', { userData })
})

router.get('/turnos', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Radio', url: '' });
  res.locals.breadcrumbs.push({ text: 'Inicio de Turno', url: '' });
  res.render('inicioturno/inicioturno', { userData })
})

router.get('/prestadores', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Sistema', url: '' });
  res.locals.breadcrumbs.push({ text: 'Prestadores', url: '' });
  res.render('prestadores/prestadores', { userData })
})

router.get('/usuarios', (req, res) => {
  res.locals.breadcrumbs.push({ text: 'Inicio', url: '/dashboard' });
  res.locals.breadcrumbs.push({ text: 'Administración', url: '' });
  res.locals.breadcrumbs.push({ text: 'Usuarios', url: '' });
  res.render('usuarios/usuarios', { userData })
})


router.get('/logout', (req, res) => {
  // Destruir la sesión
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    // Redirigir a la página de inicio de sesión
    res.redirect('/');
  });
});

export default router