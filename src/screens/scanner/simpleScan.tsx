import React, { useEffect, useRef, useState } from 'react';
import { Alert, AppState, AppStateStatus, BackHandler } from 'react-native';
import {
  BarcodeCapture,
  BarcodeCaptureOverlay,
  BarcodeCaptureOverlayStyle,
  BarcodeCaptureSession,
  BarcodeCaptureSettings,
  Symbology,
  SymbologyDescription,
} from 'scandit-react-native-datacapture-barcode';
import {
  Camera,
  CameraSettings,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  RectangularViewfinder,
  RectangularViewfinderStyle,
  RectangularViewfinderLineStyle,
  VideoResolution,
} from 'scandit-react-native-datacapture-core';

import { requestCameraPermissionsIfNeeded } from '../../camera-permission-handler';

const SimpleScan = () => {
  const viewRef = useRef<DataCaptureView>(null);

  const [dataCaptureContext, setDataCaptureContext] = React.useState(
    DataCaptureContext.forLicenseKey(
      'AYvD5Q06KSf5DckxZAtmcGYN1lZiEUK4u19Pi6J5Gdj9UzG8TyXME+05RClnJetWc1ZJIDRgZR/xRSbGhlZ/nLpysRGBIlZ0jCrCE4RqiMpKTivOr27EwU9FL2T9Xd9lKXbO5TAAYAIlPyU9pwE3SZlnugq8TiUT7FqGZoxMMdkTZs+FqgNTLOokq6dnbVRzby7CJwckeE4BcdUJl38Qpwl82BuvV2MmYUoiOJYksQDee3nXtGI+khVqe/NKNEStfFixoJFrHLabEsgFVn9N9nZSjmKvA+KQcFlUq8oS2cgGc8zimnjXbL53XWqlQ0fltGLCMDBKc1XbD+3JR2CxmKsBpF43QA3mCEnmIKhVKXg8YZBgXmajfoNEIY/pQrarpV3hNIsHsHCUKXmUakg3MH4F6saCZAHRLFZz2KBRtG9eB9h/K1i4cJI6yxMEeIC44WSsudkImHT/dXuwfmh2ck1qH6O/THy6SgGyYgwTHvw3ZwaWwkTF32hdqboNQ/CY+gAzFcslDiDESxJlzWZeiFhaIj1dfXGLlHXGSJdEV+ydCo1FDMDvfxfo2q7/MAqAA3WSCi9zP00dZOCDxYi5eYuqo/kKfsiy5BiyQf0az788n3lC5ogR0zBm2mP3poDza+Vk0w/2ximMa1HmgeuxlF5s+WQ8WTWasKDNj/+Bkd2RD4htoq/cxIEuzJPyEscBd/F7jo4QArYsUdMsxdsZ/TqKEfdCjauMbyP4f4kuks9fusm5MdEy4yCZ7sCu8cwQ8iPwTB5o/DFw8uKMMItOz6pvSEyZ+/80PBjZGngE0q+DFMzng6B9A90bmfgBiZALM3M0cALZMSZ2eQAqbnClpVs60/reJjZDy8sw2jCp85YVnrpeCuXjvj8IQ/o0HP0cg+BjbyP9YGaOYS8ogsJGR93VYNLc5yN1XgMCrKrMW1a6oVlViG3BDtLkziyAVPU7JlR8/WNUGeLcljLi24cwdLgTmD+oJLgegEr4Vsr4IqmRQYjRYKQppDWGuZTrFeQgxVHiIqmjdsYfPM8TQHq6WZMrS6rZS52G1RqYf9ISs+vRM6+nzUhfdjv6kT+MAoOThEMKXmLCerI5tN90wPwy3NWNE6i6S1RkilrfoKQe3h/xZxCdfsSYkA8r+EdqsSbBu5YfgmbtRmV03dv8ZvJVKOa/aP7pzeOt68tn5zHcLCWVIf2PfmZr/WbFBxWjsiT63ktnYsXgwNgbaRJqP0ko7aVvmg=='
    )
  );
  const [camera, setCamera] = useState<Camera | null>(Camera.default);
  const [barcodeCaptureMode, setBarcodeCaptureMode] =
    useState<BarcodeCapture | null>(null);
  const [isBarcodeCaptureEnabled, setIsBarcodeCaptureEnabled] = useState(false);
  const [cameraState, setCameraState] = useState(FrameSourceState.Off);

  const lastCommand = useRef<string | null>(null);

  useEffect(() => {
    const handleAppStateChangeSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    setupScanning();
    startCapture();
    return () => {
      handleAppStateChangeSubscription.remove();
      stopCapture();
      dataCaptureContext.dispose();
    };
  }, []);

  useEffect(() => {
    if (camera) {
      camera.switchToDesiredState(cameraState);
    }
  }, [cameraState]);

  useEffect(() => {
    if (barcodeCaptureMode) {
      barcodeCaptureMode.isEnabled = isBarcodeCaptureEnabled;
    }
  }, [isBarcodeCaptureEnabled]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState.match(/inactive|background/)) {
      stopCapture();
    } else {
      startCapture();
    }
  };

  const setupScanning = () => {
    // Use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
    // default and must be turned on to start streaming frames to the data capture context for recognition.
    const cameraSettings = new CameraSettings();
    cameraSettings.preferredResolution = VideoResolution.FullHD;
    camera?.applySettings(cameraSettings);

    dataCaptureContext.setFrameSource(camera);
    setCamera(camera);

    // The barcode capturing process is configured through barcode capture settings
    // and are then applied to the barcode capture instance that manages barcode recognition.
    const settings = new BarcodeCaptureSettings();

    // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
    // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
    // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
    settings.enableSymbologies([
      Symbology.EAN13UPCA,
      Symbology.EAN8,
      Symbology.UPCE,
      Symbology.QR,
      Symbology.DataMatrix,
      Symbology.Code39,
      Symbology.Code128,
      Symbology.InterleavedTwoOfFive,
    ]);

    // Some linear/1d barcode symbologies allow you to encode variable-length data. By default, the Scandit
    // Data Capture SDK only scans barcodes in a certain length range. If your application requires scanning of one
    // of these symbologies, and the length is falling outside the default range, you may need to adjust the "active
    // symbol counts" for this symbology. This is shown in the following few lines of code for one of the
    // variable-length symbologies.
    const symbologySettings = settings.settingsForSymbology(Symbology.Code39);
    symbologySettings.activeSymbolCounts = [
      7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    // Create new barcode capture mode with the settings from above.
    const barcodeCapture = BarcodeCapture.forContext(
      dataCaptureContext,
      settings
    );

    // Register a listener to get informed whenever a new barcode got recognized.
    const barcodeCaptureListener = {
      didScan: (_: BarcodeCapture, session: BarcodeCaptureSession) => {
        const barcode = session.newlyRecognizedBarcodes[0];
        const symbology = new SymbologyDescription(barcode.symbology);

        // The `alert` call blocks execution until it's dismissed by the user. As no further frames would be processed
        // until the alert dialog is dismissed, we're showing the alert through a timeout and disabling the barcode
        // capture mode until the dialog is dismissed, as you should not block the BarcodeCaptureListener callbacks for
        // longer periods of time. See the documentation to learn more about this.
        setIsBarcodeCaptureEnabled(false);

        Alert.alert(
          '',
          `Scanned: ${barcode.data} (${symbology.readableName})`,
          [{ text: 'OK', onPress: () => setIsBarcodeCaptureEnabled(true) }],
          { cancelable: false }
        );
      },
    };

    // Add the listener to the barcode capture context.
    barcodeCapture.addListener(barcodeCaptureListener);

    // Add a barcode capture overlay to the data capture view to render the location of captured barcodes on top of
    // the video preview, using the Frame overlay style. This is optional, but recommended for better visual feedback.
    const overlay = BarcodeCaptureOverlay.withBarcodeCaptureForViewWithStyle(
      barcodeCapture,
      null,
      BarcodeCaptureOverlayStyle.Frame
    );
    overlay.viewfinder = new RectangularViewfinder(
      RectangularViewfinderStyle.Square,
      RectangularViewfinderLineStyle.Light
    );
    viewRef.current?.addOverlay(overlay);
    setBarcodeCaptureMode(barcodeCapture);
  };

  const startCapture = async () => {
    if (lastCommand.current === 'startCapture') {
      return;
    }
    lastCommand.current = 'startCapture';
    startCamera();
    setIsBarcodeCaptureEnabled(true);
  };

  const stopCapture = () => {
    if (lastCommand.current === 'stopCapture') {
      return;
    }
    lastCommand.current = 'stopCapture';
    setIsBarcodeCaptureEnabled(false);
    stopCamera();
  };

  const startCamera = () => {
    // Switch camera on to start streaming frames and enable the barcode capture mode.
    // The camera is started asynchronously and will take some time to completely turn on.
    requestCameraPermissionsIfNeeded()
      .then(() => setCameraState(FrameSourceState.On))
      .catch(() => BackHandler.exitApp());
  };

  const stopCamera = () => {
    if (camera) {
      setCameraState(FrameSourceState.Off);
    }
  };

  return (
    <DataCaptureView
      style={{ flex: 1 }}
      context={dataCaptureContext}
      ref={viewRef}
    />
  );
};

export default SimpleScan;
