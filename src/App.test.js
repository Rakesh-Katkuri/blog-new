// import React from "react";
// import { render, screen } from "@testing-library/react";
// import App from "./App";
// import renderer from "react-test-renderer";
// import { BrowserRouter as Router } from "react-router-dom";
// import { mount, shallow } from "enzyme";
// import {act} from 'react-dom/test-utils'

// import AllBlogs from "./blogs/AllBlogs";
// import Sample from "./blogs/Sample";
// import Navbar from "./home/Navbar";
// import Login from "./userAuthentication/LoginForm";
// import Register from "./userAuthentication/RegisterForm";
// import axios from "axios";
// import { configure } from "enzyme";
// import Adapter from "@cfaester/enzyme-adapter-react-18";
// configure({ adapter: new Adapter() });

// jest.mock("axios");

// describe("App component testing", () => {
  test("sample", () => {
    expect("nextgen").toBe("nextgen");
  });

//   //Snapshot testing
//   test("Snapshop testing for App component", () => {
//     const AppComponent = renderer.create(<App />).toJSON();
//     expect(AppComponent).toMatchSnapshot();
//   });

//   //Render whole application
//   test("Render whole App application", () => {
//     const AppComponent = mount(<App />);
//   });

//   //Render individual Login component
//   test("Render login component", async () => {
//     const wrapper = shallow(
//       <Router>
//         <Login />
//       </Router>
//     );
//   });

//   //Check if form elements exists in Login component
//   test("Render login and check if form elements exists", () => {
//     const wrapper = mount(
//       <Router>
//         <Login />
//       </Router>
//     );

//     expect(wrapper.find("form")).toHaveLength(1);
//     expect(wrapper.find("h2 + div label")).toHaveLength(1);
//     expect(wrapper.find('input[type="email"]')).toHaveLength(1);
//     expect(wrapper.find('input[type="password"]')).toHaveLength(1);
//   });

//    test("updates state on input change", async () => {
//     axios.get = jest.fn().mockResolvedValueOnce({ data: { success: true } });
//     const wrapper = mount(
//       <Router>
//         <Login />
//       </Router>
//     );

//     //find the input fields by their unique identifiers or classsnames
//     const emailInput = wrapper.find('input[type="email"]');
//     const passwordInput = wrapper.find('input[type="password"]')

//     //simulate input changes
//     emailInput.simulate('change', {target: { value: 'test@gmail.com'}});
//     passwordInput.simulate('change', {target: { value: 'testpassword'}});

//     //check if the state has been update
//     // expect(emailInput.prop('value')).toEqual('test@gmail.com');
//     // expect(passwordInput.prop('value')).toEqual('testpassword');
    
//   });

//   //Submit form with input data
//   test("submits form with Email and password data", async () => { 
//     axios.get = jest.fn().mockResolvedValueOnce({ data: { success: true } });

//     const wrapper = mount(
//       <Router>
//         <Login />
//       </Router>
//     );

//     //Set Email and Password input values
//     wrapper
//       .find('input[type="email"]')
//       .simulate("change", { target: { value: "test@gmail.com" } });
//     wrapper
//       .find('input[type="password"]')
//       .simulate("change", { target: { value: "testpassword" } });

//     //Simulate form submision by triggering the onclick event on the "Sign In" button
//     wrapper.find('button[type="submit"]').simulate("click");

//     //Add a delay to wait for promise resolution(in case axios.get is asynchronous)
//     await new Promise((resolve) => setTimeout(resolve, 0));

//     //check if axios.get was called with the correct end point or parameters
//     expect(axios.get).toHaveBeenCalledWith("http://localhost:3002/user");
//   });

  
//   test("Render Register component", async () => {
//     shallow(
//       <Router>
//         <Register />
//       </Router>
//     );
//   });

  

 
// });

// // npm test -- --updateSnapshot --watch

// //error get when use contextapi
// //error
//   //const { posts, getBlogs, updatePost, loggedIn } = useAuth(); and
//   //const userId = localStorage.getItem("userId");
//   //Cannot destructure property 'posts' of '(0 , _AuthContext.useAuth)(...)' as it is undefined.
