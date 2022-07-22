const { User } = require("../models");
const chroma = require("chroma-js");

function generateHexColors() {
  const MAX_COLORS = 6;

  const color = chroma.random();
  const colorPalette = chroma
    .scale([
      chroma(color).desaturate(1).brighten(2),
      chroma(color).desaturate(1).darken(2),
    ])
    .mode("lch")
    .colors(6);

  const brightColor = colorPalette[0] || "#ffffff";
  const darkColor = colorPalette[MAX_COLORS - 1] || "#000000";

  return [brightColor, darkColor];
}

function userDataTemplate(requestBody) {
  console.log(JSON.stringify(requestBody, null, 2));
  const [textColor, bgColor] = generateHexColors();
  const paramName = requestBody.fullname.replace(" ", "+");

  const newUser = new User(
    requestBody.uid,
    requestBody.fullname,
    requestBody.email,
    `https://ui-avatars.com/api/?background=${bgColor}&color=${textColor}&name=${paramName}`,
    [],
    []
  );
  return { ...newUser };
}

module.exports = {
  userDataTemplate,
};
