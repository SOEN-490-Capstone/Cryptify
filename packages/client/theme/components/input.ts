export const input = {
    baseStyle: {
        height: "46",
        borderRadius: "10",
        placeholderTextColor: "text.400",
        borderColor: "text.300",
        color: "text.700",

        _hover: {
            borderColor: "darkBlue.500",
        },
        _focus: {
            borderColor: "darkBlue.500",
            bg: "white",

            _hover: {
                borderColor: "darkBlue.500",
            },
            _invalid: {
                borderWidth: "1px",
                borderColor: "error.600",
                bg: "rose.100",
                placeholderTextColor: "error.600",
                _hover: {
                    borderColor: "error.600",
                },
            },
            _ios: {
                selectionColor: "darkBlue.500",
            },
            _android: {
                selectionColor: "darkBlue.500",
            },
        },
        _invalid: {
            borderColor: "error.600",
            bg: "rose.100",
            placeholderTextColor: "error.600",
            _hover: {
                borderColor: "error.600",
                bg: "rose.100",
            },
        },
    },
    variants: {
        outline: {
            borderWidth: "1px",
            _focus: {
                bg: "white",
            },
        },
    },
    sizes: {
        callout: {
            fontSize: "callout",
            lineHeight: "callout",
        },
    },
    defaultProps: {
        size: "callout",
        variant: "outline",
    },
};
