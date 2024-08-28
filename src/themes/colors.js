//App colors
const LightColor = {
  light: 'light',
  backgroundColor: '#FFFFFF',
  textColor: '#212121',
  textRevertColor: '#FFFFFF',
  btnColor3: '#EEEEEE',
  inputBg: '#FAFAFA',
  dark3: '#E7E7E7',
  iconColor: '#9E9E9E',
  bColor: '#EEEEEE',
  btnColor: '#101010',
  imageBg: '#F3F3F3',
  primary4: '#404040',
  inactive: '#9E9E9E',
};

const DarkColor = {
  dark: 'dark',
  backgroundColor: '#181A20',
  textColor: '#FFFFFF',
  textRevertColor: '#212121',
  btnColor3: '#1F222A',
  inputBg: '#1F222A',
  dark3: '#35383F',
  iconColor: '#616161',
  bColor: '#35383F',
  btnColor: '#FFFFFF',
  imageBg: '#35383F',
  primary4: '#E0E0E0',
  inactive: '#404040',
};

// Common colors
export const commonColor = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#101010',
  grayScale1: '#F5F5F5',
  grayScale3: '#E0E0E0',
  grayScale4: '#BDBDBD',
  grayScale5: '#9E9E9E',
  grayScale7: '#616161',
  grayScale8: '#424242',
  dark2: '#1F222A',
  primaryTransparent: '#FF4D6714',
  placeHolderColor: '#9E9E9E',
  borderColor: '#35383F',
  inputFocusColor: '#FF4D6714',
  tranparent: '#00000000',
  darkBg: '#181A20',
  redColor: '#F75555',
  lightRed: '#FF5C74',
  lightGray: '#7575751F',
  orange: '#FB9400',
  blue: '#7210FF',
  modalBg: '#00000099',
  disabledColor: '#393939',
  alertColor: '#F75555',
  transparentSilver: '#10101014',
};

export const colors = {
  light: {
    ...LightColor,
    ...commonColor,
  },

  dark: {
    ...DarkColor,
    ...commonColor,
  },
};
