import Colors from '../colors';



const light = {
  dark: false,
  colors: {
    primary: Colors.Primary,
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: Colors.PrimaryTextColor,
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    xyz: 'yellow',
  },
};

const dark = {
  dark: true,
  colors: {
    primary: Colors.Red,
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: Colors.White,
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    xyz: 'yellow',
  },
};

export default { light, dark };
