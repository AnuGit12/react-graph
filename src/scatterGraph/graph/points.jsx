import React from "react";

class Points extends React.Component {
  render() {
    var circles = this.props.data.map((d, i) => {
      return (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={d.fill}
          stroke={d.stroke}
        />
        // <div>point</div>
      );
    });
    return <g className="Points">{circles}</g>;
  }
}

export default Points;
