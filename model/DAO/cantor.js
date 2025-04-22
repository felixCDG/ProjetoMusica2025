/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de musica no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

   //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()

 const insertCantor = async function (cantor) {

    try {
        



      let sql = `insert into tbl_cantor (
                    nome,
                    descricao, 
                    foto,
                    nome_artistico,
                    genero_musical)
                 values(
                    '${cantor.nome}',
                    '${cantor.descricao}',
                    '${cantor.foto}',
                    '${cantor.nome_artistico}',
                    '${cantor.genero_musical}')`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false 

    } catch (error) {
        console.log(error)
        return false
    }
    
 }

 const updateCantor = async function (cantor) {
    try {
        let sql = `update tbl_cantor set nome               =     '${cantor.nome}', 
                                         descricao          =     '${cantor.descricao}', 
                                         foto               =     '${cantor.foto}',
                                         nome_artistico     =     '${cantor.nome_artistico}', 
                                         genero_musical     =     '${cantor.genero_musical}'
                                    where id = ${cantor.id}`   
                                    
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
    
 }

 const deleteCantor = async function(id){
    try {

        let sql = `delete from tbl_cantor where id = ${id}`

      
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else
            return false

    } catch (error) {
        return false
    }
 }

 const selectAllCantor = async function(){
     
    try {

        let sql = 'select * from tbl_cantor order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result 
        else
            return false

    } catch (error) {
        return false
    }

 }

 const selectByIdCantor = async function(id){
     
    try {


        let sql = `select * from tbl_cantor where id = ${id}`

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
    insertCantor,
    updateCantor,
    deleteCantor,
    selectAllCantor,
    selectByIdCantor

}