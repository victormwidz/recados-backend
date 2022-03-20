"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API está rodando...');
});
app.use(function (Request, Response, next) {
    console.log(Request.method, Request.url, Request.ip);
    next();
});
var recados = [
    {
        id: 1,
        descricao: 'teste',
        detalhamento: 'teste1',
    },
    {
        id: 2,
        descricao: 'teste 2',
        detalhamento: 'teste 2',
    },
    {
        id: 3,
        descricao: 'teste 3',
        detalhamento: 'teste 3',
    }
];
// CRUD -> create, read, update, delete
// buscar todos
app.get('/recados', (req, res) => {
    return res.json(recados);
});
// cadastrar
app.post('/recados', (req, res) => {
    const { descricao, detalhamento } = req.body;
    const recado = {
        id: recados.length + 1,
        descricao,
        detalhamento
    };
    if (!recado.descricao || !recado.detalhamento) {
        return express_1.response.status(400).json({
            mensagem: 'Por favor, preencha todos os campos corretamente.'
        });
    }
    recados.push(recado);
    return res.status(201).json(recados);
});
// editar
app.put('/recados/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const { descricao, detalhamento } = req.body;
    const { id } = req.params;
    const index = recados.findIndex(recado => recado.id == parseInt(id));
    if (!descricao || !detalhamento) {
        return res.status(400).json({
            mensagem: 'recurso nao encontrado.'
        });
    }
    recados[index].descricao = descricao;
    recados[index].detalhamento = detalhamento;
    return res.sendStatus(204);
});
// apagar
app.delete('/recados/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const index = recados.findIndex(recado => recado.id == parseInt(id));
    recados.splice(index, 1);
    return res.sendStatus(204);
});
