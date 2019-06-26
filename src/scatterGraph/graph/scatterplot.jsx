import React from "react";
// import * as d3 from "d3";
import SliderContext from '../../context/sliderContext';

import Axis from "./axis.jsx";
import './style.css';
import 'antd/dist/antd.css';
import { Tooltip } from "antd";


class Scatterplot extends React.Component {
	componentDidUpdate() {
		var lassoSelectedDots = [];
		var chart = d3.select('.Scatterplot');
		var dots = d3.selectAll('circle');

		var lasso_start = function() {
			lasso.items()
					.attr("r",5) // reset size
					.classed("not_possible",true)
					.classed("selected",false);
	}; 

		var lasso_draw = function() {
        
			// Style the possible dots
			lasso.possibleItems()
					.classed("not_possible",false)
					.classed("possible",true);

			// Style the not possible dot
			lasso.notPossibleItems()
					.classed("not_possible",true)
					.classed("possible",false);
	};

	var lasso_end = function() {
			// Reset the color of all dots
			
			lasso.items()
					.classed("not_possible",false)
					.classed("possible",false);

			// Style the selected dots
			lasso.selectedItems()
					.classed("selected",true)
					.attr("r",9);

			// Reset the style of the not selected dots
			lasso.notSelectedItems()
					.attr("r",5);
			
			lassoSelectedDots = _.map(lasso.selectedItems()._groups[0], g => Number(g.id));
			lassoSelectedDots = _.compact(lassoSelectedDots);
			if (lassoSelectedDots.length) {
				this.context.updateState({
					lassoSelectedRows: lassoSelectedDots
				})
				this.context.getRowFromClickOnGraphDot(lassoSelectedDots);
			}
	}.bind(this);
	

	var lasso = d3.lasso()
	.closePathSelect(true)
	.closePathDistance(100)
	.items(dots)
	.targetArea(chart)
	.on("start",lasso_start)
	.on("draw",lasso_draw)
	.on("end",lasso_end);
	
		chart.call(lasso);

	}

	onClickCircle(i) {
		var selectedRow = this.props.data[i];
		this.context.getRowFromClickOnGraphDot([selectedRow.row_id]);
	}

	render() {
		var innerWidth = this.props.width - this.props.marginLeft - this.props.marginRight;
		var innerHeight = this.props.height - this.props.marginTop - this.props.marginBottom;
		var innerTransform = `translate(${this.props.marginLeft},${this.props.marginTop})`;

		var xDomain = this.props.xDomain || d3.extent(this.props.data, this.props.x);
		var yDomain = this.props.yDomain || d3.extent(this.props.data, this.props.y);

		var xScale = d3.scaleLinear()
			.domain(xDomain)
			.range([0, innerWidth]);
		
		var yScale = d3.scaleLinear()
			.domain(yDomain)
			.range([innerHeight, 0]);
		
		var xValue = d => xScale(this.props.x(d));
		var yValue = d => yScale(this.props.y(d));
		var rValue = d => this.props.r(d);
		var fillValue = d => this.props.fill(d);
		var strokeValue = d => this.props.stroke(d);

		var pointsData = this.props.data.map(d => {
			return {
				x: xValue(d),
				y: yValue(d),
				r: rValue(d),
				fill: fillValue(d),
				stroke: strokeValue(d)
			};
		});
		console.log(pointsData, 'aaaaaaaa')
		var bottomAxisTransform = `translate(0,${innerHeight})`;
 
		return (
			<svg 
				className="Scatterplot"
				width={this.props.width}
				height={this.props.height}>

				<g transform={innerTransform}>

					<g className="Points">
						{
							pointsData.map((d, i) => {
								return (
									<Tooltip placement="topLeft"
									title={"x " + _.floor(this.props.data[i].x, 3) + " y " + _.floor(this.props.data[i].y, 3)}
									arrowPointAtCenter>
										<circle onClick={(e) => {
											e.stopPropagation();
											this.onClickCircle(i)
										}}
											id={i}
											key={i}
											cx={d.x}
											cy={d.y}
											r={d.r}
											fill={d.fill}
											stroke={d.stroke}
										/>
									</Tooltip>
								)
							})
						}
					</g>

					<g transform={bottomAxisTransform}>
						<Axis 
							orientation="bottom" 
							scale={xScale} />
					</g>
					
					<Axis 
						orientation="left" 
						scale={yScale} />	
				</g>

			</svg>
		);
	}
}

Scatterplot.contextType = SliderContext;

Scatterplot.defaultProps = {
	marginTop: 10,
	marginLeft: 30,
	marginBottom: 30,
	marginRight: 30,
	width: 960,
	height: 500,
	x: d => d.x,
	y: d => d.y,
	r: d => 3,
	fill: d => "#000",
	stroke: d => "none",
};

export default Scatterplot;