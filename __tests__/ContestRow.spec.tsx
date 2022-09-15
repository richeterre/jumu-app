import React from "react";
import renderer from "react-test-renderer";

import ContestRow from "../src/components/ContestRow";

describe("ContestRow", () => {
  test("renders correctly", () => {
    const contestRow = renderer.create(
      <ContestRow
        contest={{
          id: "1",
          name: "RW Helsinki 2019",
          host: { id: "1", countryCodes: ["FI"] },
          dates: ["2019-01-01"],
          stages: [{ id: "1", name: "Aula" }],
        }}
        onPress={() => undefined}
      />
    );
    expect(contestRow).toMatchSnapshot();
  });
});
