const dotenv = jest.createMockFromModule('dotenv')

dotenv.config = jest.fn().mockReturnValue({})

module.exports = dotenv
