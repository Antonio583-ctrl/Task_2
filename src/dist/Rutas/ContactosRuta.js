"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactosControlador_1 = require("../Controlador/ContactosControlador");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const controlador = new ContactosControlador_1.ContactosControlador();
router
    .route('/registro')
    .get((req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'Vista', 'registro.html'));
})
    .post(controlador.add.bind(controlador));
router.get('/contactos', controlador.index.bind(controlador));
exports.default = router;
