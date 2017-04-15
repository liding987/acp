create table tb_api_key (
    api_key_id   integer primary key auto_increment,
    api  varchar(40) not null unique,
    key  varchar(40) not null
);
