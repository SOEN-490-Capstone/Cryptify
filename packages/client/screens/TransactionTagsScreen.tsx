import React from "react";
import { View } from "../components/Themed";
import { Pressable, HStack, Text, ScrollView, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AuthContext } from "../components/contexts/AuthContext";
import { TransactionTag } from "@cryptify/common/src/domain/entities/TransactionTag";
import { TagsGateway } from "../gateways/tags_gateway";
import { HomeStackScreenProps } from "../types";
import { farPlus } from "../components/icons/regular/farPlus";
import { farXMark} from "../components/icons/regular/farXMark";

export default function TransactionTagsScreen(props: HomeStackScreenProps<"TransactionTagsScreen">) {
  const { transaction} = props.route.params;

  const tagsGateway = new TagsGateway();

  const { token, user } = React.useContext(AuthContext);

  const [allUserTags, setAllUserTags] = React.useState<TransactionTag[]>([]);
  const [allTags, setAllTags] = React.useState<TransactionTag[]>([]);
  const [transactionTags, setTransactionTags] = React.useState<TransactionTag[]>([]);
  let addedTransactions: number[] = [];
  let removedTransactions: number[] = [];

  React.useEffect(() => {
    (async () => {
      const tags = await tagsGateway.findAllTags({ id: user.id }, token);
      setAllUserTags(tags);

      // TODO: This is a hack to get the tags associated to the transaction to show up on the screen
      //       refactor when the transaction details screen is refactored with getting the transaction
      //       from the backend on screen load instead of obtaining the transaction info when the
      //       overview screen is loaded.
      const transactionTags: TransactionTag[] = [];
      tags.filter(tag => tag.transactions.some(t => t.id === transaction.id)).forEach(tag => {
          transactionTags.push(tag);
      });
      setTransactionTags(transactionTags);

      // TODO: refactor by getting the difference between the transaction tags and all user tags
      const allTags: TransactionTag[] = [];
      tags.filter(tag => tag.transactions.every(t => t.id !== transaction.id)).forEach(tag => {
        allTags.push(tag);
      });
      setAllTags(allTags);
    })();
  }, []);

  function removeTransactionTag(tag: TransactionTag) {
    removedTransactions = [transaction.id];
    updateTransactionTag(tag).then(() => {
      setTransactionTags(transactionTags.filter((t) => t !== tag));
      setAllTags([...allTags, tag].sort((a, b) => (a.tagName > b.tagName ? 1 : -1)));
    });
  }

  function addTransactionTag(tag: TransactionTag) {
    addedTransactions = [transaction.id];
    updateTransactionTag(tag).then(() => {
      setTransactionTags([...transactionTags, tag].sort((a, b) => (a.tagName > b.tagName ? 1 : -1)));
      setAllTags(allTags.filter((t) => t !== tag));
    });
  }

  async function updateTransactionTag(tag: TransactionTag): Promise<void> {
      await tagsGateway.updateTag({
        userId: user.id,
        currentName: tag.tagName,
        newName: undefined,
        addTransactions: addedTransactions,
        removeTransactions: removedTransactions
      }, token);
  }

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
      <VStack space={"20px"} paddingBottom={"2px"}>
        <Text fontWeight={"semibold"} size={"title3"}>Tags for This Transaction</Text>
        <HStack flexWrap={"wrap"} space={"13px"}>
          {transactionTags.length != 0 && (
            <>
                {transactionTags.map((tag, i) => (
                  // TODO create a component and use it for both tags list
                  <Pressable
                    onPress={() => removeTransactionTag(tag)}
                    rounded="md"
                    backgroundColor="gray.100"
                    style={styles.badge}
                    key={i}
                  >
                    <HStack space={"10px"} style={styles.badgeContent}>
                      <Text size={"subheadline"} fontWeight={"semibold"}>
                        {tag.tagName}
                      </Text>
                      <FontAwesomeIcon icon={farXMark} size={14} color="#404040"/>
                    </HStack>
                  </Pressable>
                ))}
            </>
          )}
          {transactionTags.length < 10 && (
            <>
              <Pressable
                onPress={() =>
                  props.navigation.navigate("AddTransactionTagsScreen", {
                    transaction: transaction,
                    allTags: allUserTags})
                }
                rounded="md"
                backgroundColor="darkBlue.50"
                borderColor={"darkBlue.500"}
                style={styles.addBadge}
                borderWidth={"2px"}
                borderStyle={"dashed"}
              >
                <HStack space={"10px"} style={styles.badgeContent}>
                  <Text size={"subheadline"} fontWeight={"semibold"} color={"darkBlue.500"}>
                    Add
                  </Text>
                  <FontAwesomeIcon icon={farPlus} size={14} color="#0077E6"/>
                </HStack>
              </Pressable>
            </>
          )}
        </HStack>
      </VStack>
      {allTags.length != 0 && (
        <>
          <VStack space={"20px"} marginTop={"40px"} paddingBottom={15}>
            <Text fontWeight={"semibold"} size={"title3"}>
              All Tags
            </Text>
            <HStack flexWrap={"wrap"} space={"13px"}>
              {allTags.map((tag, i) => (
                // TODO create a component and use it for both tags list
                <Pressable
                  onPress={() => {
                    if (transactionTags.length < 10) {
                      addTransactionTag(tag)
                    }
                  }}
                  rounded="md"
                  backgroundColor="gray.100"
                  style={styles.badge}
                  key={i}
                  >
                  <HStack space={"10px"} style={styles.badgeContent}>
                    <Text size={"subheadline"} fontWeight={"semibold"}>
                      {tag.tagName}
                    </Text>
                    {transactionTags.length < 10 && <FontAwesomeIcon icon={farPlus} size={14} color="#404040"/>}
                  </HStack>
                </Pressable>
              ))}
            </HStack>
          </VStack>
        </>
      )}
    </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 13,
    justifyContent: "center",
  },
  addBadge: {
    marginBottom: 13,
    height: 36,
    width: 85,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeContent: {
    alignItems: "center",
  },
});
