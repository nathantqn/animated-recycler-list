import React from "react";
import { View, StyleSheet } from "react-native";
import { upperCase } from "lodash";
import Animated from "react-native-reanimated";
import { ANIM_TEXT_HEIGHT } from "./constants";

interface Props {
  name: string;
  color: Animated.Node<number>;
  opacity: Animated.Node<number>;
}

const NORMAL_TEXT_SIZE = 18;

const RecycleCategoryItem = ({ name, color, opacity }: Props) => {
  /* If you use the below commented snippet, you gonna see that */
  /* the more the list is exposed, the more laggy it is */
  /* and the selected state is NOT updated smoothly and pretty delayed */

  return (
    <Animated.View style={[styles.textContainer]}>
      <Animated.Text style={[styles.categoryName, { opacity }]}>
        {upperCase(name)}
      </Animated.Text>
    </Animated.View>
  );

  // return (
  //   <View style={styles.textContainer}>
  //     <Animated.Text style={[styles.categoryName]}>
  //       {upperCase(name)}
  //     </Animated.Text>
  //   </View>
  // );
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
