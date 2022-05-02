import { NumberInput, SimpleGrid } from "@mantine/core";
import { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { SalaryInput } from "../types/SalaryInput.type";
import Tooltip from "./shared/Tooltip";

type Props = {
  form: UseForm<SalaryInput>;
};

export default function Deductions({ form }: Props) {
  return (
    <form>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <NumberInput
          label="Standard Deduction"
          defaultValue={50000}
          disabled
          {...form.getInputProps("standardDeduction")}
        />
        <NumberInput
          label="HRA"
          min={0}
          max={150000}
          {...form.getInputProps("hra")}
        />
        <NumberInput
          label="Basic Deductions - 80C"
          min={0}
          max={150000}
          defaultValue={0}
          rightSection={
            <Tooltip msg="Amount invested/paid in tax saving instruments such as LIC, PPF, ELSS etc" />
          }
          {...form.getInputProps("basicDeduction80c")}
        />
        <NumberInput
          label="Medical Insurance - 80D"
          min={0}
          defaultValue={0}
          rightSection={
            <Tooltip msg="Medical premium & preventive health checkup fees paid for self & family including parents" />
          }
          {...form.getInputProps("medicalInsurance80d")}
        />
        <NumberInput
          label="Loss from Self-Occupied/Let-Out"
          min={0}
          defaultValue={0}
          rightSection={
            <Tooltip msg="Loss from Self-Occupied/Let-Out propertly" />
          }
          {...form.getInputProps("interestOnHomeLoan")}
        />
        <NumberInput
          label="Employee's contribution to NPS - 80CCD1(B)"
          min={0}
          max={50000}
          defaultValue={0}
          rightSection={
            <Tooltip msg="Includes voluntary contribution to National Pension Scheme (NPS) under section 80CCD1(B)" />
          }
          {...form.getInputProps("nps")}
        />

        <NumberInput
          label="Interest on Education Loan - 80E"
          min={0}
          defaultValue={0}
          rightSection={
            <Tooltip msg="Amount of interest paid on loan taken for highen education" />
          }
          {...form.getInputProps("interestOnEducationLoan")}
        />
        <NumberInput
          label="Interest  on Housing Loan - 80EE"
          min={0}
          defaultValue={0}
          rightSection={
            <Tooltip msg="Amount of interest paid on housing loan sanctioned during FY 16-17/19-20" />
          }
          {...form.getInputProps("interestOnHousingLoan")}
        />
        <NumberInput
          label="Interest paid on loan for EV u/s 80EEB"
          min={0}
          defaultValue={0}
          rightSection={
            <Tooltip msg="Amount of interest pain on vehicle loan sanctioned during FY 19-20" />
          }
          {...form.getInputProps("interestOnEVLoan")}
        />
        <NumberInput
          label="Donation to Charity - 80G"
          min={0}
          defaultValue={0}
          rightSection={
            <Tooltip msg="Amount paid as donation to charitable institutions or certain recognized funds" />
          }
          {...form.getInputProps("donation")}
        />
      </SimpleGrid>
    </form>
  );
}
