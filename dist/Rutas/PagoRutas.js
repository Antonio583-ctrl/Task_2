"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PagoControlador_1 = require("../Controlador/PagoControlador");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const pagoCtrl = new PagoControlador_1.PagoControlador();
router.route('/pago')
    .get((req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'Vista', 'confirmacion.html'));
})
    .post(pagoCtrl.add);
exports.default = router;
