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


SELECT * FROM moods;

ALTER TABLE usuarios ADD COLUMN role ENUM('admin', 'usuario') DEFAULT 'usuario';

ALTER TABLE `posts`
MODIFY COLUMN `data_atualizacao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;



