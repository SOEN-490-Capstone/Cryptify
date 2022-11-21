export const radio = {
    baseStyle: {
        borderWidth: 1,
        borderRadius: "full",
        p: 1,
        bg: "white",
        borderColor: "text.200",
        _checked: {
            borderColor: `darkBlue.500`,
            _icon: {
                color: `darkBlue.500`,
            },
            _hover: {
                borderColor: `darkBlue.500`,
                _icon: { color: `darkBlue.500` },
            },
            _pressed: {
                borderColor: `darkBlue.500`,
                _icon: { color: `darkBlue.500` },
            },
        },
    },
    defaultProps: {
        size: "lg",
        _text: {
            color: "text.700",
            fontSize: "body",
            lineHeight: "body",
        },
    },
};
