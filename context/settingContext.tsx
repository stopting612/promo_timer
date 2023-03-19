import React, {
  useState,
} from "react";

type SettingType = {
  settingPanel: boolean;
  setSettingPanel: React.Dispatch<React.SetStateAction<boolean>>;
  pomodoro: number;
  setPomodoro: React.Dispatch<React.SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  longBreak: number;
  setLongBreak: React.Dispatch<React.SetStateAction<number>>;
  percentage: string;
  setPercentage: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  children?: React.ReactNode;
};

const SettingContext = React.createContext<SettingType>({} as SettingType);

const SettingProvider: React.FC<Props> = ({ children }) => {
  const [settingPanel, setSettingPanel] = useState<boolean>(false);
  const [pomodoro, setPomodoro] = useState<number>(45);
  const [shortBreak, setShortBreak] = useState<number>(5);
  const [longBreak, setLongBreak] = useState<number>(15);
  const [percentage, setPercentage] = useState<string>('');
  return (
    <SettingContext.Provider
      value={{
        settingPanel,
        setSettingPanel,
        pomodoro,
        setPomodoro,
        shortBreak,
        setShortBreak,
        longBreak,
        setLongBreak,
        percentage,
        setPercentage
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;

export const useSetting = () => React.useContext(SettingContext);
