import { Checkbox, NumberInput } from "@mantine/core";
import { UseForm } from "@mantine/hooks/lib/use-form/use-form";
import { SalaryInput } from "../types/SalaryInput.type";

type Props = {
  form: UseForm<SalaryInput>;
};

export default function Income({ form }: Props) {
  return (
    <form>
      <NumberInput
        label="Monthly Basic"
        description="Enter your monthly basic amount"
        min={0}
        inputMode="numeric"
        pattern="[0-9]*"
        required
        {...form.getInputProps("monthlyBasic")}
      />

      <NumberInput
        label="Annual CTC"
        description="Enter your annual CTC amount excluding bonus, gratuity, insurance etc"
        min={0}
        inputMode="numeric"
        pattern="[0-9]*"
        required
        {...form.getInputProps("annualCTC")}
      />
      <Checkbox
        mt="md"
        label="Employer contribution for PF included in CTC"
        {...form.getInputProps("employerPFIncluded", { type: "checkbox" })}
      />
    </form>
  );
}
