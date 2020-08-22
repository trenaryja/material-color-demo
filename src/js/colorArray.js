import React from "react";

export default ({ value }) => {
	const boxSize = 100 / value.length;

	return (
		<svg shapeRendering="crispEdges" viewBox={`0 0 100 ${boxSize}`}>
			{value.map((x, i) => (
				<rect width={boxSize} height={boxSize} x={boxSize * i} key={x} fill={x}></rect>
			))}
		</svg>
	);
};
