"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactosControlador = void 0;
const path_1 = __importDefault(require("path"));
const ContactosModelo_1 = require("../Modelo/ContactosModelo");
class ContactosControlador {
    constructor() {
        this.model = new ContactosModelo_1.ContactosModelo();
    }
    async add(req, res, next) {
        try {
            const { correo, nombre, comentario } = req.body;
            const ip = req.ip ?? 'ip no disponible';
            if (!correo || !nombre || !comentario) {
                res.status(400).send('Todos los campos son obligatorios');
                return;
            }
            await this.model.addContact(correo, nombre, comentario, ip);
            res.sendFile(path_1.default.join(__dirname, '..', 'Vista', 'confirmacion.html'));
        }
        catch (err) {
            next(err);
        }
    }
    async index(req, res, next) {
        try {
            const contactos = await this.model.getAllContacts();
            const html = `
        <h1>Contactos Registrados</h1>
        <table border="1">
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Comentario</th><th>IP</th><th>Fecha</th></tr>
          ${contactos.map((c) => `
            <tr>
              <td>${c.id}</td><td>${c.nombre}</td><td>${c.correo}</td>
              <td>${c.comentario}</td><td>${c.ip}</td><td>${c.creado_en}</td>
            </tr>`).join('')}
        </table>`;
            res.send(html);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ContactosControlador = ContactosControlador;
