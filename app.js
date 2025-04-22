/********************************************************************************************************************************
* Objetivo: Criar uma API para realizar a integração com o banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
* Observações:
*   Para criar a API precisa instalar:
*       express -->       npm install express --save
*       cors -->          npm install cors --save
*       body-parser -->   npm install body-parser --save
*   Para criar a conexão com o Banco de dados precisa intalar:
*       prisma -->         npm install prisma
*       @prisma/client --> npm install @prisma/client
*********************************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const controllerMusica = require ('./controller/musica/controllerMusica.js')
const controllerCantor = require ('./controller/musica/controllerCantor.js')
const controllerAlbum = require ('./controller/musica/controllerAlbum.js')

const bodyParserJSON = bodyParser.json()

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin','*')
    response.header('Access-Control-Allow-Methods','GET')

    app.use(cors())

    next()
})

///////////////////////////////////////// ENDPOINT MUSICA///////////////////////////////////////////////////////////////////////
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON , async function (request, response) {
    
   let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultMusica = await controllerMusica.inserirMusica(dadosBody, contentType)
    // console.log(resultMusica)
    response.status(resultMusica.status_code)
    response.json(resultMusica)


})

//EndPoint para retornar todas as musicas 
app.get('/v1/controle-musicas/musica', cors(), async function (request, response){
    let resultMusica = await controllerMusica.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.get('/v1/controle-musicas/musica/:id', cors(), async function (request, response){

    let idMusica = request.params.id
    let resultMusica = await controllerMusica.buscarMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request, response){

    let idMusica = request.params.id
    let resultMusica = await controllerMusica.excluirMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let idMusica = request.params.id
    let dadosBody = request.body
    let resultMusica = await controllerMusica.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})
///////////////////////////////////////// ENDPOINT CANTOR///////////////////////////////////////////////////////////////////////
app.post('/v1/controle-cantor/cantor', cors(), bodyParserJSON , async function (request, response) {
    
 
    let contentType = request.headers['content-type']
 
    let dadosBody = request.body
    
    let resultCantor = await controllerCantor.inserirCantor(dadosBody, contentType)
    
   
    response.status(resultCantor.status_code)
    response.json(resultCantor)
 
 
 })

app.get('/v1/controle-cantor/cantor', cors(), async function (request, response){
    let resultCantor = await controllerCantor.listarCantor()

    response.status(resultCantor.status_code)
    response.json(resultCantor)
})

app.get('/v1/controle-album/album/:id', cors(), async function (request, response){

    let idAlbum = request.params.id
    let resultAlbum = await controllerAlbum.buscarAlbum(idAlbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

app.delete('/v1/controle-album/album/:id', cors(), async function (request, response){

    let idAlbum = request.params.id
    let resultAlbum = await controllerAlbum.excluirAlbum(idAlbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

app.put('/v1/controle-album/album/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let idAlbum = request.params.id
    let dadosBody = request.body
    let resultAlbum = await controllerAlbum.atualizarAlbum(idAlbum, dadosBody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})
///////////////////////////////////////// ENDPOINT ALBUM///////////////////////////////////////////////////////////////////////
app.post('/v1/controle-album/album', cors(), bodyParserJSON , async function (request, response) {
    
    let contentType = request.headers['content-type']
 
     let dadosBody = request.body
 
     let resultAlbum = await controllerAlbum.inserirAlbum(dadosBody, contentType)
     response.status(resultAlbum.status_code)
     response.json(resultAlbum)
 
 
 })

app.get('/v1/controle-album/album', cors(), async function (request, response){
    let resultAlbum = await controllerAlbum.listarAlbum()

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

app.get('/v1/controle-album/album/:id', cors(), async function (request, response){

    let idAlbum = request.params.id
    let resultAlbum = await controllerAlbum.buscarAlbum(idAlbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

app.delete('/v1/controle-album/album/:id', cors(), async function (request, response){

    let idAlbum = request.params.id
    let resultAlbum = await controllerAlbum.excluirAlbum(idAlbum)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})

app.put('/v1/controle-album/album/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let idAlbum = request.params.id
    let dadosBody = request.body
    let resultAlbum = await controllerAlbum.atualizarAlbum(idAlbum, dadosBody, contentType)

    response.status(resultAlbum.status_code)
    response.json(resultAlbum)
})


app.listen(5050, function(){
    console.log('API aguardando requisições...')
})