import styles from "./SongResult.module.css";
import { Title, Text, Button } from "@mantine/core";
import Image from "next/image";
import { user } from "@/assets/player";

const songStyle = {
  borderRadius: "0.75rem",
};

const TEMP_SIMILAR_SONGS = [
  {
    name: "Song Name",
    artist: "Artist Name",
    date: "2 Months Ago",
    published: false,
    similarSongs: [],
  },
  {
    name: "Song Name",
    artist: "Artist Name",
    date: "2 Months Ago",
    published: true,
    similarSongs: [
      {
        name: "Song Name",
        time: "00:10-00:20",
      },
      {
        name: "Song Name",
        time: "00:10-00:20",
      },
      {
        name: "Song Name",
        time: "00:10-00:20",
      },
      {
        name: "Song Name",
        time: "00:10-00:20",
      },
    ],
  },
];

const SimilarSong = ({
  song,
}: {
  song: {
    name: string;
    time: string;
  };
}) => {
  return (
    <div className={styles.similarSong}>
      <Image src={user} alt="" height={28} width={28} style={songStyle} />
      <Text weight={700} color="primary">
        {song.name}
      </Text>
      <Text size="sm" weight={400} color="primary.3">
        {song.time}
      </Text>
    </div>
  );
};

const SongResult = ({
  song,
}: {
  song: {
    name: string;
    artist: string;
    date: string;
    published: boolean;
    similarSongs: {
      name: string;
      time: string;
    }[];
  };
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title order={5} color="primary" weight={700}>
          Songs
        </Title>
        <Button color="secondary" variant="filled" size="md" radius={"xl"}>
          Upload
        </Button>
      </div>
      <div className={styles.songContainer}>
        <div className={styles.song}>
          <Image src={user} alt="" height={56} width={56} style={songStyle} />
          <div>
            <Text weight={700} color="primary">
              {song.name}
            </Text>
            <Text size="sm" weight={400} color="primary.3">
              {song.artist}
            </Text>
          </div>
          <Text size="sm" weight={400} color="primary.3">
            {song.date}
          </Text>
        </div>
        {song.published ? (
          <>
            <div className={styles.published}>
              <Text size="sm" color="#04B500" weight={500}>
                Published
              </Text>
            </div>
            <div className={styles.similarSongs}>
              <Text weight={800} color="primary">
                Similarities Found:
              </Text>
              <div className={styles.similarSongList}>
                {song.similarSongs.map((song) => (
                  <SimilarSong key={song.name} song={song} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.processing}>
            <Text size="sm" color="#FF9C59" weight={500}>
              Processing
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongResult;
