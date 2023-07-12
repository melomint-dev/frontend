import * as fcl from "@onflow/fcl";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { Title, Radio, Text, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useFclContext } from "@/context/FCLContext";

import FlowIcon from "@/assets/auth/FlowIcon.svg";
import GoogleIcon from "@/assets/auth/GoogleIcon.svg";

import styles from "./AuthComp.module.css";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";

fcl.config({
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

function AuthComp({ type = "login" }: { type?: "login" | "register" }) {
  const { connect, logout, currentUser } = useFclContext();

  const router = useRouter();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      userType: "user",
    },

    validate: {
      firstName: (value: string) => type == "login" || value.trim().length > 0,
      lastName: (value: string) => type == "login" || value.trim().length > 0,
      userType: (value: string) =>
        type == "login" || ["user", "artist"].includes(value),
    },
  });

  const [user, setUser] = useState<string>("");

  const login = async () => {
    try {
      // const user = await fcl.authenticate();
      // const user = await fcl.signUp();
      // setUser(user.addr);
      connect();
      router.push("/player");
      console.log("user", currentUser);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={styles.container}>
      <Title order={4} weight={"700"}>
        {type === "login" ? "Login" : "Sign Up"}
      </Title>
      <div className={styles.form}>
        {type === "register" && (
          <Radio.Group
            name="favoriteFramework"
            label="Join As"
            {...form.getInputProps("userType")}
            classNames={{
              root: styles.radioRoot,
            }}
            size="md"
          >
            <div className={styles.radioContainer}>
              <Radio
                value="user"
                label="User"
                classNames={{
                  label: styles.radioLabel,
                }}
                color="secondary"
              />
              <Radio
                value="artist"
                label="Artist"
                classNames={{
                  label: styles.radioLabel,
                }}
                color="secondary"
              />
            </div>
          </Radio.Group>
        )}
        <div className={styles.methodSelections}>
          <Title order={5}>
            {type === "login" ? "Signin method" : "Onboarding method"}
          </Title>
          <div className={styles.methodContainer}>
            <Text color="primary.3" weight={"500"}>
              Connect your existing Ethereum wallet to access all features and
              securely manage your assets
            </Text>
            <div className={styles.inputs}>
              <TextInput
                placeholder="First Name"
                {...form.getInputProps("firstName")}
                classNames={{
                  input: styles.defaultRadius,
                }}
                size="md"
              />
              <TextInput
                placeholder="Last Name"
                {...form.getInputProps("lastName")}
                classNames={{
                  input: styles.defaultRadius,
                }}
                size="md"
              />
            </div>
            <Button
              fullWidth
              rightIcon={<Image src={FlowIcon} alt="Flow Icon" />}
              size="md"
              classNames={{
                root: styles.defaultRadius,
              }}
              onClick={login}
            >
              Connect Wallet
            </Button>
          </div>
          <div className={styles.methodContainer}>
            <Text color="primary.3" weight={"500"}>
              Experience{" "}
              <Text inherit fw={700} span>
                MeloMint
              </Text>{" "}
              without a wallet with Walletless onboarding through Google
            </Text>
            <Button
              fullWidth
              rightIcon={<Image src={GoogleIcon} alt="Google Icon" />}
              size="md"
              classNames={{
                root: styles.defaultRadius,
              }}
              variant="outline"
            >
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Text weight={"500"}>
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={{
              pathname: "/",
              query: { authModal: type === "login" ? "register" : "login" },
            }}
          >
            <Text inherit color="secondary" span>
              {type === "login" ? "Sign Up" : "Login"}
            </Text>
          </Link>
        </Text>
      </div>
      <p>{user && user.addr ?  user.addr : 'nope'}</p>
    </div>
  );
}

export default AuthComp;
