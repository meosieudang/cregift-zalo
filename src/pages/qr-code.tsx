import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import a from "../static/icons/qrcode.png";
import GiftItem from "./index/gift-item";
import { closeApp } from "zmp-sdk/apis";
const QRCode = () => {
  const onCloseApp = async () => {
    try {
      await closeApp({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        bgcolor: "white",
      }}
    >
      <Stack alignItems={"center"} gap={2} p={2}>
        <Typography variant="h6">{`QR Code`}</Typography>

        <Box border={1} borderRadius={4} borderColor={"error.main"}>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
            }
            width={200}
            height={200}
          />
        </Box>

        <Typography>{`QR xác nhận thông tin đổi quà`}</Typography>
        <Typography
          color={"error.main"}
        >{`Đưa mã này cho PG để hoàn thành đổi quà`}</Typography>
        <Typography
          variant="body2"
          color={"grey.500"}
        >{`Phát hành ngày 04/06/2024, 15:00:05`}</Typography>
      </Stack>

      <Stack p={2} gap={2}>
        <GiftItem />
        <GiftItem />
      </Stack>

      <div style={{ flex: 1 }} />
      <Stack p={2}>
        <Button onClick={onCloseApp} size="large" fullWidth variant="contained">
          Hoàn thành
        </Button>
      </Stack>
    </Box>
  );
};

export default QRCode;
