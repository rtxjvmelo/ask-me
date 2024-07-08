const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/pergunta')
const Resposta = require('./database/resposta')
const moment = require('moment')
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
    Pergunta.findAll({raw:true, 
        order:[['id', 'DESC']]
    }).then(perguntas => {
        res.render('index', {
            perguntas:perguntas,
            moment: moment
        })
    })
})

app.get("/perguntar", (req,res) =>{
    res.render('perguntar')
})

app.post("/salvarpergunta", (req, res) =>{
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})


app.get('/pergunta/:id', (req, res) =>{
    let id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[['id', 'DESC']]
            }).then(respostas => {
                res.render('pagina-pergunta', {
                    pergunta: pergunta,
                    respostas: respostas,
                    moment: moment
                })
            })
        }else{
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) =>{
    let corpo = req.body.corpo
    let perguntaId = req.body.perguntaId
    if(corpo !=''){
        Resposta.create({
            corpo: corpo,
            perguntaId: perguntaId
        }).then( ()=>{
            res.redirect('/pergunta/' + perguntaId)
        })
    }else{
        res.redirect('/pergunta/' + perguntaId)
    }
})


app.listen(port, (erro) =>{
    if(erro){
        console.log("Erro ao iniciar o servidor")
    }else{
        console.log(`Servidor rodando em http://localhost:${port}`)
    }
})