import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { gql } from "apollo-boost";
import PerformanceRow from "../components/PerformanceRow";
import Divider from "../components/Divider";
import OptionPicker from "../components/OptionPicker";
import {
  Contest,
  ContestQueryComponent,
  Stage
} from "../graphql/types/generated";
import SafeAreaListFooter from "../components/SafeAreaListFooter";
import { ContestQueryAppearance } from "../graphql/documents/fragments";

gql`
  query ContestQuery($contestId: ID!, $filter: PerformanceFilter) {
    performances(contestId: $contestId, filter: $filter) {
      id
      stageTime
      categoryInfo
      appearances {
        ...ContestQueryAppearance
      }
    }
  }
  ${ContestQueryAppearance}
`;

interface NavProps {
  contest: Contest;
}

type ScreenProps = NavigationScreenProps<NavProps>;

interface Props extends ScreenProps {}

interface State {
  selectedDate: string;
  selectedStage: Stage;
}

class ContestScreen extends Component<Props> {
  static navigationOptions = (screenProps: ScreenProps) => {
    return {
      title: screenProps.navigation.getParam("contest").name
    };
  };

  state: State = {
    selectedDate: this.props.navigation.getParam("contest").dates[0],
    selectedStage: this.props.navigation.getParam("contest").stages[0]
  };

  render() {
    const { id, dates, stages } = this.props.navigation.getParam("contest");

    return (
      <ContestQueryComponent
        variables={{
          contestId: id,
          filter: {
            stageDate: this.state.selectedDate,
            stageId: this.state.selectedStage.id
          }
        }}
      >
        {result => {
          if (result.error) {
            return <Text>Error!</Text>;
          } else if (result.loading) {
            return <Text>Loading...</Text>;
          } else if (result.data) {
            return (
              <>
                <OptionPicker
                  options={dates}
                  formatOption={date => date}
                  selectedOption={this.state.selectedDate}
                  onSelectOption={date => this.setState({ selectedDate: date })}
                />
                <OptionPicker
                  options={stages}
                  formatOption={stage => stage.name}
                  selectedOption={this.state.selectedStage}
                  onSelectOption={stage =>
                    this.setState({ selectedStage: stage })
                  }
                />
                <FlatList
                  data={result.data.performances}
                  renderItem={({ item }) => (
                    <PerformanceRow
                      stageTime={item.stageTime}
                      categoryInfo={item.categoryInfo}
                      appearances={item.appearances}
                    />
                  )}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={Divider}
                  ListFooterComponent={SafeAreaListFooter}
                />
              </>
            );
          }
          return null;
        }}
      </ContestQueryComponent>
    );
  }
}

export default ContestScreen;
