import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	palette: {
		type: "dark",
	},
});

export const copyToClipboard = (text) => {
	const handler = (e) => {
		e.clipboardData.setData("text/plain", text);
		e.preventDefault();
	};
	document.addEventListener("copy", handler, true);
	document.execCommand("copy");
	document.removeEventListener("copy", handler, true);
};
