import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Text, Slider } from "@mantine/core";
import {
  backbutton,
  fastforardbutton,
  heart,
  nextbutton,
  playbutton,
  prevbutton,
  volume,
  pausebutton,
} from "@/assets/general";

import { MusicContext } from "@/context/MusicContext";

import styles from "./Bottombar.module.css";

function MusicControllor({ image, func }: { image: string; func:()=> void }) {
  return (
    <button className={styles.button} onClick={func}>
      <Image src={image} alt="" />
    </button>
  );
};

const BottomBar = ({ audioUrl }: {audioUrl: string}) => {
  interface TimeObject {
    [key: string]: number;
  }

  const { helli } = useContext(MusicContext);

  helli();

  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeValue, setVolume] = useState(100);
  const [seekTime, setSeekTime] = useState(0);

  useEffect(() => {
    if(audio){
      audio!.volume = volumeValue / 100;
    }
  }, [volumeValue]);

  useEffect(() => {
    if(audio){
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  }, [seekTime]);

  useEffect(() => {
    const fetchAudio = async () => {
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      const audioObjectURL = URL.createObjectURL(audioBlob);
      setAudio(new Audio(audioObjectURL));
    };

    fetchAudio();

    return () => {
      if (audio) {
        audio.pause();
        URL.revokeObjectURL(audio.src);
      }
    };
  }, [audioUrl]);
  
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

  const handlePlayPause = () => {
    if (isPlaying && audio) {
      audio.pause();
    } else if(audio) {
      audio.play();
    }
  };

  const formatTime = (timeObject: TimeObject): string => {
    const { timeInSeconds } = timeObject;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.musicName}>
        <Text
          size="lg"
          color="primary"
          weight={700}
          className={styles.musicFont}
        >
          Living My Best Life
        </Text>
        <Text size="sm" color="primary.2" weight={400}>
          Ben Hector
        </Text>
      </div>
      <div className={styles.playBar}>
        <div className={styles.timeLine}>
          <Text color="primary.1" weight={500} fz="xs" className={styles.timeText}>
            {formatTime({timeInSeconds: currentTime})}
          </Text>
          <Slider color="primary" size="sm" value={currentTime} onChange={setSeekTime} min={0} max={duration} label={null}/>
          <Text color="primary.1" weight={500} fz="xs" className={styles.timeText}>
            {formatTime({timeInSeconds: duration})}
          </Text>
        </div>
        <div className={styles.bar}>
          <MusicControllor image={backbutton} func={handlePlayPause}/>
          <MusicControllor image={prevbutton} func={handlePlayPause}/>
          {isPlaying ? <MusicControllor image={pausebutton} func={handlePlayPause}/> : <MusicControllor image={playbutton} func={handlePlayPause}/>}
          <MusicControllor image={nextbutton} func={handlePlayPause}/>
          <MusicControllor image={fastforardbutton} func={handlePlayPause}/>
        </div>
      </div>

      <div className={styles.rightBar}>
        <Image src={heart} alt="" className="" />
        <div className={styles.volumeBar}>
          <Image src={volume} alt="" className="" />
          <Slider color="primary" size="sm" value={volumeValue} min={0} max={100} onChange={setVolume}/>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
