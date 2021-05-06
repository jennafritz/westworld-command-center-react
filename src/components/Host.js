import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = ({host, handleSelection, selectedHost}) => {
  return(
    <Card
      className={selectedHost !== null && selectedHost.firstName === host.firstName ? "host selected" : "host"}
      // {/* NOTE: The className "host selected" renders a different style than simply "host". */}
      onClick={ () => handleSelection(host)/* On Click what? */}
      image={host.imageUrl}
      raised
    />
  )
}

export default Host
