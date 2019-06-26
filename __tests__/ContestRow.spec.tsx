import React from "react";
import renderer from "react-test-renderer";

import ContestRow from "../src/components/ContestRow";

describe("ContestRow", () => {
  test("renders correctly", () => {
    const contestRow = renderer.create(
      <ContestRow
        name="RW 2019, DS Helsinki"
        countryCode="FI"
        onPress={() => {}}
      />
    );
    expect(contestRow).toMatchSnapshot();
  });
});
