import React from 'react';
import { Text, View } from 'react-native';

const Alert = ({ text, title, type }) => {
  let viewStyle;
  let titleStyle;
  let textStyle;
  switch (type) {
    case 'success':
      viewStyle = style.success;
      titleStyle = style.successTitle;
      textStyle = style.successText;
      break;
    case 'blue':
      viewStyle = style.default;
      titleStyle = style.defaulTitle;
      textStyle = style.defaulText;
      break;
    case 'warning':
      viewStyle = style.warning;
      titleStyle = style.warningTitle;
      textStyle = style.warningText;
      break;
    case 'danger':
      viewStyle = style.danger;
      titleStyle = style.dangerTitle;
      textStyle = style.dangerText;
      break;
    default:
      viewStyle = style.default;
      titleStyle = style.defaulTitle;
      textStyle = style.defaulText;
      break;
  }
  // const { success, error, warning } = style;
  return (
    <View style={[viewStyle, style.generalViewStyle]}>
      <Text style={titleStyle}>
        {title}
      </Text>
      <Text style={textStyle}>
        {text}
      </Text>
    </View>
  );
};
const style = {
  generalViewStyle: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    
  },
  default: {
    backgroundColor: '#D8EDF6',
  },
  defaultText: {
    textAlign: 'center',
    color: '#2B74A4'
  },
  defaultTitle: {
    textAlign: 'center',
    color: '#2B74A4',
    fontWeight: 'bold'
  },
  success: {
    backgroundColor: '#DEF0DA',
  },
  successText: {
    textAlign: 'center',
    color: '#377544'
  },
  successTitle: {
    textAlign: 'center',
    color: '#377544',
    fontWeight: 'bold'
  },
  warning: {
    backgroundColor: '#FCF8E5',
  },
  warningText: {
    textAlign: 'center',
    color: '#8B6C42',
  },
  warningTitle: {
    textAlign: 'center',
    color: '#8B6C42',
    fontWeight: 'bold'
  },
  danger: {
    backgroundColor: '#F3DEDE',
  },
  dangerText: {
    textAlign: 'center',
    color: '#AC4344'
  },
  dangerTitle: {
    textAlign: 'center',
    color: '#AC4344',
    fontWeight: 'bold'
  }
};
export { Alert };
