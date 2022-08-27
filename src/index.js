console.log('%c HI', 'color: firebrick')

function init() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'

   fetch(imgUrl)
  .then(resp => resp.json())
  .then(dogs => {
    const dogImageSection = document.querySelector('#dog-image-container')
    for (let dog of dogs.message) {
      const dogImage = document.createElement('img')
      dogImage.src = dog
      dogImage.alt = 'Dog Image'
      dogImageSection.appendChild(dogImage)
    }
  })

  fetch(breedUrl)
  .then(resp => resp.json())
  .then(breeds => {
    const dogBreedSection = document.querySelector('#dog-breeds')
    const filters = document.querySelector('#breed-dropdown')
    // console.log(breeds.message)
    for (let breed in breeds.message) {
      const dogBreed = document.createElement('li')
      dogBreed.classList.add('dog-breeds')
      dogBreed.id = breed
      dogBreed.textContent = breed
      dogBreedSection.appendChild(dogBreed)
    }

    const getDogNodes = document.querySelectorAll('.dog-breeds')
    const dogBreedsArray = [...getDogNodes]
    for (let breedElement of dogBreedsArray) {
      breedElement.addEventListener('click', () => breedElement.style.color = 'red')
    }

    filters.addEventListener('click', () => {
      const filteredDogBreeds = dogBreedsArray.filter(filter => {
        return filter.textContent[0] === filters.value
      })
         
      while (dogBreedSection.firstChild) {
        dogBreedSection.removeChild(dogBreedSection.firstChild)
      }

      for (let breedElement of filteredDogBreeds) {
        const dogBreed = document.createElement('li')
        dogBreed.classList.add('dog-breeds')
        dogBreed.id = breedElement
        dogBreed.textContent = breedElement.textContent
        dogBreedSection.appendChild(dogBreed)
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', init())