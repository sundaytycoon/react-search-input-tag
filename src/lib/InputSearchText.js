import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputSearchText.css'

class InputSearchText extends Component{
  state = {
    findList: [],
    cursor: -2, 
  }

  componentWillMount() {
    const { itemList } = this.props
    this.setState({ itemList, findList: itemList.map(v => ({ labelEl: v.label, ...v })) })
  }

  onKeyDown = (e) => {
    this.props.onKeyDown(e)
    const { keyCode } = e
    if (keyCode === 38) {
      if (this.state.cursor > 0) { // up
        this.setState({ cursor: this.state.cursor - 1 })
        let activeElement = this.areaFindList.getElementsByTagName('li')
        if (activeElement.length !== 0) {
          activeElement = activeElement[this.state.cursor - 1]
          this.areaFindList.scrollTo(0, activeElement.offsetTop)
        }
      }
    } else if (keyCode === 40) { // down
      if (this.state.cursor < this.state.findList.length - 1) {
        this.setState({ cursor: this.state.cursor + 1 })
        let activeElement = this.areaFindList.getElementsByTagName('li')
        if (this.state.cursor !== -2 && activeElement.length !== 0) {
          activeElement = activeElement[this.state.cursor + 1]
          this.areaFindList.scrollTo(0, activeElement.offsetTop)
        }
      }
    } else if (keyCode === 13) { // enter
      if (this.state.findList.length !== 0 && this.state.cursor !== -2) {
        this.onSelect(this.state.findList[this.state.cursor].label, this.state.findList[this.state.cursor].value)
      }
    } else if (keyCode === 27) this.onSelect('', '')  // esc
  }

  onSelect = (label, value) => {
    this.props.onSelect(label, value)
    this.setState({ cursor: -2, findList: this.findList(label) })
  }

  onChange = (label) => {
    this.props.onChange(label)
    const findList = this.findList(label)
    const correct = this.props.itemList.filter(v => v.label === label)
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

  onFocus = (e) => {
    this.props.onFocus(e)
    this.setState({ cursor: -1 })
  }

  onBlur = (e) => {
    this.props.onBlur(e)
    this.setState({ cursor: -2 })
  }

  makeList = (list) => {
    return list.map((v, index) => (
      <li
        className={`ist-li ${this.props.liClassName} ${this.state.cursor === index ? 'active' : ''}`}
        key={index}
        value={v.value}
        onClick={() => {
          this.onSelect(v.label, v.value)
        }}
      >
        {v.labelEl}
      </li>))
  }

  findList = (text) => {
    if (!this.props.itemList.length) return []
    const list = this.props.itemList
      .map((item) => {
        const itemTemp = item

        const labelSpells = itemTemp.label.replace(/\s/g, ' ').split('')
        const inputSpells = text.replace(/\s/g, ' ').split('')
        let inputsIndex = 0
        const incorrectIndexOfs = []
        const correctIndexOfs = []
        const labelEl = labelSpells.map((labelSpell, labelIndex) => {
          if (inputSpells[inputsIndex] === labelSpell) {
            inputsIndex += 1
            correctIndexOfs.push(labelIndex)
            return (<span key={labelIndex} className={`match ${this.props.matchedWordClassName}`}>{labelSpell}</span>)
          }
          incorrectIndexOfs.push(labelIndex)
          return (<span key={labelIndex} className={`${this.props.unmatchedWordClassName}`}>{labelSpell}</span>)
        })
        itemTemp.labelEl = labelEl
        itemTemp.incorrectIndexOfs = incorrectIndexOfs
        itemTemp.correctIndexOfs = correctIndexOfs
        itemTemp.incorrectPriority = incorrectIndexOfs.reduce((a, b) => a + b, 0)
        itemTemp.correctPriority = correctIndexOfs.reduce((a, b) => a + b, 0)

        return itemTemp
      })
      .filter(item => item.correctIndexOfs !== 0 && item.correctIndexOfs.length === text.length)

    const obj = {}
    const result = []
    list.forEach((item) => {
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
    })

    Object.keys(obj)
      .map(v => parseInt(v, 10))
      .forEach((v) => {
        result.push(...obj[v])
      })

    return result
  }

  render() {
    const {
      value,
      InputElement,
      wrapperClassName,
      className,
      ulClassName,

      ...restProps
     } = this.props

    Object.keys(InputSearchText.defaultProps).forEach(v => {
      delete restProps[v]
    })
    return (
      <div
        className={`ist-div ${wrapperClassName}`}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        tabIndex='-1'
      >
        {React.cloneElement(
          InputElement,
          {
            className: `ist-input ${className}`,
            type: 'search',
            value: value,
            onChange: event => this.onChange(event.target.value),
            onKeyDown: this.onKeyDown,
            ...restProps
          }
        )}
        <ul
          className={`ist-ul ${ulClassName} ${this.state.cursor === -2 ? 'hide' : ''}`}
          ref={(ref) => (this.areaFindList = ref)}
        >
          {this.makeList(this.state.findList)}
        </ul>
      </div>
    )
  }
}

InputSearchText.defaultProps = {
  value: '',
  onSelect: () => { },
  onChange: () => { },
  itemList: [],
  InputElement: <input />,

  onFocus: () => { },
  onBlur: () => { },
  onKeyDown: () => { },

  wrapperClassName: '', // wrapper's className
  className: '', // input's className
  ulClassName: '', // ul's className
  liClassName: '', // li's className
  matchedWordClassName: '', // matched word's className
  unmatchedWordClassName: '', // un-matched word's classNamee
}

InputSearchText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  InputElement: PropTypes.element,

  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  ulClassName: PropTypes.string,
  liClassName: PropTypes.string,
  matchedWordClassName: PropTypes.string,
  unmatchedWordClassName: PropTypes.string,
}

export default InputSearchText