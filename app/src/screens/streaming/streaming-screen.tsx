import { url } from '../../api/client';
import { SView } from '@/components/View';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export const VideoStream = () => {
  return (
    <SView className='flex-1' >
      <WebView style={styles.video}
        source={{ uri: url.concat('/video_feed') }}
        resizeMode="cover"
      />
    </SView>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
})