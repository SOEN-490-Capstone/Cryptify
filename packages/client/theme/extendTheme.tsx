import { extendTheme } from "native-base";
import { text } from "./components/text";
import { button } from "./components/button";
import { input } from "./components/input";
import { formControlErrorMessage } from "./components/form-control";

export default function () {
    return extendTheme({
        components: {
            Text: text,
            Button: button,
            Input: input,
            FormControlErrorMessage: formControlErrorMessage,
        },
    });
}
