// set initial configuration

// creates an empty array
export function create2DArray(rows, cols) {
	let arr = Array(rows);

	for (var i=0; i < rows; i++) {
		arr[i] = Array(cols).fill(0);
	}
	return arr;
}


export function create2DRandomArray(rows, cols, prob) {
	let arr = Array(rows);

	for (var i=0; i < rows; i++) {
		arr[i] = Array(cols).fill(0).map(elem => {
			const random = Math.random(); 
			return random <= prob ? 1 : 0; 
		});
	}
	return arr;
}


// gameplay functions 
export function playGame(arr, rows, cols) {
	var copy = arr.slice();

	var update = copy.map((curr, rindex, array) => {
		var row = rindex;
		var origin = array;
		return curr.map((elem, index) => {
			return countAllNeighbors(origin, row, index);
		});
	});
	return update;
}


function countAllNeighbors(arr, row, col) {
	var count = 0;
	var r = arr.length;
	var c = arr[0].length;
	
	const cellValue = arr[row][col];
	for (var i = row - 1; i <= row + 1; i++) {
		if (i < 0 || i >= r) {
			continue;
		} else {
			for (var j = col - 1; j <= col + 1; j++) {
				if (j < 0 || j >= c) {
					continue;
				} else {
					count += arr[i][j];
				}
			}
		}
	}
	return getNewCellValue(count - cellValue, cellValue);
}


function getNewCellValue(score, prev) {
	if (prev == 1 && (score < 2 || score > 3)) {
		return 0;
	}if (prev == 1 && (score == 2 || score == 3)) {
		return 1;
	}if (prev == 0 && score == 3) {
		return 1;
	} if (prev == 0 && score !== 3) {
		return 0;
	}
}

// test for empty array
export function ArrSum(arr) {
	const result = arr.reduce((acc, curr) => {
		return acc.concat(curr); 
	}, []);
	return result.reduce((acc, current) => acc + current);
}
