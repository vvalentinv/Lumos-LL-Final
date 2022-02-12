DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  email VARCHAR(250),
  pass VARCHAR(250)
);

INSERT INTO users (firstName, lastName, email, pass)
VALUES ('aF', 'aL','a@a.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('aF', 'aL','a@a.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('aF', 'aL','a@a.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('aF', 'aL','a@a.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
