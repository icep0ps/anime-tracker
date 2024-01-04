const openDialogue = (event) => {
  document.getElementById('add_anime_wrapper').style.display = 'flex';
  event.stopPropagation();

  const id = event.currentTarget.id;
  const tite = event.currentTarget.dataset.title;

  document.querySelector('input[name="id"]').value = id;
  document.getElementById('anime_title').textContent = tite;
};

const deleteEntry = async (event) => {
  const res = await fetch('http://localhost:3000/anime/', {
    method: 'delete',
    body: JSON.stringify({
      user_id: 1,
      anime_id: event.currentTarget.id,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.ok) window.location.reload();
};

document.querySelectorAll('.grid_anime').forEach((anime) => {
  anime.addEventListener('click', openDialogue);
});

document.getElementById('close_dialogue').addEventListener('click', () => {
  document.getElementById('add_anime_wrapper').style.display = 'none';
});
