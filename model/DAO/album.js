/********************************************************************************************************************************
* Objetivo: Criar o CRUD de dados da tabela de album no Banco de dados
* Data: 11/02/2025
* Autor: Eduardo
* Versão: 1.0
*********************************************************************************************************************************/

 //Import da biblioteca do  PrismaClient, para realizar as ações no banco de dados
 const {PrismaClient} = require('@prisma/client')

   //Instancia da classe do PrismaClient(criar um objeto)
 const prisma = new PrismaClient()

const insertAlbum = async function(album){

    try {
        
    

    

        let sql  = `insert into tbl_album (
                        nome, 
                        capa_album, 
                        descricao, 
                        data_lancamento) 
                    values ( 
                        '${album.nome}', 
                        '${album.capa_album}', 
                        '${album.descricao}', 
                        '${album.data_lancamento}')`

        
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

const updateAlbum = async function(album){
     
    try {
        let sql = `update tbl_album set  nome                =     '${album.nome}', 
                                         capa_album          =     '${album.capa_album}', 
                                         descricao           =     '${album.descricao}',
                                         data_lancamento     =     '${album.data_lancamento}'
                                    where id = ${album.id}`   
                                    
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

const deleteAlbum = async function(id){
    try {

        let sql = `delete from tbl_album where id = ${id}`

      
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true 
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAlbum = async function(){
     
    try {

        let sql = 'select * from tbl_album order by id desc'

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

const selectByIdAlbum = async function(id){
     
    try {


        let sql = `select * from tbl_album where id = ${id}`

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
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIdAlbum
}