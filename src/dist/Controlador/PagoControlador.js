"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagoControlador = void 0;
const PagoModelo_1 = require("../Modelo/PagoModelo");
class PagoControlador {
    constructor() {
        this.model = new PagoModelo_1.PagoModelo();
        this.add = async (req, res, next) => {
            try {
                const { correo, titular_tarjeta, numero_tarjeta, mes_expiracion, año_expiracion, cvv, monto, moneda, } = req.body;
                if (!correo ||
                    !titular_tarjeta ||
                    !numero_tarjeta ||
                    !mes_expiracion ||
                    !año_expiracion ||
                    !cvv ||
                    !monto ||
                    !moneda) {
                    res.status(400).send('Todos los campos son obligatorios');
                    return;
                }
                const montoNum = Number(monto);
                if (Number.isNaN(montoNum) || montoNum <= 0) {
                    res.status(400).send('Monto incorrecto');
                    return;
                }
                await this.model.addPayment(correo, titular_tarjeta, numero_tarjeta, mes_expiracion, año_expiracion, cvv, montoNum, moneda);
                res.status(201).send('<h1>Pago realizado</h1>');
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.PagoControlador = PagoControlador;
