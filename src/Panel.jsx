import React from 'react';
import { Card, Button,FormGroup,ListGroup, ListGroupItem, Label, Modal, ModalHeader, ModalBody, ModalFooter,Row, Col, InputGroup, InputGroupAddon, Input, Form, Table } from 'reactstrap';

import './style.css'
import TableData from './table.jsx';
import { Api } from './utils/api';

import Papa from 'papaparse';


import SliderContext from './context/sliderContext';

import * as _ from 'lodash';


class Panel extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      processing: false,
      input: '',
      output: '',
      constraint: '',
      ymax_arr: [],
      selected_slider_data: [],
      selected_dots: [],
      modal1:false,
      save:[],
      button_text:'Validate'

    };

    this.data = [];
    this.saved_state=[];

    this.ymaxFinalData=[];
    this.updateData = this.updateData.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);

    this.saveState = this.saveState.bind(this);
    this.openState = this.openState.bind(this);
    this.getClickedState = this.getClickedState.bind(this);

  }
  changeText = (text) => {

    this.setState({ text }); 
  } 
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  toggle1() {
    this.setState(prevState => ({
      modal1: !prevState.modal1
    }));
    this.openState()
  }

  // getting dropdown values from graph panel
  getDropdownValue=(value)=>{
    console.log("dropdon value",value)
  }

  handleChangeModal=(e)=>{
    this.state_name = e.target.value
    
  }

  openState = (e) =>{
    // e.preventDefault();
    Api.getData()
    .then((response) => {
      console.log("response from flask", typeof(response))
      console.log("response from flask", (response[0].data))
      // for (var i = 0; i < response[0].data.length; i++) {
      //   saved_state.push(response[0].data[i]);
    // }
    //   // this.saved_state = response[0].data
    //   console.log("array",saved_state)
      this.setState({
        save:response
      })
      // response[0].data.map((item,key)=>{
      //   console.log("ttttt>>>",item)
      // })
  
    })
    .catch((error) => {
      console.log("error")
    })
  
  
  }

  //Save State button function

  saveState = (e) =>{
    e.preventDefault();
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    // const data = new FormData();
    // data.append('file', this.filesInput.files[0]);
    // console.log(">L",data)
  
    var saved_state_name = this.state_name
    // var tableData=this.data
    // console.log("tableData", tableData)
    var slidersData=this.context.sliderData
    console.log(slidersData)
    var sliderD = JSON.stringify(slidersData)
    // console.log("slider data", slidersData)
  
    var sliderD = sliderD.replace(/\\/g, "");
    
  
  
  
    var dropdownData=this.context.selectedDropdown
    console.log("dropdown values",dropdownData.selectedDropdown['1'])
    var dropdown1 = dropdownData.selectedDropdown['1']
    var dropdown2 = dropdownData.selectedDropdown['2']
  
    var input = this.state.input
    var output = this.state.output
    var constraint = this.state.constraint
  
    console.log("INPUT VALUES",input, output, constraint)
    const data = new FormData();
      data.append('file', this.filesInput.files[0]);
      data.append('state_name', saved_state_name);
      data.append('input', input);
      data.append('output', output);
      data.append('constraint', constraint);
      data.append('dropdown1', dropdown1);
      data.append('dropdown2', dropdown2);
      data.append('slidersData',sliderD)
  
    
      // data
    // var other_data = {'h':this.filesInput.files[0],'state_name':saved_state_name,'input':input,'output':output,'constraint':constraint,"dropdown":dropdownData}
  
    // console.log("filename",this.csvfile)
    // var promises = [Api.setTableData(data),Api.setSliderData(slidersData),Api.setOtherData(data)]
    var promises = [Api.setOtherData(data)]
  
    // Promise.all(promises)
    // .then((response) => {
  
    // })
    // .catch((error) => {
  
    // })
  }


  //Submit button function
  handlesubmit = (event) => {
    event.preventDefault()
    
    var input = parseInt(this.state.input)
    var output = parseInt(this.state.output)
    var constraint = parseInt(this.state.constraint)
    var length = this.context.key.length
    var ymax_arr = []
    var totalVal = input + output + constraint
    let arr_final = []

    if (totalVal == length) {
      alert("validated !!")
      for (let i = 1; i <= input; i++) {
        arr_final.push("X" + i)
      }
      for (let i = 1; i <= output; i++) {
        arr_final.push("Y" + i)
        ymax_arr.push("Y" + i)
      }
      for (let i = 1; i <= constraint; i++) {
        arr_final.push("C" + i)
      }
      this.context.updateData({ ymax_arr })
      this.context.updateState({ key: arr_final });

      this.setState({
        processing: true,
        button_text:"Validated"
      }, () => {
        var temp_data = [];
        const getMatrixColumn = (arr, n) => _.map(arr, x => x[n]);

        // setTimeout(() => {
          _.forEach(arr_final, (a, j) => {
            var x1, x2, Xrange, x1_1, x1_2, x1_3, x1_4, x1_5,x1_min,x2_max

            var columnArray = getMatrixColumn(this.data, j);
            console.log("temp-data-is-here",columnArray)
            x1 = _.floor(_.min(columnArray), 6);   //getting min value of slider
            console.log("temp-data-is-here",x1)
            x2 = _.floor(_.max(columnArray), 6); 
            console.log("temp-data-is-here",x2)
              //getting max value of slider
            Xrange = _.floor((x2 - x1), 6);
            console.log("temp-data-is-hereXrangw",Xrange)
            x1_min = x1 - 0.1*(x2 - x1)
            x2_max = x2 + 0.1*(x2 - x1)
            // console.log("@@@",x1,x2,Xrange)
            x1_1 = x1 + 0.1 * Xrange;  //setting slider handle points values
            console.log("temp-data-is-herex1_1",x1_1)
            x1_2 = x1 + 0.3 * Xrange;  //setting slider handle points values
            console.log("temp-data-is-herex1_2",x1_2)

            x1_3 = x1 + 0.5 * Xrange;  //setting slider handle points values
            x1_4 = x1 + 0.7 * Xrange;  //setting slider handle points values
            x1_5 = x1 + 0.9 * Xrange;  //setting slider handle points values
            temp_data.push({
              [a]: {
                "min": x1_min,
                "max": x2_max,
                "point1": x1_1,
                "point2": x1_2,
                "point3": x1_3,
                "point4": x1_4,
                "point5": x1_5
              }
            });
            console.log("temp-data-is-here",temp_data)
          });


          this.setState({ processing: false });
          this.context.updateState({ sliderData: temp_data });

      })

    } else {
      alert("Can not be validate! Please check your inputs values!!")
    }
  }

  handleChange = event => {
    this.csvfile = event.target.files[0];
    console.log("file from input",event.target.files[0])
  };

  //parsing csv file
  importCSV = () => {
    this.setState({ processing: true });
    

    const { csvfile } = this;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: false
    });
  };

  updateData(result) {
    // console.log("data oip",this.ymaxFinalData)

    var data = result.data,
      len = parseInt(data[0].length),
      arr = [];
    // data.map((item,key)=>{
    //   // item.push(this.ymaxFinalData[key])
    // })

    for (var i = 1; i <= len; i++) {
      arr.push(i)
    };
    console.log("data is here",data)

    this.data = data;
    this.context.updateData({ data });
    this.context.updateState({ key: arr });

    this.setState({
      processing: false
    })
  }

  getClickedState=(id)=>{
    console.log("::::::***",id)
    Api.openClickedState(id)
    .then((response) => {
      //  console.log("mmmm",response[0].data.input_d,response[0].data.output,response[0].data.constraint)
      this.csvfile = response.filename;
      this.setState({
        input:response.input_d,
        output:response.output,
        constraint:response.constraint
    })

    console.log("csv file name",this.state.csvfile)
    this.importCSV()
    })
    .catch((error) => {
      console.log("error in clicked")
    })
    this.toggle1()
    console.log("file----", this.state.csvfile)
    // this.importCSV()
  }

  render() {
    var contentMarkup = null;
    console.log(this.context.selected_dots, 'selected_dots');
    var contentMarkup;
    var getClickedState=(id)=>{
      console.log("::::::***",id)
      var promises = [Api.openClickedState(id)]
      Promise.all(promises)
      .then((response) => {
         console.log("mmmm",response)
      //   this.setState({
      //     csvfile:response[0].data.filename,
      //     input:response[0].data.input_d,
      //     output:response[0].data.output,
      //     constraint:response[0].data.constraint
          

      // })
      // console.log("csv file name",this.state.csvfile)
      // this.importCSV()

        
      })
      .catch((error) => {
        console.log("error in clicked")
      })
      this.toggle1()
      console.log("file----", this.state.csvfile)
      // this.importCSV()
    }

    if (this.state.processing) {
      contentMarkup = (
        <div className="spinner tblscrl">
          <div className="lds-roller">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
      )
    }
    else if (this.data.length) {
      contentMarkup = (
        <div className="tblscrl">
          <Table bordered>
            <thead style={{ backgroundColor: '#80bfff', borderColor: '#333' }}>
              <tr>
                <th>#</th>
                {/* {this.context.key.map((item) => {
                    return item === 'Ymax' ? null : <th>{item}</th>
                  }
                )} */}
                {this.context.key.map((item) => <th>{item}</th>)}
              </tr>
            </thead>
            <TableData data={this.data} selected_row={this.context.selected_dots} />
          </Table>
        </div>
      )
    }

    return (
      <Row className="panelContainer">
        <Col md="12">
          <Card body outline >
            <div className="App">
              <div>
                <h4>Import moga file</h4>
                <Row style={{ marginBottom: '15px' }}>
                <form>
                  <input className="csv-input"
                    type="file"
                    ref={input => {
                      this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                    style={{ marginLeft: '15px' }}
                  />
                  
                  <p />
                  <Button  color="success" onClick={this.importCSV} style={{ marginLeft: '15px' }} size="sm">Submit</Button>{' '}
                  <Button  color="warning" name="save" style={{ marginLeft: '15px' ,color:"#fffff"}} onClick={this.toggle} size="sm">Save File</Button>{' '}
                  <Button  color="warning" name="open" style={{ marginLeft: '15px' }} onClick={this.toggle1} size="sm">Fetch Save Data</Button>
                  </form>
                  </Row>
                <Form >
                  <Row>
                    <InputGroup size="sm" style={{ width: '25%', marginLeft: '15px' }}>
                      <InputGroupAddon addonType="prepend">No of Input</InputGroupAddon>
                      <Input name="input" onChange={e => this.setState({ input: e.target.value,button_text:"Validate" })} value={this.state.input}/>
                    </InputGroup>
                    <InputGroup size="sm" style={{ width: '25%', marginLeft: '15px' }}>
                      <InputGroupAddon addonType="prepend">No of Output</InputGroupAddon>
                      <Input name="output" onChange={e => this.setState({ output: e.target.value ,button_text:"Validate" })} value={this.state.output}/>
                    </InputGroup>
                    <InputGroup size="sm" style={{ width: '25%', marginLeft: '15px' }}>
                      <InputGroupAddon addonType="prepend">No of Constraints</InputGroupAddon>
                      <Input name="constraints" onChange={e => this.setState({ constraint: e.target.value ,button_text:"Validate" })} value={this.state.constraint}/>
                    </InputGroup>
                    <Button onClick={e => this.handlesubmit(e)} outline type="submit" color="success" style={{ marginLeft: '15px' }} size="sm">{this.state.button_text}</Button>
                  </Row>
                </Form>
              </div>
              {contentMarkup}
              {
                _.size(this.context.lassoSelectedRows) ?
                <div className="tblscrl">
                  <h5>Lasso table</h5>
                  <Table bordered>
                    <thead style={{ backgroundColor: '#80bfff', borderColor: '#333' }}>
                      <tr>
                        <th>#</th>
                        {/* {this.context.key.map((item) => {
                            return item === 'Ymax' ? null : <th>{item}</th>
                          }
                        )} */}
                {this.context.key.map((item) => <th>{item}</th>)}

                      </tr>
                    </thead>
                    <TableData
                      data={_.filter(this.context.data, (d, i) => {
                        return (_.includes(this.context.lassoSelectedRows, i))
                      })}
                      selected_row={this.context.selected_dots} />
                  </Table>
                </div> : null
              }
            </div>
          </Card>
        </Col>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Save file</ModalHeader>
          <ModalBody>
          <FormGroup row>
          <Label for="exampleEmail" sm={4}>File name :</Label>
          <Col sm={8}>
            <Input type="text" name="text" id="save-state" placeholder="File name" onChange={this.handleChangeModal}/>
          </Col>
        </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.saveState}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modal1} toggle={this.toggle1} className={this.props.className}>
          <ModalHeader toggle={this.toggle1}>Open file</ModalHeader>
          <ModalBody>
          <ListGroup>
                {
                  this.state.save.map((item, i) => {
                    return( 
                    <ListGroupItem key={i}>{item}
                      <div style={{float:'right'}} >
                        <Button color="warning" onClick={() => this.getClickedState(item)}>Open</Button>{' '}
                        <Button color="danger">Delete</Button>{' '}
                      </div>
                    </ListGroupItem>
                    )
                  })
                }
              </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle1}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Row>
    )
  };
};

Panel.contextType = SliderContext;

export default Panel;