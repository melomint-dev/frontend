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

function MusicControllor({ image, func }: { image: string; func: () => void }) {
  return (
    <button className={styles.button} onClick={func}>
      <Image src={image} alt="" />
    </button>
  );
}

const BottomBar = () => {
  interface TimeObject {
    [key: string]: number;
  }

  const {
    audio,
    currentTime,
    duration,
    isPlaying,
    setIsPlaying,
    volumeValue,
    setVolume,
    setSeekTime,
  } = useContext(MusicContext);

  const forward = () => {
    setSeekTime(audio!.currentTime + 10);
  };

  const backward = () => {
    setSeekTime(audio!.currentTime - 10);
  };

  const handlePlayPause = () => {
    if (isPlaying && audio) {
      setIsPlaying(false);
      audio.pause();
    } else if (audio) {
      setIsPlaying(true);
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
          <Text
            color="primary.1"
            weight={500}
            fz="xs"
            className={styles.timeText}
          >
            {formatTime({ timeInSeconds: currentTime })}
          </Text>
          <Slider
            color="primary"
            size="sm"
            value={currentTime}
            step={0.01}
            onChange={setSeekTime}
            min={0}
            max={duration}
            label={null}
          />
          <Text
            color="primary.1"
            weight={500}
            fz="xs"
            className={styles.timeText}
          >
            {formatTime({ timeInSeconds: duration })}
          </Text>
        </div>
        <div className={styles.bar}>
          <MusicControllor image={backbutton} func={handlePlayPause} />
          <MusicControllor image={prevbutton} func={backward} />
          {isPlaying ? (
            <MusicControllor image={pausebutton} func={handlePlayPause} />
          ) : (
            <MusicControllor image={playbutton} func={handlePlayPause} />
          )}
          <MusicControllor image={nextbutton} func={forward} />
          <MusicControllor image={fastforardbutton} func={handlePlayPause} />
        </div>
      </div>

      <div className={styles.rightBar}>
        <Image src={heart} alt="" className="" />
        <div className={styles.volumeBar}>
          <Image src={volume} alt="" className="" />
          <Slider
            color="primary"
            size="sm"
            value={volumeValue}
            min={0}
            max={100}
            onChange={setVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
