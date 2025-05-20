/********************************************************************************************************************************
* Objetivo: Controller rsponsavel pela integração entre o APP e a Model (CRUD de dados),
*           Validaçôes, tratamento  de dados etc...
* Data: 11/02/2025
* Autor: guilherme
* Versão: 1.0
*********************************************************************************************************************************/

const message = require('../../modulo/config.js')

const cantorDAO = require('../../model/DAO/cantor.js')

const inserirCantor = async function (cantor, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            // console.log(musica)
            if (cantor.nome           == '' || cantor.nome           == null      || cantor.nome           == undefined || cantor.nome.length           > 100 ||
                cantor.descricao      == '' || cantor.descricao      == null      || cantor.descricao      == undefined || cantor.descricao.length      > 300 ||
                cantor.foto           == '' || cantor.foto           == undefined || cantor.foto                                                        > 100 ||
                cantor.nome_artistico == '' || cantor.nome_artistico == null      || cantor.nome_artistico == undefined || cantor.nome_artistico.length > 100 ||
                cantor.genero_musical == '' || cantor.genero_musical == undefined || cantor.genero_musical.length > 45

            ) {
                return message.ERROR_REQUIRED_FIELDS//status code 400
            } else {
                //encaminhando os dados da musica para o DAO realizar o insert no Banco de dados
                let resultCantor = await cantorDAO.insertCantor(cantor)

                if (resultCantor) {
                    return message.SUCCESS_CREATED_ITEM // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER//500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

const atualizarCantor = async function (id, cantor, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') 
        {
            if (cantor.nome == '' || cantor.nome == null || cantor.nome == undefined || cantor.nome.length > 100 ||
                cantor.descricao == '' || cantor.descricao == null || cantor.descricao == undefined || cantor.descricao.length > 300 ||
                cantor.foto == '' || cantor.foto == undefined || cantor.foto > 100 ||
                cantor.nome_artistico == '' || cantor.nome_artistico == null || cantor.nome_artistico == undefined || cantor.nome_artistico.length > 100 ||
                cantor.genero_musical == '' || cantor.genero_musical == undefined || cantor.genero_musical.length > 45 ||
                id == '' || id == undefined || id == null || isNaN(id)
            ) {
                return message.ERROR_REQUIRED_FIELDS//status code 400
            } else {
                //Antes estamos verifificando se existe esse ID
                let result = await cantorDAO.selectByIdCantor(id)

                if (result != false || typeof (result) == 'object') {
                    if (result.length > 0) {

                        // Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição 
                        cantor.id = id
                        let resultCantor = await cantorDAO.updateCantor(cantor)

                        if (resultCantor) {
                            return message.SUCCESS_UPDATE_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500
                        }

                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const excluirCantor = async function (id) {

    try {

        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            //Antes de esxcluir estamos verifificando se existe esse ID
            let resultCantor = await cantorDAO.selectByIdCantor(id)

            if (resultCantor != false || typeof (resultCantor) == 'object') {
                if (resultCantor.length > 0) {

                    let result = await cantorDAO.deleteCantor(id)

                    if (result)
                        return message.SUCCESS_DELETE_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500

                } else {
                    return message.ERROR_NOT_FOUND // 400
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const listarCantor = async function () {
    try {

        //objeto JSON
        let dadosCantor = {}

        //Chama a função para retornar a musica para o banco de dados 
        let resultCantor = await cantorDAO.selectAllCantor()



        if (resultCantor != false) {
            if (resultCantor.length > 0) {
                //Cria um JSON para colocar o array de musica
                dadosCantor.status = true,
                    dadosCantor.status_code = 200,
                    dadosCantor.items = resultCantor.length
                dadosCantor.cantor = resultCantor

                return dadosCantor
            } else {
                return message.ERROR_NOT_FOUND // 404 
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const buscarCantor = async function (id, contentType) {

    try {

        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            //objeto JSON
            let dadosCantor = {}

            //Chama a função para retornar a musica para o banco de dados 
            let resultCantor = await cantorDAO.selectByIdCantor(id)



            if (resultCantor != false || typeof (resultCantor) == 'object') {
                if (resultCantor.length > 0) {
                    //Cria um JSON para colocar o array de musica
                    dadosCantor.status = true,
                        dadosCantor.status_code = 200,
                        dadosCantor.cantor = resultCantor

                    return dadosCantor
                } else {
                    return message.ERROR_NOT_FOUND // 404 
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}


module.exports = {
    inserirCantor,
    atualizarCantor,
    excluirCantor,
    listarCantor,
    buscarCantor


}