// I'm going to let you do most of the work here :)
// 1. import the createJSON function from ../myjson
import axiosMock from 'axios'
import {createJSON} from '../myjson'

jest.mock('axios')

beforeEach(() => {
  axiosMock.post.mockClear()
})

test('make a request with createJSON API with given data', async () => {
  const data = {
    description: 'the description for this gist',
    public: true,
    files: {
      'file1.txt': {
        content: 'String file contents',
      },
    },
  }

  const mockResponse = {data: {success: true}}
  axiosMock.post.mockResolvedValueOnce(mockResponse)
  const responseData = await createJSON(data)

  expect(axiosMock.post).toHaveBeenCalledTimes(1)
  expect(axiosMock.post).toHaveBeenCalledWith(
    'https://api.myjson.com/bins',
    data,
  )
  expect(responseData).toEqual(mockResponse.data)
})
// 2. import the axiosMock from axios
// 3. (optionally) create an inline mock for axios
// 4. create an async test that calls createJSON with whatever you want
// 5. Make assertions that the axios.__mock.instance.post was called with what it should have been

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=myjson&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
