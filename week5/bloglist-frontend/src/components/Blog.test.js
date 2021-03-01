import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blogs renders', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Mikki Hiiri',
        url: 'www.testurl.com',
        likes: 3
    }

    test('title and author', async () => {
        const component = render(
            <Blog blog={blog} />
        )

        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(component.container).toHaveTextContent(
            'Mikki Hiiri'
        )
        expect(component.container).not.toHaveTextContent(
            'www.testurl.com'
        )
        expect(component.container).not.toHaveTextContent(
            '3'
        )
        // component.debug()
    })
    test('selecting view displays url and likes', async () => {
        const component = render(
            <Blog blog={blog} />
        )
        const button = component.getByText('view')
        fireEvent.click(button)
        component.debug()
        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(component.container).toHaveTextContent(
            'Mikki Hiiri'
        )
        expect(component.container).toHaveTextContent(
            'www.testurl.com'
        )
        expect(component.container).toHaveTextContent(
            '3'
        )
    })
    test('pressing like button calls the like-function twice', async () => {
        const mockHandler = jest.fn()
        const component = render(
            <Blog blog={blog} likeBlog={mockHandler} />
        )

        let button = component.getByText('view')
        fireEvent.click(button)
        let button2 = component.getByText('like')
        fireEvent.click(button2)
        fireEvent.click(button2)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})