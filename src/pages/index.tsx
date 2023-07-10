import AuthComp from "@/components/auth/AuthComp";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LandinPageMainSec from "@/components/index/LandinPageMainSec";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  console.log(router.query);

  const closeAuthModal = () => {
    router.push("/");
  };

  return (
    <main>
      <LandinPageMainSec />
      <Button />
      <Modal
        opened={router.query.authModal === "register"}
        onClose={closeAuthModal}
        withCloseButton={false}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <AuthComp type="register" />
      </Modal>
      <Modal
        opened={router.query.authModal === "login"}
        onClose={closeAuthModal}
        withCloseButton={false}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <AuthComp type="login" />
      </Modal>
    </main>
  );
}
