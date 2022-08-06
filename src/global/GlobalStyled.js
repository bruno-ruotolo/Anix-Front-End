import { createGlobalStyle } from "styled-components";

import __styledVariables from "./StyledVariables";

const GlobalStyled = createGlobalStyle`
//RESET STYLES

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

//DEFAULT STYLES
* {
  box-sizing: border-box;
}

body {
	background-image: linear-gradient(#009090, #8f678b);
	background-color: #009090;
	height: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display:flex;
  align-items:center;
  justify-content:center;
}

button {
	display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #28161C;
  font-family: --main-font;

  font-family:${__styledVariables.mainFont};
  font-style: normal;
  font-weight: 400;
  font-size: 32px;;
  line-height: 44px;

	color: ${__styledVariables.buttonFontColor};
}

input {
	min-width: 319px;
  width: 85%;
  max-width: 1000px;
	height: 55px;
	border-style: solid;
  border-width: 2px;
	border-color: #28161C;
	background: ${__styledVariables.inputMainColor};
	border-radius: 10px;
	padding-left: 15px;
	padding-right: 35px;
	margin-bottom: 25px;
	
	font-family: ${__styledVariables.mainFont};
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 27px;
	color: ${__styledVariables.inputFontColor};
}

form {
	position: absolute;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-item {
  font-family: ${__styledVariables.mainFont};
}

.swal2-title, 
.swal2-html-container,
.swal2-confirm
.swal2-styled {
	font-family: ${__styledVariables.mainFont};
}

.swal2-confirm {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	width: 160px;

	text-align: center;
	vertical-align: center;
	font-size: 50px;
}

`;

export default GlobalStyled;
