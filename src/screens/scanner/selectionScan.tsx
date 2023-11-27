import React, { useState, useRef, useEffect } from 'react';
import {
  AppState,
  BackHandler,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  BarcodeSelection,
  BarcodeSelectionAimerSelection,
  BarcodeSelectionBasicOverlay,
  BarcodeSelectionSettings,
  BarcodeSelectionTapSelection,
  Symbology,
  SymbologyDescription,
} from 'scandit-react-native-datacapture-barcode';
import {
  Camera,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
} from 'scandit-react-native-datacapture-core';

import { requestCameraPermissionsIfNeeded } from '../../camera-permission-handler';

const licenseKey =
  'AYvD5Q06KSf5DckxZAtmcGYN1lZiEUK4u19Pi6J5Gdj9UzG8TyXME+05RClnJetWc1ZJIDRgZR/xRSbGhlZ/nLpysRGBIlZ0jCrCE4RqiMpKTivOr27EwU9FL2T9Xd9lKXbO5TAAYAIlPyU9pwE3SZlnugq8TiUT7FqGZoxMMdkTZs+FqgNTLOokq6dnbVRzby7CJwckeE4BcdUJl38Qpwl82BuvV2MmYUoiOJYksQDee3nXtGI+khVqe/NKNEStfFixoJFrHLabEsgFVn9N9nZSjmKvA+KQcFlUq8oS2cgGc8zimnjXbL53XWqlQ0fltGLCMDBKc1XbD+3JR2CxmKsBpF43QA3mCEnmIKhVKXg8YZBgXmajfoNEIY/pQrarpV3hNIsHsHCUKXmUakg3MH4F6saCZAHRLFZz2KBRtG9eB9h/K1i4cJI6yxMEeIC44WSsudkImHT/dXuwfmh2ck1qH6O/THy6SgGyYgwTHvw3ZwaWwkTF32hdqboNQ/CY+gAzFcslDiDESxJlzWZeiFhaIj1dfXGLlHXGSJdEV+ydCo1FDMDvfxfo2q7/MAqAA3WSCi9zP00dZOCDxYi5eYuqo/kKfsiy5BiyQf0az788n3lC5ogR0zBm2mP3poDza+Vk0w/2ximMa1HmgeuxlF5s+WQ8WTWasKDNj/+Bkd2RD4htoq/cxIEuzJPyEscBd/F7jo4QArYsUdMsxdsZ/TqKEfdCjauMbyP4f4kuks9fusm5MdEy4yCZ7sCu8cwQ8iPwTB5o/DFw8uKMMItOz6pvSEyZ+/80PBjZGngE0q+DFMzng6B9A90bmfgBiZALM3M0cALZMSZ2eQAqbnClpVs60/reJjZDy8sw2jCp85YVnrpeCuXjvj8IQ/o0HP0cg+BjbyP9YGaOYS8ogsJGR93VYNLc5yN1XgMCrKrMW1a6oVlViG3BDtLkziyAVPU7JlR8/WNUGeLcljLi24cwdLgTmD+oJLgegEr4Vsr4IqmRQYjRYKQppDWGuZTrFeQgxVHiIqmjdsYfPM8TQHq6WZMrS6rZS52G1RqYf9ISs+vRM6+nzUhfdjv6kT+MAoOThEMKXmLCerI5tN90wPwy3NWNE6i6S1RkilrfoKQe3h/xZxCdfsSYkA8r+EdqsSbBu5YfgmbtRmV03dv8ZvJVKOa/aP7pzeOt68tn5zHcLCWVIf2PfmZr/WbFBxWjsiT63ktnYsXgwNgbaRJqP0ko7aVvmg==';

const SelectionType = {
  tap: 'tap',
  aim: 'aim',
};

