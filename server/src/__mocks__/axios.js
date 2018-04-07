const defaultResponse = {data: {}}
module.exports = {
  post: jest.fn().mockImplementation(() => Promise.resolve(defaultResponse)),
}
