import React, { useState } from "react";
import { Text, ScrollView, RefreshControl, FlatList } from "react-native";

import Paragraph from "@/src/components/Paragraph";
import { useFetch } from "@/src/hooks/api";
import BillCard from "@/src/pageComponent/billHistory/BillCard";
import BillModal from "@/src/pageComponent/billHistory/BillModal";
import { AccountRegistry } from "@/src/types/AccountRegistry";
import { Bill, BillData } from "@/src/types/Bill";

const BillHistoryScreen = () => {
  const [bill, setBill] = useState<BillData | null>(null);

  const { data: userData, isFetching: userDataFetching } =
    useFetch<AccountRegistry>("/api/v1/accountregistry/user", ["user-data"]);

  const meterID = userData?.data[0]?.meterId;

  const {
    data: billList,
    isFetching: billListFetching,
    refetch: refetchBillList,
  } = useFetch<Bill>(
    `/api/v1/bill/all/${meterID}`,
    ["bill-list", meterID],
    !!meterID
  );

  return (
    <ScrollView className=" bg-white" contentContainerStyle={{ flex: 1 }}>
      {!userData?.data && (
        <Paragraph classname=" text-center">No Account Found</Paragraph>
      )}

      <FlatList
        data={billList?.data}
        scrollEnabled={false}
        refreshing={billListFetching}
        onRefresh={refetchBillList}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={() => (
          <Paragraph classname=" text-center">No Bills Found</Paragraph>
        )}
        renderItem={({ item, index }) => {
          return (
            <BillCard
              key={index}
              bill={item}
              onPress={(billData) => {
                setBill(billData);
              }}
            />
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={billListFetching}
            onRefresh={refetchBillList}
          />
        }
      />
      <BillModal bill={bill} onClose={() => setBill(null)} />
    </ScrollView>
  );
};

export default BillHistoryScreen;
