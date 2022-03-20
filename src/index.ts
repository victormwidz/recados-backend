import express, { Request, response, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(port, () => {
    console.log('API está rodando...');
})

app.use(function (Request: Request, Response: Response, next) {
    console.log(Request.method, Request.url, Request.ip)
    next()
})


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
]

// CRUD -> create, read, update, delete

// buscar todos
app.get('/recados', (req: Request, res: Response) => {
    return res.json(recados);
});


// cadastrar
app.post('/recados', (req: Request, res: Response) => {
    const { descricao, detalhamento } = req.body;
    const recado = {
        id: recados.length + 1,
        descricao,
        detalhamento
    }

    if (!recado.descricao || !recado.detalhamento) {
        return response.status(400).json({
            mensagem: 'Por favor, preencha todos os campos corretamente.'
        })
    }
    recados.push(recado);
    return res.status(201).json(recados);
})

// editar
app.put('/recados/:id', (req: Request, res: Response) => {
    console.log(req.body)
    console.log(req.params)
    const { descricao, detalhamento } = req.body;
    const { id } = req.params;
    const index = recados.findIndex(recado => recado.id == parseInt(id));


    if (!descricao || !detalhamento) {
        return res.status(400).json({
            mensagem: 'recurso nao encontrado.'
        })
    }

    recados[index].descricao = descricao;
    recados[index].detalhamento = detalhamento;

    return res.sendStatus(204);
})

// apagar
app.delete('/recados/:id', (req: Request, res: Response) => {
    console.log(req.params)
    const { id } = req.params;
    const index = recados.findIndex(recado => recado.id == parseInt(id));

    recados.splice(index, 1);

    return res.sendStatus(204);
})
