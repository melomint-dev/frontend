import { useContext } from "react";
import Image from "next/image";
import { Text, Slider, Skeleton, ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
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
import API_CONSTANTS from "@/utils/apiConstants";
import { likeSongFetcher } from "@/hooks/song.swr";
import { useUser } from "@/hooks/person.swr";
import useSWRMutation from "swr/mutation";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/utils/notifications.helper";

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
    musicName,
    artistName,
    audio,
    currentTime,
    duration,
    isPlaying,
    setIsPlaying,
    volumeValue,
    setVolume,
    setSeekTime,
    audioURL,
  } = useContext(MusicContext);
  const { trigger: toggleLike, isMutating } = useSWRMutation(
    API_CONSTANTS.ADD_LIKES_TO_SONG,
    likeSongFetcher
  );
  const { userData, isUserDataLoading, errorFetchingUserData } = useUser();

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

  const songId = audioURL ? JSON.parse(audioURL).songId : null;
  const isLiked = userData?.likedSongs[songId];
  const handleLikeToggle = async () => {
    try {
      await toggleLike({
        id: songId,
        isLiked: isLiked,
      });
      showSuccessNotification(
        isLiked ? "Removed from Liked Songs" : "Added to Liked Songs"
      );
    } catch (err) {
      console.log(err);
      showErrorNotification("Something went wrong");
    }
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
          {musicName}
        </Text>
        <Text size="sm" color="primary.2" weight={400}>
          {artistName}
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
        {/* <Image src={heart} alt="" className="" /> */}

        {isMutating || isUserDataLoading || errorFetchingUserData ? (
          <Skeleton height={25} width={25} />
        ) : (
          <ActionIcon
            color={isLiked ? "red" : "primary"}
            variant="subtle"
            onClick={handleLikeToggle}
          >
            {isLiked ? <IconHeartFilled size={22} /> : <IconHeart size={22} />}
          </ActionIcon>
        )}
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
