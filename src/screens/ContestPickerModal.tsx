import { gql } from "apollo-boost";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import ContestRow from "../components/ContestRow";
import Divider from "../components/Divider";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import SafeAreaListFooter from "../components/SafeAreaListFooter";
import colors from "../constants/colors";
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
      return <ErrorView />;
    } else if (loading) {
      return <LoadingView />;
    } else if (data) {
      return (
        <FlatList
          data={data.contests}
          ItemSeparatorComponent={Divider}
          keyExtractor={item => item.id}
          ListFooterComponent={SafeAreaListFooter}
          renderItem={({ item }) => (
            <ContestRow
              countryCode={item.countryCode}
              name={item.name}
              onPress={() => props.onSelectContest(item)}
            />
          )}
        />
      );
    }
    return null;
  };

  return (
    <Modal
      isVisible={props.visible}
      style={styles.root}
      onBackdropPress={props.onCancel}
    >
      {renderContests()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    borderRadius: 15,
    margin: 0,
    marginTop: 100,
  },
});

export default ContestPickerModal;
