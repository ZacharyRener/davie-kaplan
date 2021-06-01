# Front-end Developer Toolkit
## Features:
React, DOM routing based on body class, SASS, Webpack, TypeScript, Babel
## Description:
Boilerplate for a SASS & React based workflow
## Usage
**1. Install the tool kit**

    git clone https://github.com/ZacharyRener/Front-End-Toolkit/
    cd Front-End-Toolkit
    npm install
     
**2. Compile**

    ./node_modules/.bin/webpack --watch

**3. Add it to your website**

    <script src="./Front-End-Toolkit/build/main.min.js"></script>
    
## Troubleshooting
**Make sure you have updated versions of Node and NPM**
    
    npm cache clean -f
    npm install -g n
    n latest
    
    npm install -g npm@latest


## For MIFW
    
    /* ============================ Adding to project: ============================ *

    <script src="{{ get_stylesheet_directory_uri() }}/assets/build/main.min.js"></script>
    
    /* ========================= Example React Rendering: ========================= *

    import React from 'react'
    import ReactDOM from 'react-dom'

    ReactDOM.render(
      <Example />,
      document.querySelector(".site-title a")
    )

    /* ====================  Example React Component: ============================= *

    import React, { Component } from 'react';

    interface AppProps {

    }

    interface AppState {

    }

    export default class Example extends Component<AppProps, AppState>  {

        constructor(props: any) {

            super(props)
            this.state = {}

        }

        render() {

            return (

                <div></div>

            );

        }

    }

    /* ======================================================================== */