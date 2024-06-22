import { useState } from "react";
import { TimerPickerModal } from "react-native-timer-picker";
import { Text, View, TouchableOpacity } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { SText, STouchableOpacity, SView } from "../components/View";

const formatTime = (remainingTime: number) => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  const newSeconds = seconds < 10 ? "0" + seconds.toString() : seconds;
  const newMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;
  const newHours = hours < 10 ? "0" + hours.toString() : hours;
  return `${newHours}:${newMinutes}:${newSeconds}`;
};

export default function Index() {
  const [active, setActive] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState(600);
  return (
    <SView className="items-center flex-1 justify-center">
      <TouchableOpacity
        onPress={() => {
          setShowPicker(!showPicker);
        }}
      >
        <CountdownCircleTimer
          isPlaying={active}
          duration={time}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => <Text>{formatTime(remainingTime)}</Text>}
        </CountdownCircleTimer>
      </TouchableOpacity>
      <SView className="p-2 items-center space-y-2">
        <STouchableOpacity
          className="rounded bg-cyan-500"
          onPress={() => {
            setActive(true);
          }}
        >
          <SText className="text-3xl text-red-500 font-bold p-2 bg-blue-500 rounded-md">
            Start
          </SText>
        </STouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActive(false);
          }}
        >
          <SText className="text-3xl text-red-500 font-bold p-2 bg-blue-500 rounded-md">
            Stop
          </SText>
        </TouchableOpacity>
      </SView>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          console.log(pickedDuration);
          setTime(
            Number(pickedDuration.hours) * 3600 +
            Number(pickedDuration.minutes) * 60 +
            Number(pickedDuration.seconds),
          );
          setActive(false);

          setShowPicker(false);
        }}
        modalTitle="Set Alarm"
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
