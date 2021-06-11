import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilters = (event) => {
    this.setState({
      filters: {
        [event.target.name]: event.target.value
      }
    })
  }

  findPets = () => {
    let url
    const animal = this.state.filters.type

    if(this.state.filters.type === 'all'){
      url = '/api/pets'
    } else {
      url = `/api/pets?type=${animal}`
    }

    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          pets: json
        })
      })
  }

  petAdoped = (petid) => {
    const newPets = this.state.pets.map(pet => {
      return pet.id === petid ? {...pet, isAdopted: true } : {...pet}
    })

    this.setState({
      pets: newPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFilters} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.petAdoped}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
