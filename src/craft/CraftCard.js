// components/user/Card.js
import React  from "react";
import { CraftText } from "./CraftText";
import { CraftButton } from "./CraftButton";
import { CraftContainer } from "./CraftContainer";

export const CraftCard = ({background, padding = 20}) => {
  return (
    <CraftContainer background={background} padding={padding}>
      <div className="text-only">
        <CraftText text="Title" fontSize={20} />
        <CraftText text="Subtitle" fontSize={15} />
      </div>
      <div className="buttons-only">
        <CraftButton size="small" text="Learn more" variant="contained" color="primary" />
      </div>
    </CraftContainer>
  )
}
