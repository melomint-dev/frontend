import React, { useState } from "react";
import Image from "next/image";
// import "../../../../styles/_general/ImageStackComponent.css";

import Styles from "./ImageStackComponent.module.css";

function ImageStackComponent(props: {
  link: string;
  iconsClass: string;
  iconsWrapperClass: string;
  normalDisplay: string;
  hoverDisplay: string;
  StackImageStyle: React.CSSProperties;
}) {
  const [displayClass, setDisplayClass] = useState(
    `${Styles.NormalState} ${Styles.Img}`
  );
  const [hoverClass, setHoverClass] = useState(
    `${Styles.HoverState} ${Styles.Img}`
  );

  return (
    <a
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      className={
        Styles.Wrapper + " " + props.iconsClass + " " + props.iconsWrapperClass
      }
      onMouseOver={() => {
        setDisplayClass(`${Styles.HoverState} ${Styles.Img}`);
        setHoverClass(`{Styles.NormalState} {Styles.Img}`);
      }}
      onMouseOut={() => {
        setHoverClass(`${Styles.HoverState} ${Styles.Img}`);
        setDisplayClass(`{Styles.NormalState} {Styles.Img}`);
      }}
      style={props.StackImageStyle}
    >
      <Image
        src={props.normalDisplay}
        alt="normal state"
        className={displayClass + " " + props.iconsClass}
        style={props.StackImageStyle}
      />
      <Image
        src={props.hoverDisplay}
        alt="hover display"
        className={hoverClass + " " + props.iconsClass}
        style={props.StackImageStyle}
      />
    </a>
  );
}

export default ImageStackComponent;
