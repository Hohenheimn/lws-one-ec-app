import React from "react";
import { Modal, View } from "react-native";

import Button from "@/src/components/Button";

import Heading from "@/src/components/Heading";

import LabelValue from "@/src/components/LabelValue";

import { dateString } from "@/src/utils/dateHelper";

import { BillType } from "./BillCard";

type Props = {
  bill: BillType | null;
  onClose: () => void;
};

const BillModal = ({ bill, onClose }: Props) => {
  return (
    <Modal
      visible={bill ? true : false}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className=" flex-1 p-5 items-center w-full ">
        <Heading size={"medium"} classname="mb-5">
          Bill Detail
        </Heading>
        <LabelValue label={"Reference #"} value={bill?.refNumber} />
        <LabelValue label={"From"} value={dateString(bill?.fromDate || "")} />
        <LabelValue label={"To"} value={dateString(bill?.toDate || "")} />
        <LabelValue label={"Killowatts"} value={bill?.kwConsumes} />
        <LabelValue label={"Rate"} value={bill?.rateUponReading} />
        <LabelValue label={"Penalty"} value={bill?.penaltyPercentage} />
        <LabelValue label={"Reading Date"} value={bill?.readableReadingDate} />
        <LabelValue
          label={"Due Date"}
          value={dateString(bill?.dueDate || "")}
        />
        <LabelValue
          label={"Amount Due"}
          value={Number(bill?.amountDue).toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        />
        <LabelValue
          label={"Total"}
          value={Number(bill?.totalAmountToPay).toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        />
        <Button
          title={"Close"}
          className=" w-full"
          appearance={"primary"}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

export default BillModal;
