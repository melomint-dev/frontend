import styles from "./ManageSubscription.module.css";
import { Title, Text } from "@mantine/core";

const ManageSubscription = ({subscription } : {
    subscription: { 
        amount: number;
        expDate: string;
    }
}) => {
  return (
    <div className={styles.container}>
      <Title order={3} color="primary" weight={800}>
        Manage Subscription
      </Title>
      <div className={styles.subscription}>
        <div className={styles.currentPlan}>
          <Text color="white">Current Plan</Text>
        </div>
        <div className={styles.plan}>
          <div className={styles.planPrice}>
            <Title order={4} color="#FF8A00">Gold</Title>
            <div className={styles.price}>
              <Text weight={800} color="primary">
                {subscription.amount} FLOW
              </Text>
              <Text weight={600} color="primary.3">
                / year
              </Text>
            </div>
          </div>
          <div className={styles.expDate}>
            <Text weight={600} size="sm" color="primary.3">
              Valid Until:
            </Text>
            <Text weight={800} size="sm" color="primary">
              {subscription.expDate}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;
