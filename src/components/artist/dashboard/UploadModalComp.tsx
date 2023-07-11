import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { Title, Text, TextInput, Button, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import UploadFileIcon from "@/assets/artist/UploadFileIcon.svg";

import styles from "./UploadModalComp.module.css";
import Image from "next/image";

function UploadModalComp() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      song: null,
      cover: null,
    },

    validate: {
      name: (value) => value.trim().length >= 3,
      song: (value: File | null) => value !== null,
      cover: (value: File | null) => value !== null,
    },
  });

  return (
    <div className={styles.container}>
      <Title order={4} weight={"700"}>
        Upload Song{" "}
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
              Connect your existing Ethereum wallet to access all features and
              securely manage your assets{" "}
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
            </div>
            <Button
              fullWidth
              size="md"
              classNames={{
                root: styles.defaultRadius,
              }}
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
