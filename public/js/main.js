const openDialogue = async (event) => {
  document.getElementById('add_anime_wrapper').style.display = 'flex';

  event.stopPropagation();

  const id = event.currentTarget.id;
  const tite = event.currentTarget.dataset.title;
  document.querySelector('input[name="id"]').value = id;

  loadAnimeData(id).then((anime) => {
    if (anime)
      document
        .querySelector('input[name="progress"]')
        .setAttribute('max', anime.num_episodes);

    loadEntryData(id).then((entry) => {
      if (entry) {
        document
          .getElementById('editor')
          .setAttribute('action', 'http://localhost:3000/entry/' + id);
        document.getElementById('anime_title').textContent = tite;
        document.getElementById('tracking').style.display = 'block';
        document.getElementById('add_to_db_btn').textContent = 'Update';
        document.querySelector('select[name="status"]').value = entry.status;
        document.querySelector('input[name="rating"]').value = entry.rating;
        document.querySelector('input[name="progress"]').value = entry.progress;
        document.querySelector('textarea[name="notes"]').value = entry.notes;

        const startedDate = document.querySelector('input[name="started"]');
        if (startedDate) startedDate.valueAsDate = new Date(entry.started);
        else startedDate.value = null;

        const finisedDate = document.querySelector('input[name="finished"]');
        if (finisedDate) finisedDate.valueAsDate = new Date(finisedDate);
        else finisedDate.value = null;
      } else {
        document
          .getElementById('editor')
          .setAttribute('action', 'http://localhost:3000/entry/');
        document.getElementById('tracking').style.display = 'none';
        document.getElementById('add_to_db_btn').textContent = 'Add to list';
      }
    });
  });
};

const loadEntryData = async (entryid) => {
  const data = await fetch('http://localhost:3000/entry/' + entryid, {
    method: 'GET',
  })
    .then(async (data) => await data.json())
    .catch(error, console.log(error));

  return data;
};

const loadAnimeData = async (animeid) => {
  const data = await fetch('http://localhost:3000/search/' + animeid, {
    method: 'GET',
  });
  const entry = await data.json();
  return entry.data;
};

const deleteEntry = async (event) => {
  const res = await fetch('http://localhost:3000/entry/', {
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
