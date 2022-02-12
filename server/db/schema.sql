DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cards;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  email VARCHAR(250),
  pass VARCHAR(250)
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  user_id REFERENCES users(id),
  question TEXT,
  url TEXT,
  answer TEXT,
  all_answers TEXT[],
  public BOOLEAN
);

INSERT INTO users (firstName, lastName, email, pass)
VALUES ("aF", "aL","a@a.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("bF", "bL","b@b.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("cF", "cL","c@c.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("dF", "dL","d@d.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("eF", "eL","e@e.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("fF", "fL","f@f.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("gF", "gL","g@g.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("hF", "hL","h@h.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("iF", "iL","i@i.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("jF", "jL","j@j.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("kF", "kL","k@k.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("lF", "lL","l@l.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("mF", "mL","m@m.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("nF", "nL","n@n.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("oF", "oL","o@o.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("pF", "pL","p@p.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("qF", "qL","q@q.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("rF", "rL","r@r.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("sF", "sL","s@s.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("tF", "tL","t@t.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("uF", "uL","u@u.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
       ("vF", "vL","v@v.ca","$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.")v


INSERT INTO cards (user_id, question, url, answer, all_answers, public)
VALUES (1, "Q1","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A1", '{"F1", "F2", "F3", "A1"}', TRUE),
       (1, "Q2","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A2", '{"F1", "F2", "F3", "A2"}', TRUE),
       (1, "Q3","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A3", '{"F1", "F2", "F3", "A3"}', TRUE),
       (1, "Q4","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A4", '{"F1", "F2", "F3", "A4"}', TRUE),
       (1, "Q5","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A5", '{"F1", "F2", "F3", "A5"}', TRUE),
       (1, "Q6","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A6", '{"F1", "F2", "F3", "A6"}', TRUE),
       (1, "Q7","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A7", '{"F1", "F2", "F3", "A7"}', TRUE),
       (1, "Q8","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A8", '{"F1", "F2", "F3", "A8"}, TRUE)',
       (1, "Q9","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A9", '{"F1", "F2", "F3", "A9"}', TRUE),
       (1, "Q10","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A10", '{"F1", "F2", "F3", "A10"}', TRUE),
       (2, "Q11","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A11", '{"F1", "F2", "F3", "A11"}', FALSE),
       (2, "Q12","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A12", '{"F1", "F2", "F3", "A12"}', FALSE),
       (2, "Q13","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A13", '{"F1", "F2", "F3", "A13"}', FALSE),
       (3, "Q14","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A14", '{"F1", "F2", "F3", "A14"}',FALSE),
       (3, "Q15","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A15", '{"F1", "F2", "F3", "A15"}', FALSE),
       (3, "Q16","https://drive.google.com/file/d/1-zn90p7XF2bwQ_aJusE5NIUaajkRQLLo/view?usp=sharing",
       "A16", '{"F1", "F2", "F3", "A16"}', FALSE);
