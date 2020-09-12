import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, {
  round,
  divide,
  block,
  call,
  cond,
  neq,
  set,
  useCode,
} from "react-native-reanimated";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { ANIM_TEXT_HEIGHT } from "./constants";
import RecycleCategoryItem from "./RecycleCategoryItem";
let { width } = Dimensions.get("window");
import { onScrollEvent, useValues } from "react-native-redash";

const MULTIPLY_CONSTANT = 14;
const CONTAINER_HEIGHT = ANIM_TEXT_HEIGHT * MULTIPLY_CONSTANT;
const CONTAINER_WIDTH = width;
const PADDING_CONSTANT = ANIM_TEXT_HEIGHT * ((MULTIPLY_CONSTANT - 1) / 2);
const BTN_WIDTH = 220;
const MARGIN_LEFT = (CONTAINER_WIDTH - BTN_WIDTH) / 2;
const FADE_HEIGHT = 250;
const RENDER_AHEAD = ANIM_TEXT_HEIGHT * 100;
const DUPLICATED_TIMES = 200;
const DEFAULT_NUM_ITEMS = 51;

const dataProvider = new DataProvider((r1, r2) => {
  return r1.idCompare !== r2.idCompare;
});

const AnimatedRecyclerList = Animated.createAnimatedComponent(RecyclerListView);

const getSnapIndex = (translateY: Animated.Adaptable<number>) => {
  return round(divide(translateY, ANIM_TEXT_HEIGHT));
};

const generateArray = (n) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = generateRandomWord();
  }
  return arr;
};

const generateRandomWord = () => {
  return Math.random().toString(36).substring(7);
};

const layoutProvider = new LayoutProvider(
  () => {
    return 0;
  },
  (_, dim) => {
    dim.width = width;
    dim.height = ANIM_TEXT_HEIGHT;
  }
);

export default function TestPerformanceList() {
  const [translateY, snapIndex] = useValues(0, 0);
  const rowRenderer = (_, dataName, index) => {
    return (
      <RecycleCategoryItem
        name={dataName}
        snapIndex={snapIndex}
        index={index}
      />
    );
  };

  const data = generateArray(DUPLICATED_TIMES * DEFAULT_NUM_ITEMS);

  const datasProvide = dataProvider.cloneWithRows(data);
  const initialOffset = (data.length / 2) * ANIM_TEXT_HEIGHT;
  const categoriesAvailable = data.length > 0;

  const onScrollHandler = onScrollEvent({ y: translateY });

  useCode(
    () =>
      block([
        cond(neq(snapIndex, getSnapIndex(translateY)), [
          set(snapIndex, getSnapIndex(translateY)),
        ]),
      ]),
    [translateY]
  );

  return (
    <View style={styles.bg}>
      <View style={styles.outerContainer}>
        <FontAwesome
          name="caret-right"
          color={"red"}
          size={33}
          style={styles.indicator}
        />
        <View style={styles.container}>
          {categoriesAvailable && (
            <AnimatedRecyclerList
              layoutProvider={layoutProvider}
              dataProvider={datasProvide}
              rowRenderer={rowRenderer}
              renderAheadOffset={RENDER_AHEAD}
              initialOffset={initialOffset}
              scrollViewProps={SCROLL_VIEW_PROPS}
              onScroll={onScrollHandler}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    width: CONTAINER_WIDTH,
    overflow: "hidden",
    left: MARGIN_LEFT,
    position: "absolute",
  },
  outerContainer: {
    height: CONTAINER_HEIGHT,
    width: CONTAINER_WIDTH,
    marginBottom: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    left: MARGIN_LEFT - 25,
  },
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentStyle: {
    paddingVertical: PADDING_CONSTANT,
  },
});

const SCROLL_VIEW_PROPS = {
  snapToInterval: ANIM_TEXT_HEIGHT,
  fadingEdgeLength: FADE_HEIGHT,
  contentContainerStyle: styles.contentStyle,
};
