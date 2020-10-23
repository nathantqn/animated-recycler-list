import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import Carousel from "react-native-snap-carousel";

const DATA = [
  {
    id: 1,
    backgroundColor: "red",
    name: "Item 1",
  },
  {
    id: 2,
    backgroundColor: "green",
    name: "Item 2",
  },
  {
    id: 3,
    backgroundColor: "blue",
    name: "Item 3 gonna be hidden by the Status Bar if swipe up",
  },
];

const { width, height } = Dimensions.get("window");

const SLIDER_WIDTH = width;
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height;
const SLIDER_HEIGHT = height;
const LOCK_SCROLL_DELAY_DURATION = 200;

export default function VerticalCarousel() {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    );
  };
  return (
    <Carousel
      data={DATA}
      renderItem={renderItem}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      sliderHeight={SLIDER_HEIGHT}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      keyboardShouldPersistTaps="always"
      lockScrollWhileSnapping
      lockScrollTimeoutDuration={LOCK_SCROLL_DELAY_DURATION}
      getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      snapToInterval={ITEM_HEIGHT}
      vertical
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  text: { color: "white", marginTop: 10 },
});
