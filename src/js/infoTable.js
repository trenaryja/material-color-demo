import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ColorArray from "./colorArray";

export default ({ value }) => {
	return (
		<TableContainer style={{ width: "auto" }} component={Paper}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>Closest Color Array</TableCell>
						<TableCell>
							<ColorArray value={value.closestColorArray}></ColorArray>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Closest Color</TableCell>
						<TableCell>
							<ColorArray value={[value.closestColor]}></ColorArray>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Closest Color Index</TableCell>
						<TableCell>{value.closestColorIndex}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Closest Color Delta</TableCell>
						<TableCell>{value.closestColorDelta}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
