import * as React from 'react';
import { ASYNCSTORAGE_KEYS, CONSTANTS } from '../constants';

import { useTranslation } from 'react-i18next';
import { getItem, setItem } from '../utills/asyncstorage';

const useLocalization = () => {
  const { i18n } = useTranslation();
  const [languageDataSet, setLanguageDataset] = React.useState(
    CONSTANTS.languageData
  );
  //const [languageState, setLanguageState] = React.useState(Variable.DISABLED);
  const [language, setLanguage] = React.useState(CONSTANTS.en);

  React.useEffect(() => {
    setLanguageDataset(CONSTANTS.languageData);
  }, []);

  const changeLanguage = async (item: any) =>
    new Promise(async (resolve, reject) => {
      try {
        const currentLanguage = await getItem(
          ASYNCSTORAGE_KEYS.currentLanguage
        );
        if (item?.language !== currentLanguage) {
          await i18n.changeLanguage(item?.language?.toLowerCase());
          await setItem(ASYNCSTORAGE_KEYS.currentLanguage, item?.language);

          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        reject(error);
      }
    });

  return {
    languageDataSet,

    //onSelectionChange,
    activeItem: languageDataSet.find((item) => item.isSelected),
    language,
    changeLanguage,
  };
};

export default useLocalization;
