import express from 'express';
import bodyParser from 'body-parser';
import { initializeDatabase } from './db/datos';
import ContactosRuta from './Rutas/ContactosRuta';
import PagoRutas from './Rutas/PagoRutas';
import SiteRuta from './Rutas/SiteRuta';

import path from 'path';
import { fileURLToPath } from 'url';

// Si usas ESModules, usa esto para __dirname:
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Si usas CommonJS, puedes usar directamente __dirname

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Sirve archivos estáticos desde la carpeta 'Vista' (después del build será dist/Vista)
app.use(express.static(path.join(process.cwd(), 'dist', 'Vista')));

app.use('/', SiteRuta);    
app.use(ContactosRuta);
app.use(PagoRutas);

// Middleware para servir index.html en rutas no encontradas (SPA o fallback)
app.use((req, res, next) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'Vista', 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Archivo no encontrado: ' + err);
    }
  });
});

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});


