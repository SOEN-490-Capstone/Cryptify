export const checkbox = {
    baseStyle: {
        borderWidth: 1,
        p: 1,
        bg: "white",
        borderColor: "text.300",
        _checked: {
            borderColor: `darkBlue.500`,
            bg: `darkBlue.500`,
            _icon: {
                color: `muted.50`,
            },
            _hover: {
                borderColor: `darkBlue.500`,
                _icon: { color: `darkBlue.500` },
            },
            _pressed: {
                borderColor: `darkBlue.500`,
                bg: `darkBlue.500`,
                _icon: { color: `muted.50` },
            },
        },
        _stack: {
            space: 15,
        },
    },
    defaultProps: {
        size: "md",
        _text: {
            color: "text.700",
            fontSize: "body",
            lineHeight: "body",
        },
    },
};
