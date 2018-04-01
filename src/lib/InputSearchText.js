import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import './InputSearchText.css'

class InputSearchText extends Component{
  state = {
    itemList: [],
    findList: [],
    cursor: -2,
  }

  componentWillMount() {
    const { itemList } = this.props
    this.setState({ itemList, findList: itemList })
  }

  onChange = (label) => {
    const { onChange } = this.props
    onChange(label)
    const findList = this.findList(label)
    console.log(findList)
    const correct = this.state.itemList.filter(v => v.label === label)
    if (correct.length === 1) {
      this.setState({ cursor: -2, findList })
      this.props.onSelect(correct[0].label, correct[0].value)
      return false
    }

    if (!label) {
      this.setState({ cursor: -2, findList })
      return false
    }
    this.setState({ cursor: -1, findList })
    return true
  }

  onSelect = (label, value) => {
    const { onSelect } = this.props
    onSelect(label, value)
    this.setState({ cursor: -2 })
  }

  onKeyDown = (event) => {
    const { onKeyDown } = this.props
    const { keyCode } = event
    console.log(this.state.findList)
    onKeyDown(keyCode)
    if (keyCode === 38) {
      console.log('Up')
      if (this.state.cursor > 0) {
        this.setState({ cursor: this.state.cursor - 1 })
      }
    } else if (keyCode === 40) {
      console.log('Down')
      if (this.state.cursor < this.state.findList.length - 1) {
        this.setState({ cursor: this.state.cursor + 1 })
      }
    } else if (keyCode === 13) {
      console.log('Enter')
      if (this.state.findList.length !== 0 && this.state.cursor !== -2) {
        this.props.onSelect(this.state.findList[this.state.cursor].label, this.state.findList[this.state.cursor].value)
      }
    }
  }

  makeList = (list) => {
    return list.map((v, index) => (
      <li
        className={`ist-li ${this.state.cursor === index && 'active'}`}
        key={index}
        value={v.value}
        onClick={() => {
          this.onSelect(v.label, v.value)
        }}
      >
        {v.labelEl}
      </li>))
  }
  findList = (value) => {
    if (!this.state.itemList.length) return []
    const list = this.state.itemList
      .map((item) => {
        const itemTemp = _.cloneDeep(item)

        const labelSpells = itemTemp.label.replace(/\s/g, ' ').split('')
        const inputSpells = value.replace(/\s/g, ' ').split('')
        let inputsIndex = 0
        const incorrectIndexOfs = []
        const correctIndexOfs = []
        const labelEl = labelSpells.map((labelSpell, labelIndex) => {
          if (inputSpells[inputsIndex] === labelSpell) {
            inputsIndex += 1
            correctIndexOfs.push(labelIndex)
            return (<span key={labelIndex} className="match">{labelSpell}</span>)
          }
          incorrectIndexOfs.push(labelIndex)
          return (<span key={labelIndex}>{labelSpell}</span>)
        })
        itemTemp.labelEl = labelEl
        itemTemp.incorrectIndexOfs = incorrectIndexOfs
        itemTemp.correctIndexOfs = correctIndexOfs
        itemTemp.incorrectPriority = incorrectIndexOfs.reduce((a, b) => a + b, 0)
        itemTemp.correctPriority = correctIndexOfs.reduce((a, b) => a + b, 0)

        return itemTemp
      })
      .filter(item => item.correctIndexOfs !== 0 && item.correctIndexOfs.length === value.length)

    const obj = {}
    const result = []
    list.filter((item) => {
      if (obj[item.correctPriority]) {
        obj[item.correctPriority].push(item)
      } else {
        obj[item.correctPriority] = [item]
      }
      obj[item.correctPriority].sort((prev, curr) => {
        if (prev.incorrectPriority < curr.incorrectPriority) return -1
        if (curr.incorrectPriority < prev.incorrectPriority) return 1
        return 0
      })
      return false
    })
    const keyOfObj = Object.keys(obj).map(v => parseInt(v, 10))
    keyOfObj.filter((v) => {
      result.push(...obj[v])
      return false
    })
    return result
  }

  onFocus = () => {
    this.setState({ cursor: -1 })
  }
  onBlur = () => {
    setTimeout(() => {
      this.setState({ cursor: -2  })
    }, 100)
  }
  render() {
    const { value } = this.props

    return (
      <div className={`ist-div`}>
        <input
          className={`ist-input`}
          type="search"
          value={value}
          onChange={event => this.onChange(event.target.value)}
          onKeyDown={this.onKeyDown}
          onFocus={this.onFocus}
        />
        <ul
          className={`ist-ul ${this.state.cursor === -2 && 'hide'}`}
        >
          {this.state.findList}
        </ul>
      </div>
    )
  }
}

InputSearchText.defaultProps = {
  onKeyDown: () => { },
}

InputSearchText.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,

  onKeyDown: PropTypes.func,
  itemList: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }))
}

export default InputSearchText