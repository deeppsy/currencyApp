import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import slides from "../data/slides";
import colors from "../utils/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Slide = ({ item }) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.item.image} style={styles.images} />
      <Text style={styles.title}>{item.item.title}</Text>
      <Text style={styles.subtitle}>{item.item.subtitle}</Text>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);

  const Footer = () => {
    return (
      <View
        style={{
          height: windowHeight * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: colors.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => navigation.replace("HomeScreen")}
              >
                <Text style={styles.btnText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: colors.white,
                  },
                ]}
                onPress={skip}
              >
                <Text style={[styles.btnText, { color: colors.white }]}>
                  Skip
                </Text>
              </TouchableOpacity>
              <View style={{ width: 20 }} />

              <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = (e) => {
    const contextOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contextOffsetX / windowWidth);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * windowWidth;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * windowWidth;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <FlatList
        data={slides}
        contentContainerStyle={{
          height: windowHeight * 0.75,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{ height: 100 }} />}
        renderItem={(item) => <Slide item={item} />}
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        ref={ref}
      />

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    // justifyContent: "center",
  },
  slideContainer: {
    alignItems: "center",
  },
  images: {
    height: "75%",
    width: windowWidth,
    resizeMode: "contain",
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
    padding: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 10,
    maxWidth: "70%",
    lineHeight: 23,
    textAlign: "center",
    color: colors.white,
  },

  indicator: {
    height: 2.5,
    width: 10,
    marginHorizontal: 3,
    borderRadius: 2,
    backgroundColor: "gray",
  },
  btn: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default OnboardingScreen;
