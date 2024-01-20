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
        const randomColor = getRandomColor();
        setSectionColor(newSection, randomColor);

        // Add event listeners for hover and click
        newSection.on("mouseenter", function () {
            // Display both RGB and hexadecimal color on hover
            const rgbColor = $(this).css("background-color");
            const hexColor = rgbToHex(rgbColor);
            $(this).text(`RGB: ${rgbColor}, Hex: ${hexColor}`);
        });

        newSection.on("mouseleave", function () {
            // Remove the text on mouseout
            $(this).text("");
        });

        newSection.click(function () {
            // Copy both RGB and hexadecimal color to clipboard on click
            const rgbColor = $(this).css("background-color");
            const hexColor = rgbToHex(rgbColor);
            copyToClipboard(`RGB: ${rgbColor}, Hex: ${hexColor}`);
        });

        adjustSectionWidths();
    }

    // Function to convert RGB to hexadecimal
    function rgbToHex(rgb) {
        // Separate RGB values
        const rgbArray = rgb.match(/\d+/g);
        // Convert to hexadecimal
        const hexColor = "#" + rgbArray.map(value => {
            const hex = parseInt(value).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
        return hexColor;
    }

    // Function to adjust the width of color sections
    function adjustSectionWidths() {
        const colorSections = colorPicker.children(".section");
        const totalSections = colorSections.length;
        const sectionWidthPercentage = 100 / totalSections;
        colorSections.css("width", sectionWidthPercentage + "%");
    }

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        const textarea = $("<textarea>")
            .val(text)
            .appendTo("body")
            .select();
        document.execCommand("copy");
        textarea.remove();
    }

    // Initial setup with 4 color sections
    for (let i = 0; i < 3; i++) {
        addColorSection();
    }

    // Event listener for the generate button
    generateButton.click(function () {
        colorPicker.children(".section").each(function () {
            const randomColor = getRandomColor();
            setSectionColor($(this), randomColor);
        });
    });

    // Event listener for the add button
    addButton.click(function () {
        addColorSection();
    });

    // Add event listeners to the first color section explicitly
    const firstSection = colorPicker.children(".section:first");
    firstSection.on("mouseenter", function () {
        // Display both RGB and hexadecimal color on hover
        const rgbColor = firstSection.css("background-color");
        const hexColor = rgbToHex(rgbColor);
        firstSection.text(`RGB: ${rgbColor}, Hex: ${hexColor}`);
    });

    firstSection.on("mouseleave", function () {
        // Remove the text on mouseout
        firstSection.text("");
    });

    firstSection.click(function () {
        // Copy both RGB and hexadecimal color to clipboard on click
        const rgbColor = firstSection.css("background-color");
        const hexColor = rgbToHex(rgbColor);
        copyToClipboard(`RGB: ${rgbColor}, Hex: ${hexColor}`);
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
