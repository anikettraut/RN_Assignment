import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator
} from "react-native";
import api from "./api";
import style from "./style";

const App = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch(api.getData)
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);
        setFilteredDataSource(
          responseJson.data.sort(
            (a, b) => parseFloat(a.Population) - parseFloat(b.Population)
          )
        );
        setMasterDataSource(
          responseJson.data.sort(
            (a, b) => parseFloat(a.Population) - parseFloat(b.Population)
          )
        );
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.State
          ? item.State.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(
        newData.sort(
          (a, b) => parseFloat(a.Population) - parseFloat(b.Population)
        )
      );
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={style.itemStyle}>
        {item.State.toUpperCase() + " (" + item.Population + ")"}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8"
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.container}>
        {isLoading && (
          <ActivityIndicator
            style={style.loader}
            size="large"
            color="#0000ff"
          />
        )}
        <TextInput
          style={style.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Filter"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
