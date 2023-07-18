import styles from "./SongResult.module.css";
import { Title, Text, Button, Skeleton } from "@mantine/core";
import Image from "next/image";
import { user } from "@/assets/player";
import { ISong } from "@/interfaces/ISong";
import { useSongList } from "@/hooks/song.swr";
import API_CONSTANTS from "@/utils/apiConstants";

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
  similarityIndices: similarityIndex,
}: {
  song: ISong;
  similarityIndices: number[];
}) => {
  return (
    <div className={styles.similarSongList}>
      <div className={styles.similarSong}>
        <Image
          src={API_CONSTANTS.IPFS_BASE_URL + song.img}
          alt=""
          height={28}
          width={28}
          style={songStyle}
        />
        <Text weight={700} color="primary">
          {song.name}
        </Text>
        <Text size="sm" weight={400} color="primary.3">
          {similarityIndex
            .map((index) => index * 10 + "-" + (index + 1) * 10)
            .join(", ")}
        </Text>
      </div>
    </div>
  );
};

const SimilarSongs = ({ song }: { song: ISong }) => {
  const { songListData, isSongListDataLoading, errorFetchingSongListData } =
    useSongList(Object.keys(song.similarTo));
  return (
    <>
      <div className={styles.song}>
        <Image
          src={API_CONSTANTS.IPFS_BASE_URL + song.img}
          alt=""
          height={56}
          width={56}
          style={songStyle}
        />
        <div>
          <Text weight={700} color="primary">
            {song.name}
          </Text>
          <Text size="sm" weight={400} color="primary.3">
            {song.artist.firstName} {song.artist.lastName}
          </Text>
        </div>
        <Text size="sm" weight={400} color="primary.3">
          {new Date((parseInt(song.uploadedAt) ?? 0) * 1000).toDateString()}
        </Text>
      </div>
      {/* {song.published ? ( */}
      <>
        <div className={styles.published}>
          <Text size="sm" color="#04B500" weight={500}>
            Published
          </Text>
        </div>
        {songListData?.length > 0 && (
          <div className={styles.similarSongs}>
            <Text weight={800} color="primary">
              Similarities Found:
            </Text>
            {isSongListDataLoading || errorFetchingSongListData ? (
              <Skeleton height={30} />
            ) : (
              songListData.map((song, index) => (
                <SimilarSong
                  song={song}
                  key={index}
                  similarityIndices={song.similarTo[song.id]
                    .filter((_, index) => index % 2 === 0)
                    .map((index) => parseInt(index))}
                />
              ))
            )}
          </div>
        )}
      </>
      {/* ) : (
        <div className={styles.processing}>
          <Text size="sm" color="#FF9C59" weight={500}>
            Processing
          </Text>
        </div>
      )} */}
    </>
  );
};

const SongResult = ({
  openUploadModal,
  songs,
  isLoading,
}: {
  openUploadModal: () => void;
  songs: ISong[];
  isLoading: boolean;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title order={5} color="primary" weight={700}>
          Songs
        </Title>
        <Button
          color="secondary"
          variant="filled"
          size="md"
          radius={"xl"}
          onClick={openUploadModal}
        >
          Upload
        </Button>
      </div>
      <div className={styles.songContainer}>
        {isLoading ? (
          <Skeleton height={100} />
        ) : (
          songs.map((song, index) => <SimilarSongs song={song} key={index} />)
        )}
      </div>
    </div>
  );
};

export default SongResult;
