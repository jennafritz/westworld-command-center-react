import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  
  state = {
    options: [
      {key: this.props.selectedHost.area, text: this.props.capitalize(this.props.selectedHost.area), value: this.props.selectedHost.area},
      ...this.props.areas.filter(area => area.name !== this.props.selectedHost.area).map(area => {return {key: area.name, text: this.props.capitalize(area.name), value: area.name}})      
      // {key: "another_area", text: "Another Area", value: "another_area"}
    ],
    value: this.props.selectedHost.area,
    currentHost: this.props.selectedHost
    // This state is just to show how the dropdown component works.
    // Options have to be formatted in this way (array of objects with keys of: key, text, value)
    // Value has to match the value in the object to render the right text.

    // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  }

  //already here
  //for log info
  //call setArea function separately down from app
  handleChange = (e, {value}) => {
    this.props.changeHostArea(value)



    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  //already here
  toggle = () => {
    this.props.sendToArea()
    //patch request to change host active status?
    // this.setState({
    //   currentHost: {
    //     ...this.state.currentHost,
    //     active: !this.state.currentHost.active
    //   }
    // })
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ this.props.selectedHost.imageUrl/* pass in the right image here */ }
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.selectedHost.firstName} | { this.props.selectedHost.gender === 'Male' ? <Icon name='man' /> : <Icon name='woman' />}
                { /* Think about how the above should work to conditionally render the right First Name and the right gender Icon */ }
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={() => this.toggle()}
                  label={this.props.selectedHost.active ? "Active" : "Decommissioned"}
                  // {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
                  checked={this.props.selectedHost.active ? true : false}
                  // {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.selectedHost.area}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
