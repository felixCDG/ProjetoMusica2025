/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

const message = require('../../modulo/config.js')

const albumDAO = require('../../model/DAO/album.js')

const inserirAlbum = async function(album, contentType){

    try {
        
        if(String(contentType). toLowerCase() == 'application/json')
        {

            // console.log(musica)
            if(album.nome            == '' || album.nome            == null || album.nome            == undefined || album.nome.length            > 100 ||
               album.capa_album      == '' || album.capa_album      == null || album.capa_album      == undefined || album.capa_album.length      > 100 ||
               album.descricao       == '' || album.descricao       == null || album.descricao       == undefined || album.descricao.length       > 45  ||
               album.data_lancamento == '' || album.data_lancamento == null || album.data_lancamento == undefined || album.data_lancamento.length > 10  
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
            }else{
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultAlbum = await albumDAO.insertAlbum(album)

                if(resultAlbum){
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

const atualizarAlbum = async function(id, album, contentType){
    
    try {
        if(String(contentType). toLowerCase() == 'application/json')
            {
                if(album.nome            == ''  || album.nome            == null || album.nome            == undefined || album.nome.length            > 100 ||
                    album.capa_album      == '' || album.capa_album      == null || album.capa_album      == undefined || album.capa_album.length      > 100 ||
                    album.descricao       == '' || album.descricao       == null || album.descricao       == undefined || album.descricao.length       > 45  ||
                    album.data_lancamento == '' || album.data_lancamento == null || album.data_lancamento == undefined || album.data_lancamento.length > 10  ||
                    id              == ''        || id                == undefined || id                     == null      || isNaN (id)
                    ){
                        return message.ERROR_REQUIRED_FIELDS//status code 400
                    }else{
                        //Antes estamos verifificando se existe esse ID
                        let result = await albumDAO.selectByIdAlbum(id)

                        if(result != false || typeof(result) == 'object'){
                            if(result.length > 0){
                            
                                // Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição 
                                album.id = id
                                let resultAlbum = await albumDAO.updateAlbum(album)

                                if (resultAlbum){
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

const excluirAlbum = async function(id){
    
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            //Antes de esxcluir estamos verifificando se existe esse ID
            let resultAlbum = await albumDAO.selectByIdAlbum(id)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){

                    let result = await albumDAO.deleteAlbum(id)

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

const listarAlbum = async function(){
    try {

        //objeto JSON
        let dadosAlbum = {}

        //Chama a função para retornar a musica para o banco de dados 
        let resultAlbum = await albumDAO.selectAllAlbum()

      

        if(resultAlbum != false){
            if(resultAlbum.length > 0){
                //Cria um JSON para colocar o array de musica
                dadosAlbum.status = true,
                dadosAlbum.status_code = 200,
                dadosAlbum.items = resultAlbum.length
                dadosAlbum.album = resultAlbum

                return dadosAlbum
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

const buscarAlbum = async function(id, contentType){
    
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
        //objeto JSON
            let dadosAlbum = {}

            //Chama a função para retornar a musica para o banco de dados 
            let resultAlbum = await albumDAO.selectByIdAlbum(id)

        

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){
                    //Cria um JSON para colocar o array de musica
                    dadosAlbum.status = true,
                    dadosAlbum.status_code = 200,
                    dadosAlbum.album = resultAlbum

                    return dadosAlbum
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
    inserirAlbum,
    atualizarAlbum,
    excluirAlbum,
    listarAlbum,
    buscarAlbum
}