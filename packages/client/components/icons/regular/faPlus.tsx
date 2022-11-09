import { IconDefinition, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export const faPlus: IconDefinition = {
    icon: [
        // SVG viewbox width (in pixels)
        448,
        // SVG viewbox height (in pixels)
        512,
        // Aliases (not needed)
        ["add"],
        // Unicode as hex value (not needed)
        "f067",
        // SVG path data
        "M432 256C432 269.3 421.3 280 408 280h-160v160c0 13.25-10.75 24.01-24 24.01S200 453.3 200 440v-160h-160c-13.25 0-24-10.74-24-23.99C16 242.8 26.75 232 40 232h160v-160c0-13.25 10.75-23.99 24-23.99S248 58.75 248 72v160h160C421.3 232 432 242.8 432 256z",
    ],
    iconName: "fac-plus" as IconName,
    prefix: "fac-regular" as IconPrefix,
};
