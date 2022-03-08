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
