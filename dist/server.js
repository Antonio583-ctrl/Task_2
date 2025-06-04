"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const datos_1 = require("./db/datos");
const ContactosRuta_1 = __importDefault(require("./Rutas/ContactosRuta"));
const PagoRutas_1 = __importDefault(require("./Rutas/PagoRutas"));
const SiteRuta_1 = __importDefault(require("./Rutas/SiteRuta"));
const path_1 = __importDefault(require("path"));
// En CommonJS, __dirname está disponible directamente
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Sirve archivos estáticos desde la carpeta 'Vista' (después del build será dist/Vista)
app.use(express_1.default.static(path_1.default.join(__dirname, 'Vista')));
app.use('/', SiteRuta_1.default);
app.use(ContactosRuta_1.default);
app.use(PagoRutas_1.default);
// Middleware para servir index.html en rutas no encontradas (SPA o fallback)
app.use((req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, 'Vista', 'index.html'), (err) => {
        if (err) {
            res.status(404).send('Archivo no encontrado: ' + err);
        }
    });
});
(0, datos_1.initializeDatabase)().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
