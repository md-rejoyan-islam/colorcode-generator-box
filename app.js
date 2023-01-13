/***
 * Dom Selector
 */
const content = document.getElementById("content");
const hexField = document.getElementById("hexField");
const copyCode = document.getElementById("copyCode");
const rgbField = document.getElementById("rgbField");
const colorName = document.querySelectorAll('input[name="colorName"]');
const showResult = document.getElementById("showResult");
const greenRgb = document.getElementById("greenRgb");
const redRgb = document.getElementById("redRgb");
const blueRgb = document.getElementById("blueRgb");
const blueRange = document.getElementById("blueRange");
const redRange = document.getElementById("redRange");
const greenRange = document.getElementById("greenRange");

/***
 * random color showing function
 */

const random = () => {
  //rgb  color code
  const { red, green, blue } = colorCode();
  //hex color code
  const hexColorCode = `#${red}${green}${blue}`;
  //rgb code
  const rgbCode = `rgb(${Number("0x" + red)},${Number("0x" + green)},${Number(
    "0x" + blue
  )})`;
  content.style.backgroundColor = hexColorCode;
  hexField.value = hexColorCode.split("#")[1];
  rgbField.value = rgbCode;
  //red rgb range value change
  redRgb.value = red;
  redRange.innerHTML = id = Number("0x" + red);
  //blue rgb range value change
  blueRgb.value = blue;
  blueRange.innerHTML = Number("0x" + blue);
  //green rgb range value change
  greenRgb.value = green;
  greenRange.innerHTML = Number("0x" + green);
};

/***
 * RGB color code Generator
 */
function colorCode() {
  let red = Math.ceil(Math.random() * 255).toString(16);
  let green = Math.ceil(Math.random() * 255).toString(16);
  let blue = Math.ceil(Math.random() * 255).toString(16);
  if (red.length != 2 || green.length != 2 || blue.length != 2) {
    return colorCode();
  } else {
    return { red, green, blue };
  }
}

/***
 * copy selected color code function
 */
copyCode.onclick = () => {
  if (colorName[0].checked) {
    navigator.clipboard.writeText(`#${hexField.value}`);
    showResult.classList.remove("hidden");
    showResult.innerHTML = `#${hexField.value} copied`;
  } else if (colorName[1].checked) {
    navigator.clipboard.writeText(rgbField.value);
    showResult.classList.remove("hidden");
    showResult.innerHTML = `#${rgbField.value} copied`;
  } else {
    console.log("check before");
  }
};

/***
 * hex color code checker function
 */
function hexCheck(data) {
  const pattern = /^[0-9abcdef]{6}$/i;
  const result = pattern.test(data);
  return result;
}

/***
 * hex to rgb color code converter function
 */
function hexToRgb(code) {
  let r = parseInt(code.slice(0, 2), 16);
  let g = parseInt(code.slice(2, 4), 16);
  let b = parseInt(code.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/***
 * rgb to hex code generator function
 */
function rgbToHex(data) {
  const [r, g, b] = [...data.split(",")];
  return `${Number(r).toString(16)}${Number(g).toString(16)}${Number(
    b
  ).toString(16)}`;
}

/***
 * Take hex code input and change content color
 */
hexField.onkeyup = (e) => {
  const hexCode = e.target.value;
  if (hexCheck(hexCode)) {
    content.style.backgroundColor = `#${hexCode}`;
    const rgbCode = hexToRgb(hexCode);
    const [r, g, b] = rgbCode.split(`(`)[1].split(")")[0].split(",");
    rgbField.value = rgbCode;
    blueRange.innerHTML = b;
    redRange.innerHTML = r;
    greenRange.innerHTML = g;
  } else {
    console.log("wrong");
    showResult.classList.remove("hidden");
    showResult.innerHTML = "Wrong Hex Code";
  }
};

/***
 *  setInterval for show limited time output
 */
setInterval(() => {
  showResult.classList.add("hidden");
}, 2000);

/***
 * By change green range value color code will be change
 */

const beforeValue = rgbField.value.split("(")[1].split(")")[0].split(",");
greenRgb.oninput = (e) => {
  const value = e.target.value;
  rgbField.value = `rgb(${beforeValue[0]},${value},${beforeValue[2]})`;
  content.style.backgroundColor = `rgb(${beforeValue[0]},${value},${beforeValue[2]})`;
  const hexCode = rgbToHex(`${beforeValue[0]},${value},${beforeValue[2]}`);
  hexField.value = hexCode;
  greenRange.innerHTML = value;
};

/***
 * By change red range value color code will be change
 */
redRgb.oninput = (e) => {
  const value = e.target.value;
  rgbField.value = `rgb(${value},${beforeValue[1]},${beforeValue[2]})`;
  content.style.backgroundColor = `rgb(${value},${beforeValue[1]},${beforeValue[2]})`;
  const hexCode = rgbToHex(`${value},${beforeValue[1]},${beforeValue[2]}`);
  hexField.value = hexCode;
  redRange.innerText = value;
};

/***
 * By change blue range value color code will be change
 */
blueRgb.oninput = (e) => {
  const value = e.target.value;
  rgbField.value = `rgb(${beforeValue[0]},${beforeValue[1]},${value})`;
  content.style.backgroundColor = `rgb(${beforeValue[0]},${beforeValue[1]},${value})`;
  const hexCode = rgbToHex(`${beforeValue[0]},${beforeValue[0]},${value}`);
  hexField.value = hexCode;
  blueRange.innerHTML = value;
};
