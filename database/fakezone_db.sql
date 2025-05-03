USE fakezone_db;

INSERT INTO categorias (nome, descricao) VALUES 
('Tecnologia', 'Novidades e tendências do mundo tecnológico'),
('Programação', 'Dicas e tutoriais sobre desenvolvimento de software'),
('Viagens', 'Experiências e roteiros de viagens pelo mundo'),
('Fotografia', 'Técnicas e inspirações para fotógrafos'),
('Entretenimento', 'Filmes, séries, games e cultura pop'),
('Saúde & Bem-estar', 'Dicas para uma vida saudável e equilibrada'),
('Educação', 'Aprendizado, cursos e métodos de estudo'),
('Negócios', 'Empreendedorismo, finanças e mercado'),
('Música', 'Novidades, lançamentos e análises musicais'),
('Culinária', 'Receitas, dicas gastronômicas e cultura alimentar');


SELECT * FROM usuarios;
SELECT * FROM categorias;
SELECT * FROM moods;
SELECT * FROM posts;
SELECT * FROM newsletter;

ALTER TABLE usuarios ADD COLUMN role ENUM('admin', 'usuario') DEFAULT 'usuario';

ALTER TABLE `posts`
MODIFY COLUMN `data_atualizacao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


INSERT INTO usuarios (nome_exibicao, username, email, senha)
VALUES ('Jaiane', 'fakesnack', 'fakesnack333@gmail.com', 'fakezoneismine');

UPDATE usuarios
SET role = 'admin'
WHERE username = 'fakesnack';

INSERT INTO moods (descricao, emoji) VALUES
('Feliz', '😃'),
('Triste', '😢'),
('Animado', '🤩'),
('Pensativo', '🤔'),
('Bravo', '😡');

SHOW CREATE TABLE moods;
ALTER TABLE moods CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE moods MODIFY emoji VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



SELECT p.id, p.titulo, p.conteudo, p.post_imagem, p.data_criacao, p.data_atualizacao, c.nome AS categoria, u.nome_exibicao AS usuario, m.nome AS mood
FROM posts p
JOIN categorias c ON p.categorias_id = c.id
JOIN usuarios u ON p.usuarios_id = u.id
JOIN moods m ON p.moods_id = m.id;



SET GLOBAL time_zone = '-03:00';
DELETE FROM usuarios WHERE id > 2;
ALTER TABLE posts AUTO_INCREMENT = 1;



