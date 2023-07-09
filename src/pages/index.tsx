import Image from "next/image";
import { Button, Text } from "@mantine/core";

export default function Home() {
  return (
    <main>
      <Button variant="subtle" size="md" radius={"xl"}>
        <Text weight="500">Login</Text>
      </Button>
    </main>
  );
}
