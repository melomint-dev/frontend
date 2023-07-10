import { subscribe } from "diagnostics_channel";
import styles from "./BuySubscription.module.css";
import { Title, Text, Button } from "@mantine/core";

const BuySubscription = ({subscription} : {
    subscription: {
        amount: number;
    }
}) => {
  return (
    <div className={styles.container}>
      <Title order={3} weight={800} color="primary">
        Manage Subscription
      </Title>
      <Text color="primary.3" weight={500}>
        You don’t have any subscription yet. Join Now and get access to
        unlimited high quality songs
      </Text>
      <Button color="secondary" variant="filled" size="md" radius={"xl"}>
        Join now with {subscription.amount} FLOW
      </Button>
    </div>
  );
};

export default BuySubscription;
