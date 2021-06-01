import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactCardFlip from "react-card-flip";
import ProgressBar from "@ramonak/react-progress-bar";
import { clearInterval } from "timers";

interface AppProps {
  cap: any;
}

interface AppState {
  time: any;
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export default class LoadingBar extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const item: any = ReactDOM.findDOMNode(this);
      setInterval(() => {
        const hasDisplayNone =
          window.getComputedStyle(item).display === "none" ||
          window.getComputedStyle(item).visibility === "hidden";
        if (isInViewport(item) && !hasDisplayNone) {
          this.setState({ time: 100 });
        } else {
          this.setState({ time: 0 });
        }
      }, 100);
    }, 100);
  }

  render() {
    return (
      <ProgressBar
        completed={this.state.time}
        transitionDuration={this.props.cap}
        isLabelVisible={false}
      />
    );
  }
}
