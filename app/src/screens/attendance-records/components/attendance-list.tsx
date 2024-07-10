import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SImage, SText, SView } from '@/components/View';
import { Student } from '../../../api/client';
import { useList } from '../../../api/use-list';

export const List = () => {

  const { data, refetch } = useList();

  const [students, setStudents] = useState<Student[] | undefined>([])

  useEffect(() => {
    if (data) {
      setStudents(data);
    }
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000);

    console.log(students)
    return () => clearInterval(intervalId);
  }, [refetch]);

  const renderPersonCard = ({ item }: { item: Student }) => (
    <SView className="flex flex-row items-center bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <SImage source={{ uri: item.imageUrl }} className="w-12 h-12 rounded-full mr-4" />
      <SView className="flex-1">
        <SText className="text-lg font-bold">{item.fullName}</SText>
        <SText>{item.studentCode}</SText>
        <SText className="text-base">Hora de llegada: {item.timeMarked}</SText>
      </SView>
    </SView>
  );

  return (
    <SView className="flex-1 bg-white p-4 m-4 rounded-lg shadow-md ">
      <SText className="text-lg font-bold mb-4">Estudiantes asistentes</SText>
      <FlatList
        data={students}
        renderItem={renderPersonCard}
        keyExtractor={(item) => item.studentCode}
      />
    </SView>
  );
};
