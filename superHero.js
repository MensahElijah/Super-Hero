
//URL and TOKEN from superhero.com
const SUPERHERO_TOKEN = '122109499148192275'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

//Getting all Div's from HTML
const heroImageDiv = document.getElementById('heroImage')
const newHeroButton = document.getElementById('newHeroButton')
const searchInput = document.getElementById('searchInput')
const searchButton = document. getElementById('searchButton')


const getSuperHero = (id, name) =>{

    //Get super Hero
    fetch(`${BASE_URL}/${id}`)

    .then(response => response.json())

    .then(json => {
        
        //Show the super Hero Function
        const superHero = json
        
        showHeroInfo(superHero)
        
    }) 
}

//Grouping other info of heroes as an object
const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}


const showHeroInfo = (character) =>{

    //Getting name of Hero
    const name = `<h2>${character.name} </h2>`
    
    //Getting images of Hero
    const img = `<img src='${character.image.url}' height=200 width=200/>`
     
    //Looping to pick one stat after the other using Object.keys() and Map()
   const stats = Object.keys(character.powerstats).map(stats =>{

       return `<p>${statToEmoji[stats]} ${stats.toUpperCase()}: ${character.powerstats[stats]}</p>`

    //After looping we join() to present it as an array
    }).join('')
     
    //Displaying to the DOM
    heroImageDiv.innerHTML = `${name} ${img } ${stats}`
    
}

//Search function
//Note
//We put searchInput.value into searchSuperHero function to get the value from there
const searchSuperHero = (name) =>{

    //Searching super Hero using name
    fetch(`${BASE_URL}/search/${name}`)

    //Getting response
    .then(response => response.json())

     //Returning response as json
    .then(json => {

        //Getting result starting from 1
        const hero = json.results[0]

        //Calling showHeroInfo function here
        showHeroInfo(hero)
    })  
}

//Randomely picking upper base of an array
const randomHero = () =>{

    //Total number of heroes in database
    const numberOfHeros = 731

    //Returing it with random and flooring it to get the upper base from the database
    return Math.floor(Math.random() * numberOfHeros) +1
}

//Calling the functions here with onclick method
newHeroButton.onclick = () => getSuperHero(randomHero())

searchButton.onclick = () => searchSuperHero(searchInput.value)


