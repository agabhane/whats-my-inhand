import { SalaryInput } from "../types/SalaryInput.type";
export const deductionComputation = [
  {
    step: "standardDeduction",
    fn: (result: number, values: SalaryInput) => {
      return result - values.standardDeduction;
    },
  },
  {
    step: "HRA",
    fn: (result: number, values: SalaryInput) => {
      return result - values.hra;
    },
  },
  {
    step: "80C",
    fn: (result: number, values: SalaryInput) => {
      const employeePF = ((values.monthlyBasic * 12.5) / 100) * 12;
      return result - Math.min(values.basicDeduction80c + employeePF, 150000);
    },
  },
  {
    step: "nps",
    fn: (result: number, values: SalaryInput) => {
      return result - Math.min(values.nps, 50000);
    },
  },
  {
    step: "donation",
    fn: (result: number, values: SalaryInput) => {
      return result - values.donation;
    },
  },
  {
    step: "educationLoanInterest",
    fn: (result: number, values: SalaryInput) => {
      return result - values.interestOnEducationLoan;
    },
  },
  {
    step: "homeLoanInterest",
    fn: (result: number, values: SalaryInput) => {
      return result - values.interestOnHomeLoan + values.interestOnHousingLoan;
    },
  },
  {
    step: "medicalInsurance",
    fn: (result: number, values: SalaryInput) => {
      return result - values.medicalInsurance80d;
    },
  },
];

export const taxComputation = [
  {
    step: 1,
    start: 0,
    end: 250000,
    text: "< 2,50,000",
    percentage: 0,
  },
  {
    step: 2,
    start: 250001,
    end: 500000,
    text: "2,50,000 - 5,00,000",
    percentage: 5,
  },
  {
    step: 3,
    start: 500001,
    end: 1000000,
    text: "5,00,000 - 10,00,000",
    percentage: 20,
  },
  {
    step: 4,
    start: 1000001,
    end: Infinity,
    text: "> 10,00,000",
    percentage: 30,
  },
];
