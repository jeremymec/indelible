"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_service_1 = require("./data_service");
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/thought', (req, res) => {
    const thought_id = req.query.id;
    const user_id = req.query.user_id;
    const thought = (0, data_service_1.getThought)(thought_id, user_id).then((result) => {
        console.log(result);
        if (result.success) {
            res.send(result.thought);
        }
        else {
            res.send("Error");
        }
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
