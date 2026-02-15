import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import FaceDetection from '@react-native-ml-kit/face-detection';

const HomePage = () => {
  const device = useCameraDevice('front');
  const cameraRef = useRef<Camera>(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [faceCount, setFaceCount] = useState(0);

  // 🔴 Ask Camera Permission
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // 🔴 Live Detection Loop
  useEffect(() => {
    if (!hasPermission) return;

    const interval = setInterval(async () => {
      if (cameraRef.current) {
        try {
          // Take frame (photo)
          const photo = await cameraRef.current.takePhoto({
            enableShutterSound: false,
          });

          // 🔴 VERY IMPORTANT — convert to file URI
          const imagePath = `file://${photo.path}`;

          // Detect faces
          const faces = await FaceDetection.detect(imagePath);

          console.log('Faces detected:', faces.length);

          // Update UI
          setFaceCount(faces.length);
        } catch (error) {
          console.log('Detection Error:', error);
        }
      }
    }, 1000); // detect every 1 second

    return () => clearInterval(interval);
  }, [hasPermission]);

  if (!device || !hasPermission) {
    return (
      <View style={styles.loading}>
        <Text>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔴 Camera Preview */}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* 🔴 Face Count Display */}
      <View style={styles.overlay}>
        <Text style={styles.text}>Face Count: {faceCount}</Text>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
