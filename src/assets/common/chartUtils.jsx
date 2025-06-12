

export function createTallDiamondImage(width = 20, height = 40, color = "#2196f3", lineWidth = 2, fillAlpha = 0.3) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");


    ctx.beginPath();
    ctx.moveTo(width / 2, 0);           // top
    ctx.lineTo(width, height / 2);      // right
    ctx.lineTo(width / 2, height);      // bottom
    ctx.lineTo(0, height / 2);          // left
    ctx.closePath();

    ctx.fillStyle = hexToRGBA(color, fillAlpha);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.fill();
    ctx.stroke();

    const centerX = width / 2;
    const centerY = height / 2;
    const dotRadius = 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, dotRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    return canvas;
}

export function hexToRGBA(hex, alpha = 1) {
    hex = hex.replace("#", "");

    if (hex.length === 3) {
        hex = hex.split("").map((char) => char + char).join("");
    }

    const match = hex.replace("#", "").match(/.{1,2}/g);
    const [r, g, b] = match.map((x) => parseInt(x, 16));

    return `rgba(${r},${g},${b},${alpha})`;
}


export function getThemeColors() {

    const getCSSVar = (varName) => {
        return typeof window !== "undefined"
            ? getComputedStyle(document.documentElement).getPropertyValue(varName)
            : "";
    };


    const themeColors = {
        computedPrimary800: getCSSVar("--primary-600"),
        computedTextColor: getCSSVar("--text-color"),
    };

    const chartColors = {
        computedGreen500: getCSSVar("--green-500"),
        computedBlue500: getCSSVar("--blue-500"),
        computedYellow500: getCSSVar("--yellow-500"),
        computedPurple500: getCSSVar("--purple-500"),
        computedOrange500: getCSSVar("--orange-500"),
    };

    return [themeColors, chartColors];

};