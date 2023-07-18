import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DateInput } from "@mantine/dates";

import {
  Title,
  Text,
  TextInput,
  Button,
  FileInput,
  Checkbox,
  LoadingOverlay
} from "@mantine/core";
import { useForm } from "@mantine/form";

import UploadFileIcon from "@/assets/artist/UploadFileIcon.svg";

import styles from "./UploadModalComp.module.css";
import Image from "next/image";

import { addSongFetcher } from "@/hooks/song.swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWRMutation from "swr/mutation";

function UploadModalComp() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      song: null,
      cover: null,
      isExclusive: false,
      exclusiveUntil: new Date(),
    },

    validate: {
      name: (value) => value.trim().length >= 3,
      song: (value: File | null) => value !== null,
      cover: (value: File | null) => value !== null,
      exclusiveUntil: (value) => value !== null,
    },
  });

  const { trigger: songUpload, isMutating } = useSWRMutation(
    SWR_CONSTANTS.ADD_SONG,
    addSongFetcher
  );

  const uploadSong = async () => {
    try {
      if (form.values.song !== null && form.values.cover !== null) {
        const data = await songUpload({
          name: form.values.name,
          song: form.values.song,
          img: form.values.cover,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <LoadingOverlay
        loaderProps={{
          variant: "bars",
        }}
        visible={isMutating}
        overlayBlur={2}
      />
      <Title order={4} weight={"700"}>
        Upload Song
      </Title>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <div className={styles.methodSelections}>
          <div className={styles.methodContainer}>
            <Text color="primary.3" weight={"500"}>
              Add all the Information required for the song to be published on
              the platform and click on Publish to Get Started.
            </Text>
            <div className={styles.inputs}>
              <TextInput
                placeholder="Song Name"
                classNames={{
                  input: styles.defaultRadius,
                }}
                size="md"
                {...form.getInputProps("name")}
              />
              <FileInput
                placeholder="Song File"
                classNames={{
                  input: styles.defaultRadius,
                }}
                size="md"
                accept="audio/*"
                icon={
                  <Image
                    src={UploadFileIcon}
                    height={18}
                    width={18}
                    alt="Upload File Icon"
                  />
                }
                {...form.getInputProps("song")}
              />
              <FileInput
                placeholder="Cover Image"
                classNames={{
                  input: styles.defaultRadius,
                }}
                size="md"
                accept="image/*"
                icon={
                  <Image
                    src={UploadFileIcon}
                    height={18}
                    width={18}
                    alt="Upload File Icon"
                  />
                }
                {...form.getInputProps("cover")}
              />
              <Checkbox
                label="Mark as Exclusive"
                size={"md"}
                {...form.getInputProps("isExclusive", { type: "checkbox" })}
              />
              {form.values.isExclusive && (
                <DateInput
                  placeholder="Exclusive Until"
                  size="md"
                  {...form.getInputProps("exclusiveUntil")}
                />
              )}
            </div>
            <Button
              fullWidth
              size="md"
              classNames={{
                root: styles.defaultRadius,
              }}
              onClick={uploadSong}
            >
              Publish
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadModalComp;
