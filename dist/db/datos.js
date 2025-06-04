"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDBConnection = getDBConnection;
exports.initializeDatabase = initializeDatabase;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
async function getDBConnection() {
    return (0, sqlite_1.open)({
        filename: './src/db/datos.sqlite',
        driver: sqlite3_1.default.Database
    });
}
async function initializeDatabase() {
    const db = await getDBConnection();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS contactos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      correo TEXT,
      nombre TEXT,
      comentario TEXT,
      ip TEXT,
      creado_en TEXT
    );
  `);
    await db.exec(`
    CREATE TABLE IF NOT EXISTS pagos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      correo TEXT,
      titular_tarjeta TEXT,
      numero_tarjeta TEXT,
      mes_expiracion TEXT,
      año_expiracion TEXT,
      cvv TEXT,
      monto REAL,
      moneda TEXT,
      creado_en TEXT
    );
  `);
    await db.close();
}
