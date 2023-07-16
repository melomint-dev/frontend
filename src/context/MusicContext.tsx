import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import React from 'react';

import type { ReactNode } from "react";

interface IMusicContext {
  audio: HTMLAudioElement | undefined;
  setAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | undefined>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  currentTime: number;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  volumeValue: number;
  setSeekTime: React.Dispatch<React.SetStateAction<number>>;
  seekTime: number;
  audioURL: string;
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>
}

export const MusicContext = createContext<IMusicContext>({} as IMusicContext);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusicContext must be used within a MusicContextProvider");
  }
  return context;
};

export default function MusicContextProvider({
  children,
}: {
  children: ReactNode;
  network?: string;
}) {

  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeValue, setVolume] = useState(100);
  const [seekTime, setSeekTime] = useState(0);
  const [audioURL, setAudioUrl] = useState("");

  useEffect(() => {
    const handleTimeUpdate = () => {
      if(audio){
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      if(audio){
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadeddata", handleLoadedData);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadeddata", handleLoadedData);
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      }
    };
  }, [audio]);

  useEffect(() => {
    setIsLoaded(false);
    const fetchAudio = async () => {
      const response = await fetch(audioURL);
      const audioBlob = await response.blob();
      const audioObjectURL = URL.createObjectURL(audioBlob);
      setAudio(new Audio(audioObjectURL));
      setIsLoaded(true);
    };

    fetchAudio();

    return () => {
      if (audio) {
        setIsPlaying(false);
        audio.pause();
        URL.revokeObjectURL(audio.src);
      }
    };
  }, [audioURL]);

  useEffect(() => {
    if(audio){
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  }, [seekTime]);

  useEffect(() => {
    if(audio){
      audio!.volume = volumeValue / 100;
    }
  }, [volumeValue]);

  const providerProps = useMemo(
    () => ({
      audioURL, setAudioUrl, audio, setAudio, currentTime , setCurrentTime, isLoaded, setIsLoaded, duration, setDuration, isPlaying, setIsPlaying, volumeValue, setVolume, seekTime, setSeekTime,
    }),
    [audioURL, setAudioUrl, audio, setAudio, currentTime , setCurrentTime, isLoaded, setIsLoaded, duration, setDuration, isPlaying, setIsPlaying, volumeValue, setVolume, seekTime, setSeekTime]
  );

  return (
    <MusicContext.Provider
      value={
        {
          ...providerProps,
        }
      }
    >
      {children}
    </MusicContext.Provider>
  );
}