const Scanner = () => {
  const [selectionType, setSelectionType] = useState(SelectionType.tap);
  const [result, setResult] = useState<string | null>(null);
  const [camera, setCamera] = useState(Camera.default);
  const [dataCaptureContext, setDataCaptureContext] = useState(
    DataCaptureContext.forLicenseKey(licenseKey)
  );
  const barcodeSelectionSettings = new BarcodeSelectionSettings();
  barcodeSelectionSettings.enableSymbologies([
    Symbology.EAN13UPCA,
    Symbology.EAN8,
    Symbology.UPCE,
    Symbology.QR,
    Symbology.DataMatrix,
    Symbology.Code39,
    Symbology.Code128,
  ]);
  const barcodeSelection = BarcodeSelection.forContext(
    dataCaptureContext,
    barcodeSelectionSettings
  );

  const viewRef = useRef();

  useEffect(() => {
    const handleAppStateChangeSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    startCamera();

    barcodeSelection.addListener({
      didUpdateSelection: (barcodeSelection, session, _) => {
        const barcode = session.newlySelectedBarcodes[0];

        if (!barcode) {
          return;
        }

        const symbology = new SymbologyDescription(barcode.symbology);

        session.getCount(barcode).then((count) => {
          const result = `Scan Results\n${symbology.readableName}: ${barcode.data}\nTimes: ${count}`;
          setResult(result);
          setTimeout(() => {
            setResult(null);
          }, 500);
        });
      },
    });

    setupSelectionType(selectionType);

    return () => {
      handleAppStateChangeSubscription.remove();
      dataCaptureContext.dispose();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState.match(/inactive|background/)) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const stopCamera = () => {
    if (camera) {
      camera.switchToDesiredState(FrameSourceState.Off);
    }
  };

  useEffect(() => {
    if (camera) {
      dataCaptureContext.setFrameSource(camera);

      const cameraSettings = BarcodeSelection.recommendedCameraSettings;
      camera?.applySettings(cameraSettings);
    }
  }, [camera]);

  const startCamera = async () => {
    if (!camera) {
      setCamera(Camera.default);
    }

    requestCameraPermissionsIfNeeded()
      .then(() => camera?.switchToDesiredState(FrameSourceState.On))
      .catch(() => BackHandler.exitApp());
  };

  useEffect(() => {
    if (selectionType) {
      setupSelectionType(selectionType);
    }
  }, [selectionType]);

  const setupSelectionType = (selectionType: string) => {
    if (selectionType === SelectionType.tap) {
      barcodeSelectionSettings.selectionType =
        BarcodeSelectionTapSelection.tapSelection;
      barcodeSelection?.applySettings(barcodeSelectionSettings);
      console.warn({ barcodeSelectionSettings, barcodeSelection });
    } else if (selectionType == SelectionType.aim) {
      barcodeSelectionSettings.selectionType =
        BarcodeSelectionAimerSelection.aimerSelection;
      barcodeSelection?.applySettings(barcodeSelectionSettings);
      console.warn({ barcodeSelectionSettings, barcodeSelection });
    }
  };

  return (
    <>
      <DataCaptureView
        style={{ flex: 1 }}
        context={dataCaptureContext}
        ref={viewRef.current}
      ></DataCaptureView>

      <SafeAreaView
        style={{
          width: '100%',
          backgroundColor: 'black',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setSelectionType(SelectionType.tap)}
        >
          <Text
            style={{
              padding: 15,
              color: selectionType == SelectionType.tap ? 'white' : 'grey',
            }}
          >
            Tap to Select
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => setSelectionType(SelectionType.aim)}
        >
          <Text
            style={{
              padding: 15,
              color: selectionType == SelectionType.aim ? 'white' : 'grey',
            }}
          >
            Aim to Select
          </Text>
        </TouchableWithoutFeedback>
      </SafeAreaView>

      {result && (
        <Text
          style={{
            position: 'absolute',
            top: 100,
            width: '100%',
            textAlign: 'center',
            backgroundColor: '#FFFC',
            padding: 20,
          }}
        >
          {result}
        </Text>
      )}
    </>
  );
};
export default Scanner;
