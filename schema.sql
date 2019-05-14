drop database if exists CatsWork;
create database CatsWork;

use CatsWork;

create table users (
	id int auto_increment,
	email varchar(300),
	accessToken varchar(1000),
	refreshToken varchar(1000),
	activeStep tinyint unsigned,
	linkedInAccessToken varchar(1000),
	desiredIndustry tinyint unsigned,
	graduationMonth tinyint unsigned,
	graduationYear int unsigned,
	degree tinyint unsigned,
	major tinyint unsigned,
	primary key (id)
);

create table people (
	id int auto_increment,
	owner int,
	linkedInId varchar(100),
	first varchar(200),
	last varchar(200),
	company varchar(300),
	industry tinyint unsigned,
	position varchar(300),
	email varchar(300),
	phone varchar(50),
	location varchar(300),
	education varchar(300),
	hometown varchar(300),
	extracurriculars varchar(300),
	website varchar(300),
	notes varchar(1000),
	source tinyint unsigned,
	sourceCustom varchar(300),
	primary key(id),
	foreign key (owner) references users(id) on delete cascade
);

create table activity (
	id int auto_increment,
	owner int,
	person int,
	activity tinyint unsigned,
	activityCustom varchar(300),
	activityDate datetime,
	status boolean,
	primary key (id),
	foreign key (owner) references users(id) on delete cascade,
	foreign key (person) references people(id) on delete cascade
);

create table notifications (
	id int auto_increment,
	owner int,
	person int,
	activity int,
	type tinyint unsigned,
	message varchar(1000),
	notificationDate datetime,
	primary key (id),
	foreign key (owner) references users(id) on delete cascade
);
