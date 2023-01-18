if (localStorage.getItem('sch')) {
  document.getElementById('count').innerText = localStorage.getItem('sch')
} else {
  localStorage.setItem('sch', '1000')
  document.getElementById('count').innerText = localStorage.getItem('sch')
}
let cardData
const getCards = async () => {
  url = `https://rickandmortyapi.com/api/character/[1,2,3,4,5]`
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  cardData = data
  createGameCards(data)
}
getCards()

function createGameCards(data) {
  data.forEach(el => {
    const card = document.createElement('article')
    card.setAttribute('class', 'game-card')
    const innerCard = document.createElement('div')
    innerCard.setAttribute('class', 'game-card-inner')
    const front = document.createElement('div')
    front.setAttribute('class', 'game-card-front')
    const back = document.createElement('div')
    back.setAttribute('class', 'game-card-back')
    const backImage = document.createElement('img')
    const image = document.createElement('img')
    image.setAttribute('class', 'game-card-image')
    const name = document.createElement('p')
    name.setAttribute('class', 'game-card-title')
    name.innerText = `${el.name}`
    const select = document.createElement('button')
    select.setAttribute('value', el.name)
    select.setAttribute('class', 'select-button')
    select.innerText = 'PLAY ME'
    image.setAttribute('src', el.image)

    back.append(backImage)
    front.append(name, image, select)
    innerCard.append(front, back)
    card.append(innerCard)
    document.getElementById('player-hand').append(card)

    card.addEventListener('click', e => {
      console.log(e.target.value)
      const trashCards = document.querySelectorAll('article')
      console.log(trashCards)
      trashCards.forEach(el => {
        if (e.target.value.split(' ')[0] !== el.innerText.split(' ')[0]) {
          el.classList.add('none')
        } else {
          el.classList.remove('game-card')
          el.classList.add('selected')
        }
      })
      const computerChoice = Math.floor(Math.random() * 5)
      console.log(computerChoice)
      let results = document.createElement('h2')
      results.setAttribute('id', 'results')
      document.getElementById('computer-choice').after(results)
      switch (computerChoice) {
        case 0:
          createComputerCard(data[0])
          if (
            e.target.value === 'Morty Smith' ||
            e.target.value === 'Jerry Smith'
          ) {
            results.innerText = 'You Lose!'
            results.classList.add('lose')
          } else if (e.target.value === 'Rick Sanchez') {
            results.innerText = 'DRAW'
            results.classList.add('draw')
          } else {
            results.innerText = 'You Win!\n +50'
            results.classList.add('win')
            addPoints(50)
          }

          break
        case 1:
          createComputerCard(data[1])
          if (
            e.target.value === 'Summer Smith' ||
            e.target.value === 'Beth Smith'
          ) {
            results.innerText = 'You Lose!'
            results.classList.add('lose')
          } else if (e.target.value === 'Morty Smith') {
            results.innerText = 'DRAW'
            results.classList.add('draw')
          } else {
            results.innerText = 'You Win!\n +50'
            results.classList.add('win')
            addPoints(50)
          }
          break
        case 2:
          createComputerCard(data[2])
          if (
            e.target.value === 'Rick Sanchez' ||
            e.target.value === 'Beth Smith'
          ) {
            results.innerText = 'You Lose!'
            results.classList.add('lose')
          } else if (e.target.value === 'Summer Smith') {
            results.innerText = 'DRAW'
            results.classList.add('draw')
          } else {
            results.innerText = 'You Win!\n +50'
            results.classList.add('win')
            addPoints(50)
          }
          break
        case 3:
          createComputerCard(data[3])
          if (
            e.target.value === 'Rick Sanchez' ||
            e.target.value === 'Jerry Smith'
          ) {
            results.innerText = 'You Lose!'
            results.classList.add('lose')
          } else if (e.target.value === 'Beth Smith') {
            results.innerText = 'DRAW'
            results.classList.add('draw')
          } else {
            results.innerText = 'You Win!\n +50'
            results.classList.add('win')
            addPoints(50)
          }
          break
        case 4:
          createComputerCard(data[4])
          if (
            e.target.value === 'Summer Smith' ||
            e.target.value === 'Morty Smith'
          ) {
            results.innerText = 'You Lose!'
            results.classList.add('lose')
          } else if (e.target.value === 'Jerry Smith') {
            results.innerText = 'You Both Lose!'
            results.classList.add('draw')
          } else {
            results.innerText = 'You Win!\n +50'
            results.classList.add('win')
            addPoints(50)
          }
          break
        default:
          console.log(err)
      }
      setTimeout(() => {
        document.getElementById('game').remove()
        const game = document.createElement('section')
        const playerDiv = document.createElement('div')
        const computerDiv = document.createElement('div')
        playerDiv.setAttribute('id', 'player-hand')
        computerDiv.setAttribute('id', 'computer-choice')
        game.setAttribute('id', 'game')
        game.append(computerDiv, playerDiv)
        document.querySelector('main').append(game)

        createGameCards(cardData)
      }, 2500)
    })
  })
}
function addPoints(points) {
  const pointSpan = document.getElementById('count')
//   pointSpan.innerText = ''
  let pnts = parseInt(localStorage.getItem('sch'))
  pnts += points
  pointSpan.innerText = pnts
  localStorage.setItem('sch', pnts)
}
function createComputerCard(data) {
  const card = document.createElement('article')
  card.setAttribute('class', 'game-card-pc')
  const innerCard = document.createElement('div')
  innerCard.setAttribute('class', 'game-card-inner')
  const front = document.createElement('div')
  front.setAttribute('class', 'game-card-front')
  const back = document.createElement('div')
  back.setAttribute('class', 'game-card-back')
  const backImage = document.createElement('img')
  const image = document.createElement('img')
  image.setAttribute('class', 'game-card-image')
  const name = document.createElement('p')
  name.setAttribute('class', 'game-card-title')
  name.innerText = `${data.name}`
  const select = document.createElement('button')
  select.setAttribute('value', data.name)
  select.setAttribute('class', 'select-button')
  select.innerText = 'PLAY ME'
  image.setAttribute('src', data.image)

  back.append(backImage)
  front.append(name, image, select)
  innerCard.append(front, back)
  card.append(innerCard)
  document.getElementById('computer-choice').append(card)
}
