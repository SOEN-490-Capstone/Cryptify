import { IconDefinition, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export const faWalletCustom: IconDefinition = {
    icon: [
        // SVG viewbox width (in pixels)
        512,
        // SVG viewbox height (in pixels)
        512,
        // Aliases (not needed)
        [],
        // Unicode as hex value (not needed)
        "",
        // SVG path data
        "M448 96H112C103.1 96 96 103.1 96 112S103.1 128 112 128H448c17.67 0 32 14.33 32 32v256c0 17.6-14.4 32-32 32H96c-35.2 0-64-28.8-64-64V128c0-35.2 28.8-64 64-64h368C472.8 64 480 56.84 480 48C480 39.16 472.8 32 464 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h352c35.35 0 64-28.65 64-64V160C512 124.7 483.3 96 448 96zM408 288c0-13.22-10.78-24-24-24S360 274.8 360 288S370.8 312 384 312S408 301.2 408 288z",
    ],
    iconName: "custom-fa-wallet" as IconName,
    prefix: "custom" as IconPrefix,
};