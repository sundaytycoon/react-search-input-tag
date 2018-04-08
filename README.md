
# react-search-input-tag

[![Build Status](https://travis-ci.org/gotsu/react-search-input-tag.svg?branch=master)](https://travis-ci.org/gotsu/react-search-input-tag)

# Advantage

It try to have basic style and customize easier.
You can find `*className` options.

# Examples

I recommend you to see [/examples](https://github.com/gotsu/react-search-input-tag/tree/master/examples)

# Usage

``` js
  <SearchInputTag
    value={value}
    itemList={[{ id: 1, value: 'korea' }, ...itemList]}
    throttle={100}
    notExist={<span>You can add `Tag` if any user can't find the item</span>}
    onChange={value => {
      this.handleChange({ value })
    }}
    onSelect={(value, id) => {
      this.handleChange({ value, id })
    }}
  />
```

# options

``` js
SearchInputTag.defaultProps = {
  value: '', // value
  onSelect: () => { }, // onSelect
  onChange: () => { }, // onChange
  itemList: [], // search List
  InputElement: <input />, // default `input` tag
  placeholder: '', // tag's placeholder
  throttle: 200, // setTimeout then execute `onChange`
  notExist: null, // If any user can't find the item on your results, You can show one `li` tag
  onFocus: () => { }, // when this input focused in
  onBlur: () => { }, // when this input focused out
  onKeyDown: () => { }, // when you typed arrow keys

  wrapperClassName: '', // wrapper's className
  className: '', // input's className
  ulClassName: '', // ul's className
  liClassName: '', // li's className
  matchedWordClassName: '', // matched word's className
  unmatchedWordClassName: '', // un-matched word's classNamee
  notExistClassName: '', // notExist's className
}

SearchInputTag.propTypes = {
  // required
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string,
    })
  ),

  // not required
  notExist: PropTypes.element,
  InputElement: PropTypes.element,
  placeholder: PropTypes.string,
  throttle: PropTypes.number,

  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  ulClassName: PropTypes.string,
  liClassName: PropTypes.string,
  matchedWordClassName: PropTypes.string,
  unmatchedWordClassName: PropTypes.string,
  notExistClassName: PropTypes.string,
}

```

# License

[WTFPL](http://www.wtfpl.net/)

# Get more feedback

- If you got an error using my library, Please email me or leave an issue. I'll fix ya immediately.
- Any PR, Thanks.

Anyway, I'm happy to help you
