import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import RNFetchBlob from 'rn-fetch-blob';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    setToday(formattedDate);
  }, []);
  
  const handleDownload = async () => {
   try {
      const { config, fs } = RNFetchBlob;
      let DownloadDir = fs.dirs.DownloadDir;
      let date = new Date();
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/Attendance_${Math.floor(date.getTime() + date.getSeconds() / 2)}.csv`,
          description: 'CSV file',
        },
      };
      config(options)
        .fetch('GET', 'http://172.20.10.5:8000/reports') //poner el path
        .then((res) => {
          console.log('The file saved to ', res.path());
        });
    } catch (error) {
      console.error(error);
      };
    }
  

  const recentReports = [
    { id: '1', date: '2024-07-03', downloads: 5 },
    { id: '2', date: '2024-06-26', downloads: 3 },
    { id: '3', date: '2024-06-19', downloads: 7 },
  ];

  const markedDates = {
    [today]: { marked: true, dotColor: '#4849A1' },
    [selectedDate]: { selected: true, selectedColor: '#4849A1' }
  };

return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="calendar" size={30} color="#4849A1" />
        <Text style={styles.title}>Reportes de Asistencia</Text>
      </View>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#4849A1',
          selectedDayBackgroundColor: '#4849A1',
        }}
      />
      
      <View style={styles.downloadSection}>
        <Text style={styles.sectionTitle}>Descargar Reporte</Text>
        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Icon name="download" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Descargar (.csv)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentReports}>
        <Text style={styles.sectionTitle}>Reportes Recientes</Text>
        <FlatList
          data={recentReports}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.reportItem}>
              <Text style={styles.reportDate}>{item.date}</Text>
              <Text style={styles.reportDownloads}>{item.downloads} descargas</Text>
            </View>
          )}
          style={styles.flatList}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  downloadSection: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4849A1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recentReports: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  flatList: {
    maxHeight: 200,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  reportDate: {
    fontSize: 16,
    color: '#333',
  },
  reportDownloads: {
    fontSize: 16,
    color: '#4849A1',
  },
});