import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const InternetConnection = ({ visible, onRetry, loading }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => { }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.groupChildPosition}>
            <View style={[styles.groupChild, styles.groupChildPosition]} />
            <Text style={styles.pleaseCheckYour}>
              {'Please check your connection then refresh the page'}
            </Text>
            <View style={styles.groupParent}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TouchableOpacity onPress={onRetry}>
                  <View style={[styles.vectorGroup, styles.groupLayout]}>
                    <Image
                      style={[styles.groupItem, styles.groupLayout]}
                      resizeMode="cover"
                      source={require("../assets/Retry_Button.png")}
                    />
                    <Text style={[styles.retry, styles.retryPosition]}></Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
         
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#26262A',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
    groupChildPosition: {
        width: 353,
        top: 0,
     
        position: "absolute",
        height: 163,
    },
    groupLayout: {
        width: 148,
        height: 44,
        top: 0,
        position: "absolute",
    },
    retryPosition: {
        color: Color.neutral10,
        top: "50%",
        textAlign: "center",
        left: "50%",
        position: "absolute",
    },
    groupChild: {
        borderRadius: Border.br_xs,
        backgroundColor: "white",
    },
    pleaseCheckYour: {
        top: "10%",
        
        fontSize: FontSize.size_xl,
        fontWeight: "700",
        fontFamily: FontFamily.montserratBold,
        color: "black",
        textAlign: "center",
        marginHorizontal:"5%",
        position: "absolute",
    },
    groupItem: {
        borderRadius: Border.br_smi,
        left: 0,
        width: 148,
    },
    cancel: {
        marginTop: -9,
        marginLeft: -30,
        fontFamily: FontFamily.montserratSemiBold,
        fontWeight: "600",
        fontSize: FontSize.size_sm,
        color: Color.neutral10,
        top: "50%",
    },
    vectorParent: {
        left: 0,
        width: 148,
    },
    retry: {
        marginTop: -8,
        marginLeft: -20,
        fontFamily: FontFamily.montserratSemiBold,
        fontWeight: "600",
        fontSize: FontSize.size_sm,
        color: Color.neutral10,
        top: "50%",
    },
    vectorGroup: {
      left:"25%"
    },
    groupParent: {
        top: 106,
        left: 15,
        width: 323,
        height: 44,
        position: "absolute",
    },
    noInternetConnection: {
        
        fontSize: FontSize.size_xl,
        fontWeight: "700",
        fontFamily: FontFamily.montserratBold,
        color: 'Black',
    },
    noInternet: {
        width: "100%",

    },
});

export default InternetConnection;
