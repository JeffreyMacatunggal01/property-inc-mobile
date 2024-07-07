import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

function CustomView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.thread1}>
            <View style={styles.thread_Profile}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse3}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
            <View style={styles.thread_Text}>
              <View style={styles.rect4}></View>
              <Text style={styles.text}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
          </View>
          <View style={styles.thread2}>
            <View style={styles.rect6}>
              <View style={styles.rect7}></View>
              <Text style={styles.text2}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
            <View style={styles.rect5}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse4}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
          </View>
          <View style={styles.group2}>
            <View style={styles.rect11}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse6}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
            <View style={styles.rect12}>
              <View style={styles.rect13}></View>
              <Text style={styles.text4}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.rect8}>
              <View style={styles.rect9}></View>
              <Text style={styles.text3}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
            <View style={styles.rect10}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse5}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
          </View>
          <View style={styles.group4}>
            <View style={styles.rect17}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse8}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
            <View style={styles.rect18}>
              <View style={styles.rect19}></View>
              <Text style={styles.text6}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
          </View>
          <View style={styles.group3}>
            <View style={styles.rect14}>
              <View style={styles.rect15}></View>
              <Text style={styles.text5}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
            <View style={styles.rect16}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse7}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
          </View>
          <View style={styles.group6}>
            <View style={styles.rect23}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse10}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
            <View style={styles.rect24}>
              <View style={styles.rect25}></View>
              <Text style={styles.text8}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
          </View>
          <View style={styles.group5}>
            <View style={styles.rect20}>
              <View style={styles.rect21}></View>
              <Text style={styles.text7}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
            <View style={styles.rect22}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse9}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
          </View>
          <View style={styles.group8}>
            <View style={styles.rect29}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse12}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
            <View style={styles.rect30}>
              <View style={styles.rect31}></View>
              <Text style={styles.text10}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
          </View>
          <View style={styles.group7}>
            <View style={styles.rect26}>
              <View style={styles.rect27}></View>
              <Text style={styles.text9}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
            <View style={styles.rect28}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse11}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
          </View>
          <View style={styles.group10}>
            <View style={styles.rect35}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse14}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
            <View style={styles.rect36}>
              <View style={styles.rect37}></View>
              <Text style={styles.text12}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
          </View>
          <View style={styles.group9}>
            <View style={styles.rect32}>
              <View style={styles.rect33}></View>
              <Text style={styles.text11}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
            <View style={styles.rect34}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse13}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
          </View>
          <View style={styles.group12}>
            <View style={styles.rect41}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse16}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
            <View style={styles.rect42}>
              <View style={styles.rect43}></View>
              <Text style={styles.text14}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
          </View>
          <View style={styles.group11}>
            <View style={styles.rect38}>
              <View style={styles.rect39}></View>
              <Text style={styles.text13}>
                Lorem Ipsum Lorem IpsumLorem IpsumLor Lorem IpsumLorem
                IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLor Lorem
                IpsumLorem IpsumLorem Ipsum
              </Text>
            </View>
            <View style={styles.rect40}>
              <Svg viewBox="0 0 57.54 57.54" style={styles.ellipse15}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(230, 230, 230,1)"
                  cx={29}
                  cy={29}
                  rx={29}
                  ry={29}
                ></Ellipse>
              </Svg>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.profile}>
        <View style={styles.rect44}>
          <Text style={styles.yourName}>YOUR NAME</Text>
        </View>
        <Svg viewBox="0 0 48.69 48.69" style={styles.ellipse}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="rgba(255,0,0,1)"
            cx={24}
            cy={24}
            rx={24}
            ry={24}
          ></Ellipse>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollArea: {
    width: 375,
    height: 609,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 93
  },
  scrollArea_contentContainerStyle: {
    height: 1723,
    width: 375
  },
  thread1: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 5
  },
  thread_Profile: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse3: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  thread_Text: {
    flex: 0.8
  },
  rect4: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  thread2: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 5
  },
  rect6: {
    flex: 0.8
  },
  rect7: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text2: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  rect5: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse4: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  group2: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 5
  },
  rect11: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse6: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  rect12: {
    flex: 0.8
  },
  rect13: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text4: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  group: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 5
  },
  rect8: {
    flex: 0.8
  },
  rect9: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text3: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  rect10: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse5: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  group4: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 5
  },
  rect17: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse8: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  rect18: {
    flex: 0.8
  },
  rect19: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text6: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  group3: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 5
  },
  rect14: {
    flex: 0.8
  },
  rect15: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text5: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  rect16: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse7: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  group6: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 23,
    marginLeft: 5
  },
  rect23: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse10: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  rect24: {
    flex: 0.8
  },
  rect25: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text8: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  group5: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 5
  },
  rect20: {
    flex: 0.8
  },
  rect21: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text7: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  rect22: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse9: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  group8: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 5
  },
  rect29: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse12: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  rect30: {
    flex: 0.8
  },
  rect31: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text10: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  group7: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 5
  },
  rect26: {
    flex: 0.8
  },
  rect27: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text9: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  rect28: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse11: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  group10: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 19,
    marginLeft: 5
  },
  rect35: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse14: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  rect36: {
    flex: 0.8
  },
  rect37: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text12: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  group9: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 5
  },
  rect32: {
    flex: 0.8
  },
  rect33: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text11: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  rect34: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse13: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  group12: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 5
  },
  rect41: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse16: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  rect42: {
    flex: 0.8
  },
  rect43: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text14: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  group11: {
    width: 363,
    height: 107,
    backgroundColor: "rgba(182,181,181,1)",
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 5
  },
  rect38: {
    flex: 0.8
  },
  rect39: {
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0,
    width: 290,
    height: 107
  },
  text13: {
    top: 6,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    right: 6,
    width: 277,
    height: 93
  },
  rect40: {
    flex: 0.2,
    backgroundColor: "rgba(199,199,199,1)"
  },
  ellipse15: {
    width: 58,
    height: 58,
    marginTop: 25,
    marginLeft: 5
  },
  profile: {
    width: 375,
    height: 58,
    backgroundColor: "rgba(203,203,203,1)",
    flexDirection: "row",
    marginTop: -668
  },
  rect44: {
    flex: 0.79,
    backgroundColor: "rgba(218, 218, 218,1)"
  },
  yourName: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 29,
    width: 274,
    lineHeight: 28,
    fontSize: 28,
    textAlign: "left",
    marginTop: 17,
    marginLeft: 6
  },
  ellipse: {
    top: 5,
    left: 311,
    width: 49,
    height: 49,
    position: "absolute"
  }
});

export default CustomView;
