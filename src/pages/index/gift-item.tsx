import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const GiftItem = () => {
  return (
    <Stack
      direction={"row"}
      spacing={1}
      border={1}
      borderColor={"grey.300"}
      borderRadius={3}
      p={1}
      alignItems={"center"}
    >
      <Stack flex={1}>
        <img
          src={
            "https://inngochuong.com/uploads//images/in-gift-voucher/mau-gift-voucher-don-gian.jpg"
          }
          height={60}
          style={{ alignSelf: "center" }}
        />
      </Stack>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{ borderStyle: "dashed" }}
      />
      <Stack flex={2} gap={0.5}>
        <Typography variant="body2">{`Gift 01`}</Typography>
        <Typography variant="body2">{`SL: 01`}</Typography>
        <Typography variant="body2">{`Ngày đổi: 04/06/2024`}</Typography>
      </Stack>
    </Stack>
  );
};

export default GiftItem;
