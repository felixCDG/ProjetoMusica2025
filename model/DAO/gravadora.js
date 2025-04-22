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


 const insertGravadora = async function(gravadora){

    try {
        
    
   
    
 
     let sql  = `insert into tbl_gravadora (
                     nome,  
                     data_fundacao,
                     foto) 
                 values ( 
                     '${gravadora.nome}', 
                     '${gravadora.data_fundacao}', 
                     '${gravadora.foto}')`
 
     
     
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
 
 const updateGravadora = async function(gravadora){
     
    try {
        let sql = `update tbl_gravadora set nome         =     '${gravadora.nome}', 
                                         data_fundacao   =     '${gravadora.data_fundacao}', 
                                         foto            =     '${gravadora.foto}'
                                    where id = ${gravadora.id}`   
                                    
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

 }
 

 const deleteGravadora = async function(id){
    try {

        let sql = `delete from tbl_gravadora where id = ${id}`

      
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else
            return false

    } catch (error) {
        return false
    }
 }
 
 

 const selectAllGravadora = async function(){
     
    try {

        let sql = 'select * from tbl_gravadora order by id desc'

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
 

 const selectByIdGravadora = async function(id){
     
    try {

        let sql = `select * from tbl_gravadora where id = ${id}`

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
    insertGravadora,
    updateGravadora,
    deleteGravadora,
    selectAllGravadora,
    selectByIdGravadora
 }