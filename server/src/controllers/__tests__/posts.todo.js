// eslint-disable-next-line no-unused-vars
import {initDb, generate} from 'til-server-test-utils'
import db from '../../utils/db'
import {getPosts, getPost} from '../posts.todo'

function setup() {
  const req = {}
  const res = {
    json: jest.fn(),
  }
  return {req, res}
}

// I'll give this one to you. You want the database to be fresh
// the initDb function will initialize the database with random users and posts
// you can rely on that fact in your tests if you want.
// (For example, getPosts should return all the posts in the DB)
beforeEach(() => initDb())

const getFirstArg = res => {
  const firstCall = res.json.mock.calls[0]
  return firstCall[0]
}

test('getPosts returns all posts in the database', async () => {
  const {req, res} = setup()
  await getPosts(req, res)
  expect(res.json).toHaveBeenCalledTimes(1)
  const {posts} = getFirstArg(res)
  expect(posts.length).toBeGreaterThan(1)
  const actualPosts = await db.getPosts()
  expect(posts).toEqual(actualPosts)
  // here you'll need to Arrange, Act, and Assert
  // Arrange: set up the req and res mock objects
  // Act: Call getPosts on the postsController with the req and res
  // Assert:
  //   - ensure that your mock object functions were called properly
  //   - BONUS: ensure that the posts returned are the ones in the database `await db.getPosts()`
})

test('getPost returns the specific post', async () => {
  const testPost = await db.insertPost(generate.postData())
  const {req, res} = setup()
  req.params = {id: testPost.id}
  await getPost(req, res)
  expect(res.json).toHaveBeenCalledTimes(1)
  const {post} = getFirstArg(res)
  const actuaPost = await db.getPost(testPost.id)
  expect(post).toEqual(actuaPost)
  expect(actuaPost).toEqual(testPost)
  // here you'll need to Arrange, Act, and Assert
  // Arrange:
  //   - create a test post and insert it into the database using `await db.insertPost(generate.postData())`
  //   - set up the req and res mock objects. Make sure the req.params has the test post ID
  // Act: Call getPost on the postsController with the req and res
  // Assert:
  //   - ensure that your mock object functions were called properly
  //   - BONUS: ensure that the post you got back is the same one in the db
})

test('updatePost updates the post with the given changes', async () => {
  // BONUS: If you have extra time, try to implement this test as well!
})

// Here's where you'll add your new `deletePost` tests!
// - Think more about use cases than code coverage and use those use cases to title your tests
// - Write the code and tests iteratively as little as necessary at a time.
// - Create and use a `setup` test object(s) factory to keep your tests focused

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=postsController&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
