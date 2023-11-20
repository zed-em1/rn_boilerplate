/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import i18nInit from './src/i18n/config/i18n.config'; // <-- this line added
(async () => {
  const language = 'en';
  i18nInit(language);
})();
AppRegistry.registerComponent(appName, () => App);
