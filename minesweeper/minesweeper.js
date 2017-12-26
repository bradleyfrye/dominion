var constants = {"BEGINNER", "INTERMEDIATE", "EXPERT"};
constants.BEGINNER.WIDTH = 9;
constants.BEGINNER.HEIGHT = 9;
constants.BEGINNER.MINES = 10;
constants.INTERMEDIATE.WIDTH = 16;
constants.INTERMEDIATE.HEIGHT = 16;
constants.INTERMEDIATE.MINES = 40;
constants.EXPERT.WIDTH = 30;
constants.EXPERT.HEIGHT = 16;
constants.EXPERT.MINES = 99;

function Cell(){
	var isMine = false;
	var borderMines = 0;
};

function initMines(difficulty, selected){
	difficulty = (difficulty == "BEGINNER" || difficulty == "INTERMEDIATE" || difficulty == "EXPERT") ? difficulty : "EXPERT";
	var width = constants[difficulty].WIDTH;
	var height = constants[difficulty].HEIGHT;
	var mines = constants[difficulty].MINES;
	var area = width * height;
	
	var blankArray = [selected];
	
	if (isLeftEdge(selected, width)){
		if (isTopEdge(selected, width)){
			blankArray.push.apply(blankArray,[selected+1,selected+width,selected+width+1]); // gotta do multipush like this
		} else if (isBottomEdge(selected, width, height)){
			blankArray.push.apply(blankArray, [selected-width,selected-width+1,selected+1]);
		} else {
			blankArray.push.apply(blankArray, [selected-width,selected-width+1,selected+1,selected+width,selected+width+1]);
		}
	} else if(isRightEdge(position, width)){
		if (isTopEdge(selected, width)){
			blankArray.push.apply(blankArray,[selected-1,selected+width,selected+width-1]);
		} else if (isBottomEdge(selected, width, height)){
			blankArray.push.apply(blankArray, [selected-width,selected-width-1,selected-1]);
		} else {
			blankArray.push.apply(blankArray, [selected-width,selected-width-1,selected-1,selected+width,selected+width-1]);
		}
	} else {
		blankArray.push.apply(blankArray, [selected-width,selected-width-1,selected-1,selected+width,selected+width-1,selected-width+1,selected+1,selected+width+1]);
	}
	
	var mineArray = [];
	var minesLeft = mines;
	while (minesLeft > 0){
		var randoMine = Math.floor(Math.random() * mines);
		if(minesArray.contains(randoMine) || blankArray.contains(randoMine))
			continue;
		minesArray.add(randoMine);
		minesLeft--;
	}
};

function isLeftEdge(position, width){
	return position % width == 0;
};

function isRightEdge(position, width){
	return (position + 1) % width == 0;
};

function isTopEdge(position, width){
	return position < width;
};

function isBottomEdge(position, width, height){
	return position >= (height*width - width);
};