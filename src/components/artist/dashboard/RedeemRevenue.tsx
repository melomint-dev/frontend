import React from "react";
import { Title, Text, Button } from "@mantine/core";

import styles from "./RedeemRevenue.module.css";
function RedeemRevenue() {
  const revenue = {
    amount: 9856,
    currency: "FLOW",
  };
  return (
    <div className={styles.container}>
      <Title order={3} weight={800} color="primary">
        Redeem Revenue
      </Title>
      <Text weight={"500"} color="primary.3">
        You have total of{" "}
        <Text inherit span weight={"800"}>
          {revenue.amount} {revenue.currency}
        </Text>{" "}
        revenue balance in your account. Create Request to redeem to your
        account.
      </Text>
      <div>
        <Button color="secondary" variant="filled" size="md" radius={"xl"}>
          Join Membership {revenue.amount} {revenue.currency}
        </Button>
      </div>
    </div>
  );
}

export default RedeemRevenue;
