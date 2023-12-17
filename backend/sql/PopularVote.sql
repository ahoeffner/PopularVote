/*
 * Run as proviliged user
 */

create user pvuser; 
create user pvowner; 
create user pvpublic; 

grant pvuser to pvowner;
grant pvpublic to pvowner;

alter user pvuser with password 'pv'; 
alter user pvowner with password 'pv'; 
alter user pvpublic with password 'pv'; 


create database PopularVote with owner pvowner;

/*
 * Change to pvowner
 */


create schema data;


create table data.users
(
	id bigint generated always as identity,
	name varchar(40) not null,
	email varchar(40) not null,
	password varchar(40) not null
);


alter table data.users owner to pvowner;

insert into data.users (name,email,password) values ('Alex Høffner','alex@hoeffner.net','XYZ')



