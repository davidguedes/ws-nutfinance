"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClosureController = void 0;
const Closure_1 = require("../models/Closure");
class ClosureController {
    async getAll(req, res) {
        try {
            let { user_id, first, rows, initial_date, final_date } = req.query;
            if (!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }
            let value_user_id = user_id.toString();
            let valueFirst = first ? Number(first) : 0;
            let valueRows = rows ? Number(rows) : 0;
            let value_initial_date = initial_date ? new Date(initial_date) : null;
            let value_final_date = final_date ? new Date(final_date) : null;
            const data = await Closure_1.Closure.findAll(value_user_id, valueFirst, valueRows, value_initial_date, value_final_date);
            res.json({ totalRecords: data.totalRecords, records: data.records });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
exports.ClosureController = ClosureController;
exports.default = new ClosureController();
//# sourceMappingURL=ClosureController.js.map