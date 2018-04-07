import {omit} from 'lodash'
import {initDb, generate} from 'til-server-test-utils'
import {getUsers, getUser, deleteUser} from '../users.todo'
import db from '../../utils/db'

function setup() {
  const req = {}
  const res = {}
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this
      }.bind(res),
    ),
    json: jest.fn(
      function json() {
        return this
      }.bind(res),
    ),
    send: jest.fn(
      function send() {
        return this
      }.bind(res),
    ),
  })
  return {req, res}
}

beforeEach(() => initDb())

const getFirstArg = res => {
  const firstCall = res.json.mock.calls[0]
  return firstCall[0]
}

const safeUser = u => omit(u, ['exp', 'iat', 'hash', 'salt'])

test('getUsers returns all users in database', async () => {
  const {req, res} = setup()
  await getUsers(req, res)
  expect(res.json).toHaveBeenCalledTimes(1)
  const {users} = getFirstArg(res)
  expect(users.length).toBeGreaterThan(1)
  const actualUsers = await db.getUsers()
  expect(users).toEqual(actualUsers.map(safeUser))
})

test('getUser returns the specific user', async () => {
  const testUser = await db.insertUser(generate.userData())
  const {req, res} = setup()
  req.params = {id: testUser.id}
  await getUser(req, res)
  expect(res.json).toHaveBeenCalledTimes(1)
  const {user} = getFirstArg(res)
  const actualUser = await db.getUser(testUser.id)
  expect(user).toEqual(safeUser(actualUser))
  expect(actualUser).toEqual(testUser)
})

test('deleteUser returns deteled user data', async () => {
  const testUser = await db.insertUser(generate.userData())
  const {req, res} = setup()
  req.params = {id: testUser.id}
  req.user = {id: testUser.id}
  await deleteUser(req, res)
  expect(res.json).toHaveBeenCalledTimes(1)
  const {user} = getFirstArg(res)
  expect(user).toEqual(safeUser(testUser))
  const dbUser = await db.getUser(testUser.id)
  expect(dbUser).not.toBeDefined()
})

test('deleteUser will 404 if made to a non-existing user', async () => {
  await db.insertUser(generate.userData())
  const {req, res} = setup()
  const nonExistId = generate.id()
  req.params = {id: nonExistId}
  req.user = {id: nonExistId}
  await deleteUser(req, res)
  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.send).toHaveBeenCalledTimes(1)
})

test('deleteUser will 403 if not made by the author', async () => {
  const testUser = await db.insertUser(generate.userData())
  const {req, res} = setup()
  req.params = {id: testUser.id}
  await deleteUser(req, res)
  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(1)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=users%20test$20object%20factories&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
