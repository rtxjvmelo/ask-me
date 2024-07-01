const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const connection = require('./database/database')
const pergunta = require('./database/pergunta')
const port = 3000

connection.authenticate()
        .then(() =>{
            console.log("Banco de dados conectado com sucesso")
        }).catch((msgErro)=> {
            console.log(msgErro)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get('/', (req, res) =>{
    res.render('index')
})

app.get("/perguntar", (req,res) =>{
    res.render('perguntar')
})

app.post("/salvarpergunta", (req, res) =>{
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    res.send(`Titulo: ${titulo} / Descrição: ${descricao}`)
})

app.listen(port, (erro) =>{
    if(erro){
        console.log("Erro ao iniciar o servidor")
    }else{
        console.log(`Servidor rodando em http://localhost:${port}`)
    }
})