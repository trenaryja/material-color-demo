import React from "react";
import { Paper, Fab } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { copyToClipboard } from "./utils";

export default ({ value }) => {
	const text = JSON.stringify(value, null, "\t");

	return (
		<Paper style={{ position: "relative" }} className="code">
			<pre>
				<code className="language-json">{text}</code>
			</pre>
			<Fab
				style={{ position: "absolute", right: 0, bottom: 0, margin: "1.5em" }}
				color="primary"
				onClick={() => copyToClipboard(text)}
			>
				<FileCopy />
			</Fab>
		</Paper>
	);
};
