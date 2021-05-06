import React from 'react'
import { Card } from 'semantic-ui-react'
import ColdStorage from './ColdStorage'
import Host from './Host'

const HostList = ({hosts, handleSelection, selectedHost}) => {
  return(
    <Card.Group itemsPerRow={6}>
      {hosts.map(host => <Host host={host} key={host.id} handleSelection={handleSelection} selectedHost={selectedHost !== undefined ?selectedHost : {}}/>)}
      {/* What do you think, partner? */}
    </Card.Group>
  )
}

export default HostList
