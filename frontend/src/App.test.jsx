
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("Food Ordering Homepage", () => {

  // Test 1: Homepage heading
  it("displays the menu heading", () => {
    render(<App />);

    expect(
      screen.getByText("Explore Our Menu")
    ).toBeInTheDocument();
  });

  // Test 2: Food item
  it("displays Chicken Biryani", () => {
    render(<App />);

    expect(
      screen.getByText("Chicken Biryani")
    ).toBeInTheDocument();
  });

  // Test 3: Search functionality
  it("filters food items when searching", () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(
      "Search your favourite food..."
    );

    fireEvent.change(searchInput, {
      target: { value: "Pizza" },
    });

    expect(
      screen.getByText("Margherita Pizza")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Chicken Biryani")
    ).not.toBeInTheDocument();
  });

  // Test 4: Add to Cart
  it("adds a food item to the shopping cart", () => {
    render(<App />);

    const addButtons = screen.getAllByRole("button", {
      name: "Add to Cart",
    });

    fireEvent.click(addButtons[0]);

    expect(
      screen.getByText("₹249 each")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Total: ₹249")
    ).toBeInTheDocument();
  });
  
it("places an order and displays confirmation", () => {
  render(<App />);

  // Add Chicken Biryani to the cart
  const addButtons = screen.getAllByRole("button", {
    name: "Add to Cart",
  });

  fireEvent.click(addButtons[0]);

  // Enter customer details
  fireEvent.change(
    screen.getByPlaceholderText("Full Name"),
    { target: { value: "Zaheer" } }
  );

  fireEvent.change(
    screen.getByPlaceholderText("Phone Number"),
    { target: { value: "9876543210" } }
  );

  fireEvent.change(
    screen.getByPlaceholderText("Delivery Address"),
    { target: { value: "Hyderabad" } }
  );

  // Place the order
  fireEvent.click(
    screen.getByRole("button", {
      name: "Place Order",
    })
  );

  // Verify confirmation
  expect(
    screen.getByText("Order Placed Successfully!")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Thank you, Zaheer!")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Your cart is empty.")
  ).toBeInTheDocument();
});
});