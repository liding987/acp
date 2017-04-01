create table tb_user (
    user_id   integer primary key auto_increment,
    username  varchar(40) not null unique,
    password  varchar(40) not null
);
