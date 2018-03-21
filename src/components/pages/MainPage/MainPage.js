import React, { Component } from 'react'

import testData from './testData'
import NormalPage from 'components/templates/NormalPage'
import InputSearchText from '../../../lib/InputSearchText';

class MainPage extends Component{
  state = {
    input: {
      searchInput1: {
        label: '',
        value: '',
      }
    },
    itemList: [],
  }

  componentWillMount() {
    this.setState({ itemList: testData })
  }

  handleChange = ({ type, label = '', value = '' }) => {
    this.setState({
      input: {
        ...this.state.input,
        [type]: {
          ...this.state.input[type],
          label,
          value,
        }, 
      },
    })
  }


  header = {
    title: 'MainPage',
  }

  render() {
    const { input, itemList } = this.state
    const { searchInput1 } = input
    return (
      <NormalPage header={this.header}>
        <h1> getting started `react-input-search` ! </h1>

        <div className="form-control">
          <InputSearchText
            id="searchInput1"
            name="searchInput1"
            itemList={itemList}
            value={searchInput1.label}
            onChange={(label) => {
              this.handleChange({ type: 'searchInput1', label})
            }}
            onSelect={(label, value) =>{
              this.handleChange({ type: 'searchInput1', label, value})
            }}
          />
          <span>{searchInput1.value}</span>
        </div>
      </NormalPage>
    )
  }
}

export default MainPage