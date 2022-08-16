import Swal from "sweetalert2";
import __styledVariables from "../global/StyledVariables";

export function __swalErrorMessage(title, text) {
  return Swal.fire({
    title: `${title}`,
    text: `${text}`,
    width: "90%",
    fontSize: 20,
    background: "#F3EED9",
    confirmButtonColor: `${__styledVariables.buttonMainColor}`,
    color: `${__styledVariables.inputFontColor}`,
    icon: "error",
  });
}
