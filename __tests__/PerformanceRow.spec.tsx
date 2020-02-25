import React from "react";
import renderer from "react-test-renderer";

import PerformanceRow from "../src/components/PerformanceRow";

describe("PerformanceRow", () => {
  test("renders correctly", () => {
    const performanceRow = renderer.create(
      <PerformanceRow
        performance={{
          id: "1",
          stageTime: "09:45:00",
          categoryName: "Violine solo",
          ageGroup: "II",
          appearances: [
            {
              id: "1",
              participantName: "Theo Trompeter",
              instrumentName: "Trompete",
            },
            {
              id: "2",
              participantName: "Paula Pianistin",
              instrumentName: "Klavier",
            },
          ],
          predecessorHost: null,
        }}
        onPress={() => {}}
      />
    );
    expect(performanceRow).toMatchSnapshot();
  });
});
