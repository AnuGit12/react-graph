import React, { Component } from "react";
import { render } from "react-dom";
import { Card, Button, CardTitle, CardText, Label, Row, Col, InputGroup, FormGroup, Input, Form } from 'reactstrap';

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import SliderContext from '../context/sliderContext';
import { SliderRail, Handle, Track, Tick } from "./slider-component.js"; // example render components - source below
import './style.css'
const sliderStyle = {
  position: "relative",
  width: "100%"
};


class SliderRange extends Component {
  constructor() {
    super();
    this.state = {
      checked: "",
      point1: undefined,
      point2: undefined,
      point3: undefined,
      point4: undefined,
      point5: undefined,
      min: undefined,
      max: undefined,
      border1:'',
      border2:'',
      border3:'',
      border4:'',
      border5:''


    };

    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var sliderData = _.values(nextProps.propsData)[0],
        stateObj = {};

    _.each(sliderData, (value, key) => {
      if(_.isNil(prevState[key]) && prevState[key] !== value) {
        stateObj[key] = value;
      }
    });

    if (_.size(_.keys(stateObj))) {
      return stateObj;
    }
    return null;
  }

  handleChange = (e) => {
    e = e.map(function (each_element) {
      return Number(each_element.toFixed(5));
    });
    var new_slider_data = e;
    var inputValueData = {};
    _.each(e, (val, i) => {
      inputValueData['point' + (i+1)] = val
    });

    this.setState(inputValueData);
    this.context.setValueFromSlider(Object.keys(this.props.propsData)[0], new_slider_data);

  }

