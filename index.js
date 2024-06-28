const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.render('index')
})


app.get("/perguntar", (req,res) =>{
    res.render('perguntar')
})

app.listen(port, (erro) =>{
    if(erro){
        console.log("Erro ao iniciar o servidor")
    }else{
        console.log(`Servidor rodando em http://localhost:${port}`)
    }
})