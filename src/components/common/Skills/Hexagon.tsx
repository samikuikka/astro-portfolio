import React from "react";

interface HexagonProps {
  size: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
  x?: number;
  y?: number;
}

const Hexagon: React.FC<HexagonProps> = ({
  size,
  fill,
  stroke = "white",
  strokeWidth = 2,
  className = "",
  children,
  x = 0,
  y = 0,
}) => {
  const width = size * 2;
  const height = size * Math.sqrt(3);

  const outerPoints = [
    [width * 0.25, 0],
    [width * 0.75, 0],
    [width, height * 0.5],
    [width * 0.75, height],
    [width * 0.25, height],
    [0, height * 0.5],
  ]
    .map(([px, py]) => `${px},${py}`)
    .join(" ");

  const innerScale = 0.8;
  const innerWidth = width * innerScale;
  const innerHeight = height * innerScale;

  const innerPoints = [
    [innerWidth * 0.25, 0],
    [innerWidth * 0.75, 0],
    [innerWidth, innerHeight * 0.5],
    [innerWidth * 0.75, innerHeight],
    [innerWidth * 0.25, innerHeight],
    [0, innerHeight * 0.5],
  ]
    .map(([px, py]) => `${px},${py}`)
    .join(" ");

  const offsetX = (width - innerWidth) / 2;
  const offsetY = (height - innerHeight) / 2;

  return (
    <g transform={`translate(${x - width / 2}, ${y - height / 2})`}>
      {/* Outer hex */}
      <polygon
        points={outerPoints}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={className}
      />

      {/* Inner ring (slightly smaller), usually no fill and a lighter stroke */}
      <polygon
        points={innerPoints}
        transform={`translate(${offsetX}, ${offsetY})`}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        opacity={0.5}
        filter="url(#glowFilter)"
      />

      {children}
    </g>
  );
};

export default Hexagon;
