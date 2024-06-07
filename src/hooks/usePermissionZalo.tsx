import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import {
  authorize,
  getAccessToken,
  getPhoneNumber,
  getSetting,
  getUserInfo,
} from "zmp-sdk/apis";
import { useAuth } from "../contexts/AuthContext";

const usePermissionZalo = ({
  mAuthorizedStateSuccess,
  mAuthorizeSuccess,
}: {
  mAuthorizedStateSuccess?: (d: any) => void;
  mAuthorizeSuccess?: (d: any) => void;
}) => {
  const { setUser, setAccessTokenZalo, accessTokenZalo, setPhoneNumberZalo } =
    useAuth();

  const mAuthorizedState = useMutation({
    mutationFn: () => getSetting({}),
    onSuccess(data, variables, context) {
      mAuthorizedStateSuccess?.(data.authSetting);
      console.log(data.authSetting, "dd");
      //   const {authSetting} = data
    },
  });
  const mAuthorize = useMutation({
    mutationFn: () =>
      authorize({
        scopes: ["scope.userInfo", "scope.userPhonenumber"],
      }),
    onSuccess(data, variables, context) {
      console.log(data, "dd");
      mAuthorizeSuccess?.(data);
    },
  });

  const mGetUserState = useMutation({
    mutationFn: () => getUserInfo({ avatarType: "small" }),
    onSuccess(data, variables, context) {
      setUser(data.userInfo);
    },
  });

  const mGetPhoneNumber = useMutation({
    mutationFn: () => getPhoneNumber({ fail: console.warn }),
    onSuccess(data, variables, context) {
      console.log(data, "mGetPhoneNumber");
      mFetchInfoNumber.mutate({ code: data.token ?? "" });
    },
  });
  const mGetAccessToken = useMutation({
    mutationFn: () => getAccessToken(),
    onSuccess(data, variables, context) {
      console.log(data, "mGetAccessToken");
      setAccessTokenZalo(data);
    },
  });

  const mFetchInfoNumber = useMutation<
    AxiosResponse,
    AxiosError,
    { code: string }
  >({
    mutationFn: ({ code }) =>
      axios.get("https://graph.zalo.me/v2.0/me/info", {
        headers: {
          access_token: accessTokenZalo,
          secret_key: "EDJinrP7DPAEwfMoX25E",
          code,
        },
      }),
    onSuccess(data, variables, context) {
      console.log(data.data.data.number, "mFetchInfoNumber");
      setPhoneNumberZalo(data.data?.data?.number);
    },
  });

  return {
    mGetAccessToken,
    mAuthorizedState,
    mGetUserState,
    mAuthorize,
    mGetPhoneNumber,
  };
};

export default usePermissionZalo;
