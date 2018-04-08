import React, { Component } from 'react'

import testData from './testData'
import NormalPage from 'components/templates/NormalPage'
// import SearchInputTag from '../../../lib/SearchInputTag'
import SearchInputTag from 'react-search-input-tag'

class MainPage extends Component{
  state = {
    input: {
      searchInput1: {
        value: '',
        id: '',
      }
    },
    itemList: [],
  }

  componentWillMount() {
    this.setState({ itemList: testData })
  }

  handleChange = ({ type, value = '', id = '' }) => {
    this.setState({
      input: {
        ...this.state.input,
        [type]: {
          ...this.state.input[type],
          value,
          id,
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
          <SearchInputTag
            id="searchInput1"
            name="searchInput1"
            value={searchInput1.value}
            itemList={itemList}
            throttle={100}
            notExist={<span>You can add `Tag` if any user can't find the item</span>}
            onChange={(value) => {
              this.handleChange({ type: 'searchInput1', value})
            }}
            onSelect={(value, id) =>{
              this.handleChange({ type: 'searchInput1', value, id})
            }}
          />
          <span>{searchInput1.id}</span>
        </div>
        <div>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
        </div>
      </NormalPage>
    )
  }
}

export default MainPage