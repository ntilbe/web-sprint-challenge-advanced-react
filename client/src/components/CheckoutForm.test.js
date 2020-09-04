import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);
  const header = screen.getByText(/checkout form/i);
  expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm />);
  const elements = [
    {
      name: /first name/i,
      toInput: "Nicole",
    },
    {
      name: /last name/i,
      toInput: "Tilbe",
    },
    {
      name: /address/i,
      toInput: "1234 Test Ln",
    },
    {
      name: /city/i,
      toInput: "Rome",
    },
    {
      name: /state/i,
      toInput: "New York",
    },
    {
      name: /zip/i,
      toInput: "13440",
    },
  ];
  elements.forEach((el) => {
    el.element = screen.getByLabelText(el.name);
    fireEvent.change(el.element, { target: { value: el.toInput } });
    expect(el.element.value).toBe(el.toInput);
  });
  const button = screen.getByRole(/button/i);
  button.click();
  elements.forEach((el) => {
    const regex = new RegExp(el.toInput, "i");
    const text = screen.getByText(regex);
    expect(text).toBeInTheDocument();
  });
  const success = screen.getByText(/woo-hoo/i);
  expect(success).toBeInTheDocument();
});
