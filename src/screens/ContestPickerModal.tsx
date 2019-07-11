import React from "react";
import { gql } from "apollo-boost";
import { FlatList, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import ContestRow from "../components/ContestRow";
import Divider from "../components/Divider";
import {
  ContestPickerQueryComponent,
  ListContestFragment as Contest
} from "../graphql/types/generated";
import SafeAreaListFooter from "../components/SafeAreaListFooter";
import { ListContest } from "../graphql/documents/fragments";

gql`
  query ContestPickerQuery {
    contests {
      ...ListContest
    }
  }
  ${ListContest}
`;

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSelectContest: (contest: Contest) => void;
}

const ContestPickerScreen: React.FC<Props> = props => (
  <Modal
    style={styles.root}
    isVisible={props.visible}
    onBackdropPress={props.onCancel}
  >
    <ContestPickerQueryComponent>
      {result => {
        if (result.error) {
          return <Text>Error!</Text>;
        } else if (result.loading) {
          return <Text>Loading...</Text>;
        } else if (result.data) {
          return (
            <FlatList
              data={result.data.contests}
              renderItem={({ item }) => (
                <ContestRow
                  name={item.name}
                  countryCode={item.countryCode}
                  onPress={() => props.onSelectContest(item)}
                />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Divider}
              ListFooterComponent={SafeAreaListFooter}
            />
          );
        }
        return null;
      }}
    </ContestPickerQueryComponent>
  </Modal>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 0,
    marginTop: 100
  }
});

export default ContestPickerScreen;
