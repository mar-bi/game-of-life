import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


function nameSpeed(num) {
	switch(num) {
		case 250:
			return 'Fast';
		case 500:
			return 'Normal';
		case 1000:
			return 'Slow';
	}
}

export class BottomPanel extends React.Component {
	constructor(props) {
		super(props);

		this.status = {
			speed: ''
		}
		this.setXSmall = this.setXSmall.bind(this);
		this.setMSmall = this.setMSmall.bind(this);
		this.setSmall = this.setSmall.bind(this);
		this.setMedium = this.setMedium.bind(this);
		this.setLarge = this.setLarge.bind(this);
		this.setSlow = this.setSlow.bind(this);
		this.setNormal = this.setNormal.bind(this);
		this.setFast = this.setFast.bind(this);
	}

	componentWillMount(){
		const speedValue = nameSpeed(this.props.currSpeed);
		this.setState({
			speed: speedValue
		});
	}

	componentWillUpdate(nextProps) {
		if (this.props.currSpeed != nextProps.currSpeed) {
			const speedValue = nameSpeed(nextProps.currSpeed);
			this.setState({
				speed: speedValue
			});
		}
	}

	setXSmall() {
		this.props.changeSize(20, 20);
	}

	setMSmall() {
		this.props.changeSize(40, 40);
	}

	setSmall() {
		this.props.changeSize(30, 50);
	}

	setMedium() {
		this.props.changeSize(50, 70);
	}

	setLarge() {
		this.props.changeSize(80, 100);
	}

	setSlow() {
		this.props.changeSpeed(1000);
	}

	setNormal() {
		this.props.changeSpeed(500);
	}

	setFast() {
		this.props.changeSpeed(250);
	}

	
	render() {
		return (
			<div className='bottom-panel'>
				<div className="bottom-row">
					<span className='bott-title'>Board Size:</span>
					<button className='size-btn' onClick={this.setXSmall}>20x20</button>
					<button className='size-btn xs-screen' onClick={this.setMSmall}>40x40</button>
					<button className='size-btn' onClick={this.setSmall}>50x30</button>
					<button className='size-btn lg-screen' onClick={this.setMedium}>70x50</button>
					<button className='size-btn lg-screen' onClick={this.setLarge}>100x80</button>
				</div>
				<div className="bottom-row">
					<span className='bott-title'>Speed: 
						<span id="speed-val">{this.state.speed}</span>
					</span>
					<button onClick={this.setSlow}>Slow</button>
					<button onClick={this.setNormal}>Normal</button>
					<button onClick={this.setFast}>Fast</button>
				</div>
			</div>
		)
	}
}

BottomPanel.propTypes = {
	changeSize: PropTypes.func.isRequired,
	changeSpeed: PropTypes.func.isRequired,
	currSpeed: PropTypes.number.isRequired
}