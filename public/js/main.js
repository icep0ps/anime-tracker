document.querySelectorAll('.grid_anime').forEach((anime) => {
  anime.addEventListener('click', (event) => {
    document.getElementById('add_anime_wrapper').style.display = 'flex';
    event.stopPropagation();
    const id = event.target.id;
    const tite = event.currentTarget.dataset.title;
    document.getElementById('anime_title').textContent = tite;
  });
});

document.getElementById('close_dialogue').addEventListener('click', () => {
  document.getElementById('add_anime_wrapper').style.display = 'none';
});
