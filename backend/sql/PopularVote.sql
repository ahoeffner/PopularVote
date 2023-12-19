/* Run as proviliged user */

create user pvuser; 
create user pvowner; 
create user pvpublic; 

grant pvuser to pvowner;
grant pvpublic to pvowner;

alter user pvuser with password 'pvuser'; 
alter user pvowner with password 'pvowner'; 
alter user pvpublic with password 'pvpublic'; 


create database PopularVote with owner pvowner;



/* Change to pvowner */

create schema data;


drop table data.users ;
create table data.users
(
	id bigint generated always as identity primary key,
	name varchar(40) not null,
	email varchar(40) not null,
	password varchar(40) not null
);


alter table data.users owner to pvowner;


grant usage on schema data to pvuser;
grant select on data.users to pvuser;


grant usage on schema data to pvpublic;
grant insert, select on data.users to pvpublic;


insert into data.users (name,email,password) values ('Alex Høffner','alex@hoeffner.net','XYZ')



