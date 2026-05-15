const express = require('express');
const limiter = require('./models/rate-limit');
const connectDatabase = require('./config/database');
const Pessoa = require('./models/Pessoa');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(limiter);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'API REST em Node.js com Express.' });
});

// Criar nova pessoa
app.post('/pessoas', async (req, res) => {
  try {
    const { nome, curso } = req.body;

    if (!nome || !curso) {
      return res.status(400).json({
        mensagem: 'Os campos nome e curso são obrigatórios.',
      });
    }

    const novaPessoa = await Pessoa.create({ nome, curso });
    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao cadastrar pessoa.',
      erro: error.message,
    });
  }
});

// Buscar pessoas (todos ou filtrando por query params)
app.get('/pessoas', async (req, res) => {
  try {
    const filtro = {};
    if (req.query.nome) filtro.nome = req.query.nome;
    if (req.query.curso) filtro.curso = req.query.curso;

    const pessoas = await Pessoa.find(filtro);

    if (pessoas.length === 0) {
      return res.status(200).json({ mensagem: 'Nenhuma pessoa encontrada.' });
    }

    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao buscar pessoas.',
      erro: error.message,
    });
  }
});

// Atualizar pessoa pelo _id
app.put('/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, curso } = req.body;

    if (!nome && !curso) {
      return res.status(400).json({
        mensagem: 'É necessário informar pelo menos um campo para atualizar.',
      });
    }

    const pessoaAtualizada = await Pessoa.findByIdAndUpdate(
      id,
      { nome, curso },
      { new: true } // retorna o documento atualizado
    );

    if (!pessoaAtualizada) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }

    res.status(200).json(pessoaAtualizada);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar pessoa.',
      erro: error.message,
    });
  }
});

// Deletar pessoa pelo _id
app.delete('/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const pessoaDeletada = await Pessoa.findByIdAndDelete(id);

    if (!pessoaDeletada) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Pessoa deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao deletar pessoa.',
      erro: error.message,
    });
  }
});

// Inicialização do servidor
async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível iniciar a aplicação.', error.message);
  }
}

startServer();