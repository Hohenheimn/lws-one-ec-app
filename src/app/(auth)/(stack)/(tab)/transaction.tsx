import React, { useState } from "react";
import { ScrollView, RefreshControl, FlatList } from "react-native";
import Paragraph from "@/src/components/Paragraph";
import { useFetch } from "@/src/hooks/api";
import TransactionCard from "@/src/pageComponent/transactionHistory/TransactionCard";
import TransactionModal from "@/src/pageComponent/transactionHistory/TransactionModal";
import { AccountRegistry } from "@/src/types/AccountRegistry";
import { TransactionList } from "@/src/types/TransactionList";

const TransactionPage = () => {
  const [transaction, setTransaction] = useState<any | null>(null);

  const { data: userData, isFetching: userDataFetching } =
    useFetch<AccountRegistry>("/api/v1/accountregistry/user", ["user-data"]);

  const meterID = userData?.data[0]?.meterId;

  const {
    data: transactionList,
    isFetching: transactionListFetching,
    refetch: refetchTransactionList,
  } = useFetch<TransactionList>(
    `/api/v1/payment/all/${meterID}`,
    ["transaction-list", meterID],
    !!meterID
  );

  return (
    <ScrollView className="bg-white">
      {!userData?.data && (
        <Paragraph classname=" text-center">No Account Found</Paragraph>
      )}

      <FlatList
        data={transactionList?.data}
        scrollEnabled={false}
        refreshing={transactionListFetching}
        onRefresh={refetchTransactionList}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={() => (
          <Paragraph classname=" text-center">No Transaction Found</Paragraph>
        )}
        renderItem={({ item, index }) => {
          return (
            <TransactionCard
              key={index}
              transaction={item}
              onPress={(transactionData) => {
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
