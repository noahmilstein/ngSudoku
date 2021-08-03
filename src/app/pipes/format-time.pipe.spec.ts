import { FormatTimePipe } from './format-time.pipe'

describe('FormatTimePipe', () => {
  const pipe = new FormatTimePipe()
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('pipe transform should convert seconds to readable format', () => {
    expect(pipe.transform(123)).toEqual('00:02:03')
  })

  it('pipe transform should handle small input values', () => {
    expect(pipe.transform(1)).toEqual('00:00:01')
  })

  it('pipe transform should handle large input values', () => {
    expect(pipe.transform(9999)).toEqual('02:46:39')
  })

  it('pipe transform should handle null input', () => {
    expect(pipe.transform(null)).toEqual('00:00:00')
  })
})
