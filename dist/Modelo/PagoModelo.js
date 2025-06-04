"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagoModelo = void 0;
const datos_1 = require("../db/datos");
class PagoModelo {
    async addPayment(correo, titular_tarjeta, numero_tarjeta, mes_expiracion, año_expiracion, cvv, monto, moneda) {
        const db = await (0, datos_1.getDBConnection)();
        const creado_en = new Date().toISOString();
        await db.run(`INSERT INTO pagos (correo, titular_tarjeta, numero_tarjeta, mes_expiracion, año_expiracion, cvv, monto, moneda, creado_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [correo, titular_tarjeta, numero_tarjeta, mes_expiracion, año_expiracion, cvv, monto, moneda, creado_en]);
        await db.close();
    }
}
exports.PagoModelo = PagoModelo;
