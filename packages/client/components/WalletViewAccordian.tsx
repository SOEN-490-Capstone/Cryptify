import React, { Component } from "react";
import { View } from "./Themed";
import { Text, HStack, Box, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRightCustom } from "./icons/faChevronRightCustom";
import { faChevronDownCustom } from "./icons/faChevronDownCustom";
import { faBitcoinCustom } from "./icons/faBitcoinCustom";
import { StyleSheet } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

type Section = {
    title: string;
    content: string;
    walletName: string;
    walletAddress: string;
    walletBalance: number;
};

const SECTIONS = [
    {
        title: "Bitcoin",
        content: "Lorem ipsum...",
        walletName: "BitcoinWallet",
        walletAddress: "walletAddress",
        walletBalance: 5.10231235,
    },
];

class AccordionView extends Component {
    state = {
        activeSections: [],
    };

    _renderSectionTitle = (section: Section) => {
        return <View>{/* <Text>{section.content}</Text> */}</View>;
    };

    _renderHeader = (section: Section) => {
        return (
            <View style={styles.header}>
                <HStack height="66px" alignItems="center">
                    <FontAwesomeIcon icon={faBitcoinCustom} style={styles.bitcoinIcon} size={26} />
                    <Text style={styles.headerText}>{section.title}</Text>
                    <FontAwesomeIcon
                        icon={this._checkingActiveSate() ? faChevronRightCustom : faChevronDownCustom}
                        style={styles.chevronIcon}
                        size={16}
                    />
                </HStack>
            </View>
        );
    };

    _renderContent = (section: Section) => {
        return (
            <View style={styles.content}>
                <HStack>
                    <VStack>
                        <Text style={styles.walletName}>{section.walletName}</Text>
                        <Text style={styles.walletAddress}>{section.walletAddress}</Text>
                    </VStack>

                    <Text style={styles.walletBalance}>{section.walletBalance} BTC</Text>
                </HStack>
            </View>
        );
    };

    _updateSections = (activeSections: number[]) => {
        this.setState({ activeSections });
    };

    _checkingActiveSate = () => {
        return this.state.activeSections.length == 0;
    };

    render() {
        return (
            <View>
                <Box style={styles.view}>
                    <Accordion
                        sections={SECTIONS}
                        activeSections={this.state.activeSections}
                        renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                    />
                </Box>
            </View>
        );
    }
}

export default AccordionView;

const styles = StyleSheet.create({
    view: {
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: "#E5E5E5",
        borderWidth: 1,
        overflow: "hidden",
        backgroundColor: "#68a0cf",
    },
    header: {
        paddingHorizontal: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#E5E5E5",
    },
    headerText: {
        fontSize: 17,
        lineHeight: 23,
        marginLeft: 15,
        color: "text.700",
    },
    content: {
        borderColor: "#E5E5E5",
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    bitcoinIcon: {
        color: "#F7931A",
    },
    chevronIcon: {
        color: "#A3A3A3",
        marginLeft: "auto",
        marginRight: 5,
    },
    walletName: {
        fontSize: 17,
    },
    walletAddress: {
        fontSize: 13,
        color: "#A3A3A3",
    },
    walletBalance: {
        fontSize: 17,
        marginLeft: "auto",
        marginRight: 0,
    },
});
