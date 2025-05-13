/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de musica no Banco de dados
* Data: 11/02/2025
* Autor: guilherme
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

   //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()

 //Função para inserir uma nova musica
 const insertUsuario = async function(usuario){

    try {
        
    
   
    
 
     let sql  = `insert into tbl_usuario (
                     nome, 
                     senha, 
                     foto_perfil) 
                 values ( 
                     '${usuario.nome}', 
                     '${usuario.senha}',
                     '${usuario.foto_perfil}')`
 
     
     
     //Await só vai funcionar se na função estiver com o async
     //Executa um script sql no banco de dados, e aguarda o resultado (retornando um true or false)
     let result  = await prisma.$executeRawUnsafe(sql)
 
     if(result)
         return  true
     else
         return false //Bug no Bamco de Dados
    
    } catch (error) {
        console.log(error)
        return false //Bug de programação
    }

 
 }
 
 //Função para atualizar uma musica existente
 const updateUsuario = async function(usuario){
     
    try {
        let sql = `update tbl_usuario set nome          =     '${usuario.nome}', 
                                         senha         =     '${usuario.senha}', 
                                         foto_perfil   =     '${usuario.foto_perfil}'
                                    where id = ${usuario.id}`   
                                    
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

 }
 
 //Função para excluir uma musica existente
 const deleteUsuario = async function(id){
    try {

        let sql = `delete from tbl_usuario where id = ${id}`

      
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else
            return false

    } catch (error) {
        return false
    }
 }
 
 
 //Função para retornar todas as musica do banco de dados
 const selectAllUsuario = async function(){
     
    try {

        let sql = 'select * from tbl_usuario order by id desc'

        //qualquer script que devolvalva valor se usa o query
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result // retorna os dados do banco 
        else
            return false

    } catch (error) {
        return false
    }

 }
 
 //Função para buscar uma musica pelo ID
 const selectByIdUsuario = async function(id){
     
    try {

      

        let sql = `select * from tbl_usuario where id = ${id}`

        //qualquer script que devolvalva valor, se usa o query
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result // retorna os dados do banco 
        else
            return false

    } catch (error) {
        return false
    }

 }

 module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
 }