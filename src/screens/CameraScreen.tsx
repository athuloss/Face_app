import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import FaceDetection from '@react-native-ml-kit/face-detection';

export default function camera_page() {
  const device = useCameraDevice('front');
  const cameraRef = useRef<Camera>(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [faceCount, setFaceCount] = useState(0);

  // NEW STATES
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [captureTime, setCaptureTime] = useState('');

  // 🔴 Ask Camera Permission
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // 🔴 Live Detection Loop (Stops when frozen)
  useEffect(() => {
    if (!hasPermission || isFrozen) return;

    const interval = setInterval(async () => {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePhoto({
            enableShutterSound: false,
          });

          const imagePath = `file://${photo.path}`;

          const faces = await FaceDetection.detect(imagePath);
          setFaceCount(faces.length);
        } catch (error) {
          console.log('Detection Error:', error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasPermission, isFrozen]);

  // 🔴 Capture Button Logic
  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto({
        enableShutterSound: true,
      });

      const imagePath = `file://${photo.path}`;

      setCapturedImage(imagePath);
      setIsFrozen(true);

      const now = new Date();
      setCaptureTime(now.toLocaleString());
    } catch (err) {
      console.log('Capture error:', err);
    }
  };

  // 🔴 Retake (Back to Live Camera)
  const handleRetake = () => {
    setIsFrozen(false);
    setCapturedImage(null);
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.loading}>
        <Text>Loading Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* 🔴 Show Camera OR Frozen Image */}
      {!isFrozen ? (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      ) : (
        <Image
          source={{uri: capturedImage!}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      )}

      {/* 🔴 Face Count Overlay */}
      {!isFrozen && (
        <View style={styles.overlay}>
          <Text style={styles.text}>Face Count: {faceCount}</Text>
        </View>
      )}

      {/* 🔴 Capture Button */}
      {!isFrozen && (
        <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
          <Text style={styles.btnText}>CAPTURE</Text>
        </TouchableOpacity>
      )}

      {/* 🔴 After Capture Show Info */}
      {isFrozen && (
        <View style={styles.infoBox}>
          <Text style={styles.text}>Captured At:</Text>
          <Text style={styles.text}>{captureTime}</Text>
          <Text style={styles.text}>Faces Detected: {faceCount}</Text>

          <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake}>
            <Text style={styles.btnText}>RETAKE</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
};


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
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },

  captureBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
  },

  infoBox: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },

  retakeBtn: {
    marginTop: 15,
    backgroundColor: '#ff4444',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },

  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
