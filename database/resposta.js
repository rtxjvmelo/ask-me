const { Sequelize } = require('@sequelize/core')
const connection = require('./database')
const Pergunta = require('./pergunta')
 
const Resposta = connection.define('respostas',{
    corpo: {type: Sequelize.TEXT, allowNull: false},
    perguntaId: {type: Sequelize.INTEGER, allowNull: false}
})
 
Resposta.sync({force: false})
    .then(()=>{
        console.log('Tabela resposta sincronizada')
    }).catch((error) =>{
        console.error('Erro ao sincronizar a tabela resposta')
    })
 
module.exports = Resposta