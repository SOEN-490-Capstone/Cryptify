import { IconDefinition, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export const farXMark: IconDefinition = {
    icon: [
        // SVG viewbox width (in pixels)
        320,
        // SVG viewbox height (in pixels)
        512,
        // Aliases (not needed)
        ["close", "multiply", "remove", "times"],
        // Unicode as hex value (not needed)
        "f00d",
        // SVG path data
        "M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z",
    ],
    iconName: "fac-xmark" as IconName,
    prefix: "fac-regular" as IconPrefix,
};
