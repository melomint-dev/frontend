import React from "react";
import { Button, Title, Text } from "@mantine/core";

import Logo from "@/assets/general/Logo.svg";
import LogoFlow from "@/assets/general/LogoFlow.svg";
import HeroCover from "@/assets/home/HeroCover.svg";
import FeatureImg1 from "@/assets/home/FeatureImg1.svg";
import FeatureImg2 from "@/assets/home/FeatureImg2.svg";

import styles from "./LandinPageMainSec.module.css";
import Image from "next/image";
import Link from "next/link";

function LandinPageMainSec() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <header className={styles.header}>
          <Link href="/">
            <Image src={Logo} alt="Melomint" width={129} height={30} />
          </Link>
          <div className={styles.rightSec}>
            <Button variant="subtle" size="md">
              Register as Artist
            </Button>
            <Button color="secondary" size="md" radius={"xl"}>
              Login
            </Button>
          </div>
        </header>
        <div className={styles.heroContent}>
          <div className={styles.builtOnFlowChip}>
            <Image src={LogoFlow} alt="Flow" width={21} height={21} />
            <Text weight={500} size={"md"}>
              Built on Flow
            </Text>
          </div>
          <div className={styles.heroText}>
            <Title align="center" order={1} className={styles.heroTitle}>
              Empowering Artists, Amplifying Impact, and Enriching Lives
            </Title>
            <Text
              align="center"
              color="primary.3"
              weight="500"
              className={styles.heroDesc}
            >
              Lorem ipsum dolor sit amet consectetur. Nisl ac tortor diam
              gravida diam. Sem egestas cras ultricies massa morbi erat in. Nec
              habitasse a et ut duis dignissim. In dui viverra pulvinar magna
              nunc urna sed egestas. In ut aliquam netus.
            </Text>
          </div>
          <div>
            <Button size="lg">{"Get Started ->"}</Button>
          </div>
        </div>
        <Image
          src={HeroCover}
          alt="Melomint"
          width={339}
          height={341}
          className={styles.heroCover}
        />
      </div>
      <div className={styles.features}>
        <Title
          align="left"
          order={2}
          size={"var(--h1)"}
          className={styles.featuresTitle}
        >
          <Text weight={500} size={"md"} inherit color="primary.2">
            How
          </Text>
          <Text weight={500} size={"md"} inherit>
            MeloMint
          </Text>
          <Text weight={500} size={"md"} inherit color="primary.2">
            pulls this off?
          </Text>
        </Title>
        <div className={styles.featureCards}>
          <div className={styles.feature}>
            <Image src={FeatureImg1} alt="Melomint" width={384} height={384} />
            <div className={styles.featureText}>
              <Title align="left" order={3}>
                Fair Share
              </Title>
              <Text color="primary.3">
                Measures and calculates the duration of each sampled part,
                guaranteeing that the original artist receives a fair share
                based on usage
              </Text>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureText}>
              <Title align="left" order={3}>
                Masterpiece NFT{" "}
              </Title>
              <Text color="primary.3">
                Measures and calculates the duration of each sampled part,
                guaranteeing that the original artist receives a fair share
                based on usage
              </Text>
            </div>
            <Image src={FeatureImg2} alt="Melomint" width={384} height={384} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandinPageMainSec;
