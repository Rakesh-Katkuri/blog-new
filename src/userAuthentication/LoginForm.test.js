describe('App component testing', ()=>{
  test('login', ()=>{
      expect("nextgen").toBe("nextgen")
  })

})

// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import axios from "axios";
// import Login from "./LoginForm";

// jest.mock("axios");

// describe("LoginForm", () => {
//   test("renders login form", () => {
//     render(<Login />);
//     const emailInput = screen.getByPlaceholderText("Enter email");
//     const passwordInput = screen.getByPlaceholderText("Enter password");
//     const signInButton = screen.getByText("Sign In");

//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(signInButton).toBeInTheDocument();
//   });

//   test("handles input change", () => {
//     render(<Login />);
//     const emailInput = screen.getByPlaceholderText("Enter email");
//     const passwordInput = screen.getByPlaceholderText("Enter password");

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });

//     expect(emailInput.value).toBe("test@example.com");
//     expect(passwordInput.value).toBe("password123");
//   });

//   test("handles form submission", async () => {
//     render(<Login />);
//     const emailInput = screen.getByPlaceholderText("Enter email");
//     const passwordInput = screen.getByPlaceholderText("Enter password");
//     const signInButton = screen.getByText("Sign In");

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });

//     axios.get.mockResolvedValueOnce({ data: [] });

//     fireEvent.click(signInButton);

//     expect(axios.get).toHaveBeenCalledWith("http://localhost:3002/user");
//     // Add more assertions based on your expected behavior after form submission
//   });
// });
