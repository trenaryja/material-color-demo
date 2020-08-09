import React from "react";
import chroma from "chroma-js";
import * as materialColor from "@trenaryja/material-color";
import { TextField } from "@material-ui/core";
import JsonBlock from "./jsonBlock";
import ColorArray from "./colorArray";
import InfoTable from "./infoTable";
import { theme } from "./utils";

export default () => {
	const [color, setColor] = React.useState(theme.palette.primary.main);
	const closestValues = materialColor.getClosestMaterialColorValues(color);
	const colorArray = materialColor.createColorArray(color);
	const colorObject = materialColor.createColorObject(color);

	const handleColorChange = (e) => {
		const input = e.target.value;
		if (chroma.valid(input)) setColor(input);
	};

	return (
		<div id="app">
			<TextField variant="outlined" onChange={handleColorChange} />
			<ColorArray value={colorArray}></ColorArray>
			<InfoTable value={closestValues}></InfoTable>
			<JsonBlock value={colorObject}></JsonBlock>
		</div>
	);
};
