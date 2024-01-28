import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mount, shallow } from "enzyme";
import axios from "axios";
import { configure } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import Register from "../../userAuthentication/RegisterForm";
configure({ adapter: new Adapter() });

jest.mock('axios');

describe("Register App component testing", () => {

  //Render individual register component
  test("Render Register component", async () => {
    shallow(
      <Router>
        <Register />
      </Router>
    );
  });

  //Check if form elements exists in Login component
  test("Render Register and check if form elements exists", () => {
    const wrapper = mount(
      <Router>
        <Register />
      </Router>
    );

    // expect(wrapper.find("form")).toHaveLength(1);
    // expect(wrapper.find("h2 + div label")).toHaveLength(1);
    expect(wrapper.find('input[name="firstName"]')).toHaveLength(1);
    expect(wrapper.find('input[name="lastName"]')).toHaveLength(1);
    expect(wrapper.find('input[name="email"]')).toHaveLength(1);
    expect(wrapper.find('input[name="password"]')).toHaveLength(1);
   
  });

   test("updates state on input change", async () => {
    axios.get = jest.fn().mockResolvedValueOnce({ data: { success: true } });
    const wrapper = mount(
      <Router>
        <Register />
      </Router>
    );

    //simulate changing input values for each field
    wrapper.find('input[name="firstName"]').simulate('change', { target: { value: 'john' } });
    wrapper.find('input[name="lastName"]').simulate('change', { target: { value: 'doe' } });
    wrapper.find('input[name="email"]').simulate('change', { target: { value: 'john@gmail.com' } });
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'testPassword' } });

    //retrieve updated values from the component state or input fields
    const registerComponentInstance = wrapper.find('Register').instance();

    //retrieve the updated values from the components state or input fields
    if(registerComponentInstance){
        const firstNameValue = registerComponentInstance.state.firstName;
        const lastNameValue = registerComponentInstance.state.lastName;
        const emailValue = registerComponentInstance.state.email;
        const passwordValue = registerComponentInstance.state.password;


         //check it the values match the expected values
    expect(firstNameValue).toEqual('john');
    expect(lastNameValue).toEqual('doe');
    expect(emailValue).toEqual('john@gmail.com');
    expect(passwordValue).toEqual('testPassword');

    //log values
    console.log('first name:', firstNameValue);
    console.log('last name:', lastNameValue);
    console.log('email:', emailValue);
    console.log('password:', passwordValue);
    }else{
        console.log("register component instance not found")
    }
});


test("Submit registration data on button click", async () => {

    //mock axios.post
    const mockedresponse = { data: { success: true }};
    axios.post = jest.fn().mockResolvedValue(mockedresponse);

    const wrapper = mount(
      <Router>
        <Register />
      </Router>
    );

    //simulate changing input values for each field
    wrapper.find('input[name="firstName"]').simulate('change', { target: { name: 'firstName', value: 'john' } });
    wrapper.find('input[name="lastName"]').simulate('change', { target: { name: 'lastName', value: 'doe' } });
    wrapper.find('input[name="email"]').simulate('change', { target: {name: 'email', value: 'john@gmail.com' } });
    wrapper.find('input[name="password"]').simulate('change', { target: {name: 'password', value: 'testPassword' } });
    
    //Simulate form submision by triggering the onclick event on the "Sign up" button
    wrapper.find('button[type="submit"]').simulate("click");

    //Add a delay for potential asynchronous submission
    await new Promise((resolve) => setTimeout(resolve, 0));

    //check if axios.get was called with the correct end point or parameters
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3002/user", {
        firstName: 'john',
        lastName: 'doe',
        email: 'john@gmail.com',
        password: 'testPassword',
    });

});
  
  

  

 

});

// npm test -- --updateSnapshot --watch

//error get when use contextapi
//error
  //const { posts, getBlogs, updatePost, loggedIn } = useAuth(); and
  //const userId = localStorage.getItem("userId");
  //Cannot destructure property 'posts' of '(0 , _AuthContext.useAuth)(...)' as it is undefined.
