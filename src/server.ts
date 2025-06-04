import express from 'express';
import bodyParser from 'body-parser';
import { initializeDatabase } from './db/datos';
import ContactosRuta from './Rutas/ContactosRuta';
import PagoRutas from './Rutas/PagoRutas';
import SiteRuta from './Rutas/SiteRuta';

import path from 'path';

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Vista')));

app.use('/', SiteRuta);    
app.use(ContactosRuta);
app.use(PagoRutas);

// Middleware para servir index.html en rutas no encontradas
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'Vista', 'index.html'), (err) => {
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


