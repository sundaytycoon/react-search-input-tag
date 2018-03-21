# 아직 npm 버전이 아닙니다.

# react-multiple-page

[![Build Status](https://travis-ci.org/gotsu/react-multiple-page.svg?branch=master)](https://travis-ci.org/gotsu/react-multiple-page)

It supports history block and prevent 'Back button'. It will be help when you build form tags in multiple page

# Installation

> npm i --save react-multiple-page

# Usage 

I recommend you to see [/examples](https://github.com/gotsu/react-multiple-page/tree/master/examples)

1. `src/App.js` about [BrowserRouter]

``` js
import React, { Fragment } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import FormPage from 'components/pages/FormPage'

const customConfimation = (message, callback) => {
  // ... refer to this Link https://gist.github.com/robertgonzales/e54699212da497740845712f3648d98c
}

const App = () => (
  <Fragment>
    <BrowserRouter getUserConfirmation={customConfimation}>
      <Switch>
        {/* ... */}
        <Route path="/form" component={FormPage} /> 
      </Switch>
    </BrowserRouter>
  </Fragment>
)
```

2. `src/components/pages/FormPage` about [using MultiplePageView]

``` js
import MultiplePageView from 'react-multiple-page'

import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'

const FormPage = (props) => (
  <MultiplePageView
    pages={[Section1, Section2, Section3]}  // isRequired
    message={"메시지를 작성중입니다 정말 이 페이지를 떠나시겠습니까?"} // isOptionable
    // when={false} // isOptionable
    {...whatevers}
    {...props}
  />
)
```

3. `src/components/pages/FormPage/Section1.js`

``` js
import React from 'react'

export default const Section1 = (props) => {
  const { pageController } = props // from `react-multiple-page` property. that have a role control about this lib

  return (
    <div className="page">
      <div className="form-control">
        <h1> Hello, I am Section1 </h1>
      </div>
      <div className="form-control">
        <button className="half-button" onClick={pageController.prevPage}>Prev</button>
        <button className="half-button" onClick={pageController.nextPage}>Next</button>
      </div>
    </div>
  )
}
```

# Options

1. when: ([ boolean | func ])
2. message: ([ string | func ])
3. pages: ([ Array: ...Components])

# Transfer controller to Section Component

1. pageController: { nextPage, prevPage, goPage, when, message }

# Specific Dependencies

1. react-router v4

# To do

https://github.com/gotsu/react-multiple-page/issues/2

# License

[WTFPL](http://www.wtfpl.net/)

# Get more feedback

- If you got an error using my library, Please email me or leave an issue. I'll fix ya immediately.
- Any PR, Thanks.

Anyway, I'm happy to help you


# References

 1. history block GIST [robertgonzales/App.jsx](https://gist.github.com/robertgonzales/e54699212da497740845712f3648d98c)
 2. history block on [ReactTrainning/history](https://github.com/ReactTraining/history#blocking-transitions)