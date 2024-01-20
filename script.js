$(document).ready(function () {
	const colorPicker = $(".color-picker");
	const generateButton = $("#generateButton");
	const addButton = $("#addButton");
	const deleteButton = $("#deleteButton");

	// Function to set the background color of a section
	function setSectionColor(section, color) {
		section.css("background-color", color);
	}

	// Function to generate a random color
	function getRandomColor() {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	// Function to add a new color section
	function addColorSection() {
		const newSection = $('<div class="section"></div>');
		colorPicker.append(newSection);

		// Set random color for the new section
		setSectionColor(newSection, getRandomColor());

		adjustSectionWidths();
	}

	// Function to adjust the width of color sections
	function adjustSectionWidths() {
		const colorSections = colorPicker.children(".section");
		const totalSections = colorSections.length;
		const sectionWidthPercentage = 100 / totalSections;
		colorSections.css("width", sectionWidthPercentage + "%");
	}

	// Initial setup with 4 color sections
	for (let i = 0; i < 3; i++) {
		addColorSection();
	}

	// Event listener for the generate button
	generateButton.click(function () {
		colorPicker.children(".section").each(function () {
			setSectionColor($(this), getRandomColor());
		});
	});

	// Event listener for the add button
	addButton.click(function () {
		addColorSection();
	});

	// Initial random colors on page load
	generateButton.click();

	// Set initial width when only 1 section exists
	colorPicker.children(".section").css("width", "100%");

	// Delete Colors
	deleteButton.on("click", function () {
		const colorSections = colorPicker.children(".section");
		if (colorSections.length > 1) {
			colorSections.last().remove();
			adjustSectionWidths();
		}
	});
});
