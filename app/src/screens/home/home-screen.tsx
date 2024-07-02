import { useCallback, useEffect, useState } from "react";
import { TimerPickerModal } from "react-native-timer-picker";
import { TouchableOpacity } from "react-native";
import { SText, STouchableOpacity, SView } from "../../components/View";
import { useStatus } from "../../api/use-status";
import { useFocusEffect } from "expo-router";
import { useActivate, useDeactivate } from "../../api/use-activate";
import { Timer } from "./timer";

export default function HomeScreen() {
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
    }, [refetch]),
  );

  useEffect(() => {
    if (data) {
        console.log(data)
        setInitialTime(data.initialTime)
        setActive(data.active)
        console.log(data.remainingTime)
        setServerRemainingTime(data.remainingTime)
        if (data.remainingTime == 0) {
          setServerRemainingTime(data.initialTime)
        }
      }    
  }, [data])

  
  const timerData = {
    timerKey,
    state: active,
    duration: initialTime,
    initialRemainingTime: serverRemainingTime,
  };

  return (
    <SView className="items-center flex-1 justify-center">
      <TouchableOpacity
        onPress={() => {
          setShowPicker(!showPicker);
        }}
      >
        <Timer data={timerData} setInactive={() => {setActive(false)}} deactivate={deactivate} setTimerKey={setTimerKey} />
      </TouchableOpacity>
      <SView className="items-center space-y-2 gap-5 pt-6">
        <STouchableOpacity
          className="rounded bg-cyan-500"
          onPress={() => {
            setActive(true);
            activate(
              {
                active: true,
                initialTime: initialTime,
              }
            );
          }}
        >
          <SText className="text-3xl text-white font-bold py-2 px-3 bg-green-500 rounded-md">
            Start
          </SText>
        </STouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActive(false);
            deactivate(
              {
                active: false,
                initialTime: initialTime,
              },
            );
          }}
        >
          <SText className="text-3xl text-white font-bold py-2 px-3.5 bg-red-500 rounded-md">
            Stop
          </SText>
        </TouchableOpacity>
      </SView>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          console.log(pickedDuration);
          setInitialTime(
            Number(pickedDuration.hours) * 3600 +
              Number(pickedDuration.minutes) * 60 +
              Number(pickedDuration.seconds),
          );
          setActive(false);
          setTimerKey((prevKey) => prevKey + 1);
          setShowPicker(false);
        }}
        modalTitle="Setear tiempo"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        // Audio={Audio}
        // LinearGradient={LinearGradient}
        // Haptics={Haptics}
        styles={{
          theme: "light",
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </SView>
  );
}
