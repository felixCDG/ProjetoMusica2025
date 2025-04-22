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
const usuarioDAO = require('../../model/DAO/usuario.js')
const { listarCantor } = require('./controllerCantor.js')

//Função para inserir uma nova musica
const inserirUsuario = async function(usuario, contentType){

    try {
        
        if(String(contentType). toLowerCase() == 'application/json')
        {

            // console.log(musica)
            if(usuario.nome            == '' || usuario.nome            == null || usuario.nome            == undefined || usuario.nome.length            > 80 ||
               usuario.senha            == '' || usuario.senha            == null || usuario.senha            == undefined || usuario.senha.length            > 50 ||
               usuario.foto_perfil            == '' || usuario.foto_perfil            == null || usuario.foto_perfil            == undefined || usuario.foto_perfil.length            > 100 
               
            ){
                return message.ERROR_REQUIRED_FIELDS//status code 400
            }else{
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if(resultUsuario){
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
const atualizarUsuario = async function(id, usuario, contentType){
    
    try {
        if(String(contentType). toLowerCase() == 'application/json')
            {
                if(usuario.nome            == '' || usuario.nome            == null || usuario.nome            == undefined || usuario.nome.length            > 80 ||
                    usuario.senha            == '' || usuario.senha            == null || usuario.senha            == undefined || usuario.senha.length            > 50 ||
                    usuario.foto_perfil            == '' || usuario.foto_perfil            == null || usuario.foto_perfil            == undefined || usuario.foto_perfil.length            > 100 ||
                    id              == ''        || id                == undefined || id                     == null      || isNaN (id)
                    ){
                        return message.ERROR_REQUIRED_FIELDS//status code 400
                    }else{
                        //Antes estamos verifificando se existe esse ID
                        let result = await usuarioDAO.selectByIdUsuario(id)

                        if(result != false || typeof(result) == 'object'){
                            if(result.length > 0){
                            
                                // Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição 
                                usuario.id = id
                                let resultUsuario = await usuarioDAO.updateUsuario(usuario)

                                if (resultUsuario){
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
const excluirUsuario = async function(id){
    
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            //Antes de esxcluir estamos verifificando se existe esse ID
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){

                    let result = await usuarioDAO.deleteUsuario(id)

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
const listarUsuario = async function(){
    try {

        //objeto JSON
        let dadosUsuario = {}

        //Chama a função para retornar a musica para o banco de dados 
        let resultUsuario = await usuarioDAO.selectAllUsuario()

      

        if(resultUsuario != false){
            if(resultUsuario.length > 0){
                //Cria um JSON para colocar o array de musica
                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.items = resultUsuario.length
                dadosUsuario.user = resultUsuario

                return dadosUsuario
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
const buscarUsuario = async function(id, contentType){
    
    try {

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
        //objeto JSON
            let dadosUsuario = {}

            //Chama a função para retornar a musica para o banco de dados 
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

        

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    //Cria um JSON para colocar o array de musica
                    dadosUsuario.status = true,
                    dadosUsuario.status_code = 200,
                    dadosUsuario.user = resultUsuario

                    return dadosUsuario
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarCantor,
    buscarUsuario
}