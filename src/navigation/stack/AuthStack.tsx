import { Login } from '../../screens';
import { SCREEN_NAMES } from '../../constants';

export const AuthStack = [
  {
    name: SCREEN_NAMES.LogIn,
    component: Login,
    key: SCREEN_NAMES.LogIn,
  },
];
