import React, { Component } from 'react'

import NormalPage from 'components/templates/NormalPage'
import InputSearchText from '../../../lib/InputSearchText';

export default class MainPage extends Component{

  header = {
    title: 'MainPage',
  }

  render() {

    return (
      <NormalPage header={this.header}>
        <h1> getting started `react-input-search` ! </h1>

        <div className="form-control">
          <InputSearchText />
        </div>
      </NormalPage>
    )
  }
}