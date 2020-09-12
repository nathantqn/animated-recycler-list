import React from "react";
import { View, StyleSheet } from "react-native";
import { upperCase } from "lodash";
import Animated, { cond, eq, color } from "react-native-reanimated";
import { ANIM_TEXT_HEIGHT } from "./constants";

interface Props {
  name: string;
  index: number;
  snapIndex: Animated.Node<number>;
}

const NORMAL_TEXT_SIZE = 18;

const RecycleCategoryItem = ({ name, index, snapIndex }: Props) => {
  const isSelected = eq(index, snapIndex);
  const fontWeight = cond(isSelected, "bold", "normal");
  const showedColor = cond(isSelected, color(255, 0, 0, 1), color(0, 0, 0, 1));

  /* If you use the below commented snippet, you gonna see that */
  /* the more the list is exposed, the more laggy it is */
  /* and the selected state is NOT updated smoothly and pretty delayed */

  // return (
  //   <View style={styles.textContainer}>
  //     <Animated.Text
  //       style={[styles.categoryName, { fontWeight, color: showedColor }]}
  //     >
  //       {upperCase(name)}
  //     </Animated.Text>
  //   </View>
  // );

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
