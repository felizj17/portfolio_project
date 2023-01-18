const createCards = data => {
  const url = data.info.next
  if(document.getElementById('next-button')){
    document.getElementById('next-button').remove()
  }
  
  data.results.forEach(el => {
    let type = ' '
    const card = document.createElement('article')
    card.setAttribute('class', 'card')
    const innerCard = document.createElement('div')
    innerCard.setAttribute('class', 'card-inner')
    const front = document.createElement('div')
    front.setAttribute('class', 'card-front')
    const back = document.createElement('div')
    back.setAttribute('class', 'card-back')
    const backImage = document.createElement('img')
    const image = document.createElement('img')
    image.setAttribute('class', 'card-image')
    const name = document.createElement('h3')
    name.setAttribute('class', 'card-title')
    const infoSection = document.createElement('section')
    infoSection.setAttribute('class', 'card-info')
    const info = document.createElement('p')
    infoSection.append(info)
    info.innerText = `Gender: ${el.gender}\nOrigin: ${el.origin.name}\nLocation: ${el.location.name}\nSpecies: ${el.species}\nStatus: ${el.status} `
    el.type ? (type = `(${el.type})`) : ' '
    name.innerText = `${el.name} ${type}`
    image.setAttribute('src', el.image)
    back.append(backImage)
    front.append(name, image, infoSection)
    innerCard.append(front, back)
    card.append(innerCard)
    document.getElementById('card-list').append(card)
  })
  const link = document.createElement('button')
  link.setAttribute('id','next-button')
  document.getElementById('grid-right').append(link)
  link.addEventListener('click', ()=>getNextPage(url))
}
document.querySelector('form').addEventListener('submit', async e => {
  e.preventDefault()
  url = `https://rickandmortyapi.com/api/character/?name=${e.target.query.value}&status=${e.target.status.value}&species=${e.target.querySpecies.value}&type=${e.target.queryType.value}&gender=${e.target.queryGender.value}`
  const res = await fetch(url)
  const data = await res.json()
  clearCards()
  e.target.query.value = ''
  e.target.status.value = ''
  e.target.querySpecies.value = ''
  e.target.queryType.value = ''
  e.target.queryGender.value = ''
  console.log(data)
  createCards(data)
})

async function getNextPage(url) {
  const res = await fetch(url)
  const data = await res.json()
  clearCards()
  createCards(data)
}
document.getElementById('advance').addEventListener('click', e => {
  document.getElementById('advance-search').classList.remove('none')
})

document.getElementById('cancel').addEventListener('click', () => {
  document.getElementById('advance-search').classList.add('none')
})
const clearCards = () => {
  document.getElementById('card-list').remove()
  const cardList = document.createElement('section')
  cardList.setAttribute('id', 'card-list')
  document.querySelector('#grid-right').append(cardList)
}
document.getElementById('search-icon-id').addEventListener('click', () => {
  const form = document.getElementById('form')
  form.style.display = 'block'
})
document.getElementById('search-icon-id2').addEventListener('click', () => {
  const form = document.getElementById('form')
  form.style.display = 'none'
})
