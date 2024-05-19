import CMessageListItem from "./CMessageListItem";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const CMessageList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const { width } = useWindowDimensions();

  const fetchPage = async (url) => {
    if (loading) {
      return;
    }

    // use axios here
    console.log("Fetching: ", url);
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });
    setNextPage(responseJson.info.next);
    setLoading(false);
  };

  const onRefresh = () => {
    if (loading) {
      return;
    }
    setItems([]);
    // setNextPage(initialPage);
    fetchPage(initialPage);
  };
};
