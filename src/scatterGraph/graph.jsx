//import * as d3 from 'd3';
import React from 'react';
import './style.css'
import {  Row, Col,Button, ButtonGroup} from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem , UncontrolledButtonDropdown,Label} from 'reactstrap';
import SliderContext from '../context/sliderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faSearchPlus, faSearchMinus, faMousePointer, faArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import domtoimage from 'dom-to-image';
import Scatterplot from './graph/scatterplot.jsx';


class GraphMOga extends React.PureComponent {
    constructor(props){
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        data: [],
        dropdownOpen: false,
        selectValue1: ' ',
        selectValue2: ' ',
        yValue:[],
        xValue:[],
        sValue:[],
        slider_col:[]
      }
      this.data = [];
      const dur = Math.floor(Math.random() * 500 + 1000)
      this.ymaxColumn=[]
      this.ymaxFinalData=[]
      this.transition = d3.transition().duration(dur).ease(d3.easeCubicInOut);

    }

    setGraphData = () => {
      const { xValue, yValue } = this.state;
      var slider_col = [],
          index_of_slider;

      if (this.context.activeSliderName == 'Ymax') {
        slider_col = this.ymaxFinalData;
      }
      else {
        index_of_slider = (this.context.key).indexOf(this.context.activeSliderName);
        this.context.data.map((item, key) =>{
          slider_col.push(item[index_of_slider])
        });
      }

      if(_.size(slider_col)) {
        let temp_data= xValue.map((x, i) => ({ x, y: yValue[i]}));
        var graphdatanew = temp_data.map((obj,i)=> ({ ...obj, 'row_id': i }))
        if(this.context.data){
          if (this.context.activeSliderName == 'Ymax') {
            graphdatanew.map((val,i) =>{ val.slider_col = slider_col[i]});
          }
          else {
            graphdatanew.map((val,i) =>{ val.slider_col = this.context.data[i][index_of_slider]});
          }
        }
  
       var slider_val =this.context.sliderData.find(val => val[this.context.activeSliderName]);
        if (slider_val) {
          var point1= Object.values(slider_val)[0].point1
          var point2= Object.values(slider_val)[0].point2
          var point3= Object.values(slider_val)[0].point3
          var point4= Object.values(slider_val)[0].point4
          var point5= Object.values(slider_val)[0].point5
  
          graphdatanew.map(val => {
            if (val.slider_col>point1 && val.slider_col<point2 ){
              return val.fill='#0BAF17';
            }else if(val.slider_col>point2 && val.slider_col<point3){
              return val.fill='#276FDA'
            }else if(val.slider_col>point3 && val.slider_col<point4){
              return val.fill='#FFA620'
            }else if(val.slider_col>point4 && val.slider_col<point5){
              return val.fill='#FF0000'
            }else{
              return val.fill='black'
            }
          })
        }
  
        if (_.size(this.state.xValue) && _.size(this.state.yValue)) {
          this.data = graphdatanew;
        }
        if (this.state.selectValue1) {
          this.xDomain = [_.min(this.state.xValue), _.max(this.state.xValue)]
        }
        if (!this.state.selectValue2) {
          this.yDomain = [_.min(this.state.yValue), _.max(this.state.yValue)]
        }
      }
  }
   
    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    };

    handleChange1 =(e) =>{
      let x=[]
        var len1 = this.context.key.indexOf(e.currentTarget.textContent)
        this.context.data.map((item, key) =>
            x.push(item[len1])
        )
        this.setState({
          selectValue1:e.currentTarget.textContent,
          xValue: _.map(x, val => Number(val))
      }, () => {
        // this.setData()

        });
        this.context.getDropdown({ selectedDropdown: {1: e.currentTarget.textContent, 2: this.state.selectValue2 } })

      };
    
    handleChange2 =(e) =>{
      let y=[]
      var len2 = this.context.key.indexOf(e.currentTarget.textContent)
      this.context.data.map((item, key) =>
        y.push(item[len2])
        )
       this.setState({
        selectValue2:e.currentTarget.textContent,
        yValue: _.map(y, val => Number(val))
    }, () => {
        // this.setData()
      });
      this.context.getDropdown({ selectedDropdown: {1: this.state.selectValue1, 2: e.currentTarget.textContent } })
 
  };


 //////////////////////////////////////////////////////////////////  To calculate Ymax /////////////////////////////////////////////////////////////

 YmaxCall =()=>{
  var ySlider =  this.context.ymax_arr
  var ymaxData =[]
  var temp_data = []
  console.log("this.context.sliderData",typeof(this.context.sliderData))
  
  console.log("from ymax",ySlider)
  for (var j=0;j<this.context.ymax_arr.length; j++){
    var k, yhandle1, yhandle2 , current_value
    var addition_term
    var multiplication_term

       var ydata = []
        var len2 = this.context.key.indexOf( this.context.ymax_arr[j])
        this.context.data.map((item, key) =>{
          current_value = item[len2]
          // console.log("this.context.sliderDatagraph",typeof(this.context.sliderData))
          var slider_val = this.context.sliderData.find(val => val[ySlider[j]]);
          var yslider_p1 = slider_val[ySlider[j]].point1
          var yslider_p2 = slider_val[ySlider[j]].point2
          var yslider_p3 = slider_val[ySlider[j]].point3
          var yslider_p4 = slider_val[ySlider[j]].point4
          var yslider_p5 = slider_val[ySlider[j]].point5
          var ymin = slider_val[ySlider[j]].min
          var ymax = slider_val[ySlider[j]].max
          if (item[len2]<yslider_p1){
            k=1
            yhandle1= ymin
            yhandle2 = yslider_p1
            
          }else if(item[len2]>yslider_p1 && item[len2]<yslider_p2){
            k=2
            yhandle1= yslider_p1
            yhandle2 = yslider_p2
          }else if(item[len2]>yslider_p2 && item[len2]<yslider_p3){
            k=3
            yhandle1= yslider_p2
            yhandle2 = yslider_p3
          }else if(item[len2]>yslider_p3 && item[len2]<yslider_p4){
            k=4
            yhandle1= yslider_p3
            yhandle2 = yslider_p4
          }else if(item[len2]>yslider_p4 && item[len2]<yslider_p5){
            k=5
            yhandle1= yslider_p4
            yhandle2 = yslider_p5
          }else if(item[len2]>yslider_p5){
            k=6
            yhandle1= yslider_p5
            yhandle2 = ymax
          }
          
          if(k==1){
            addition_term=0
            multiplication_term=0.1
          }else if(k==2){
            addition_term=0.1
            multiplication_term=0.2
          }else if(k==3){
            addition_term=0.3
            multiplication_term=0.2
          }else if(k==4){
            addition_term=0.5
            multiplication_term=0.2
          }else if(k==5){
            addition_term=0.7
            multiplication_term=0.2
          }else if(k==6){
            addition_term=0.9
            multiplication_term=0.1
          }

          var y_max_value = addition_term + multiplication_term*((current_value - yhandle1)/(yhandle2-yhandle1))
          ydata.push(y_max_value)
        }
      )
    
    ymaxData = ymaxData.slice()
    ymaxData.push(ydata)
}
var final_ymax_col =[]
for(var j=0; j<ymaxData[0].length;j++){
  var data_y1=[]
   ymaxData.map((item,key)=>{
               data_y1.push(ymaxData[key][j])
        })
        var ymax_value = parseFloat((Math.max.apply(Math,data_y1.map(Number))).toFixed(6))
        final_ymax_col.push(ymax_value)

      }
      this.ymaxFinalData= final_ymax_col
      // console.log("y@@",final_ymax_col)
//       this.context.data.map((item,key)=>{
//       item.push(this.ymaxFinalData[key])
// })
    // this.ymaxColumn = 
    var ymax_min = _.floor(_.min(final_ymax_col), 6);   //getting min value of slider
    var ymax_max = _.floor(_.max(final_ymax_col), 6);   //getting max value of slider
    var Ymax_Xrange = _.floor((ymax_max - ymax_min), 6);
    var ymax_1 = ymax_min + 0.1 * Ymax_Xrange;  //setting slider handle points values
    var ymax_2 = ymax_min + 0.3 * Ymax_Xrange;  //setting slider handle points values
    var ymax_3 = ymax_min + 0.5 * Ymax_Xrange;  //setting slider handle points values
    var  ymax_4 = ymax_min + 0.7 * Ymax_Xrange;  //setting slider handle points values
    var  ymax_5 = ymax_min + 0.9 * Ymax_Xrange;  //setting slider handle points values
      temp_data.push({
        ["Ymax"]: {
          "min": ymax_min-0.1*(ymax_max-ymax_min),
          "max": ymax_max+0.1*(ymax_max-ymax_min),
          "point1": ymax_1,
          "point2": ymax_2,
          "point3": ymax_3,
          "point4": ymax_4,
          "point5": ymax_5
        }
      });
      // this.context.selected_slider_data
      this.context.updateState({ selected_slider_data: {name: "Ymax", point1: ymax_1, point2: ymax_2, point3: ymax_3, point4: ymax_4,point5: ymax_5} });
      var joined = this.context.sliderData.concat(temp_data);
      // this.setState({ myArray: joined })
      this.context.updateState({ sliderData: joined, activeSliderName: 'Ymax' });

      console.log("temp data value from ymax", temp_data)
      console.log("context data",this.context)
      console.log("this.ymaxFinalData",this.ymaxFinalData)
      // this.ymaxFinalData is the final data like [0.951996, 0.952867, 0.952867, 0.947611, 0.697273, 0.476277, 0.952867, 0.952867, 0.952867, 0.952867, 0.952867, 0.952867, 0.908956, 0.735594, 0.697273, 0.694955, 0.908956, 0.694955, 0.951996]
      //in case of ymax slider selected from buttons, circle color will be  based on this ymaxFinalData value
      // so in that case (d.slider_col>point1 && d.slider_col<point2 )
      //slider_col will be the value form array in ymaxfinalData and points will be ymax points
      }


        downloadGraphImage=()=>{
      console.log("PP+",document.getElementById('my-chart'))
    domtoimage.toBlob(document.getElementById('my-chart'))
    .then(function (blob) {
        window.saveAs(blob, 'new-moga-plot.png');
    });

        }
    qaz() {
        var mySelectedArray = [];

        var graphData = this.state.data;
        var clickDot = (d) =>{
         this.context.getRowFromClickOnGraphDot(d)
      }

        var graphdatanew = graphData.map((obj,i)=> ({ ...obj, 'row_id': i }))
         if(this.context.data){
           
           console.log("slider column values in component did update",index_of_slider)
          graphdatanew.map((val,i) =>{ val.slider_col = this.context.data[i][index_of_slider],console.log("mkp",this.context.data[i])})
        }
        var slider_val =this.context.sliderData.find(val => val[this.context.activeSliderName]);
        if (slider_val) {
          var point1= Object.values(slider_val)[0].point1
          var point2= Object.values(slider_val)[0].point2
          var point3= Object.values(slider_val)[0].point3
          var point4= Object.values(slider_val)[0].point4
          var point5= Object.values(slider_val)[0].point5
        }

        var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("background", "red")
        .style("opacity", 0);

        const height = 400,
        width = 500,
        margins = {top: 20, right: 100, bottom: 50, left: 50};
        const xscale1 = _.min(this.state.xValue);
        const xscale2 = _.max(this.state.xValue);
        const yscale1 = _.min(this.state.yValue);
        const yscale2 = _.max(this.state.yValue);

        const chart = d3.select('.chart')
          .attr('width', width + margins.left + margins.right)
          .attr('height', height + margins.top + margins.bottom)
          
          .append('g')
          .attr('transform','translate(' + margins.left + ',' + margins.top + ')');
          var yScale = d3.scaleLinear()
          .rangeRound([0,height])
          .domain([yscale2,yscale1]);
          var xScale = d3.scaleLinear()
          .rangeRound([0,width])
          .domain([xscale1,xscale2]);
          
        var r = 5;
        const dots = chart.selectAll('dot')
          .data(this.state.xValue.length && this.state.yValue.length ? graphdatanew : [], null, 2)
          .enter().append('circle')
          .attr('r', r)
          .attr("id", function(d){return d["row_id"]})
          .attr('cx', d => {return xScale(Number(d.x)); })
          .attr('cy', d => {return yScale(Number(d.y)); })
          .on("click", function(d){
            d['row_id']= d3.select(this).attr("id")
            clickDot(d)
          })
         
          .style('fill', (d) => {
            if (d.slider_col>point1 && d.slider_col<point2 ){
             return '#0BAF17';
           }else if(d.slider_col>point2 && d.slider_col<point3){
             return '#276FDA'
           }else if(d.slider_col>point3 && d.slider_col<point4){
             return '#FFA620'
           }else if(d.slider_col>point4 && d.slider_col<point5){
             return '#FF0000'
           }else{
             return 'black'
           }

          });

        dots.on("mouseover", d => {
          tooltip.transition()
             .duration(500)
            .style("opacity", .9);
          tooltip.html(" x "+d.x+ "  y "+d.y)
             .style("left", (d3.event.pageX + 10) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.transition()
             .duration(50)
             .style("opacity", 0);
        });
        
        
        chart.selectAll('text')
          .data(graphData, null, 2)
          .enter().append('text')
          .attr('transform', 'translate(10,5)');
        
        chart.append('g')
          .attr('transform','translate(0,' + height + ')')
          .call(d3.axisBottom(xScale));
        
        chart.append('g')
          .call(d3.axisLeft(yScale));
        
        chart.append('text')
          .style('font-size', '14px')
          .style('text-anchor', 'middle')
          .attr('x', width / 2)
          .attr('y', height + 50)
          .text('X Axis')
        
        chart.append('text')
          .style('font-size', '14px')
          .style('text-anchor', 'middle')
          .attr('x', height / -2)
          .attr('y', -30)
          .attr('transform', 'rotate(-90)')
          .text('Y Axis')

          chart.selectAll('circle')
          .data(graphData)
          .exit()
          .remove()
    }
    
    render() {
     const sliderDataYmax =[]
     Object.entries(this.context.sliderData).map(([name, info]) =>
        (
          sliderDataYmax.push(Object.keys(this.context.sliderData[name]))
         )
      )

      const buttonNames = _.flatten(_.map(this.context.sliderData, x => {
        return _.keys(x);
      }));

      this.setGraphData();
      
      return (
        <SliderContext.Consumer>
          {context => {
            return (
              <div className="panelContainer container" style={{padding:'0'}}>
              <div className="GraphSectionUpper">
                  <Row>
                      <Col sm="6">
                          <Label for="exampleEmail">Select X-Axis Value</Label>
                          <UncontrolledButtonDropdown style={{marginLeft:'40px'}}>
                              <DropdownToggle caret size="sm">
                                  {this.state.selectValue1}
                              </DropdownToggle>
                              <DropdownMenu>
                                {
                                  (context.key || []).map(option => (
                                        <div key={option}>
                                        <DropdownItem onClick={this.handleChange1}>{option}</DropdownItem>
                                        </div>
                                    ))
                                }
                              </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </Col>
                      <Col sm="6">
                          <Label for="exampleEmail">Select Y-Axis Value</Label>
                          <UncontrolledButtonDropdown style={{marginLeft:'100px'}}>
                              <DropdownToggle caret size="sm">
                              {this.state.selectValue2}
                              </DropdownToggle>
                              <DropdownMenu>
                              {
                              (context.key || []).map(option => (
                                      <div key={option}>
                                      <DropdownItem onClick={this.handleChange2}>{option}</DropdownItem>
                                      </div>
                                  ))
                              }
                              </DropdownMenu>
                          </UncontrolledButtonDropdown>
                          </Col>
                  </Row>
                  
                  <Row style={{paddingLeft:'40px', marginTop:'10px'}}>
                <Label for="exampleEmail">Color Variables  :</Label>
                <ButtonGroup>
                  {
                    _.map(buttonNames, name =>
                      {
                        return name == 'Ymax' ? null :
                          <Button className="btnColor1" onClick={() => this.context.updateState({activeSliderName: name})}>
                            {name}
                          </Button>
                      }
                    )
                  }
                  { _.size(buttonNames) && _.size(context.ymax_arr) ? <Button className="btnColor" onClick={this.YmaxCall}>Ymax</Button> : null}
                </ButtonGroup>
              </Row>
              </div>
              <Row >
              <Row style={{paddingLeft:'15px', float: 'right',marginLeft:'533px'}} >
                  
                  <ButtonGroup>
                    <Button className="graph-funcction " onClick={this.downloadGraphImage} title="Download plot as png"><FontAwesomeIcon icon={faCamera} /></Button>
                    <Button className="graph-funcction" title="Zoom in"><FontAwesomeIcon icon={faSearchPlus} /></Button>
                    <Button className="graph-funcction" title="Zoom out"><FontAwesomeIcon icon={faSearchMinus} /></Button>
                    <Button className="graph-funcction" title="Lasso select"><FontAwesomeIcon icon={faMousePointer} /></Button>
                    <Button className="graph-funcction" title="Pan"><FontAwesomeIcon icon={faArrowsAlt} /></Button>
                    


                  </ButtonGroup>
              </Row>
                <Scatterplot
						      width={400}
						      height={400}
						      marginTop="40"
						      x={d => d.x}
						      y={d => d.y}
						      r={d => 5}
						      fill={d => d.fill}
						      xDomain={this.xDomain}
						      yDomain={this.yDomain}
						      data={this.data} />
              </Row>
              
                
              </div>
            )
          }}
        </SliderContext.Consumer>
      );
    }
  }
  GraphMOga.contextType = SliderContext;


export default GraphMOga;