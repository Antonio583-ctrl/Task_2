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

// Ruta para servir index.html en cualquier ruta no encontrada (útil para Render)
app.get('*', (req, res, next) => {
  const filePath = path.join(__dirname, 'Vista', req.path === '/' ? 'index.html' : req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('Archivo no encontrado: ' + filePath);
    }
  });
});

app.use('/', SiteRuta);    
app.use(ContactosRuta);
app.use(PagoRutas);

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});


