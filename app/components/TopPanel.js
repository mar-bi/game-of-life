import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


export class TopPanel extends React.Component {
	constructor(props) {
		super(props);

		this.handleRun = this.handleRun.bind(this);
		this.handlePause = this.handlePause.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleProbChange = this.handleProbChange.bind(this);
		this.setProbability = this.setProbability.bind(this);
	}

	handleRun(){
		this.props.onRun();
	}

	handlePause(){
		this.props.onPause();
	}

	handleClear(){
		this.props.onClear();
	}

	handleProbChange(event) {
		const prob = event.target.value;
		this.props.changeProbability(prob);
	}

	setProbability() {
		this.props.onSet();
	}

	render() {
		return (
			<div className='top-panel'>
				<div className="prob-row">
					<h3>Initial pattern</h3>
					<label className='prob-text' htmlFor='life-prob'>
						Probability of life in a cell:
					</label>
					<input
						id='life-prob'
						type='number' 
						min='0.1' 
						max='0.99'
						step='0.01'
					  autoComplete='off'
					  value={this.props.probability}
					  onChange={this.handleProbChange}/>
					  <button onClick={this.setProbability}>Set</button>
				</div>

				<div className="butt-row">
					<h3>Controls</h3>
					<button onClick={this.handleRun}>Run</button>
					<button onClick={this.handlePause}>Pause</button>
					<button onClick={this.handleClear}>Clear</button>
					<span>Generations: {this.props.gen}</span>
				</div>	
			</div>
		)
	}
}

TopPanel.defaultProps = {
	gen: 0 
}

TopPanel.propTypes = {
	onRun: PropTypes.func.isRequired,
	onPause: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired,
	onSet: PropTypes.func.isRequired,
	gen: PropTypes.number.isRequired,
	probability: PropTypes.string.isRequired,
	changeProbability: PropTypes.func.isRequired
}