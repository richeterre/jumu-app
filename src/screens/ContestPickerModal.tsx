import { gql } from "apollo-boost";
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";

import ContestRow from "../components/ContestRow";
import Divider from "../components/Divider";
import SafeAreaListFooter from "../components/SafeAreaListFooter";
import { ListContest } from "../graphql/documents/fragments";
import {
  ListContestFragment as Contest,
  useContestPickerModalQuery,
} from "../graphql/types/generated";

gql`
  query ContestPickerModal {
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

const ContestPickerModal: React.FC<Props> = props => {
  const { data, error, loading } = useContestPickerModalQuery();

  const renderContests = () => {
    if (error) {
      return <Text>Error!</Text>;
    } else if (loading) {
      return <Text>Loading...</Text>;
    } else if (data) {
      return (
        <FlatList
          data={data.contests}
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
  };

  return (
    <Modal
      style={styles.root}
      isVisible={props.visible}
      onBackdropPress={props.onCancel}
    >
      {renderContests()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 0,
    marginTop: 100,
  },
});

export default ContestPickerModal;
