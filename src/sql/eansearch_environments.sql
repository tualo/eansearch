DELIMITER ;

create table if not exists eansearch_environments (
    id varchar(255) not null primary key,
    val longtext not null
);

insert ignore into eansearch_environments (id, val) values ('apikey', 'apikey');
insert ignore into eansearch_environments (id, val) values ('url', 'https://api.ean-search.org/');

create table if not exists eansearch_environments (
    base_currency varchar(8) not null,
    target_currency varchar(8) not null,
    `date` date not null,
    rate decimal(15, 5) not null,
    primary key (base_currency, target_currency, `date`)
);