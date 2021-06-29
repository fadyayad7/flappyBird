import React, { Component } from "react";
import { View } from "react-native";

const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 50;

  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "red",
        width: birdWidth,
        height: birdHeight,
        bottom: birdBottom,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom,
        borderRadius: 0.50 * birdWidth
      }}
    ></View>
  );
};

export default Bird;
