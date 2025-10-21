import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBluesky } from "@fortawesome/free-brands-svg-icons";

export default function BlueskyFAIcon({ size = 'lg' }: { size?: string }) {
  // Social icons use a square 24px area; keep consistent sizing
  return <FontAwesomeIcon icon={faBluesky} className="w-6 h-6" />;
}
