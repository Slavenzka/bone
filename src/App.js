import React from 'react'
import ElasticAdaptive from 'hoc/ElasticAdaptive'
import Routes from 'Pages/Routes'
import {withRouter } from 'react-router-dom'

const App = () => {
  return (
    <ElasticAdaptive>
      <main>
        <Routes />
      </main>
    </ElasticAdaptive>
  )
}

export default withRouter(App)
