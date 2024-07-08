import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SImage, SText, SView } from '@/components/View';

type Person = {
  id: string;
  name: string;
  arrivalTime: string;
  photo: string;
}

const persons: Person[] = [
  { id: '1', name: 'John Doe', arrivalTime: "10:23", photo: 'http://192.168.0.164:8000/image/22200082.jpg' },
  { id: '2', name: 'Jane Smith', arrivalTime: "10:22", photo: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Sam Johnson', arrivalTime: "9:30", photo: 'https://via.placeholder.com/150' },
  { id: '4', name: 'John Doe', arrivalTime: "10:23", photo: 'http://192.168.0.164:8000/image/22200082.jpg' },
  { id: '5', name: 'Jane Smith', arrivalTime: "10:22", photo: 'https://via.placeholder.com/150' },
  { id: '6', name: 'Sam Johnson', arrivalTime: "9:30", photo: 'https://via.placeholder.com/150' },
];

export const List = () => {

  const renderPersonCard = ({ item }: { item: Person }) => (
    <SView className="flex flex-row items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <SImage source={{ uri: item.photo }} className="w-12 h-12 rounded-full mr-4" />
      <SView className="flex-1">
        <SText className="text-lg font-bold">{item.name}</SText>
        <SText className="text-base">Hora de llegada: {item.arrivalTime}</SText>
      </SView>
    </SView>
  );

  return (
    <SView className="flex-1 bg-white p-4 m-4 rounded-lg shadow-md ">
      <SText className="text-lg font-bold mb-4">Estudiantes asistentes</SText>
      <FlatList
        data={persons}
        renderItem={renderPersonCard}
        keyExtractor={(item) => item.id}
      />
    </SView>
  );
};
