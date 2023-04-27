import randomHex from './randomHex'

describe('@services/randomColor', () => {
  it('returns a string', () => {
    expect(typeof randomHex()).toEqual('string')
  })
  it('returned value is six-character', () => {
    expect(randomHex()).toHaveLength(6)
  })
})
