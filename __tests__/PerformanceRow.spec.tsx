import React from "react";
import renderer from "react-test-renderer";

import PerformanceRow from "../src/components/PerformanceRow";

describe("PerformanceRow", () => {
  test("renders correctly", () => {
    const performanceRow = renderer.create(
      <PerformanceRow
        stageTime="09:45:00"
        categoryInfo="Violine solo, AG II"
        appearances={[
          { participantName: "Theo Trompeter", instrumentName: "Trompete" },
          { participantName: "Paula Pianistin", instrumentName: "Klavier" }
        ]}
      />
    );
    expect(performanceRow).toMatchSnapshot();
  });
});
