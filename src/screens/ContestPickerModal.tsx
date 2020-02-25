import { gql } from "apollo-boost";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useSafeArea } from "react-native-safe-area-context";

import cancelIcon from "../../assets/images/icon-cancel.png";
import ContestRow from "../components/ContestRow";
import Divider from "../components/Divider";
import ErrorView from "../components/ErrorView";
import IconButton from "../components/IconButton";
import LoadingView from "../components/LoadingView";
import TextualButton from "../components/TextualButton";
import colors from "../constants/colors";
import textStyles from "../constants/textStyles";
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
  onSelectContest: (contest?: Contest) => void;
}

const ContestPickerModal: React.FC<Props> = props => {
  const { visible, onCancel, onSelectContest } = props;

  const insets = useSafeArea();
  const { data, error, loading } = useContestPickerModalQuery();

  const renderContests = () => {
    if (error) {
      return <ErrorView />;
    } else if (loading) {
      return <LoadingView />;
    } else if (data) {
      return (
        <FlatList
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          data={data.contests}
          ItemSeparatorComponent={Divider}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ContestRow
              contest={item}
              style={styles.contestRow}
              onPress={() => onSelectContest(item)}
            />
          )}
        />
      );
    }
    return null;
  };

  return (
    <Modal isVisible={visible} style={styles.root} onBackdropPress={onCancel}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Wettbewerb wählen</Text>
          <View style={styles.headerSubtitle}>
            <Text style={styles.headerSubtitleText}>{"oder "}</Text>
            <TextualButton
              title="zur Startansicht"
              titleStyle={styles.resetButtonTitle}
              onPress={() => onSelectContest(undefined)}
            />
          </View>
        </View>
        <IconButton
          source={cancelIcon}
          tintColor={colors.midGray}
          onPress={onCancel}
        />
      </View>
      {renderContests()}
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
    margin: 0,
    marginTop: 100,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: {
    ...textStyles.large,
    fontWeight: "bold",
  },
  headerSubtitle: {
    flexDirection: "row",
    marginTop: 4,
  },
  headerSubtitleText: {
    ...textStyles.small,
    color: colors.midGray,
  },
  resetButtonTitle: {
    ...textStyles.small,
    color: colors.brand,
  },
  contestRow: {
    paddingHorizontal: 16,
  },
});

export default ContestPickerModal;
