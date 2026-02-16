import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import FaceDetection from '@react-native-ml-kit/face-detection';

export default function CameraScreen() {
  const device = useCameraDevice('front');
  const cameraRef = useRef<Camera>(null);

  const [permission, setPermission] = useState(false);
  const [faceCount, setFaceCount] = useState(0);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [frozen, setFrozen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (!permission || frozen) return;

    const timer = setInterval(async () => {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePhoto({
            enableShutterSound: false,
          });

          const path = `file://${photo.path}`;
          const faces = await FaceDetection.detect(path);
          setFaceCount(faces.length);
        } catch (e) {
          console.log(e);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [permission, frozen]);

  const capturePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto({
        enableShutterSound: true,
      });

      const path = `file://${photo.path}`;
      setPhotoUri(path);
      setFrozen(true);

      const now = new Date();
      setTime(now.toLocaleString());
    } catch (e) {
      console.log(e);
    }
  };

  const retakePhoto = () => {
    setFrozen(false);
    setPhotoUri(null);
  };

  if (!device || !permission) {
    return (
      <View style={styles.loading}>
        <Text>Opening Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!frozen ? (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      ) : (
        <Image
          source={{uri: photoUri!}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      )}

      {!frozen && (
        <View style={styles.countBox}>
          <Text style={styles.countText}>Faces: {faceCount}</Text>
        </View>
      )}

      {!frozen && (
        <TouchableOpacity style={styles.captureBtn} onPress={capturePhoto}>
          <Text style={styles.btnText}>Capture</Text>
        </TouchableOpacity>
      )}

      {frozen && (
        <View style={styles.resultCard}>
          <Text style={styles.resultText}>Captured At</Text>
          <Text style={styles.resultText}>{time}</Text>
          <Text style={styles.resultText}>Faces Detected: {faceCount}</Text>

          <TouchableOpacity style={styles.retakeBtn} onPress={retakePhoto}>
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countBox: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },

  countText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },

  captureBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 40,
  },

  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  resultCard: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    gap: 6,
  },

  resultText: {
    color: 'white',
    fontSize: 16,
  },

  retakeBtn: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
  },

  retakeText: {
    color: 'black',
    fontWeight: '600',
  },
});
