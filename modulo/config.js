/********************************************************************************************************************************
* Objetivo: Arquivo responsavel pela padronizção de mensagens status code
* Data: 18/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

/********************* STATUS CODE DE ERROS ******************************/

const ERROR_REQUIRED_FIELDS = { status : false, 
                                status_code: 400,    
                                message:"Existem campos de preenchimento obrigatórios ou quantidade de caracteres não foram atendidos"}


const ERROR_INTERNAL_SERVER_MODEL = { status : false ,    
                                status_code: 500,   
                                message:'Devido a um erro interno no servidor do MODEL, não foi possivel processar a requisição!!!'}

const ERROR_INTERNAL_SERVER_CONTROLLER = { status : false ,    
                                status_code: 500,   
                                message:'Devido a um erro interno no servidor da CONTROLLER, não foi possivel processar a requisição!!!'}

const ERROR_CONTENT_TYPE ={ status:false, 
                            status_code: 415,
                            message: 'O content-type encaminhado nao e suportado pelo servidor, Você deve encaminhar apenas conteudo no formato JSON!!!1'}

const ERROR_NOT_FOUND = {status: false, status_code: 400, message: 'Não foram encontrados items de retorno'}


/********************* STATUS CODE DE SUCESSO ****************************/
const SUCCESS_CREATED_ITEM = {status: true,
                              status_code: 201,
                              message: 'Item criado com sucesso'
}
const SUCCESS_DELETE_ITEM = {status: true,
                              status_code: 200,
                              message: 'Item removido com sucesso'
}
const SUCCESS_UPDATE_ITEM = {status: true,
                              status_code: 200,
                              message: 'Item atualizado com sucesso'
}


module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETE_ITEM,
    SUCCESS_UPDATE_ITEM
}