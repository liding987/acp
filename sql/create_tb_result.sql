create table tb_result (
    result_id             integer        primary key auto_increment,
    user_id               integer        not null,
    created               timestamp      default current_timestamp,
    address               varchar(250),
    city                  varchar(20),
    state                 varchar(20),
    country               varchar(20),
    postal_code           varchar(20),
    radius                integer,
    price                 varchar(20),
    link                  varchar(250),
    num_gas               integer,
    num_bank              integer,
    num_supermarket       integer,
    num_restaurant        integer,
    rating                integer,
    lat                   double,
    lng                   double,
    place_id              varchar(250),
    foreign key (user_id) references tb_user (user_id)
);
