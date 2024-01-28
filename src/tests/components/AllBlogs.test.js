import {mount} from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { configure } from "enzyme";
import Adapter from '@cfaester/enzyme-adapter-react-18'
import AllBlogs from '../../blogs/AllBlogs';
import { AuthContext } from '../../authContext/AuthContext';
configure({adapter: new Adapter()});


jest.mock('../../authContext/AuthContext', ()=>({

    useAuth: ()=> ({
        posts : [
            {id: 1, title: 'Blog 1', description: 'Description 1', imageUrl: 'url1', favorite: ['userId1', 'userId2']},
            {id: 1, title: 'Blog 2', description: 'Description 2', imageUrl: 'url2', favorite: ['userId1']},
        ]
    })

}));

//mock local storage get item methode
const localStorageMock = {
    getItem: jest.fn(),
};
global.localStorage = localStorageMock
 

describe('allblogs component', () => {
   

    test('renders allblogs with correct elements', () => {

        //set up localstorage.getitem mock to return userid
        localStorageMock.getItem.mockReturnValue('userId')
       
        const wrapper = mount(
            <MemoryRouter>
                <AllBlogs/>
            </MemoryRouter>
        );

        expect(wrapper.find(AllBlogs).exists()).toBe(true);

        const mockPosts = [
            {id: 1, title: 'Blog 1', description: 'Description 1', imageUrl: 'url1'},
            {id: 1, title: 'Blog 2', description: 'Description 2', imageUrl: 'url2'},
        ]

        //check if the rendered blogs match the expected number
        expect(wrapper.find('.blog-post')).toHaveLength(mockPosts.length);

        //assert specific details of each blog post
        mockPosts.forEach((post, index) => {
            const blogPost = wrapper.find('.blog-post').at(index);

            //check if the title , descri, img match for each post
            expect(blogPost.find('.blog-title').text()).toBe(post.title)
            expect(blogPost.find('.blog-description').text()).toBe(post.description)
            expect(blogPost.find('.blog-image').prop('src')).toBe(post.imageUrl)
        })


    })
})