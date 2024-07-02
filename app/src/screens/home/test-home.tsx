import React, { useCallback, useEffect, useState, useRef } from "react";
import { TouchableOpacity, Animated, Easing, ViewStyle } from "react-native";
import { useFocusEffect } from "expo-router";
import { TimerPickerModal } from "react-native-timer-picker";
import { SText, STouchableOpacity, SView } from "../../components/View";
import { useStatus } from "../../api/use-status";
import { useActivate, useDeactivate } from "../../api/use-activate";

const formatTime = (remainingTime: number): string => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  const pad = (num: number): string => num.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

interface TimerData {
  timerKey: number;
  state: boolean;
  duration: number;
  initialRemainingTime: number;
}

interface TimerProps {
  data: TimerData;
  setInactive: () => void;
  setTimerKey: (callback: (prevKey: number) => number) => void;
  deactivate: (params: { active: boolean; initialTime: number }) => void;
}

const Timer: React.FC<TimerProps> = ({ data, setInactive, setTimerKey, deactivate }) => {
  const [remainingTime, setRemainingTime] = useState(data.initialRemainingTime);
  const animatedValue = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (data.state) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setInactive();
            deactivate({ active: false, initialTime: 0 });
            setTimerKey((prevKey) => prevKey + 1);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [data.state, setInactive, deactivate, setTimerKey]);

  useEffect(() => {
    setRemainingTime(data.initialRemainingTime);
  }, [data.initialRemainingTime]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: data.duration * 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [data.duration, animatedValue]);

  const circleColor = animatedValue.interpolate({
    inputRange: [0, 0.3, 0.5, 1],
    outputRange: ['#A30000', '#F7B801', '#034799', '#034799'],
  });

  return (
    <SView className="items-center justify-center">
      <Animated.View
        style={{
          width: 280,
          height: 280,
          borderRadius: 140,
          borderWidth: 10,
          borderColor: circleColor,
          alignItems: 'center',
          justifyContent: 'center',
        } as unknown as ViewStyle}
      >
        <SText className="text-3xl">{formatTime(remainingTime)}</SText>
      </Animated.View>
    </SView>
  );
};

const TestHomeScreen: React.FC = () => {
  const [active, setActive] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [initialTime, setInitialTime] = useState(300);
  const [serverRemainingTime, setServerRemainingTime] = useState(600);
  const [timerKey, setTimerKey] = useState(0);

  const { data, refetch } = useStatus();
  const { mutate: activate } = useActivate({});
  const { mutate: deactivate } = useDeactivate({});

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (data) {
      setInitialTime(data.initialTime);
      setActive(data.active);
      setServerRemainingTime(data.remainingTime || data.initialTime);
    }
  }, [data]);

  const handleStartPress = () => {
    setActive(true);
    activate({ active: true, initialTime });
  };

  const handleStopPress = () => {
    setActive(false);
    deactivate({ active: false, initialTime });
  };

  const handlePickerConfirm = (pickedDuration: { hours: number; minutes: number; seconds: number }) => {
    const newInitialTime = 
      Number(pickedDuration.hours) * 3600 +
      Number(pickedDuration.minutes) * 60 +
      Number(pickedDuration.seconds);
    setInitialTime(newInitialTime);
    setServerRemainingTime(newInitialTime);
    setActive(false);
    setTimerKey((prevKey) => prevKey + 1);
    setShowPicker(false);
  };

  const timerData: TimerData = { timerKey, state: active, duration: initialTime, initialRemainingTime: serverRemainingTime };

  return (
    <SView className="items-center flex-1 justify-center">
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
        <Timer 
          data={timerData} 
          setInactive={() => setActive(false)} 
          deactivate={deactivate} 
          setTimerKey={setTimerKey} 
        />
      </TouchableOpacity>

      <SView className="items-center space-y-2 gap-5 pt-6">
        <STouchableOpacity className="rounded bg-cyan-500" onPress={handleStartPress}>
          <SText className="text-3xl text-white font-bold py-2 px-3 bg-green-500 rounded-md">
            Start
          </SText>
        </STouchableOpacity>
        <TouchableOpacity onPress={handleStopPress}>
          <SText className="text-3xl text-white font-bold py-2 px-3.5 bg-red-500 rounded-md">
            Stop
          </SText>
        </TouchableOpacity>
      </SView>

      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          handlePickerConfirm(pickedDuration)
        }}
        modalTitle="Set time"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        styles={{ theme: "light" }}
        modalProps={{ overlayOpacity: 0.2 }}
      />
    </SView>
  );
}

export default TestHomeScreen;