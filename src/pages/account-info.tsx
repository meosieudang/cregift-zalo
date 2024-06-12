import React, { useEffect } from "react";
import { setNavigationBarTitle } from "zmp-sdk/apis";
import { useNavigate } from "zmp-ui";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import GiftItem from "./index/gift-item";
import { configAppView } from "zmp-sdk";

const ERROR_TEXT = "Trường này không được để trống";
const ERROR_PHONE = "SĐT không hợp lệ";

const regexPhoneVN = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;

interface IForm {
  name_zalo: string;
  phone_zalo: string;
  phone_other: string;
  username: string;
}

const validationSchema = yup.object({
  name_zalo: yup.string().required(ERROR_TEXT),
  phone_zalo: yup
    .string()
    .matches(regexPhoneVN, ERROR_PHONE)
    .required(ERROR_TEXT),
  phone_other: yup
    .string()
    .matches(regexPhoneVN, { excludeEmptyString: true, message: ERROR_PHONE })
    .nullable()
    .notRequired(),
  // username: yup.string().when("name_zalo", {
  //   is: (v) => Boolean(v),
  //   then: () => yup.string().required(ERROR_TEXT),
  // }),
  username: yup.string().required(ERROR_TEXT),
});

const AccountInfo: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const {
    showModalPermission,
    user,
    phoneNumberZalo,
    checkAuthorize,
    hasAuthor,
  } = useAuth();
  console.log(user, phoneNumberZalo, "AccountInfo");

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
      phone_other: null,
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

  useEffect(() => {
    configAppView({
      headerColor: "#f2f2f2",
      actionBar: {
        title: "DỰ ÁN ACTIVATION 01",
        leftButton: "back",
      },
      success: () => {
        // xử lý khi gọi api thành công
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });

    setTimeout(() => {
      checkAuthorize();
    }, 500);
  }, []);

  const onSubmit = (d: IForm) => {
    // if (!user) {
    //   showModalPermission();
    //   return;
    // }
    console.log(d, "dd");
    navigate("/qr-code", { replace: true });
  };
  console.log(errors, "errors form");

  return (
    <Box
      sx={{
        height: "100vh",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack gap={2} bgcolor={"white"} p={2} pt={4}>
        <Controller
          name="name_zalo"
          control={control}
          render={({ field }) => (
            <TextField
              required
              label="Tên Zalo của Anh/ Chị"
              {...field}
              error={Boolean(errors["name_zalo"])}
              helperText={
                Boolean(errors["name_zalo"]) && errors["name_zalo"]?.message
              }
              disabled={hasAuthor}
            />
          )}
        />
        <Controller
          name="phone_zalo"
          control={control}
          render={({ field }) => (
            <TextField
              required
              label="Số điện thoại"
              {...field}
              error={Boolean(errors["phone_zalo"])}
              helperText={
                Boolean(errors["phone_zalo"]) && errors["phone_zalo"]?.message
              }
              disabled={hasAuthor}
            />
          )}
        />
        <Controller
          name="phone_other"
          control={control}
          render={({ field }) => (
            <TextField
              label="Số điện thoại liên hệ khác (nếu có)"
              error={Boolean(errors["phone_other"])}
              helperText={
                Boolean(errors["phone_other"]) && errors["phone_other"]?.message
              }
              {...field}
            />
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
      </Stack>

      <Stack mt={1} gap={2} bgcolor={"white"} p={2}>
        <Typography
          color={"primary.main"}
          variant="subtitle1"
        >{`Danh sách quà tặng`}</Typography>
        <GiftItem />
        <GiftItem />
      </Stack>

      <div style={{ flex: 1, background: "white" }} />
      <Stack p={2} bgcolor={"white"}>
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

export default AccountInfo;
