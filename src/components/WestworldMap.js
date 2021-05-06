import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

//change back to functional? would have to move 'capitalize' function out again
class WestworldMap extends Component {

  render() {
    return (
      <Segment id="map" >
        {this.props.areas.map(area => <Area key={area.id} area={area} capitalize={this.props.capitalize} hosts={this.props.hosts.filter(host => host.active === true)} handleSelection={this.props.handleSelection}/>)}
        {/* What should we render on the map? */}
      </Segment>
    )
  }
}

export default WestworldMap
