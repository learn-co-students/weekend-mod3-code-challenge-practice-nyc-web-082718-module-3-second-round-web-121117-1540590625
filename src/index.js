document.addEventListener('DOMContentLoaded', () => {

  const listGroup = document.getElementById('list-group')

  fetch('http://localhost:3000/beers')
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)

    data.forEach(beer => {

      const beerLi = document.createElement('li')
      beerLi.setAttribute('class', 'list-group-item')
      beerLi.innerText = beer.name

      listGroup.appendChild(beerLi)

      beerLi.addEventListener('click', (event) => {
        const beerDetail = document.getElementById('beer-detail')
        let id = beer.id

        fetch(`http://localhost:3000/beers/${id}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)

          beerDetail.innerHTML = `
            <h1>${data.name}</h1>
            <img src=${data.image_url}>
            <h3>${data.tagline}</h3>
            <textarea id="textarea">${data.description}</textarea>
            <button id="edit-beer" class="btn btn-info" data-id="${data.id}">Save</button>
          `

          const button = document.getElementById('edit-beer')

          button.addEventListener('click', (event) => {
            let id = event.target.dataset.id
            let textarea = document.getElementById('textarea')
            let newDescription = textarea.value

            fetch(`http://localhost:3000/beers/${id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                description: newDescription
              })
            }) // end of patch fetch
            .then(response => {
              return response.json()
            })
            .then(data => {
              console.log(data)
            }) // end of PATCH fetch
          }) // end of click addEventListener on button
        }) // end of second POST fetch
      }) // end of click addEventListener on beerLi
    }) // end of forEach(beer)
  }) // end of first POST fetch

}) // end of DOM addEventListener
