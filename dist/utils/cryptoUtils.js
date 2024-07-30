"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
// cryptoUtils.js
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-ctr';
const secretKey = //process.env.KEY_SECRET || 
 'eKSikNlVxQwfqsdyPvDiCBWScxjMYN6t';
const encrypt = (text) => {
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};
exports.encrypt = encrypt;
const decrypt = (hash) => {
    const [iv, content] = hash.split(':');
    const decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
