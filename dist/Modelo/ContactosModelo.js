"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactosModelo = void 0;
const datos_1 = require("../db/datos");
class ContactosModelo {
    async addContact(correo, nombre, comentario, ip) {
        const db = await (0, datos_1.getDBConnection)();
        const creado_en = new Date().toISOString();
        await db.run(`INSERT INTO contactos (correo, nombre, comentario, ip, creado_en) VALUES (?, ?, ?, ?, ?)`, [correo, nombre, comentario, ip, creado_en]);
        await db.close();
    }
    async getAllContacts() {
        const db = await (0, datos_1.getDBConnection)();
        const contacts = await db.all(`SELECT * FROM contactos ORDER BY creado_en DESC`);
        await db.close();
        return contacts;
    }
}
exports.ContactosModelo = ContactosModelo;
