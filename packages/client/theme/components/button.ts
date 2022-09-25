export const button = {
    baseStyle: {
        borderRadius: '100',
        height: '50',
        _text: {
            fontWeight: 'semibold',
        },
        _loading: {
            opacity: '60',
        },
    },
    variants: {
        solid: {
            bg: 'darkBlue.500',
            _text: {
                color: 'white',
            },
            _hover: {
                bg: 'darkBlue.500',
                opacity: '60',
            },
            _pressed: {
                bg: 'darkBlue.500',
                opacity: '60',
            },
        },
    },
    defaultProps: {
        variant: 'solid',
        size: 'lg',
    },
};