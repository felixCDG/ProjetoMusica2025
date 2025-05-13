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
const controllerGravadora = require ('./controller/musica/controllerGravadora.js')
const controllerUsuario = require ('./controller/musica/controllerUsuario.js')

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

    // console.log(resultCantor)
    
   
    response.status(resultCantor.status_code)
    response.json(resultCantor)
 
 
 })

app.get('/v1/controle-cantor/cantor', cors(), async function (request, response){
    let resultCantor = await controllerCantor.listarCantor()

    response.status(resultCantor.status_code)
    response.json(resultCantor)
})

app.get('/v1/controle-cantor/cantor/:id', cors(), async function (request, response){

    let idCantor = request.params.id
    let resultCantor = await controllerCantor.buscarCantor(idCantor)

    response.status(resultCantor.status_code)
    response.json(resultCantor)
})

app.delete('/v1/controle-cantor/cantor/:id', cors(), async function (request, response){

    let idCantor = request.params.id
    let resultCantor = await controllerCantor.excluirCantor(idCantor)

    response.status(resultCantor.status_code)
    response.json(resultCantor)
})

app.put('/v1/controle-cantor/cantor/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let idCantor = request.params.id
    let dadosBody = request.body
    let resultCantor = await controllerCantor.atualizarCantor(idCantor, dadosBody, contentType)

    response.status(resultCantor.status_code)
    response.json(resultCantor)
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


///////////////////////////////////////// ENDPOINT GRAVADORA///////////////////////////////////////////////////////////////////////


app.post('/v1/controle-gravadora/gravadora', cors(), bodyParserJSON , async function (request, response) {
    
    let contentType = request.headers['content-type']
 
     let dadosBody = request.body
 
     let resultGravadora = await controllerGravadora.inserirGravadora(dadosBody, contentType)
     response.status(resultGravadora.status_code)
     response.json(resultGravadora)
 
 
 })

app.get('/v1/controle-gravadora/gravadora', cors(), async function (request, response){
    let resultGravadora = await controllerGravadora.listarGravadora()

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

app.get('/v1/controle-gravadora/gravadora/:id', cors(), async function (request, response){

    let idGravdora = request.params.id
    let resultGravadora = await controllerGravadora.buscarGravadora(idGravdora)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

app.delete('/v1/controle-gravadora/gravadora/:id', cors(), async function (request, response){

    let idGravdora = request.params.id
    let resultGravadora = await controllerGravadora.excluirGravadora(idGravdora)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})

app.put('/v1/controle-gravadora/gravadora/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let idGravdora = request.params.id
    let dadosBody = request.body
    let resultGravadora = await controllerGravadora.atualizarGravadora(idGravdora, dadosBody, contentType)

    response.status(resultGravadora.status_code)
    response.json(resultGravadora)
})


///////////////////////////////////////// ENDPOINT USUARIO///////////////////////////////////////////////////////////////////////


app.post('/v1/controle-usuario/usuario', cors(), bodyParserJSON , async function (request, response) {
    
    let contentType = request.headers['content-type']
 
     let dadosBody = request.body
 
     let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)
     response.status(resultUsuario.status_code)
     response.json(resultUsuario)
 
 
 })

app.get('/v1/controle-usuario/usuario', cors(), async function (request, response){
    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-usuario/usuario/:id', cors(), async function (request, response){

    let idUsuario = request.params.id
    let resultUsuario = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.delete('/v1/controle-usuario/usuario/:id', cors(), async function (request, response){

    let idUsuario = request.params.id
    let resultUsuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.put('/v1/controle-gravadora/gravadora/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']
    let idUsuario = request.params.id
    let dadosBody = request.body
    let resultUsuario = await controllerUsuario.atualizarUsuario(idUsuario, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})




app.listen(3030, function(){
    console.log('API aguardando requisições...')
})