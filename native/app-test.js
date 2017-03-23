'strict mode';

function assert(booleanResult, testName) {
	if(booleanResult) {
		console.info("- '" + testName+ "' PASSED.");
	} else {
		console.error("- '" + testName + "' FAILED.");
	}
}

function elementHasClass(element, className) {
	return element.classList.contains(className)
}
 
/**
 * Tests
 */
 function testIsSelected() {
	var element = document.getElementById('t1');
	selected.push(element);
	
	var elementAgain = document.getElementById('t1');
	assert(isSelected(elementAgain), arguments.callee.name);
	selected = [];
}

function testIsPairSelectedShouldBeFalse() {
	var element = document.getElementById('t1');
	element2 = document.getElementById('t2');
	selected.push(element);
	selected.push(element2);
	
	assert(!isPairSelected(), arguments.callee.name);
	selected = [];
}

function testIsPairSelectedShouldBeTrue() {
	var element = document.getElementById('t1');
	element = document.getElementById('t4');
	selected.push(element);
	selected.push(element);

	assert(selected.length == 2 && isPairSelected(), arguments.callee.name);
	selected = [];
}

function testGetTotalTilesShouldBGive4() {
	var actual = getTotalTiles();
	
	assert(actual == 4, arguments.callee.name);
}

function testFlipTile() {
	var element = document.getElementById('t1');
	var startState0 = elementHasClass(element.getElementsByTagName('img')[0], "hidden");
	var startState1 = elementHasClass(element.getElementsByTagName('img')[1], "hidden");
	flipTile(element);
	var endState0 = elementHasClass(element.getElementsByTagName('img')[0], "hidden");
	var endState1 = elementHasClass(element.getElementsByTagName('img')[1], "hidden");
	var actual = startState0 !== endState0 && startState1 !== endState1;
	
	assert(actual, arguments.callee.name);
	flipTile(element);
}

testIsSelected();
testIsPairSelectedShouldBeFalse();
testIsPairSelectedShouldBeTrue();
testGetTotalTilesShouldBGive4();
testFlipTile();
