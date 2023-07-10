import React from "react";
import { Button, Title, Text } from "@mantine/core";
import ImageStackComponent from "@/components/index/helpers/ImageStackComponent";

import Logo from "@/assets/general/Logo.svg";
import LogoFlow from "@/assets/general/LogoFlow.svg";
import HeroCover from "@/assets/home/HeroCover.svg";
import FeatureImg1 from "@/assets/home/FeatureImg1.svg";
import FeatureImg2 from "@/assets/home/FeatureImg2.svg";
import Linkedin from "@/assets/home/footer/icons/Linkedin.svg";
import Facebook from "@/assets/home/footer/icons/Facebook.svg";
import Instagram from "@/assets/home/footer/icons/Instagram.svg";
import LinkedinH from "@/assets/home/footer/icons/LinkedinH.svg";
import FacebookH from "@/assets/home/footer/icons/FacebookH.svg";
import InstagramH from "@/assets/home/footer/icons/InstagramH.svg";
import arrorwImg from "@/assets/home/footer/arrow.svg";

import styles from "./LandinPageMainSec.module.css";
import Image from "next/image";
import Link from "next/link";

export const CONTACT_LINKS = {
  Facebook: "https://www.facebook.com/",
  Linkedin: "https://www.linkedin.com/",
  Instagram: "https://www.instagram.com/",
};

const images = {
  Linkedin,
  Facebook,
  Instagram,
  LinkedinH,
  FacebookH,
  InstagramH,
};

const Company = ["Who We Are", "Careers", "Team", "Report Fraud"];
const CompanyRoutes = ["", "", "", ""];
const Legal = [
  "Terms & Conditions",
  "Refund & Cancellation",
  "Privacy Policy",
  "Cookie Policy",
  "Offer Terms",
];
const LegalRoutes = ["", "", "", "", ""];
const Support = ["help@melomint.abc", "(+91) 1234567890", "(+91) 1234567891"];
const SupportHrefs = [
  "mailto:help@abc.xyz",
  "tel:+911234567890",
  "tel:+911234567891",
];
const SocialMediaIcons = ["Linkedin", "Facebook", "Instagram"];

const CompanyList = Company.map((General, index) => {
  return (
    <li key={index}>
      <Link href={`${CompanyRoutes[index]}`}>{General}</Link>
    </li>
  );
});
const LegalList = Legal.map((Browse, index) => {
  return (
    <li key={index}>
      <Link href={`${LegalRoutes[index]}`}>{Browse}</Link>
    </li>
  );
});
const SupportList = Support.map((Support, index) => {
  return (
    <li key={index}>
      <a href={`${SupportHrefs[index]}`}>{Support}</a>
    </li>
  );
});
const SocialMediaIconsList = SocialMediaIcons.map(
  (socialMediaIconName, index) => {
    return (
      <ImageStackComponent
        key={index}
        link={CONTACT_LINKS[socialMediaIconName as keyof typeof CONTACT_LINKS]}
        normalDisplay={images[socialMediaIconName as keyof typeof images]}
        hoverDisplay={
          images[(socialMediaIconName + "H") as keyof typeof images]
        }
        iconsClass={styles.Icons}
        iconsWrapperClass={styles.IconsSubWrapper}
        StackImageStyle={{}}
      />
    );
  }
);

function LandinPageMainSec() {
  const footerCompanyLinksRef = React.useRef(12);
  const footerLegalLinksRef = React.useRef(123);
  const footerSupportLinksRef = React.useRef(1234);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <header className={styles.header}>
          <Link href="/">
            <Image src={Logo} alt="Melomint" width={129} height={30} />
          </Link>
          <div className={styles.rightSec}>
            <Button
              variant="subtle"
              size="md"
              component={Link}
              href={{
                pathname: "/",
                query: { authModal: "register" },
              }}
            >
              Register as Artist
            </Button>
            <Button
              color="secondary"
              size="md"
              radius={"xl"}
              component={Link}
              href={{
                pathname: "/",
                query: { authModal: "login" },
              }}
            >
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
            <Button
              size="lg"
              component={Link}
              href={{
                pathname: "/",
                query: { authModal: "register" },
              }}
            >
              {"Get Started ->"}
            </Button>
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
      <footer className={styles.Wrapper}>
        <div className={styles.UpperContainer}>
          <div className={styles.Links}>
            <div ref={footerCompanyLinksRef as any}>
              <span>
                Company{" "}
                <Image src={arrorwImg} className={styles.Arrow} alt="arrow" />
              </span>
              <ul>{CompanyList}</ul>
            </div>
            <div ref={footerCompanyLinksRef as any}>
              <span>
                Legal{" "}
                <Image src={arrorwImg} className={styles.Arrow} alt="arrow" />
              </span>
              <ul>{LegalList}</ul>
            </div>
            <div ref={footerCompanyLinksRef as any}>
              <span>
                Support{" "}
                <Image src={arrorwImg} className={styles.Arrow} alt="" />
              </span>
              <ul>{SupportList}</ul>
            </div>
          </div>
        </div>

        <div className={styles.LowerContainer}>
          <div className={styles.CompanyLogoWrapper}>
            <Link target="_blank" rel="noopener noreferrer" href="/">
              <Image src={Logo} alt="Logo" />
            </Link>
            <div className={styles.Copyright}>Copyright (c) 2021</div>
          </div>
          <div className={styles.IconsWrapper}>
            <div
              style={{
                display: "flex",
              }}
            >
              {SocialMediaIconsList}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandinPageMainSec;
