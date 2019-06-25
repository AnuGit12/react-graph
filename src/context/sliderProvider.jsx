import React, { Component } from "react";

import SliderContext from "./sliderContext";

export default class SliderProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: [],
      sliderData: [],
      selected_dots: null,
      activeSliderName: '',
      selected_slider_data: {},
      selectedDropdown:{},
      ymax_arr:[],

    };

    this.data = [];
    this.ymax_arr=[];
  }

  setValueFromSlider = (sliderName, value) => {
    var slider_data = this.state.sliderData;
    var slider_val = slider_data.find(val => val[sliderName])
    let selected_slider_data = Object.assign({}, this.state.selected_slider_data);

    if (value) {
      slider_val[sliderName]['point1'] = value[0]
      slider_val[sliderName]['point2'] = value[1]
      slider_val[sliderName]['point3'] = value[2]
      slider_val[sliderName]['point4'] = value[3]
      slider_val[sliderName]['point5'] = value[4]

      selected_slider_data.name = sliderName
      selected_slider_data.point1 = value[0]
      selected_slider_data.point2 = value[1]
      selected_slider_data.point3 = value[2]
      selected_slider_data.point4 = value[3]
      selected_slider_data.point5 = value[4]
    }

    this.setState({ slider_data, selected_slider_data })
  }

  getDropdown = (mySelectedArray) => {
    console.log("mySelectedArray",mySelectedArray)
    this.setState({
      selectedDropdown: mySelectedArray
    })
  }

  //setting clicked dot's id in state to use in rowFunction
  //  set rowIndex of selected dot
  getRowFromClickOnGraphDot = (rowIndex) => {
    this.setState({ selected_dots: rowIndex })
  }

  updateState = (stateObj) => {
    this.setState(stateObj, () => {
        console.log('state updated', this.state);
    });
  };

  updateData = (receivedData) => {
    _.assign(this, receivedData);
  }

  render() {
    const { updateState, updateData, setValueFromSlider,
      getRowFromClickOnGraphDot, data ,getDropdown,ymax_arr} = this;

    return (
      <SliderContext.Provider value={
        { ...this.state, updateState, updateData, setValueFromSlider,
          getRowFromClickOnGraphDot, data, getDropdown ,ymax_arr}
      }>
        {this.props.children}
      </SliderContext.Provider>
    );
  }
}
