import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.css";
import { TextInput, Text } from "@mantine/core";

import { flowicon, user, search } from "@/assets/player";

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background py-5 px-[2.25rem] flex justify-between">
      <TextInput
        classNames={{input:"bg-[#108CFF0D] border-none min-w-[400px] rounded-[0.875rem]"}}
        variant="filled"
        placeholder="Search"
        size="md"
        icon={<Image src={search} alt="" height={20} width={20} />}
      />
      <div className="flex items-center space-x-5">
        <Text size="lg" weight="700">Raj Varsani</Text>
        <div className="relative">
          <Image
            src={flowicon}
            alt=""
            height={20}
            width={20}
            className="absolute -top-2 -left-2"
          />
          <Image
            src={user}
            alt=""
            height={42}
            width={42}
            className="rounded-[14px]"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
