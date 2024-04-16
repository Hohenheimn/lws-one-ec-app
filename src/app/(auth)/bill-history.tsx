import React, { useState } from "react";
import { Text, ScrollView, RefreshControl, FlatList } from "react-native";

import Paragraph from "@/src/components/Paragraph";
import { useFetch } from "@/src/hooks/api";
import BillCard, { BillType } from "@/src/pageComponent/billHistory/BillCard";
import BillModal from "@/src/pageComponent/billHistory/BillModal";

const BillHistoryScreen = () => {
  const [bill, setBill] = useState<BillType | null>(null);

  const { data: userData, isFetching: userDataFetching } = useFetch(
    "/api/v1/accountregistry/user",
    ["user-data"]
  );

  const meterID = userData?.data?.data[0]?.meterId;

  const {
    data: billList,
    isFetching: billListFetching,
    refetch: refetchBillList,
  } = useFetch(
    `/api/v1/bill/all/${meterID}`,
    ["bill-list", meterID],
    !!meterID
  );

  return (
    <ScrollView className="p-4 space-y-2 bg-white">
      {!userData?.data?.data && (
        <Paragraph classname=" text-center">No Account Found</Paragraph>
      )}

      <FlatList
        data={billList?.data?.data}
        scrollEnabled={false}
        refreshing={billListFetching}
        onRefresh={refetchBillList}
        contentContainerStyle={{ gap: 20 }}
        ListEmptyComponent={() => (
          <Paragraph classname=" text-center">No Bills Found</Paragraph>
        )}
        renderItem={({ item, index }: { item: BillType; index: number }) => {
          return (
            <BillCard
              key={index}
              bill={item}
              onPress={(billData: BillType) => {
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
