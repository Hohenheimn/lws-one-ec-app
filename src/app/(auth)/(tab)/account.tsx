import { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";

import { Octicons } from "@expo/vector-icons";

import Button from "@/src/components/Button";
import { removeData } from "@/src/helpers";
import { useGetUserData } from "@/src/hooks/useGetUserData";
import ChangePasswordModal from "@/src/pageComponent/account/ChangePasswordModal";

const AccountPage = () => {
  const router = useRouter();
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const { data, isFetching, refetch } = useGetUserData();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      <ChangePasswordModal
        visible={changePasswordModal}
        onRequestClose={() => {
          setChangePasswordModal(false);
        }}
      />
      <View className="p-4 justify-center items-center flex-[0.5] bg-green-300">
        <View className="justify-center items-center rounded-full w-28 h-28 bg-green-400 mb-3">
          <Octicons name="feed-person" size={72} color="white" />
        </View>
        <View>
          <Text className="text-2xl font-semibold font-poppins-sb text-center">
            {data?.data.userData.userFname}
            {data?.data.userData.userMname
              ? ` ${data?.data.userData.userMname} `
              : " "}
            {data?.data.userData.userLname}
          </Text>

          <Text className="text-xs font-poppins text-center">
            Account Number:
          </Text>
          <Text className="text-xs font-poppins text-center">
            {data?.data.userData.userCustomerNumber}
          </Text>

          <Link
            href="/account-details"
            className="mt-2 font-poppins-md font-medium text-center"
          >
            Edit
          </Link>
        </View>
      </View>
      <View className="flex-1 p-4">
        <View className=" space-y-4">
          <Text className="text-lg font-poppins">Personal Information</Text>
          <View>
            <Text className="font-semibold font-poppins-sb">Full Name:</Text>
            <Text className="font-poppins">
              {data?.data.userData.userFname}
              {data?.data.userData.userMname
                ? ` ${data?.data.userData.userMname} `
                : " "}
              {data?.data.userData.userLname}
            </Text>
          </View>
          <View>
            <Text className="font-semibold font-poppins-sb">
              Email Address:
            </Text>
            <Text className="font-poppins">
              {data?.data.userData.userEmail}
            </Text>
          </View>
          <View>
            <Text className="font-semibold font-poppins-sb">
              Mobile Number:
            </Text>
            <Text className="font-poppins">
              {data?.data.userData.userContact}
            </Text>
          </View>
          <Text className="text-lg font-poppins">Account Information</Text>
          <View>
            <Text className="font-semibold font-poppins-sb">
              Email Address:
            </Text>
            <Text className="font-poppins">
              {data?.data.userData.userEmail}
            </Text>
          </View>
        </View>

        <Button
          title={"Change Password"}
          appearance={"default"}
          onPress={() => {
            setChangePasswordModal(true);
          }}
          buttonClassname=" mt-10 mb-2"
        />
        <Button
          title={"Logout Account"}
          appearance={"primary"}
          onPress={() => {
            removeData("userToken");
            router.push("/");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AccountPage;
