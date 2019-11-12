// JavaScript Document
/*jshint esversion: 6 */

const para = document.getElementById("returnedString");
const para2Header = document.getElementById("para2Header");
const para2 = document.getElementById("returnedStringWithoutComments");
function process(){
	handleFiles(document.getElementById("fileName").files)
}

function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();     
	reader.readAsText(fileToRead);
	reader.onload = loadHandler;
}

function loadHandler(event) {
	var selectedFile = event.target.result;
	processData(selectedFile);
}

function processData(selectedFile) {
	const rows = selectedFile.split("\n").slice(1, -1);
	let string = "";
	let stringWithoutComments = "";
	rows.forEach(catRow => {
		rowText = catRow.trim().replace(/(\r\n|\n|\r)/gm, " ");	//remove whitespace
		string += rowText;
		var rowWithoutComments = rowText.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');	//remove comments
		stringWithoutComments += rowWithoutComments;
	});
	para.style.display = "block";
	para.textContent = string;
	para2Header.style.display = "block";
	para2.style.display = "block";
	para2.textContent = stringWithoutComments;
}
