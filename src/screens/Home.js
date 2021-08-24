import { AntDesign } from "@expo/vector-icons";
import Axios from "axios";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import Moment from "moment";
import { ChevronRightIcon, Icon, IconButton, Image, Input } from "native-base";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import TestData from "./Test.data";

const API_KEY = Constants.manifest.extra.API_KEY;

const Home = ({ navigation }) => {
  const today = new Date();

  const [currentWeather, setCurrentWeather] = useState({});
  const [remainingHours, setRemainingHours] = useState(24);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [mainInfo, setMainInfo] = useState({});

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isShowInput, setIsShowInput] = useState(false);
  const [cityName, setCityName] = useState("Nashik");
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      })
        .then(({ coords }) => {
          console.log("currentPosition", coords);
          setLocation(coords);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  let text = "Waiting..";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const searchOneCall = () => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location?.latitude}&lon=${location?.longitude}&exclude=minutely&appid=${API_KEY}&units=metric`
    )
      .then(({ data }) => {
        setHourlyData(data.hourly);
        setDailyData(data.daily);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const hoursToShow = () => {
    const date = new Date(TestData[0].dt * 1000);
    setRemainingHours(24 - date.getHours());
  };

  const searchByCityName = () => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    )
      .then(({ data }) => {
        setLocation({
          longitude: data.coord.lon,
          latitude: data.coord.lat,
        });
        setCurrentWeather(data);
        setCityName(data.name);
        setWeatherInfo(data.weather[0]);
        setMainInfo(data.main);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const searchByLocation = () => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${API_KEY}&units=metric`
    )
      .then(({ data }) => {
        setCurrentWeather(data);
        setCityName(data.name);
        setWeatherInfo(data.weather[0]);
        setMainInfo(data.main);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    searchByLocation();
    hoursToShow();
    searchOneCall();
  }, [location]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.nav__container}>
        <HomeSvg height="30" width="30" />
        <NotificationSvg height="30" width="30" />
      </View> */}
      <View
        style={{
          marginVertical: 40,
        }}
      >
        {isShowInput ? (
          <>
            <Input
              type={"text"}
              value={cityName}
              onChangeText={(text) => setCityName(text)}
              onSubmitEditing={() => {
                // setCityName(value);
                searchByCityName();
                setIsShowInput(false);
              }}
              InputRightElement={
                <IconButton
                  style={{ marginHorizontal: 5 }}
                  icon={
                    <Icon
                      size="sm"
                      as={
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color="black"
                          onPress={() => setIsShowInput(false)}
                        />
                      }
                      color="black"
                    />
                  }
                />
              }
              placeholder="Enter city name"
            />
          </>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>{cityName}</Text>
            <TouchableOpacity onPress={() => setIsShowInput(!isShowInput)}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sub__title}>
          {Moment(today).format("ddd DD MMM")}
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.blob}>
          <Text style={[styles.text__md, { textTransform: "capitalize" }]}>
            {currentWeather?.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginVertical: 10,
            }}
          >
            <Text
              style={[styles.text__xlg, { lineHeight: 120, paddingLeft: 15 }]}
            >
              {Math.round(currentWeather?.main?.temp)}
            </Text>
            <Text style={[styles.text__xlg, { fontSize: 60, lineHeight: 50 }]}>
              o
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Text style={[styles.text__md, { lineHeight: 20, elevation: 3 }]}>
              Feels Like {currentWeather?.main?.feels_like}
            </Text>
            <Text
              style={[
                styles.text__md,
                { fontSize: 10, lineHeight: 9, elevation: 3 },
              ]}
            >
              o
            </Text>
          </View>

          {weatherInfo?.icon !== undefined && (
            <Image
              style={{
                width: 60,
                height: 60,
              }}
              source={{
                uri: `http://openweathermap.org/img/w/${weatherInfo?.icon}.png`,
              }}
              alt="icon"
            />
          )}
          <Text style={[styles.text__md, { marginBottom: 20 }]}>
            {weatherInfo?.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 25,
              fontWeight: "bold",
              marginBottom: 15,
            }}
          >
            Today
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Next", {
                dailyData,
                cityName,
              })
            }
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#11618E",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              next 7 days
            </Text>
            <ChevronRightIcon color="#11618E" size="5" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              {hourlyData.slice(0, remainingHours).map((item, index) => (
                <View style={styles.day__container} key={index}>
                  {index === 0 ? (
                    <>
                      <LinearGradient
                        // Button Linear Gradient
                        colors={["rgba(16, 158, 238,0.73)", "#009CF3"]}
                        style={[{ elevation: 3 }, styles.day__container]}
                      >
                        <View
                          style={{
                            paddingVertical: 20,
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "#fff",
                            }}
                          >
                            {Moment(new Date(item.dt * 1000)).format("hh:mm")}
                          </Text>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {item?.weather[0]?.icon !== undefined && (
                              <Image
                                style={{
                                  width: 60,
                                  height: 60,
                                }}
                                source={{
                                  uri: `http://openweathermap.org/img/w/${item?.weather[0]?.icon}.png`,
                                }}
                                alt="icon"
                              />
                            )}
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "flex-start",
                            }}
                          >
                            <Text style={[styles.text__md, { lineHeight: 20 }]}>
                              20
                            </Text>
                            <Text
                              style={[
                                styles.text__md,
                                { fontSize: 10, lineHeight: 9 },
                              ]}
                            >
                              o
                            </Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          paddingVertical: 20,
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {Moment(new Date(item.dt * 1000)).format("hh:mm")}
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {item?.weather[0]?.icon !== undefined && (
                            <Image
                              style={{
                                width: 60,
                                height: 60,
                              }}
                              source={{
                                uri: `http://openweathermap.org/img/w/${item?.weather[0]?.icon}.png`,
                              }}
                              alt="icon"
                            />
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                          }}
                        >
                          <Text
                            style={[
                              styles.text__md,
                              { lineHeight: 20, color: "#000" },
                            ]}
                          >
                            {Math.round(item.temp)}
                          </Text>
                          <Text
                            style={[
                              styles.text__md,
                              { fontSize: 10, lineHeight: 9, color: "#000" },
                            ]}
                          >
                            o
                          </Text>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDFFFF",
    padding: 24,
  },
  nav__container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  sub__title: {
    fontSize: 16,
    color: "rgba(0,0,0,0.6)",
    fontWeight: "600",
  },
  blob: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#62C2F8",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  text__md: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  text__xlg: {
    color: "#fff",
    fontSize: 100,
    fontWeight: "bold",
  },
  day__container: {
    width: wp("22%"),
    height: hp("25%"),
    borderRadius: 50,
    marginRight: 0,
  },
});
