import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { List } from './components/attendance-list';
import { SIcon, SText, STouchableOpacity, SView } from '@/components/View';


 const downloadFromUrl = async () => {
    const filename = "reports.csv";
    const result = await FileSystem.downloadAsync(
      'http://192.168.1.38:8000/reports',
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const downloadFromAPI = async () => {
    const filename = "reports.csv";
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      `http://${localhost}:8000/reports`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          "MyHeader": "MyValue"
        }
      }
    );
    console.log(result);
    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (uri: string, filename: string, mimetype: string) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch(e => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

export default function Attendance() {

  useEffect(() => {
  }, []);


return (
  <SView className="flex-1 bg-gray-200">
    <SView className="bg-white p-4 mt-4 mx-4 rounded-lg shadow-md">
      <SText className="text-xl font-bold text-gray-700 mb-4">Descargar Reporte</SText>
      <STouchableOpacity
        className="flex-row items-center bg-indigo-600 py-4 px-6 rounded-lg"
        onPress={downloadFromUrl}
      >
        <SIcon name="download" size={20} color="#fff" className="mr-2" />
        <SText className="text-white text-lg font-bold">Descargar (.csv)</SText>
      </STouchableOpacity>

    </SView>

      <List />
  </SView>
  );
}