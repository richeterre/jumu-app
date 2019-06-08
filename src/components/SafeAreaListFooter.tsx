import React from "react";
import { SafeAreaView } from "react-navigation";

// Can be added as a footer to FlatList elements to add automatic padding
// on iPhone X and similar screens with unsafe bottom areas.
export default () => <SafeAreaView forceInset={{ bottom: "always" }} />;
