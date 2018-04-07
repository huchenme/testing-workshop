import {isPasswordAllowed, userToJSON} from '../auth'

describe('isPasswordAllowed only allows some passwords', () => {
  const allowedPasswords = ['12aaaaa', '12aaAB2', '12aaa*()']
  const disallowedPasswords = ['12aaa', '111111111', 'aaaaaaaaa']

  allowedPasswords.forEach(psw => {
    test(`allows ${psw}`, () => {
      expect(isPasswordAllowed(psw)).toBeTruthy()
    })
  })

  disallowedPasswords.forEach(psw => {
    test(`disallows ${psw}`, () => {
      expect(isPasswordAllowed(psw)).toBeFalsy()
    })
  })
})

test('userToJSON excludes secure properties', () => {
  const safeuser = {
    id: 'some-id',
    username: 'sarah',
  }

  const user = {
    ...safeuser,
    exp: new Date(),
    iat: new Date(),
    hash: 'some really long string',
    salt: 'some shorter string',
  }

  const json = userToJSON(user)
  expect(json).toEqual(safeuser)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=auth%20util&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true
  expect(submitted).toBe(true)
})
////////////////////////////////
