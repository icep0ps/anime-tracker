CREATE TABLE `User` (
`id` INT AUTO_INCREMENT NOT NULL,
`username` VARCHAR(60) NOT NULL UNIQUE,
`password` VARCHAR(1024) NOT NULL,
`joined` DATE DEFAULT (CURRENT_DATE) NOT NULL,
`email` VARCHAR(60) NOT NULL UNIQUE,
PRIMARY KEY(`id`)
);

CREATE TABLE `Anime` (
  `id` BIGINT,
  `title` VARCHAR(1024),
  `main_picture` JSON,
  `alternative_titles` JSON,
  `start_date` VARCHAR(1024),
  `end_date` VARCHAR(1024),
  `synopsis` VARCHAR(1024),
  `mean` DOUBLE,
  `rank` BIGINT,
  `popularity` BIGINT,
  `num_list_users` BIGINT,
  `num_scoring_users` BIGINT,
  `nsfw` VARCHAR(1024),
  `created_at` VARCHAR(1024),
  `updated_at` VARCHAR(1024),
  `media_type` VARCHAR(1024),
  `status` VARCHAR(1024),
  `genres` JSON,
  `num_episodes` BIGINT,
  `start_season.year` BIGINT,
  `start_season.season` VARCHAR(1024),
  `broadcast` JSON, 
  `source` VARCHAR(1024),
  `average_episode_duration` BIGINT,
  `rating` VARCHAR(1024),
  `pictures` JSON,
  `background` VARCHAR(1024),
  `related_anime` JSON,
  `related_manga` JSON,
  `recommendations` JSON,
  `studios` JSON,
  `statistics` JSON,
  PRIMARY KEY(`id`)
);

CREATE TABLE `Entry` (
`status` VARCHAR(1024) NOT NULL, 
`rating` SMALLINT(10) NOT NULL,
`progress` INT DEFAULT 0,
`started` DATE,
`finished` DATE,
`user_id` INT,
`anime_id` BIGINT,
FOREIGN KEY(`user_id`) REFERENCES `User`(`id`), 
FOREIGN KEY(`anime_id`) REFERENCES `Anime`(`id`) ,
PRIMARY KEY(`user_id`,`anime_id`)
);