import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';

interface AppProps {
    //code related to your props goes here
    title: any,
    back: any,
    arrowColor: any,
}

interface AppState {
    isFlipped: any, 
    backgroundImage: any,
}


export default class FlipCard extends Component<AppProps, AppState> {

    constructor(props) {

        super(props);

        this.state = {
            isFlipped: false,
            backgroundImage: '',
        };

        this.handleClick = this.handleClick.bind(this);

    }
   
    handleClick(e) {
      e.preventDefault();
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
   
    render() {

        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">

                <div onMouseEnter = {this.handleClick} >
                    <span className="title">{this.props.title}</span>
                    <span className={this.props.arrowColor}>
                        <i className="fal fa-chevron-right" aria-hidden="true"></i>
                    </span>
                </div>

                <div onMouseLeave = {this.handleClick} >  
                    <span className="title">Get Started</span>
                    <i className="fal fa-chevron-right" aria-hidden="true"></i>
                </div>

            </ReactCardFlip>
        )
    }

  }