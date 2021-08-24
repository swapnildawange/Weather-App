import Moment from "moment";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChevronLeft from "../svg/ChevronLeft";
import { Daily } from "./Test.data";
import { Image } from "native-base";

const Next = ({ route, navigation }) => {
  const [dailyData, setDailyData] = useState(route.params.dailyData || []);
  const cityName = route.params.cityName;

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.nav__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft width={30} height={50} />
        </TouchableOpacity>

        <View style={styles.nav__item}>
          <Text style={{ fontSize: 20, color: "#fff" }}>{cityName}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {dailyData.slice(0, 1).map((data, index) => (
          <View
            key={index}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.text__md}>
              {/* Thursday,Okt 28th 2021 */}
              {Moment(new Date(data.dt * 1000)).format(`dddd, MMM DD YYYY`)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <Text
                style={[
                  styles.text__xlg,
                  { lineHeight: 120, paddingLeft: 15, alignSelf: "center" },
                ]}
              >
                {Math.round(data.temp.day)}
              </Text>
              <Text
                style={[styles.text__xlg, { fontSize: 60, lineHeight: 50 }]}
              >
                o
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.bottom__containerSmall}></View>
        <View style={styles.bottom__container}>
          <View style={styles.bottom__containerHandle}></View>
          <ScrollView>
            <View
              style={{
                flex: 1,
                // flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              {dailyData.slice(1).map((data, index) => (
                <View
                  key={index}
                  style={{
                    flex: 0.33,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
                    paddingBottom: 18,
                  }}
                >
                  <View style={styles.icon__wrapper}>
                    {data.weather[0].icon !== undefined && (
                      <Image
                        style={{
                          width: 60,
                          height: 60,
                        }}
                        source={{
                          uri: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                        }}
                        alt="icon"
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      flex: 0.1,
                    }}
                  >
                    <Text
                      style={[
                        styles.text__md,
                        { lineHeight: 20, color: "#115277" },
                      ]}
                    >
                      {Math.round(data.temp.day)}
                    </Text>
                    <Text
                      style={[
                        styles.text__md,
                        { fontSize: 10, lineHeight: 9, color: "#115277" },
                      ]}
                    >
                      o
                    </Text>
                  </View>
                  <View style={{ flex: 0.45 }}>
                    <Text
                      style={{
                        color: "#115277",
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      {Moment(new Date(data.dt * 1000)).format("dddd")}
                    </Text>
                    <Text
                      style={{ color: "rgba(17, 82, 119,0.7)", fontSize: 15 }}
                    >
                      {Moment(new Date(data.dt * 1000)).format("DD MMMM")}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Next;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14A9EB",
    paddingTop: 25,
  },
  nav__container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
    marginTop: 30,
  },
  nav__item: {
    backgroundColor: "#49C5F7",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 18,
  },
  text__xlg: {
    color: "#fff",
    fontSize: 100,
    fontWeight: "bold",
  },

  text__md: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottom__container: {
    flex: 1,
    backgroundColor: "#F8F8FA",
    marginHorizontal: 24,
    marginBottom: 24,
    paddingTop: 30,
    borderRadius: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  bottom__containerSmall: {
    position: "absolute",
    top: -15,
    backgroundColor: "#89CFF3",
    borderRadius: 50,
    width: "75%",
    height: 100,
  },
  icon__wrapper: {
    backgroundColor: "#1D8ADC",
    borderRadius: 100,
    height: 60,
    width: 60,
  },
  bottom__containerHandle: {
    position: "absolute",
    top: 20,
    backgroundColor: "#DEDEDE",
    borderRadius: 50,
    width: "18%",
    height: 10,
  },
});
