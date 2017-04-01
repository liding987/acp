create table tb_result (
    result_id       varchar(40) primary key,
    address         varchar(250),
    city            varchar(20),
    state           varchar(20),
    country         varchar(20),
    postal_code     varchar(20),
    price           varchar(20),
    link            varchar(250),
    num_gas         integer,
    num_bank        integer,
    num_supermarket integer,
    num_restaurant  integer,
    rating          integer,
    lat             double,
    lng             double,
    place_id        varchar(250)
);