  handleChangeSlide(e) {
    this.setState({
      checked: e.target.value,
    })
    this.context.updateState({ activeSliderName: Object.keys(this.props.propsData)[0] })
    // this.props.selectedSliderData(e.target.value)
  }
  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
     if (!/^-?\d*\.?\d{0,6}$/.test(keyValue))
       event.preventDefault();
   }


  getcolor(id) {
    if (id == '$$-0-$$-1') {
      return "first"
    } else if (id == "$$-1-$$-2") {
      return "second"
    } else if (id == "$$-2-$$-3") {
      return "third"
    } else if (id == "$$-3-$$-4") {
      return "four"
    } else {
      return "five"
    }
  }

  setInputValue(event, pointName) {

    
    var value = event.target.value;
    // var p1 = this.state.point1

    // const value =  this.state[pointName],
          // sliderName = Object.keys(propsData)[0]

          // console.log("++++", sliderName)
      console.log("Pointsmane",pointName)
   
    if(pointName=='point1'){
      console.log("inside input1>>>>>>>>>>>>>>>",this.state.point1,this.state.point2,this.state.min)

  
      if(value >=this.state.point2 || value <= this.state.min){
        console.log('inside first')
        this.setState({
          border1:'1px solid red',
          // point1:p1
        })
      }else{
        this.setState({
          border1:''
        })
      }
    }
    if(pointName=='point2'){
      console.log("inside input2>>>>>>>>>>>>>>>|||||||||||||||||||||||||",this.state.point2,this.state.point3,value)

    if(value >=this.state.point3 || value <= this.state.point1){
      console.log('inside second')
      this.setState({
        border2:'1px solid red'
      })
    }else{
      this.setState({
        border2:''
      })
    }
  }
  if(pointName=='point3'){
    // console.log("inside input2>>>>>>>>>>>>>>>|||||||||||||||||||||||||",this.state.point2,this.state.point3,value)

  if(value >=this.state.point4 || value <= this.state.point2){
    console.log('inside second')
    this.setState({
      border3:'1px solid red'
    })
  }else{
    this.setState({
      border3:''
    })
  }
}
if(pointName=='point4'){
  // console.log("inside input2>>>>>>>>>>>>>>>|||||||||||||||||||||||||",this.state.point2,this.state.point3,value)

if(value >=this.state.point5 || value <= this.state.point3){
  console.log('inside fourt')
  this.setState({
    border4:'1px solid red'
  })
}else{
  this.setState({
    border4:''
  })
}
}
if(pointName=='point5'){
  // console.log("inside input2>>>>>>>>>>>>>>>|||||||||||||||||||||||||",this.state.point2,this.state.point3,value)

if(value >=this.state.max || value <= this.state.point4){
  console.log('inside second')
  this.setState({
    border5:'1px solid red'
  })
}else{
  this.setState({
    border5:''
  })
}
}
  



    
    console.log("name of the input",event.target.name)
    var sliderData = this.context.sliderData;
    var sliderName = Object.keys(this.props.propsData)[0]
    // this.setSliderValueFromInput(pointName)

    this.setState({ [pointName]: value });
  }

  setSliderValueFromInput(pointName) {
    console.log("pointName",pointName)
    console.log("pointName",this.state[pointName])
    
    const value =  this.state[pointName],
          sliderName = _.keys(this.props.propsData)[0];
          console.log("+++++++",value, sliderName)
          console.log("sliderName___",value)

    var sliderData = this.context.sliderData;
    var currentSliderData = _.find(sliderData, data => {
      // console.log(sliderData,"?WWE")
      return _.keys(data)[0] === sliderName;
    });
    console.log("value+++++++",currentSliderData[sliderName][pointName])
    currentSliderData[sliderName][pointName] = value;

    this.context.updateState({ sliderData });
  }

  render() {
    const { propsData } = this.props;
    let selectedClass;
    let count = 0;
    var i;
    const domain = [Object.values(propsData)[0].min, Object.values(propsData)[0].max];
    const defaultValues = [Object.values(propsData)[0].point1, Object.values(propsData)[0].point2, Object.values(propsData)[0].point3, Object.values(propsData)[0].point4, Object.values(propsData)[0].point5];

    return (
      <SliderContext.Consumer>
        {context => (
          <div style={Object.keys(propsData)[0]=="Ymax" ? {display:'none'}:{display:'block'}}>
            <div style={{ margin: "5%", height: 120, width: "85%" }}>
              <Row >
                <h5>{Object.keys(propsData)[0]}</h5>
  
                <InputGroup size="sm" style={{ width: '80px', marginLeft: '120px', marginBottom: '5px' }}>
                  <Input name="input1" type="number" onKeyPress={this.onKeyPress.bind(this)} disabled={context.activeSliderName != Object.keys(propsData)[0]} value={this.state.point1}
                   style={{border:this.state.border1}}
                   onChange={(e) => this.setInputValue(e, 'point1')}
                   onBlur={() => this.setSliderValueFromInput('point1')}
                    />
                </InputGroup>
                <InputGroup size="sm" style={{ width: '80px', marginLeft: '10px', marginBottom: '5px' }}>
                  <Input name="input2" type="number" onKeyPress={this.onKeyPress.bind(this)} disabled={context.activeSliderName != Object.keys(propsData)[0]} value={this.state.point2}
                    style={{border:this.state.border2}}
                    onChange={(e) => this.setInputValue(e, 'point2')}
                    onBlur={() => this.setSliderValueFromInput('point2')} />
                </InputGroup>
                <InputGroup size="sm" style={{ width: '80px', marginLeft: '10px', marginBottom: '5px' }}>
                  <Input name="input3" type="number" onKeyPress={this.onKeyPress.bind(this)} disabled={context.activeSliderName != Object.keys(propsData)[0]} value={this.state.point3}
                    style={{border:this.state.border3}}
                   onChange={(e) => this.setInputValue(e, 'point3')}
                    onBlur={() => this.setSliderValueFromInput('point3')} />
                </InputGroup>
                <InputGroup size="sm" style={{ width: '80px', marginLeft: '10px', marginBottom: '5px' }}>
                  <Input name="input4" type="number" onKeyPress={this.onKeyPress.bind(this)} disabled={context.activeSliderName != Object.keys(propsData)[0]} value={this.state.point4}
                     style={{border:this.state.border4}}
                    onChange={(e) => this.setInputValue(e, 'point4')}
                    onBlur={() => this.setSliderValueFromInput('point4')} />
                </InputGroup>
                <InputGroup size="sm" style={{ width: '80px', marginLeft: '10px', marginBottom: '5px' }}>
                  <Input name="input5" type="number" onKeyPress={this.onKeyPress.bind(this)} disabled={context.activeSliderName != Object.keys(propsData)[0]} value={this.state.point5}
                    style={{border:this.state.border5}}
                   onChange={(e) => this.setInputValue(e, 'point5')}
                    onBlur={() => this.setSliderValueFromInput('point5')} />
                </InputGroup>
              </Row>
              <div>
                <Row>
  
                  <Col sm='1' className="chkBtn">
                    <FormGroup check>
                      <Label check>
                        <Input type="radio"
                          name="checkbox"
                          value={Object.keys(propsData)[0]}
                          onChange={e => this.handleChangeSlide(e)}
                          onClick={this.handleChangeSlide.bind(this)} />
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col sm='11' style={{ marginLeft: "50px" }}>
                    <Row>
                      <Col sm='1'>
                        <InputGroup size="sm" style={{ width: '70px', marginLeft: '5px' }}>
                          <Input name="input" type="number" onKeyPress={this.onKeyPress.bind(this)} disabled={context.activeSliderName != Object.keys(propsData)[0]} value={this.state.min}
                            onChange={(e) => this.setInputValue(e, 'min')}
                            onBlur={() => this.setSliderValueFromInput('min')} />
                        </InputGroup>
                      </Col>
                      <Col sm='9'
                        style={{ marginLeft: '40px', width: '100%'}}
                      >
                        <Slider
                          mode={2}
                          step={.01}
                          // domain={[Object.values(propsData)[0].point1.min, Object.values(propsData)[0].point1.max]}
                          domain={domain}
                          rootStyle={sliderStyle}
                          onUpdate={this.onUpdate}
                          onChange={this.handleChange}
                          values={defaultValues}
                          // disabled={context.activeSliderName != Object.keys(propsData)[0]}
                        >
                          <Rail>
                            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                          </Rail>
                          <Handles>
                            {({ handles, getHandleProps }) => (
                              <div className="slider-handles">
                                {handles.map(handle => (
                                    <Handle
                                      key={handle.id}
                                      handle={handle}
                                      domain={domain}
                                      getHandleProps={getHandleProps}
                                    />
                                ))}
                              </div>
                            )}
                          </Handles>
                          <Tracks left={false} right={false}>
                            {({ tracks, getTrackProps }) => (
                              <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                  <div className={this.getcolor(id)}>
  
                                    <Track
                                      key={id}
                                      source={source}
                                      target={target}
  
  
                                      getTrackProps={getTrackProps}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </Tracks>
  
                          <Ticks count={10}>
                            {({ ticks }) => (
                              <div className="slider-ticks">
                                {ticks.map(tick => (
                                  <Tick key={tick.id} tick={tick} count={ticks.length} />
  
                                ))}
                              </div>
                            )}
                          </Ticks>
                        </Slider>
                      </Col>
                      <Col sm='1'>
                        <InputGroup size="sm" style={{ width: '70px' }}>
                          <Input name="input" type="number" onKeyPress={this.onKeyPress.bind(this)} disabled={context.activeSliderName != Object.keys(propsData)[0]} value={this.state.max}
                            onChange={(e) => this.setInputValue(e, 'max')}
                            onBlur={() => this.setSliderValueFromInput('max')} />
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
            </div>
          )}
      </SliderContext.Consumer>
    );
  }
}

SliderRange.contextType = SliderContext;


export default SliderRange