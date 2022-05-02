import { Accordion, Button, Center, Space, Text } from "@mantine/core";
import { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import { SalaryInput as SalaryInputType } from "../types/SalaryInput.type";
import Deductions from "./Deductions";
import Income from "./Income";

type Props = {
  form: UseForm<SalaryInputType>;
  onCalculate: () => void;
  reset: () => void;
};

export default function SalaryInput({ form, onCalculate, reset }: Props) {
  return (
    <>
      <Accordion initialItem={0} iconPosition="right">
        <Accordion.Item
          label={
            <Text weight="bold" size="md">
              Income
            </Text>
          }
        >
          <Income form={form}></Income>
        </Accordion.Item>
        <Accordion.Item
          label={
            <Text weight="bold" size="md">
              Deductions
            </Text>
          }
        >
          <Deductions form={form}></Deductions>
        </Accordion.Item>
      </Accordion>
      <Center style={{ padding: "20px" }}>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
        <Space w="md"></Space>
        <Button onClick={onCalculate}>Calculate</Button>
      </Center>
    </>
  );
}
