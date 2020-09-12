import React from "react";
import { View, StyleSheet } from "react-native";
import { upperCase } from "lodash";
import Animated, { cond, eq } from "react-native-reanimated";
import { ANIM_TEXT_HEIGHT } from "./constants";

interface Props {
  name: string;
}

const NORMAL_TEXT_SIZE = 18;

const RecycleCategoryItem = ({ name }: Props) => {
  return (
    <View style={styles.textContainer}>
      <Animated.Text style={[styles.categoryName]}>
        {upperCase(name)}
      </Animated.Text>
    </View>
  );
};

export default React.memo(RecycleCategoryItem);

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    height: ANIM_TEXT_HEIGHT,
  },
  categoryName: {
    textAlign: "left",
    fontSize: NORMAL_TEXT_SIZE,
    color: "black",
  },
});
