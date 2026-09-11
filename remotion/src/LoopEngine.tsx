import { Composition } from "remotion";
import { LoopEngineeringCover } from "./LoopEngineeringCover";

export const RemotionRoot = () => {
  return (
    <Composition
      id="LoopEngineeringCover"
      component={LoopEngineeringCover}
      durationInFrames={360}
      fps={30}
      width={1600}
      height={900}
      defaultProps={{}}
    />
  );
};
