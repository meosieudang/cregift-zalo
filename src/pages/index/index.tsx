import React, { useEffect, useRef } from "react";
import { List, Page, Icon, useNavigate, Header } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { setNavigationBarTitle } from "zmp-sdk/apis";
import { userState } from "../../state";

import UserCard from "../../components/user-card";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ModalRequestPermission from "./modal-request-permission";
import GiftItem from "./gift-item";
import usePermissionZalo from "../../hooks/usePermissionZalo";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
const ERROR_TEXT = "Trường này không được để trống";

interface IForm {
  name_zalo: string;
  phone_zalo: string;
  phone_other: string;
  username: string;
}

const validationSchema = yup.object({
  name_zalo: yup.string(),
  phone_zalo: yup.string(),
  phone_other: yup.string(),
  username: yup.string().when("name_zalo", {
    is: (v) => Boolean(v),
    then: () => yup.string().required(ERROR_TEXT),
  }),
});

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const refModal = useRef<{ toggle: () => void }>();
  const { setHasAuthor, hasAuthor, user, phoneNumberZalo } = useAuth();
  console.log(user, phoneNumberZalo);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name_zalo: "",
      phone_zalo: "",
      phone_other: "",
      username: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    console.log(user, phoneNumberZalo, "ppppp");
    if (user && phoneNumberZalo) {
      reset({
        name_zalo: user.name,
        phone_zalo: phoneNumberZalo,
      });
    }
  }, [user, phoneNumberZalo]);

  const { mAuthorizedState, mGetAccessToken, mGetPhoneNumber, mGetUserState } =
    usePermissionZalo({
      mAuthorizedStateSuccess(authSetting) {
        if (
          !authSetting["scope.userInfo"] ||
          !authSetting["scope.userPhonenumber"]
        ) {
          refModal.current?.toggle();
        } else {
          setHasAuthor(true);
        }
      },
    });

  useEffect(() => {
    if (hasAuthor) {
      mGetAccessToken.mutate();
      mGetPhoneNumber.mutate();
      mGetUserState.mutate();
    }
  }, [hasAuthor]);

  useEffect(() => {
    setNavigationBarTitle({
      title: "DỰ ÁN ACTIVATION 01",
      success: (res) => {
        // xử lý khi gọi api thành công
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
    mAuthorizedState.mutate();
  }, []);

  const onSubmit = (d: IForm) => {
    if (!user) {
      refModal.current?.toggle();
      return;
    }
    console.log(d, "dd");
    navigate("/qr-code", { replace: true });
  };
  console.log(errors, "errors form", hasAuthor);

  return (
    <Box
      sx={{
        height: "100vh",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack mt={1} gap={2} bgcolor={"white"} p={2}>
        <Controller
          name="name_zalo"
          control={control}
          render={({ field }) => (
            <TextField
              required
              label="Tên Zalo của Anh/ Chị"
              {...field}
              disabled
            />
          )}
        />
        <Controller
          name="phone_zalo"
          control={control}
          render={({ field }) => (
            <TextField required label="Số điện thoại" {...field} disabled />
          )}
        />
        <Controller
          name="phone_other"
          control={control}
          render={({ field }) => (
            <TextField label="Số điện thoại liên hệ khác (nếu có)" {...field} />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              required
              label="Tên của Anh/ Chị"
              {...field}
              error={Boolean(errors["username"])}
              helperText={
                Boolean(errors["username"]) && errors["username"]?.message
              }
            />
          )}
        />

        <ModalRequestPermission ref={refModal} />
      </Stack>

      <Stack mt={1} gap={2} bgcolor={"white"} p={2}>
        <Typography
          color={"primary.main"}
          variant="subtitle1"
        >{`Danh sách quà tặng`}</Typography>
        <GiftItem />
        <GiftItem />
      </Stack>

      <div style={{ flex: 1 }} />
      <Stack p={2}>
        <Button
          onClick={handleSubmit(onSubmit)}
          size="large"
          fullWidth
          variant="contained"
        >
          Xác nhận
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;
