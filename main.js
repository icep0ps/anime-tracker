const body = document.querySelector('body')
const table = document.querySelector('table')
const title = document.querySelector('#anime')
const episode = document.querySelector('#episode')
const score = document.querySelector('#score')
const stat = document.querySelector('#status')




let myLibray = []


function Anime(title, episode, score, status) {

    this.title = title
    this.episode =episode
    this.score = score
    this.status = status

}

Anime.prototype.show = function () {
    return (this.title + this.episode)
}


function addAnimeToLibrary() {

    let anime = new Anime(title.value,episode.value, score.value, stat.value)
    myLibray.push(anime.title)
    createAnime(anime)


}



function createAnime(anime) {

            const btn = document.createElement('button')
            const btnTd = document.createElement('td')
            const row = document.createElement('tr')
            const title = document.createElement('td')
            const episode = document.createElement('td')
            const score = document.createElement('td')
            const status = document.createElement('td')
            table.append(row)
            btnTd.append(btn)
            row.append(title,episode, score, status, btnTd)
            title.textContent = anime.title
            episode.textContent = anime.episode
            score.textContent = anime.score
            status.textContent = anime.status
            btn.textContent = 'Delete'
            row.setAttribute('data-anime', title.textContent)
            btn.setAttribute('data-anime', title.textContent)
            btn.addEventListener('click', e => deleteAnime(anime.title))
            
//when created the button parses the anime title as an argument on that button

}



function deleteAnime(title) {
    myLibray.forEach(anime => {
        if (title == anime) {
            myLibray.splice(myLibray.indexOf(anime), 1)
            console.log(title)
            const row = table.querySelector(`[data-anime="${title}"]`)
            console.log(row)
            row.remove(row)
        }
    })

}

/* 
takes a anime name and looks through each anime in library(.foreach) for a 
anime that matches the given title in the parimeter(animeTitle)
if they are qual then we delete that row
*/