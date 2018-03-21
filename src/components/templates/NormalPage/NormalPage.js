import React from 'react'

import { Link } from 'react-router-dom'

const NormalPage = ({ header, children }) => (
  <main>
    <header>
      <h1>{header.title}</h1>
      <ul className="header-tab">
        <li><Link to={{ pathname: '/', state: {hello: 123123}  }}>MAIN</Link></li>
        <li><Link to={{ pathname: '/form', state: {hello: 123123}  }}>FORM</Link></li>
      </ul>
    </header>
    <hr/>
    <section>
      {children}
    </section>
  </main>
)

export default NormalPage
