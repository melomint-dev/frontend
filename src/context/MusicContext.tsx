import API_CONSTANTS from "@/utils/apiConstants";
import { showErrorNotification } from "@/utils/notifications.helper";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import React from "react";

import type { ReactNode } from "react";

async function streamToBlob(readableStream: ReadableStream): Promise<Blob> {
  // Create a new Response object from the Readable Stream
  const response = new Response(readableStream);

  // Convert the Response to a Blob
  const blob = await response.blob();
  return blob;
}
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
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>;
  artistName: string;
  setArtistName: React.Dispatch<React.SetStateAction<string>>;
  musicName: string;
  setMusicName: React.Dispatch<React.SetStateAction<string>>;
  coverPhotoSrc: string;
  setCoverPhotoSrc: React.Dispatch<React.SetStateAction<string>>;
}

export const MusicContext = createContext<IMusicContext>({} as IMusicContext);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error(
      "useMusicContext must be used within a MusicContextProvider"
    );
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
  const [artistName, setArtistName] = useState("");
  const [musicName, setMusicName] = useState("");
  const [coverPhotoSrc, setCoverPhotoSrc] = useState("");

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (audio) {
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
    if (!audioURL) {
      return;
    }
    const fetchAudio = async () => {
      try {
        /**
         * Stop current audio
         */
        if (audio) {
          setIsPlaying(false);
          audio.pause();
          URL.revokeObjectURL(audio.src);
        }

        const response = await fetch(API_CONSTANTS.GET_FILE, {
          method: "POST",
          body: audioURL,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("response", response);

        if (!response.body) {
          return showErrorNotification("Something went wrong");
        }
        const audioBlob = await streamToBlob(response.body);
        // const audioBlob = await response.body?.blob();
        // const audioBlob = await new Blob([response.body]);

        const audioObjectURL = URL.createObjectURL(audioBlob);
        setAudio(new Audio(audioObjectURL));
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
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
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, [audio]);

  useEffect(() => {
    if (audio) {
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  }, [seekTime]);

  useEffect(() => {
    if (audio) {
      audio!.volume = volumeValue / 100;
    }
  }, [volumeValue]);

  const providerProps = useMemo(
    () => ({
      coverPhotoSrc,
      setCoverPhotoSrc,
      musicName,
      setMusicName,
      artistName,
      setArtistName,
      audioURL,
      setAudioUrl,
      audio,
      setAudio,
      currentTime,
      setCurrentTime,
      isLoaded,
      setIsLoaded,
      duration,
      setDuration,
      isPlaying,
      setIsPlaying,
      volumeValue,
      setVolume,
      seekTime,
      setSeekTime,
    }),
    [
      coverPhotoSrc,
      setCoverPhotoSrc,
      musicName,
      setMusicName,
      artistName,
      setArtistName,
      audioURL,
      setAudioUrl,
      audio,
      setAudio,
      currentTime,
      setCurrentTime,
      isLoaded,
      setIsLoaded,
      duration,
      setDuration,
      isPlaying,
      setIsPlaying,
      volumeValue,
      setVolume,
      seekTime,
      setSeekTime,
    ]
  );

  return (
    <MusicContext.Provider
      value={{
        ...providerProps,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
