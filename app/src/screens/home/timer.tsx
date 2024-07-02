import { SText } from "@/components/View";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

type TimerProps = {
  timerKey: number,
  state: boolean,
  duration: number,
  initialRemainingTime: number,
}

type TimerComponentProps = {
  data: TimerProps,
  setInactive: () => void,
  setTimerKey: (key: any) => void,
  deactivate: (state: { active: boolean, initialTime: number }) => void,
}

const formatTime = (remainingTime: number) => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  const newSeconds = seconds < 10 ? "0" + seconds.toString() : seconds;
  const newMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;
  const newHours = hours < 10 ? "0" + hours.toString() : hours;
  return `${newHours}:${newMinutes}:${newSeconds}`;
};

export const Timer = ({ data, setInactive, setTimerKey, deactivate }: TimerComponentProps) => {
  console.log(data)
  return (
        <CountdownCircleTimer
          key={data.timerKey}
          rotation="clockwise"
          isPlaying={data.state}
          duration={data.duration}
          initialRemainingTime={30}
          colors={["#034799", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          size={280}
          onComplete={() => {
            deactivate({
              active: false,
              initialTime: 0,
            }
            )
            setInactive();
            setTimerKey((prevKey: number) => prevKey + 1);
          }}
        >
          {({ remainingTime }) => (
            <SText className="text-3xl">{formatTime(remainingTime)}</SText>
          )}
        </CountdownCircleTimer>
  )
}