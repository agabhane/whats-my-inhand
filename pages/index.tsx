import { AppShell, Header, SimpleGrid, Text, MediaQuery } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import SalaryInput from "../components/SalaryInput";
import SalaryResult from "../components/SalaryResult";
import {
  deductionComputation,
  taxComputation,
} from "../constants/taxComputation";
import { SalaryInput as SalaryInputType } from "../types/SalaryInput.type";

const Home: NextPage = () => {
  const [tax, setTax] = useState(0);
  const [taxCalculation, setTaxCalculation] = useState<any[]>([]);
  const form = useForm<SalaryInputType>({
    initialValues: {
      monthlyBasic: 0,
      annualCTC: 0,
      employerPFIncluded: true,
      basicDeduction80c: 0,
      standardDeduction: 50000,
      hra: 0,
      donation: 0,
      nps: 0,
      interestOnEVLoan: 0,
      interestOnEducationLoan: 0,
      interestOnHomeLoan: 0,
      interestOnHousingLoan: 0,
      medicalInsurance80d: 0,
    },
  });

  const reset = ()=>{
    form.reset();
    setTax(0);
    setTaxCalculation([]);
  }

  const calculate = () => {
    let taxableIncome = form.values.annualCTC;
    deductionComputation.forEach(({ fn }) => {
      taxableIncome = fn(taxableIncome, form.values);
    });
    console.log("Taxable Income =>", taxableIncome);
    let tax = 0,
      taxCalculation: any[] = [],
      remainingTaxableIncome = taxableIncome;

    taxComputation.every((step) => {
      const slab = Math.min(step.end - step.start, remainingTaxableIncome);
      const slabTax = (slab * step.percentage) / 100;
      tax += slabTax;
      remainingTaxableIncome -= slab;
      taxCalculation.push({
        ...step,
        tax: slabTax,
      });
      return remainingTaxableIncome > 0;
    });
    console.table(taxCalculation);
    console.log("Tax =>", tax);
    setTax(tax);
    setTaxCalculation(taxCalculation);
  };

  const salaryInput = useMemo(() => {
    return form.values;
  }, [taxCalculation]);

  return (
    <>
      <Head>
        <title>Inhand Salary Calculator</title>
        <meta
          name="description"
          content="Inhand salary calculator for indian employees"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        header={
          <>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Header height={60} padding="md">
                <Text weight="bold" style={{ fontSize: "20px" }}>
                  Inhand Salary Calculator
                </Text>
              </Header>
            </MediaQuery>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Header height={80} padding="md">
                <Text weight="bold" style={{ fontSize: "30px" }}>
                  Inhand Salary Calculator
                </Text>
              </Header>
            </MediaQuery>
          </>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            minHeight: '100vh'
          },
        })}
      >
        <main>
          <SimpleGrid
            breakpoints={[
              { minWidth: "sm", cols: 1 },
              { minWidth: "md", cols: 2 },
            ]}
          >
            <div>
              <SalaryInput form={form} onCalculate={calculate} reset={reset}></SalaryInput>
            </div>
            <div>
              <SalaryResult
                taxCalculation={taxCalculation}
                salaryValues={salaryInput}
                tax={tax}
              ></SalaryResult>
            </div>
          </SimpleGrid>
        </main>
      </AppShell>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Home;
