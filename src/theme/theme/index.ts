import Colors from '../colors';

const light = {
  dark: false,
  colors: {
    primary: Colors.Primary,
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: Colors.PrimaryTextColor,
    border: 'black',
    notification: 'rgb(255, 69, 58)',
  },
};

const dark = {
  dark: true,
  colors: {
    primary: Colors.Red,
    background: 'red',
    card: 'rgb(255, 255, 255)',
    text: Colors.White,
    border: 'white',
    notification: 'rgb(255, 69, 58)',
  },
};

export default { light, dark };
