import { extendTheme } from "native-base";
import { typography } from "./base/typography";
import { text } from "./components/text";
import { button } from "./components/button";
import { input } from "./components/input";
import { formControlErrorMessage } from "./components/form-control";
import { ActionsheetContent, ActionsheetItem } from "./components/actionsheet";
import { radio } from "./components/radio";

export default function () {
    return extendTheme({
        ...typography,
        components: {
            Text: text,
            Button: button,
            Input: input,
            FormControlErrorMessage: formControlErrorMessage,
            ActionsheetContent: ActionsheetContent,
            ActionsheetItem: ActionsheetItem,
            Radio: radio,
        },
    });
}
