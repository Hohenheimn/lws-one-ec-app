import React, { useState } from "react";
import { Text, ScrollView, RefreshControl, FlatList } from "react-native";

import Heading from "@/src/components/Heading";
import Paragraph from "@/src/components/Paragraph";
import { useFetch } from "@/src/hooks/api";
import TransactionCard, {
  TransactionType,
} from "@/src/pageComponent/transactionHistory/TransactionCard";
import TransactionModal from "@/src/pageComponent/transactionHistory/TransactionModal";

const TransactionPage = () => {
  const [transaction, setTransaction] = useState<any | null>(null);

  const { data: userData, isFetching: userDataFetching } = useFetch(
    "/api/v1/accountregistry/user",
    ["user-data"]
  );

  const meterID = userData?.data?.data[0]?.meterId;

  const {
    data: transactionList,
    isFetching: transactionListFetching,
    refetch: refetchTransactionList,
  } = useFetch(
    `/api/v1/payment/all/${meterID}`,
    ["transaction-list", meterID],
    !!meterID
  );

  return (
    <ScrollView className="p-4 space-y-2 bg-white">
      {!userData?.data?.data && (
        <Paragraph classname=" text-center">No Account Found</Paragraph>
      )}

      <FlatList
        data={transactionList?.data?.data}
        scrollEnabled={false}
        refreshing={transactionListFetching}
        onRefresh={refetchTransactionList}
        contentContainerStyle={{ gap: 20 }}
        ListEmptyComponent={() => (
          <Paragraph classname=" text-center">No Transaction Found</Paragraph>
        )}
        renderItem={({
          item,
          index,
        }: {
          item: TransactionType;
          index: number;
        }) => {
          return (
            <TransactionCard
              key={index}
              transaction={item}
              onPress={(transactionData: TransactionType) => {
                setTransaction(transactionData);
              }}
            />
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={transactionListFetching}
            onRefresh={refetchTransactionList}
          />
        }
      />
      <TransactionModal
        transaction={transaction}
        onClose={() => setTransaction(null)}
      />
    </ScrollView>
  );
};

export default TransactionPage;
