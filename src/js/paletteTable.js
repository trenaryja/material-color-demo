import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import { theme } from "./utils";
import JsonBlock from "./jsonBlock";
import ColorArray from "./colorArray";
import chroma from "chroma-js";
import * as materialColor from "@trenaryja/material-color";

export default () => {
	const [colorDictionaryAsArray, setColorDictionaryAsArray] = useState([{ default: theme.palette.primary.main }]);
	const [currentlyEditing, setCurrentlyEditing] = useState(null);
	const [editValues, setEditValues] = useState({ key: null, value: null });

	const colorDictionary = colorDictionaryAsArray.reduce((acc, x) => {
		acc[Object.keys(x)[0]] = Object.values(x)[0];
		return acc;
	}, {});

	const keyIsValid = true; //TODO: test if key is taken
	const valueIsValid = chroma.valid(editValues.value);
	const canSave = keyIsValid && valueIsValid;
	const canDelete = Object.keys(colorDictionary).length > 1;
	const colorPalette = materialColor.createPalette(colorDictionary);

	const handleEdit = (key) => {
		setCurrentlyEditing(key);
		editValues.key = key;
		editValues.value = colorDictionary[key];
		setEditValues({ ...editValues });
	};

	const handleKeyUpdate = (e) => {
		editValues.key = e.target.value;
		setEditValues({ ...editValues });
	};

	const handleValueUpdate = (e) => {
		editValues.value = e.target.value;
		setEditValues({ ...editValues });
	};

	const handleAddNew = () => {
		const max = Math.max(
			...Object.keys(colorDictionary)
				.filter((x) => x.match(/^default\d*$/))
				.map((x) => Number(x.replace(/[^\d]/g, ""))),
		);
		const newKey = "default" + (max >= 0 ? max + 1 : "");
		const newEntry = {};
		newEntry[newKey] = theme.palette.primary.main;
		colorDictionaryAsArray.push(newEntry);
		setColorDictionaryAsArray([...colorDictionaryAsArray]);
	};

	const handleDelete = (key) => {
		setColorDictionaryAsArray(colorDictionaryAsArray.filter((x) => !x[key]));
	};

	const handleSave = () => {
		const entry = colorDictionaryAsArray[colorDictionaryAsArray.findIndex((x) => x[currentlyEditing])];
		delete entry[currentlyEditing];
		entry[editValues.key] = editValues.value;
		setColorDictionaryAsArray([...colorDictionaryAsArray]);
		setCurrentlyEditing(null);
	};

	const handleCancel = () => {
		setCurrentlyEditing(null);
	};

	const handleKeyUp = (e) => {
		if (e.key === "Enter" && canSave) handleSave();
	};

	return (
		<React.Fragment>
			<TableContainer style={{ width: "auto" }} component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell style={{ width: "20%" }}>
								<IconButton size="small" onClick={handleAddNew}>
									<AddIcon />
								</IconButton>
							</TableCell>
							<TableCell style={{ width: "40%" }} align="center">
								Key
							</TableCell>
							<TableCell style={{ width: "40%" }} align="center">
								Value
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(colorDictionary).map((key) => (
							<TableRow key={key}>
								<TableCell>
									{currentlyEditing === key ? (
										<React.Fragment>
											<IconButton disabled={!canSave} size="small" onClick={handleSave}>
												<SaveIcon />
											</IconButton>
											<IconButton size="small" onClick={handleCancel}>
												<CancelIcon />
											</IconButton>
										</React.Fragment>
									) : (
										<React.Fragment>
											<IconButton size="small" onClick={() => handleEdit(key)}>
												<EditIcon />
											</IconButton>
											<IconButton
												disabled={!canDelete}
												size="small"
												onClick={() => handleDelete(key)}
											>
												<DeleteIcon />
											</IconButton>
										</React.Fragment>
									)}
								</TableCell>
								<TableCell>
									{currentlyEditing === key ? (
										<TextField
											error={!keyIsValid}
											value={editValues.key}
											onChange={handleKeyUpdate}
											onKeyUp={handleKeyUp}
										></TextField>
									) : (
										key
									)}
								</TableCell>
								<TableCell>
									{currentlyEditing === key ? (
										<TextField
											error={!valueIsValid}
											value={editValues.value}
											onChange={handleValueUpdate}
											onKeyUp={handleKeyUp}
										></TextField>
									) : (
										colorDictionary[key]
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<div>
				{Object.keys(colorDictionary).map((key) => (
					<ColorArray key={key} value={materialColor.createColorArray(colorDictionary[key])}></ColorArray>
				))}
			</div>
			<JsonBlock value={colorPalette}></JsonBlock>
		</React.Fragment>
	);
};
