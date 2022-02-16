DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS decks;
DROP TABLE IF EXISTS decks_with_cards;

CREATE TABLE users(
  id UUID DEFAULT uuid_generate_v4() UNIQUE,
  nickname VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email_Verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE cards(
  id SERIAL PRIMARY KEY,
  user_id UUID,
  question TEXT,
  url TEXT,
  answer TEXT,
  all_answers TEXT[],
  public BOOLEAN,
  CONSTRAINT fk_user_card
  FOREIGN KEY (user_id) REFERENCES "users" (id)
);

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  category_name VARCHAR(250)
);

CREATE TABLE decks(
  id SERIAL PRIMARY KEY,
  user_id UUID,
  name VARCHAR(250),
  description TEXT,
  category_id INT,
  CONSTRAINT fk_user_deck
  FOREIGN KEY (user_id) REFERENCES "users" (id),
  CONSTRAINT fk_category_deck
  FOREIGN KEY (category_id) REFERENCES "categories" (id)
);

CREATE TABLE decks_with_cards(
  id SERIAL PRIMARY KEY,
  card_id INT,
  deck_id INT,
  CONSTRAINT fk_dwc_card
  FOREIGN KEY (card_id) REFERENCES "cards" (id),
  CONSTRAINT fk_dwc_deck
  FOREIGN KEY (deck_id) REFERENCES "decks" (id)

);

INSERT INTO users (nickname, email, password, email_Verified)
VALUES ('aa', 'a@a.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', TRUE),
       ('bb', 'b@b.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', TRUE),
       ('cc', 'c@c.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', TRUE),
       ('dd', 'd@d.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', TRUE),
       ('ee', 'e@e.ca','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', TRUE);


INSERT INTO cards (user_id, question, url, answer, all_answers, public)
VALUES ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q1','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A1', '{"F1", "F2", "F3", "A1"}', TRUE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q2','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A2', '{"F1", "F2", "F3", "A2"}', FALSE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q3','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A3', '{"F1", "F2", "F3", "A3"}', TRUE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q4','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A4', '{"F1", "F2", "F3", "A4"}', FALSE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q5','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A5', '{"F1", "F2", "F3", "A5"}', TRUE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q6','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A6', '{"F1", "F2", "F3", "A6"}', FALSE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q7','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A7', '{"F1", "F2", "F3", "A7"}', TRUE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q8','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A8', '{"F1", "F2", "F3", "A8"}', FALSE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q9','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A9', '{"F1", "F2", "F3", "A9"}', TRUE),
       ('33f51c26-9f0f-43c5-a121-8cc00747123f', 'Q10','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A10', '{"F1", "F2", "F3", "A10"}', FALSE),
       ('955c8c5c-f761-4233-ac57-fab3e003c362', 'Q11','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A11', '{"F1", "F2", "F3", "A11"}', FALSE),
       ('955c8c5c-f761-4233-ac57-fab3e003c362', 'Q12','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A12', '{"F1", "F2", "F3", "A12"}', FALSE),
       ('955c8c5c-f761-4233-ac57-fab3e003c362', 'Q13','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A13', '{"F1", "F2", "F3", "A13"}', FALSE),
       ('9f2bc655-2647-4e61-9ac9-23ead312de8a', 'Q14','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A14', '{"F1", "F2", "F3", "A14"}',FALSE),
       ('9f2bc655-2647-4e61-9ac9-23ead312de8a', 'Q15','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A15', '{"F1", "F2", "F3", "A15"}', FALSE),
       ('9f2bc655-2647-4e61-9ac9-23ead312de8a', 'Q16','https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing',
       'A16', '{"F1", "F2", "F3", "A16"}', FALSE);

INSERT INTO categories (category_name) VALUES ('SCIENCES'),
                                              ('COMMUNICATION LANGUAGES'),
                                              ('PROGRAMMING LANGUAGES'),
                                              ('FRAMEWORKS'),
                                              ('IDE'),
                                              ('OTHER');

INSERT INTO decks (user_id, name, description, category_id) VALUES 
        ('33f51c26-9f0f-43c5-a121-8cc00747123f','First 10 cards', 'the description of the deck with id = 1', 1),
        ('955c8c5c-f761-4233-ac57-fab3e003c362','First 5 Public cards and cards 11, 12, and 13', 'the description of the deck with id = 2', 1),
        ('9f2bc655-2647-4e61-9ac9-23ead312de8a','First 5 Public cards and cards 14, 15, and 16', 'the description of the deck with id = 3', 1),
        ('33f51c26-9f0f-43c5-a121-8cc00747123f','cards 1,3,5,7', 'the description of the deck with id = 2', 1),
        ('33f51c26-9f0f-43c5-a121-8cc00747123f','cards 3,5,9', 'the description of the deck with id = 2', 1),
        ('33f51c26-9f0f-43c5-a121-8cc00747123f','cards 1,3,7,9', 'the description of the deck with id = 2', 1);

INSERT INTO decks_with_cards (card_id,deck_id) VALUES 
        (1,1), (2,1), (3,1), (4,1), (5,1), (6,1), (7,1), (8,1), (9,1), (10,1),
        (1,2), (3,2), (5,2), (7,2), (9,2),(11,2), (12,2), (13,2),
        (1,3), (3,3), (5,3), (7,3), (9,3),(14,3), (15,3), (16,3),
        (1,4), (3,4), (5,4), (7,4),
        (3,5), (5,5), (9,5),
        (1,6), (3,6), (7,6), (9,6);

