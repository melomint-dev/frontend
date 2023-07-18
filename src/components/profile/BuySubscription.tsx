import { subscribe } from "diagnostics_channel";
import styles from "./BuySubscription.module.css";
import { Title, Text, Button } from "@mantine/core";

import { buySubscriptionFetcher } from "@/hooks/person.swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWRMutation from "swr/mutation";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/utils/notifications.helper";

const BuySubscription = ({
  subscription,
}: {
  subscription: {
    amount: number;
  };
}) => {

  const { trigger: buySubscribe, isMutating } = useSWRMutation(
    SWR_CONSTANTS.BUY_SUBSCRIPTION,
    buySubscriptionFetcher
  );

  const handleSubscribe = async () => {
    try {
      const data = await buySubscribe({
        amount: subscription.amount,
        artistID: "0x636351c10618dd9a",
      });
      console.log(data);
      console.log("UPDATE-SUBSCRIPTION -- SUCCESS");
      showSuccessNotification("Subscription updated successfully");
    } catch (err) {
      console.log(err);
      showErrorNotification("Error updating subscription");
    }
  };

  return (
    <div className={styles.container}>
      <Title order={3} weight={800} color="primary">
        Manage Subscription
      </Title>
      <Text color="primary.3" weight={500}>
        You don’t have any subscription yet. Join Now and get access to
        unlimited high quality songs
      </Text>
      <Button
        color="secondary"
        variant="filled"
        size="md"
        radius={"xl"}
        onClick={handleSubscribe}
      >
        Join now with {subscription.amount} FLOW
      </Button>
    </div>
  );
};

export default BuySubscription;
