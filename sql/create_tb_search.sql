create table tb_search (
    search_id   integer primary key auto_increment,
    address     varchar(250),
    city        varchar(40),
    state       varchar(40),
    postal_code varchar(40),
    radius      varchar(40)
);
