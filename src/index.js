let theData

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  const beerList = document.getElementById('beer-list')
  const beerDetails = document.getElementById('beer-detail')

  fetch('http://localhost:3000/beers')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    theData = myJson
    const theBeers = myJson.map(beerObj => {
      return `<ul class="list-group">
        <li class="list-group-item" data-id = '${beerObj.id}'>${beerObj.name}</li>
      </ul>`
    }).join('')
    beerList.innerHTML = theBeers
  });

  document.addEventListener('click', event => {
    if (event.target.dataset.id) {
      let theBeerId = event.target.dataset.id
      // debugger
      fetch(`http://localhost:3000/beers/${theBeerId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        let theDetails =  `<h1>${myJson.name}</h1>
        <img src="${myJson.image_url}">
        <h3>${myJson.tagline}</h3>
        <textarea id = 'input-area'>${myJson.description}</textarea>
        <button data-detail = '${myJson.id}' id="edit-beer" class="btn btn-info">
          Save
        </button>`
        beerDetails.innerHTML = theDetails
      })
    }
    if(event.target.dataset.detail){
      let theDescriptionId = event.target.dataset.detail
      let theDescription = document.getElementById('input-area')
      fetch(`http://localhost:3000/beers/${theDescriptionId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          description: theDescription.value
        }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(function(response) {
        // let theNewDetails = `<textarea id = 'input-area'>${response.description}</textarea>`
        // beerDetails.innerHTML += theNewDetails
      })
    }
  })

})
