import { extendTheme } from 'native-base';
import { text } from "./components/text";
import { button } from "./components/button";
import { input } from "./components/input";
import { formControlErrorMessage } from "./components/form-control";

export default function () {
    return extendTheme({
        fontConfig: {
            Roboto: {
                100: {
                    normal: "Roboto-Light",
                    italic: "Roboto-LightItalic",
                },
                200: {
                    normal: "Roboto-Light",
                    italic: "Roboto-LightItalic",
                },
                300: {
                    normal: "Roboto-Light",
                    italic: "Roboto-LightItalic",
                },
                400: {
                    normal: "Roboto-Regular",
                    italic: "Roboto-Italic",
                },
                500: {
                    normal: "Roboto-Medium",
                },
                600: {
                    normal: "Roboto-Medium",
                    italic: "Roboto-MediumItalic",
                },
                700: {
                    normal: 'Roboto-Bold',
                },
                800: {
                    normal: 'Roboto-Bold',
                    italic: 'Roboto-BoldItalic',
                  },
                900: {
                    normal: 'Roboto-Bold',
                    italic: 'Roboto-BoldItalic',
                },
            },
        },

        // Make sure values below matches any of the keys in `fontConfig`
        fonts: {
            heading: "Roboto",
            body: "Roboto",
            mono: "Roboto",
        },

        components: {
            Text: text,
            Button : button,
            Input: input,
            FormControlErrorMessage: formControlErrorMessage,
        }
    });
}