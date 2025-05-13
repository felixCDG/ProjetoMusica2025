/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 11/02/2025
* Autor: guilherme
* Versão: 1.0
*********************************************************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import para realizar o CRUD no banco de dados
const musicaDAO = require('../../model/DAO/musica.js')

//Import das controller necessárias para fazer os relacionamentos
const controllerCantor = require('../musica/controllerCantor.js')

//Função para inserir uma nova musica
const inserirMusica = async function(musica, contentType){

    try {
        
        if(String(contentType). toLowerCase() == 'application/json')
        {

            // console.log(musica)
            if(musica.nome            == '' || musica.nome            == null || musica.nome            == undefined || musica.nome.length            > 100 ||
            musica.duracao         == '' || musica.duracao         == null || musica.duracao         == undefined || musica.duracao.length         > 8  ||
            musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  ||
            musica.letra    == undefined || musica.link       == undefined || musica.link.length                                                      > 200||
            musica.id_cantor      ==        '' || musica.id_cantor        == undefined
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
            }else{
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultMusica = await musicaDAO.insertMusica(musica)

                if(resultMusica){
                    return message.SUCCESS_CREATED_ITEM // 201
                }else{
                    return message.ERROR_INTERNAL_SERVER//500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
            
    }
}

//Função para atualizar uma musica existente
const atualizarMusica = async function(id, musica, contentType){
    
    try {
        if(String(contentType). toLowerCase() == 'application/json')
            {
                    if( musica.nome            == '' || musica.nome            == null || musica.nome            == undefined || musica.nome.length            > 100 ||
                        musica.duracao         == '' || musica.duracao         == null || musica.duracao         == undefined || musica.duracao.length          > 8  ||
                        musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10  ||
                        musica.letra    == undefined || 
                        musica.link     == undefined || musica.link.length                                              > 200 ||
                        id              == ''        || id                == undefined || id                     == null      || isNaN (id)                          ||
                        musica.id_cantor       ==        '' || musica.id_cantor         == undefined
                    ){
                        return message.ERROR_REQUIRED_FIELDS//status code 400
                    }else{
                        //Antes estamos verifificando se existe esse ID
                        let result = await musicaDAO.selectByIdMusica(parseInt(id))

                        if(result != false || typeof(result) == 'object'){
                            if(result.length > 0){
                            
                                // Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição 
                                musica.id = parseInt(id)
                                let resultMusica = await musicaDAO.updateMusica(musica)

                                if (resultMusica){
                                    return message.SUCCESS_UPDATE_ITEM //200
                                }else{
                                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
                                }

                            }else{
                                return message.ERROR_NOT_FOUND // 404
                            }
                        }

                    }

            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Função para excluir uma musica existente
const excluirMusica = async function(id){
    
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            //Antes de esxcluir estamos verifificando se existe esse ID
            let resultMusica = await musicaDAO.selectByIdMusica(id)

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){

                    let result = await musicaDAO.deleteMusica(id)

                    if(result)
                        return message.SUCCESS_DELETE_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500

                }else{
                    return message.ERROR_NOT_FOUND // 400
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}


//Função para retornar uma lista de músicas
const listarMusica = async function(){
    try {
        //Cria um objeto array para montar a nova estrutura de musicas no forEach
        let arrayMusicas = []

        //objeto JSON
        let dadosMusica = {}

        //Chama a função para retornar a musica para o banco de dados 
        let resultMusica = await musicaDAO.selectAllMusica()

      

        if(resultMusica != false){
            if(resultMusica.length > 0){



                //Cria um JSON para colocar o array de musica
                dadosMusica.status = true,
                dadosMusica.status_code = 200,
                dadosMusica.items = resultMusica.length
                // dadosMusica.musics = resultMusica

                //Percorrer o array de musicas para pegar cada ID do Cantor
                // e descobrir quais os dados do Cantor
                
                // resultMusica.forEach( async function(itemMusica){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await

                for(const itemMusica of resultMusica){
                     /* Monta o objeto da Cantor para retornar no Musica (1XN) */
                        //Busca os dados do Cantor na controller do Cantor
                        let dadosCantor = await controllerCantor.buscarCantor(itemMusica.id_cantor)
                        //Adiciona um atributo Cantor no JSON de filmes e coloca os dados do Cantor
                        itemMusica.cantor = dadosCantor.cantor
                         //Remover um atributo do JSON
                         delete itemMusica.id_cantor
                     /* */

                    //Adiciona em um novo array o JSON de Musica com a sua nova estrutura de dados
                    arrayMusicas.push(itemMusica)
                }

                dadosMusica.musics = arrayMusicas

                return dadosMusica
            }else{
                return message.ERROR_NOT_FOUND // 404 
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
       
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para buscar uma musica pelo ID
const buscarMusica = async function(id, contentType){
    
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
        //objeto JSON
            let dadosMusica = {}

            //Chama a função para retornar a musica para o banco de dados 
            let resultMusica = await musicaDAO.selectByIdMusica(id)

        

            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    //Cria um JSON para colocar o array de musica
                    dadosMusica.status = true,
                    dadosMusica.status_code = 200,
                    dadosMusica.musics = resultMusica

                    return dadosMusica
                }else{
                    return message.ERROR_NOT_FOUND // 404 
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}