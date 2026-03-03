import * as Keychain from 'react-native-keychain';

export async function saveToken(token: string) {
  await Keychain.setGenericPassword('auth', token);
}

export async function getToken() {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
}

export async function logoutUser() {
  await Keychain.resetGenericPassword();
}