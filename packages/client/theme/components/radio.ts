const baseStyle = (props: Record<string, any>) => {
    const { colorScheme: c, theme } = props;
    const { colors } = theme;
    return {
      borderWidth: 1.25,
      borderRadius: 'full',
      p: 1.5,
     
 
      bg: 'white',
      borderColor: 'text.200',
 
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
 
    };
  };
 
  const defaultProps = {
    _icon: { size: 3 },
     _text: {
      color: 'text.700',
      fontSize: 'body',
      lineHeight: 'body',
    },
  };
 
  export default {
    baseStyle,
    defaultProps,
  };
