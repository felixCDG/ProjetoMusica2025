create database db_controle_musicas_aa;

use db_controle_musicas_aa;

create table tbl_musica (
	id int not null primary key auto_increment,
    nome varchar(100) not null ,
    duracao time not null,
    data_lancamento date not null,
    letra text,
    link varchar(200)
);


create table tbl_album (
	id int not null primary key auto_increment,
    nome varchar(80) not null ,
    capa_album varchar(100) not null,
    descricao varchar(45) not null,
	data_lancamento date not null
);

create table tbl_cantor (
	id int not null primary key auto_increment,
    nome varchar(100) not null ,
    descricao varchar(300) not null,
	foto varchar(100),
    nome_artistico varchar(100) not null,
    genero_musical varchar(45) 
);

create table tbl_gravadora (
	id int not null primary key auto_increment,
    nome varchar(80) not null ,
	data_fundacao date not null,
    foto varchar(100)
);
create table tbl_usuario (
	id int not null primary key auto_increment,
    nome varchar(80) not null ,
	senha varchar(50) not null,
    foto_perfil varchar(100)
);




show tables;