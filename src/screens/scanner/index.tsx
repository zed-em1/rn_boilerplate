import React, { useState } from 'react';
import {} from 'react-native';

import SimpleScan from './simpleScan';
import SelectionScan from './selectionScan';

const Scanner = ({ route }) => {
  const { params } = route;

  const [title, setTitle] = useState(params?.name);
  return title === 'SimpleScan' ? <SimpleScan /> : <SelectionScan />;
};
export default Scanner;
