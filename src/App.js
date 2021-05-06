import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'


class App extends Component {

  constructor() {
    super()
    this.state ={
      areas: [],
      hosts: [],
      selectedHost: null,
      allActive: false
    }
  }

  componentDidMount() {
   fetch('http://localhost:3000/hosts')
      .then(res => res.json())
      .then(hostsArray => this.setState({
        hosts: hostsArray
      })) 

    fetch('http://localhost:3000/areas')
      .then(res => res.json())
      .then(areasArray => this.setState({areas: areasArray})) 
  }

  capitalize = (name) => {
    let splitName = name.split("_")
    let capitalizedArray = splitName.map(word => word.charAt(0).toUpperCase() + word.substring(1))
    let area = capitalizedArray.join(" ")
    return area
  }

  handleSelection = (clickedHost) => {
    this.setState({selectedHost: clickedHost})
  }

  sendToArea = () => {
    fetch(`http://localhost:3000/hosts/${this.state.selectedHost.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...this.state.selectedHost,
          active: !this.state.selectedHost.active
        })
      })
      .then(res => res.json())
      .then(updatedHost => {
        console.log(updatedHost)
        this.setState({
          hosts: this.state.hosts.map(host => {
            if(host.id === updatedHost.id){
              return updatedHost
            } else return host
          }),
          selectedHost: updatedHost,
        })
      })
  }

  changeHostArea = (newArea) => {
    fetch(`http://localhost:3000/hosts/${this.state.selectedHost.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...this.state.selectedHost,
          area: newArea
        })
      })
        .then(res => res.json())
        .then(updatedHost => {
          this.setState({
            hosts: this.state.hosts.map(host => {
              if(host.id === updatedHost.id){
                return updatedHost
              } else return host
            }),
            selectedHost: updatedHost
          })
          // if(host.active === true) {
          //   this.setState({
          //     activeHosts: {
          //       ...this.state.activeHosts,
          //       [`${host.area}`]: [...this.state.activeHosts[`${host.area}`], host]
          //     }
          //   })
          // }
        })
  }
//can you run map on a patch fetch request?
//foreach?
  // activateAllHosts = () => {
  //   let allHostStatus = this.state.active === true 
  //   ? this.state.hosts.map(host => host.active = true)
  //   : this.state.hosts.map(host => host.active = false)

  //   this.setState({
  //     hosts: allHostStatus,
  //     allActive: !this.state.allActive
  //   })
  // }

  // ...this.state.activeHosts.filter(host => {host.active===true && host.area==='high_plains'})

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  render(){
    // console.log(this.state.activeHosts)
    console.log(this.state.selectedHost)
    // console.log(this.state.hosts)
    return (
      <Segment id='app'>
        <WestworldMap areas={this.state.areas} hosts={this.state.hosts} handleSelection={this.handleSelection} /*activeHosts={this.state.activeHosts}*/ capitalize={this.capitalize}/>
        <Headquarters hosts={this.state.hosts} capitalize={this.capitalize} areas={this.state.areas} selectedHost={this.state.selectedHost !== null ? this.state.selectedHost : null} handleSelection={this.handleSelection} changeHostArea={this.changeHostArea} sendToArea={this.sendToArea}/>
        {/* What components should go here? Check out Checkpoint 1 of the Readme if you're confused */}
      </Segment>
    )
  }
}

export default App;
