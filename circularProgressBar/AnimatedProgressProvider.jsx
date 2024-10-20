import React from "react";
import { Animate } from "react-move";
import { easeLinear } from "d3-ease"; // Import linear easing function

class AnimatedProgressProvider extends React.Component {
  interval = undefined;

  state = {
    isAnimated: false
  };

  static defaultProps = {
    valueStart: 0
  };

  componentDidMount() {
    // Start the animation immediately after mounting
    this.setState({
      isAnimated: true
    });

    if (this.props.repeat) {
      this.interval = window.setInterval(() => {
        this.setState(prevState => ({
          isAnimated: !prevState.isAnimated
        }));
      }, this.props.duration * 1000); // Ensure the interval is in milliseconds
    }
  }

  componentWillUnmount() {
    if (this.props.repeat) {
      window.clearInterval(this.interval);
    }
  }

  render() {
    return (
      <Animate
        start={() => ({
          value: this.props.valueStart
        })}
        update={() => ({
          value: this.state.isAnimated ? this.props.valueEnd : this.props.valueStart,
          timing: {
            duration: this.props.duration * 1000, // Ensure the duration is in milliseconds
            ease: this.props.easingFunction || easeLinear // Default to linear easing for consistency
          }
        })}
      >
        {({ value }) => this.props.children(value)}
      </Animate>
    );
  }
}

export default AnimatedProgressProvider;
