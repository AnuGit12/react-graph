import React from "react";

import { GoldenLayoutComponent } from "./golden-layout/golden-layout";

import SliderContext from "./context/sliderContext.js";
import SliderProvider from "./context/sliderProvider.jsx";

import Panel from "./Panel.jsx";
import GraphMoga from './scatterGraph/graph.jsx';
import Slider from './slider/slider';

import './style.css';


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitialState = () => {
    return { value: this.props.value || "bla" };
  };

  setValue = e => {
    this.setState({ value: e.target.value });
  };

  setContainerTitle = () => {
    this.props.glContainer.setTitle(this.state.value);
  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.setValue} />
        <button onClick={this.setContainerTitle}>set title</button>
        <div>{this.props.value}</div>
      </div>
    );
  }
}

class SliderList extends React.Component {
  render() {
    return (
      <div className="panelContainer">
        {this.context.sliderData.map((item,i) => {
          // fix propsData
          return <Slider propsData={item} key={i} />
        })}
      </div>
    )
  }
}

SliderList.contextType = SliderContext;

class PanelLayout extends React.Component {
  render() {
    return (
      <SliderProvider>
        <GoldenLayoutComponent
          htmlAttrs={{ style: { height: "100vh", width: "100%" } }}
          config={{
            content: [
              {
                type: "row",
                content: [
                  {
                    title: "Import moga files",
                    type: "react-component",
                    component: "leftPanel",
                  },
                  {
                    type: "column",
                    content: [
                      {
                        title: "Graph",
                        type: "react-component",
                        component: "graphMoga",
                      },
                      {
                        title: "User Graph",
                        type: "react-component",
                        component: "testItem",
                        // props: { value: "I'm on the right" }
                      },
                      {
                        title: "Settings",
                        type: "react-component",
                        component: "sliderRange",
                      }
                    ]
                  }
                ]
              }
            ]
          }}
          registerComponents={myLayout => {
            myLayout.registerComponent("testItem", GraphMoga);
            myLayout.registerComponent("leftPanel", (container) => {
              return <Panel container={container.glContainer} />
            });
            myLayout.registerComponent("graphMoga", GraphMoga);
            myLayout.registerComponent("sliderRange", SliderList);
          }}
        />
      </SliderProvider>
    );
  }
}

PanelLayout.contextType = SliderContext;

export default PanelLayout;
