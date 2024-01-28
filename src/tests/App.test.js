import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { mount, shallow } from "enzyme";
import axios from "axios";
import { configure } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import App from "../App";
configure({ adapter: new Adapter() });

jest.mock("axios");

describe("App component testing", () => {
  test("sample", () => {
    expect("nextgen").toBe("nextgen");
  });

  //Snapshot testing
  test("Snapshop testing for App component", () => {
    const AppComponent = renderer.create(<App />).toJSON();
    expect(AppComponent).toMatchSnapshot();
  });

  //Render whole application
  test("Render whole App application", () => {
    const AppComponent = mount(<App />);
  });
  
});

// npm test -- --updateSnapshot --watch

//error get when use contextapi
//error
  //const { posts, getBlogs, updatePost, loggedIn } = useAuth(); and
  //const userId = localStorage.getItem("userId");
  //Cannot destructure property 'posts' of '(0 , _AuthContext.useAuth)(...)' as it is undefined.
