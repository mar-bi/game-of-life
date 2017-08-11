import React from 'react';
import ReactDOM from 'react-dom';

import { TopPanel } from './TopPanel';
import { Board } from './Board';
import { BottomPanel } from './BottomPanel';

import { playGame, create2DArray, create2DRandomArray, ArrSum } from './gameplay';


export class App extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			numRows: 0,
			numCols: 0,
			data: [],
			lifeProb: 0.15,
			genSpeed: 500,
			generation: 0,
			editMode: false,
			customArr: false,
			play: false,
			pause: false
		}
		//	console.log(this.state);
		this.setSize = this.setSize.bind(this);
		this.setSpeed = this.setSpeed.bind(this);
		this.playRunGame = this.playRunGame.bind(this);
		this.playPause = this.playPause.bind(this);
		this.playClear = this.playClear.bind(this);
		this.playSet = this.playSet.bind(this);
		this.buildCells = this.buildCells.bind(this);
		this.setProbability = this.setProbability.bind(this);
	}
	

	componentWillMount() {
		const screenWidth = window.innerWidth;
		const rows = (screenWidth > 580) ? 50 : 40;
		const cols = (screenWidth > 580) ? 70 : 40;
		const arr = create2DRandomArray(rows, cols, this.state.lifeProb);
		this.setState({
			numRows: rows,
			numCols: cols,
			data: arr 
		});
	}

	componentDidMount() {
		this.playRunGame();
	}

	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	//top panel event handlers
	playRunGame(generation = 0) {
		if (this.state.play == false){
			const currentArr = this.state.data;		
			
			if (ArrSum(currentArr) === 0){	
				const arr = create2DRandomArray(this.state.numRows, 
					this.state.numCols, this.state.lifeProb);
				this.setState({ data: arr });
			}

			this.setState({
				editMode: false,
				customArr: false,
				play: true,
				pause: false
			});

			var currentGen = generation;
			
			this.interval = window.setInterval(function() {
				var newArr = playGame(this.state.data,
					this.state.numRows, this.state.numCols);
				currentGen++;
				this.setState({
					data: newArr,
					generation: currentGen
				});
			}.bind(this), this.state.genSpeed);
		}
	}

	playPause() {
		if (this.state.pause == false || 
			this.state.editMode == false || this.state.play == true) {
			window.clearInterval(this.interval);
			this.setState({
				customArr: true,
				editMode: true,
				play: false,
				pause: true
			});
		}	
	}

	playClear() {
		window.clearInterval(this.interval);
		const arr = create2DArray(
			this.state.numRows, this.state.numCols, this.state.lifeProb);
		this.setState({
			data: arr,
			editMode: true,
			customArr: false,
			generation: 0,
			play: false,
			pause: false 
		});
	}

	setProbability(num) {
		const prob = Number(num);
		this.setState({
			lifeProb: prob
		});
	}

	playSet() {
		this.playClear();
		window.setTimeout(function() {
			this.playRunGame();
		}.bind(this), 200);
	}

	//board event handlers
	buildCells(row, col, value) {
		var arr = this.state.data;
		arr[row][col] = value;
		this.setState({
			data: arr,
			customArr: true
		});
	}

	//bottom panel event handlers
	setSize(rows, cols) {
		if (this.state.play == false){
			const arr = create2DRandomArray(rows, cols, this.state.lifeProb);
			this.setState({
				numRows: rows,
				numCols: cols,
				data: arr
			});
		}
	}

	setSpeed(speed) {
		window.clearInterval(this.interval);
		this.setState({
			genSpeed: speed,
			customArr: true,
			play: false
		});
		window.setTimeout(function() {
			this.playRunGame(this.state.generation);
		}.bind(this), 200);
	}

	render() {
		return (
			<div>
				<TopPanel 
					onRun={this.playRunGame}
					onPause={this.playPause}
					onClear={this.playClear}
					onSet={this.playSet}
					gen={this.state.generation}
					probability={`${this.state.lifeProb}`}
					changeProbability={this.setProbability} />
				<Board 
					data={this.state.data}
					mode={this.state.editMode}
					addData={this.buildCells}/>
				<BottomPanel 
					currSpeed={this.state.genSpeed}
					changeSize={this.setSize}
					changeSpeed={this.setSpeed} />
			</div>
		)
	}
}