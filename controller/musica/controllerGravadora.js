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
const gravadoraDAO = require('../../model/DAO/gravadora.js')


const inserirGravadora = async function(gravadora, contentType){

    try {
        
        if(String(contentType). toLowerCase() == 'application/json')
        {

            if(gravadora.nome            == '' || gravadora.nome            == null || gravadora.nome            == undefined || gravadora.nome.length            > 80 ||
               gravadora.data_fundacao            == '' || gravadora.data_fundacao            == null || gravadora.data_fundacao            == undefined || gravadora.data_fundacao.length            > 10 ||
               gravadora.foto            == '' || gravadora.foto            == null || gravadora.foto            == undefined || gravadora.foto.length            > 100 
               
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
            }else{
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultGravadora = await gravadoraDAO.insertGravadora(gravadora)

                if(resultGravadora){
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


const atualizarGravadora = async function(id, gravadora, contentType){
    
    try {
        if(String(contentType). toLowerCase() == 'application/json')
            {
                if(gravadora.nome            == '' || gravadora.nome            == null || gravadora.nome            == undefined || gravadora.nome.length            > 80 ||
                    gravadora.data_fundacao            == '' || gravadora.data_fundacao            == null || gravadora.data_fundacao            == undefined || gravadora.data_fundacao.length            > 10 ||
                    gravadora.foto            == '' || gravadora.foto            == null || gravadora.foto            == undefined || gravadora.foto.length            > 100 ||
                    id              == ''        || id                == undefined || id                     == null      || isNaN (id)
                    ){
                        return message.ERROR_REQUIRED_FIELDS//status code 400
                    }else{
                        //Antes estamos verifificando se existe esse ID
                        let result = await gravadoraDAO.selectByIdGravadora(id)

                        if(result != false || typeof(result) == 'object'){
                            if(result.length > 0){
                            
                                // Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição 
                                gravadora.id = id
                                let resultGravadora = await gravadoraDAO.updateGravadora(gravadora)

                                if (resultGravadora){
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


const excluirGravadora = async function(id){
    
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            //Antes de esxcluir estamos verifificando se existe esse ID
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id)

            if(resultGravadora != false || typeof(resultGravadora) == 'object'){
                if(resultGravadora.length > 0){

                    let result = await gravadoraDAO.deleteGravadora(id)

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



const listarGravadora = async function(){
    try {

        //objeto JSON
        let dadosGravadora = {}

        //Chama a função para retornar a musica para o banco de dados 
        let resultGravadora = await gravadoraDAO.selectAllGravadora()

      

        if(resultGravadora != false){
            if(resultGravadora.length > 0){
                //Cria um JSON para colocar o array de musica
                dadosGravadora.status = true,
                dadosGravadora.status_code = 200,
                dadosGravadora.items = resultGravadora.length
                dadosGravadora.gravadora = resultGravadora

                return dadosGravadora  
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
const buscarGravadora = async function(id, contentType){
    
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
        //objeto JSON
            let dadosGravadora  = {}

            //Chama a função para retornar a musica para o banco de dados 
            let resultGravadora = await gravadoraDAO.selectByIdGravadora(id)

        

            if(resultGravadora != false || typeof(resultGravadora) == 'object'){
                if(resultGravadora.length > 0){
                    //Cria um JSON para colocar o array de musica
                    dadosGravadora .status = true,
                    dadosGravadora .status_code = 200,
                    dadosGravadora .gravadora = resultGravadora

                    return dadosGravadora  
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
    inserirGravadora,
    atualizarGravadora,
    excluirGravadora,
    listarGravadora,
    buscarGravadora
}