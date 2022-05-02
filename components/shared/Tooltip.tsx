import { Tooltip as MantineTooltip } from "@mantine/core";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type Props = {
  msg: string;
};
export default function Tooltip({msg}: Props) {
  return (
    <MantineTooltip
      label={msg}
      position="top"
      width={300}
      wrapLines
    >
      <InfoCircledIcon />
    </MantineTooltip>
  );
}
