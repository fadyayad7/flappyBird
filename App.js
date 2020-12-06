import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obtsacles";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2
  );
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const obstaclesWidth = 60;
  const obstaclesHeight = 300;
  const gap = 200;
  const gravity = 3;
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  //start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -obstaclesWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimerId);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
      setScore(score => score + 1);
    }
  }, [obstaclesLeft]);

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -obstaclesWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo);
      };
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 100);
      setScore(score => score + 1);
    }
  }, [obstaclesLeftTwo]);

  //check for collision
  useEffect(() => {
    if (
      ((birdBottom < obstaclesNegHeight + obstaclesHeight + 25 ||
        birdBottom > obstaclesNegHeight + obstaclesHeight + gap - 25) &&
        obstaclesLeft > screenWidth / 2 - 25 &&
        obstaclesLeft < screenWidth / 2 + 25) ||
      ((birdBottom < obstaclesNegHeightTwo + obstaclesHeight + 25 ||
        birdBottom > obstaclesNegHeightTwo + obstaclesHeight + gap - 25) &&
        obstaclesLeftTwo > screenWidth / 2 - 25 &&
        obstaclesLeftTwo < screenWidth / 2 + 25)
    ) {
      gameover();
    }
  });


  //gameover function
  const gameover = () => {
    setIsGameOver(true);
    clearInterval(gameTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerIdTwo);
  };

  //jump function
  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>{score}</Text> }
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
        <Obstacles
          color={"green"}
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          obstaclesLeft={obstaclesLeft}
          gap={gap}
          randomBottom={obstaclesNegHeight}
        />
        <Obstacles
          color={"yellow"}
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          obstaclesLeft={obstaclesLeftTwo}
          gap={gap}
          randomBottom={obstaclesNegHeightTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
