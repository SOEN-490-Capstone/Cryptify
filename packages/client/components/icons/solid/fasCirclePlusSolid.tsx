import { IconDefinition, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export const fasCirclePlusSolid: IconDefinition = {
    icon: [
        // SVG viewbox width (in pixels)
        512,
        // SVG viewbox height (in pixels)
        512,
        // Aliases (not needed)
        ["plus-circle"],
        // Unicode as hex value (not needed)
        "f055",
        // SVG path data
        "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z",
    ],
    iconName: "fac-circle-plus-solid" as IconName,
    prefix: "fac-solid" as IconPrefix,
};
