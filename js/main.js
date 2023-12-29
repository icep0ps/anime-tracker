const body = document.querySelector('body');
const table = document.querySelector('table');
const score = document.querySelector('#score');
const title = document.querySelector('#anime');
const stat = document.querySelector('#status');
const episode = document.querySelector('#episode');

const libray = new Map();

const createAnime = (anime) => {
  const btn = document.createElement('button');
  const btnTd = document.createElement('td');
  const row = document.createElement('tr');
  const title = document.createElement('td');
  const episode = document.createElement('td');
  const score = document.createElement('td');
  const status = document.createElement('td');

  table.append(row);
  btnTd.append(btn);
  row.append(title, episode, score, status, btnTd);

  title.textContent = anime.title;
  episode.textContent = anime.episodes_watched;
  score.textContent = anime.rating;
  status.textContent = anime.status;
  btn.textContent = 'Delete';

  row.setAttribute('data-anime', title.textContent);
  btn.setAttribute('data-anime', title.textContent);
  btn.addEventListener('click', () => deleteAnime(anime.title));
};

const deleteAnime = (title) => {
  libray.delete(title);
  const row = table.querySelector(`[data-anime="${title}"]`);
  row.remove(row);
};

window.onload = async () => {
  const data = await fetch('http://localhost:3000/anime', {
    method: 'get',
  });

  const animes = await data.json();

  animes.data.forEach((anime) => {
    libray.set(anime.title, anime);
    createAnime(anime);
  });
};
