import { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, FlatList } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";

import Header from "@/src/components/Header";
import Paragraph from "@/src/components/Paragraph";
import { useFetch } from "@/src/hooks/api";
import BillDashboardItem from "@/src/pageComponent/home/BillDashboardItem";
import { AccountRegistry } from "@/src/types/AccountRegistry";
import { Bill, BillData } from "@/src/types/Bill";
import { TransactionList } from "@/src/types/TransactionList";
import { UserData } from "@/src/types/UserData";

const HomePage = () => {
  const [barChart, setBarChart] = useState<barDataItem[]>([]);

  const { data, isFetching, refetch } = useFetch<UserData>("/api/v1/user", [
    "user",
  ]);

  const { data: accountRegistryData } = useFetch<AccountRegistry>(
    "/api/v1/accountregistry/user",
    ["user-data"]
  );

  const {
    data: analyticsData,
    isFetching: analyticsFetching,
    refetch: refetchAnalytics,
  } = useFetch<{ data: { year: number; totalKw: string }[] }>(
    "/api/v1/analytics/user",
    ["user-analytics"]
  );

  useEffect(() => {
    setBarChart(
      analyticsData?.data
        ? analyticsData.data.map((item) => {
            return {
              label: item.year.toString(),
              value: Number(item.totalKw),
            };
          })
        : []
    );
  }, [analyticsData?.data]);

  const meterID = accountRegistryData?.data[0]?.meterId;
  const meterNumber = accountRegistryData?.data[0]?.meterAccount.meterNumber;

  const {
    data: transaction,
    isFetching: transactionListFetching,
    refetch: refetchTransactionList,
  } = useFetch<TransactionList>(
    `/api/v1/payment/all/${meterID}`,
    ["transaction-list", `${meterID}`],
    !!meterID
  );

  const {
    data: billUnpaid,
    isFetching: billUnpaidListFetching,
    refetch: refetchBillUnpaidList,
  } = useFetch<Bill>(
    `/api/v1/bill/unpaid/${meterID}`,
    ["bill-unpaid-list", `${meterID}`],
    !!meterID
  );

  const billUnpaidData: BillData | undefined = billUnpaid?.data[0];

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
      refreshControl={
        <RefreshControl
          refreshing={
            isFetching ||
            analyticsFetching ||
            transactionListFetching ||
            billUnpaidListFetching
          }
          onRefresh={() => {
            refetch();
            refetchAnalytics();
            refetchBillUnpaidList();
          }}
        />
      }
    >
      <View>
        <Header
          name={data?.data.userData.userFname}
          isConnected={!!meterID}
          meterNumber={meterNumber}
          outstandingAmount={Number(billUnpaidData?.totalAmountToPay)}
          dueDate={`${Number(billUnpaidData?.dueDate)}`}
        />
        <View className="flex-1 overflow-hidden mx-4 my-2 p-3 border border-gray-300 rounded-lg">
          <Text className="text-2xl font-medium font-poppins-md mb-4">
            Power Usage
          </Text>
          <BarChart
            height={200}
            data={barChart}
            frontColor={"#4ade80"}
            showYAxisIndices={false}
            //removes lines in number
            xAxisThickness={0}
            yAxisThickness={0}
            // showGradient
            //removes ant lines
            hideRules
            // gradientColor={"#bbf7d0"}
            barBorderRadius={4}
            barWidth={40}
          />
        </View>
        <View className="max-h-64 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
          <FlatList
            data={transaction?.data
              .slice(0, 3)
              .filter((filterItem) => !filterItem.bill.billPaid)}
            scrollEnabled={false}
            refreshing={transactionListFetching}
            onRefresh={refetchTransactionList}
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={() => (
              <Text className="text-2xl font-medium font-poppins-md mb-5">
                Unpaid Due
              </Text>
            )}
            ListEmptyComponent={() => (
              <Paragraph classname=" text-center">No Unpaid Found</Paragraph>
            )}
            renderItem={({ item, index }) => {
              return <BillDashboardItem key={index} item={item} />;
            }}
            refreshControl={
              <RefreshControl
                refreshing={transactionListFetching}
                onRefresh={refetchTransactionList}
              />
            }
          />
        </View>
        <View className=" mx-4 my-2 p-3 border border-gray-300 rounded-lg">
          <FlatList
            data={transaction?.data
              .slice(0, 3)
              .filter((filterItem) => filterItem.bill.billPaid)}
            scrollEnabled={false}
            ListHeaderComponent={() => (
              <Text className="text-2xl font-medium font-poppins-md mb-5">
                Last Transaction
              </Text>
            )}
            refreshing={transactionListFetching}
            onRefresh={refetchTransactionList}
            contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
            ListEmptyComponent={() => (
              <Paragraph classname=" text-center">
                No Transaction Found
              </Paragraph>
            )}
            renderItem={({ item, index }) => {
              return <BillDashboardItem key={index} item={item} />;
            }}
            refreshControl={
              <RefreshControl
                refreshing={transactionListFetching}
                onRefresh={refetchTransactionList}
              />
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
