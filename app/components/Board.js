import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class BoardRow extends React.Component {
	constructor (props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		if (this.props.mode) {
			const cell = event.target;
			var cellValue;
			if (cell.className == "dead-cell"){
				cellValue = 1;
			}else {
				cellValue = 0;
			}
			const rowNum = cell.attributes[1].value;
			const colNum = cell.attributes[2].value;
			this.props.addCell(rowNum, colNum, cellValue);
		}
	}

	render() {
		const arr = this.props.data;
		return(
			<tbody>
				{arr.map((col, index) => {
					var rindex = `r-${index}`;
					var row = index; 
					return (
						<tr key={rindex}>
							{col.map((elem, index) => {
								return elem == 1 
									?(<td className="live-cell" 
										key={`${rindex}-c-${index}`}
										onClick={this.handleClick} 
										data-row={row} data-col={index}></td>)
									:(<td className="dead-cell" 
										key={`${rindex}-c-${index}`}
										onClick={this.handleClick}
										data-row={row} data-col={index}></td>)
							})}
						</tr>
					)		
				})}
			</tbody>	
		)
	}
}

BoardRow.propTypes = {
	data: PropTypes.array.isRequired,
	mode: PropTypes.bool.isRequired,
	addCell: PropTypes.func.isRequired
}


export class Board extends React.Component {
	render() {
		return (
			<table className="board">
				<BoardRow 
					data={this.props.data}
					mode={this.props.mode}
					addCell={this.props.addData} />
			</table>
		)
	}
}

Board.propTypes = {
	data: PropTypes.array.isRequired,
	mode: PropTypes.bool.isRequired,
	addData: PropTypes.func.isRequired
}
