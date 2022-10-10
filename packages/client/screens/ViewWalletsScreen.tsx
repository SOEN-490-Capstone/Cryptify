import React, { Component } from "react";
import { View } from "../components/Themed";
import { Box } from "native-base";

import { StyleSheet } from "react-native";
import AccordionView from "../components/WalletViewAccordian";


export default function ViewWalletsScreen() {
    return (
        <View>
            <Box style={{paddingBottom:20}}>
               <AccordionView/>
            </Box>
            <Box>
               <AccordionView/>
            </Box>

            {/* <Box style={styles.view}>

                <VStack height="94px" alignItems="center">
                    <FontAwesomeIcon icon={faWalletCustom} style={styles.walletIcon} size={56} />
                    <Text style={styles.settingsListText}>You do not have any wallets.</Text>
                </VStack>
            </Box> */}
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
    },
    settingsListText: {
        fontSize: 17,
        marginTop: 15,
    },
    walletIcon: {
        color: "#404040",
    },

});
