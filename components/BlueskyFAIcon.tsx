import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBluesky } from "@fortawesome/free-brands-svg-icons";

export default function BlueskyFAIcon(props: { size?: "xs" | "lg" | "sm" | "1x" | "2x" | "3x" | "4x" | "5x" | undefined }) {
  return <FontAwesomeIcon icon={faBluesky} {...props} />;
}
