import React from "react";
import renderer, { act } from "react-test-renderer";
import { MemoryRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { mount, shallow } from "enzyme";
import axios from "axios";
import { configure } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import Login from "../../userAuthentication/LoginForm";
import AllBlogs from "../../blogs/AllBlogs";
configure({ adapter: new Adapter() });

jest.mock("axios");

describe("App component testing", () => {

  //Render individual Login component
  test("Render login component", async () => {
    const wrapper = shallow(
      <Router>
        <Login />
      </Router>
    );
  });

  //Check if form elements exists in Login component
  test("Render login and check if form elements exists", () => {
    const wrapper = mount(
      <Router>
        <Login />
      </Router>
    );

    expect(wrapper.find("form")).toHaveLength(1);
    expect(wrapper.find("h2 + div label")).toHaveLength(1);
    expect(wrapper.find('input[type="email"]')).toHaveLength(1);
    expect(wrapper.find('input[type="password"]')).toHaveLength(1);
  });

   test("updates state on input change", async () => {
    axios.get = jest.fn().mockResolvedValueOnce({ data: { success: true } });
    const wrapper = mount(
      <Router>
        <Login />
      </Router>
    );

    //find the input fields by their unique identifiers or classsnames
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]')

    //simulate input changes
    emailInput.simulate('change', {target: { value: 'test@gmail.com'}});
    passwordInput.simulate('change', {target: { value: 'testpassword'}});

    //check if the state has been update
    // expect(emailInput.prop('value')).toEqual('test@gmail.com');
    // expect(passwordInput.prop('value')).toEqual('testpassword');
    
  });

  //Submit form with input data
  test("submits form with Email and password data", async () => { 
    axios.get = jest.fn().mockResolvedValueOnce({ data: { success: true } });

    const wrapper = mount(
      <Router>
        <Login />
      </Router>
    );

    //Set Email and Password input values
    wrapper
      .find('input[type="email"]')
      .simulate("change", { target: { value: "test@gmail.com" } });
    wrapper
      .find('input[type="password"]')
      .simulate("change", { target: { value: "testpassword" } });

    //Simulate form submision by triggering the onclick event on the "Sign In" button
    wrapper.find('button[type="submit"]').simulate("click");

    //Add a delay to wait for promise resolution(in case axios.get is asynchronous)
    await new Promise((resolve) => setTimeout(resolve, 0));

    //check if axios.get was called with the correct end point or parameters
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3002/user");
  });

  //  test("submits form with Email and password data", async () => { 
  //   axios.get = jest.fn().mockResolvedValueOnce({ data: { success: true } });

  //   let wrapper;

  //   await act(async ()=> {
  //   wrapper = mount(
  //     <MemoryRouter initialEntries={['/']} initialIndex={0}>
  //       <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route path="/all-blogs" element={<AllBlogs />} />
        
  //     </Routes>
  //     </MemoryRouter>
  //   );
  //   }) 

  //   //simulate the navigation from the login component to the allblog component
  //   const loginComponent = wrapper.findWhere(node => node.type() === Login);
  //   loginComponent.props().onLoginSuccess()
    

  //   //Add a delay to wait for promise resolution(in case axios.get is asynchronous)
  //   await new Promise((resolve) => setTimeout(resolve, 0));

  //   wrapper.update()

  //   const component = wrapper.find('AllBlogs')
  //   expect(component.exists()).toBe(true);

  //   //check if axios.get was called with the correct end point or parameters
  //   // expect(axios.get).toHaveBeenCalledWith("http://localhost:3002/user");
  // });

  

 
});



// npm test -- --updateSnapshot --watch

//error get when use contextapi
//error
  //const { posts, getBlogs, updatePost, loggedIn } = useAuth(); and
  //const userId = localStorage.getItem("userId");
  //Cannot destructure property 'posts' of '(0 , _AuthContext.useAuth)(...)' as it is undefined.
