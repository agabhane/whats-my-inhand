import { Card, Table, Text } from "@mantine/core";
import React from "react";
import { SalaryInput } from "../types/SalaryInput.type";

type Props = {
  taxCalculation: any[];
  tax?: number;
  salaryValues?: SalaryInput;
};

function getMonthlyPF(salaryValues: SalaryInput) {
  return (
    (salaryValues.monthlyBasic * 12.5) / 100 +
    (salaryValues.employerPFIncluded
      ? (salaryValues.monthlyBasic * 12.5) / 100
      : 0)
  );
}

function toLocaleString(number: number) {
  return Number(number.toFixed()).toLocaleString("en-IN");
}

export default function SalaryResult({
  taxCalculation,
  tax,
  salaryValues,
}: Props): JSX.Element {
  salaryValues = salaryValues || ({} as SalaryInput);
  tax = tax || 0;
  if (!taxCalculation.length) {
    return <></>;
  }
  const monthlyPF = getMonthlyPF(salaryValues as SalaryInput);
  return (
    <>
      <Card>
        <Text size="lg" weight={"bold"} color="blue" align="center">
          Inhand Monthly Salary =&gt;{" "}
          {toLocaleString((salaryValues.annualCTC - monthlyPF * 12 - tax) / 12)}
        </Text>
      </Card>
      <Card mt={20}>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>
                <Text align="right">Monthly</Text>
              </th>
              <th>
                <Text align="right">Annually</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CTC</td>
              <td style={{ textAlign: "right" }}>
                {toLocaleString(salaryValues.annualCTC / 12)}
              </td>
              <td style={{ textAlign: "right" }}>
                {toLocaleString(salaryValues.annualCTC)}
              </td>
            </tr>
            <tr>
              <td>PF</td>
              <td style={{ textAlign: "right" }}>
                {toLocaleString(monthlyPF)}
              </td>
              <td style={{ textAlign: "right" }}>
                {toLocaleString(monthlyPF * 12)}
              </td>
            </tr>
            <tr>
              <td>Tax</td>
              <td style={{ textAlign: "right" }}>{toLocaleString(tax / 12)}</td>
              <td style={{ textAlign: "right" }}>{toLocaleString(tax)}</td>
            </tr>
            <tr>
              <td>
                <Text color="blue">Inhand</Text>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text color="blue">
                  {toLocaleString(
                    (salaryValues.annualCTC - monthlyPF * 12 - tax) / 12
                  )}
                </Text>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text color="blue">
                  {toLocaleString(
                    salaryValues.annualCTC - monthlyPF * 12 - tax
                  )}
                </Text>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
      <Card mt={20}>
        <Table>
          <thead>
            <tr>
              <th>Slab</th>
              <th>
                <Text align="right">Percentage</Text>
              </th>
              <th>
                <Text align="right">Amount</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {taxCalculation.map((slab) => {
              return (
                <tr key={slab.step}>
                  <td>{slab.text}</td>
                  <td>
                    <Text align="right">{slab.percentage}</Text>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {Number((slab.tax as number).toFixed()).toLocaleString(
                      "en-IN"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
