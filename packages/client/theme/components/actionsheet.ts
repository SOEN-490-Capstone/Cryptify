export const Actionsheet = {
    defaultProps: {
        size: "full",
        justifyContent: "flex-end",
        animationPreset: "slide",
    },
};

// ActionsheetContent
export const ActionsheetContent = {
    baseStyle: {
        alignItems: "flex-start", //
        px: 0,
        py: 2,
        borderRadius: "none",
        roundedTop: 20,
        bg: "white", //

        _dragIndicator: {
            height: "4px",
            width: "64px",
            borderRadius: 2,
            bg: "muted.500",
        },

        _dragIndicatorWrapper: {
            pt: 1.5,
            pb: 1.5,
            mt: -2,
        },
    },
};

// ActionsheetItem
export const ActionsheetItem = {
    baseStyle: {
        width: "100%",
        justifyContent: "flex-start",
        p: 3,
        _text: {
            color: "text.700",
            fontSize: "body",
            lineHeight: "body",
        },
        bg: "white",

        _icon: {
            color: "muted.500",
        },

        _hover: {
            bg: "white",
        },
        _pressed: {
            bg: "white",
        },
        _focusVisible: {
            _web: {
                outlineWidth: "0",
                style: { boxShadow: `none` },
                bg: "muted.300",
            },
            bg: "muted.300",
        },
    },
};
