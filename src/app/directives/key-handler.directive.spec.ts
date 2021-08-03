import { KeyHandlerDirective } from './key-handler.directive'

describe('KeyHandlerDirective', () => {
  const directive = new KeyHandlerDirective()
  const outputSpy = jest.spyOn(directive.numericalKeyEvent, 'emit')

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  it('isNumeric should check if input is numerical', () => {
    expect(directive.isNumeric('1')).toBeTruthy()
    expect(directive.isNumeric('a')).toBeFalse
  })

  it('keyEvent should emit numerical inputs', () => {
    const numberKeyEvent = new KeyboardEvent('keyup', { key: '1' })
    directive.keyEvent(numberKeyEvent)
    expect(outputSpy).toHaveBeenCalledWith(1)
  })

  it('keyEvent should NOT emit non-numerical inputs', () => {
    const nonNumberKeyEvent = new KeyboardEvent('keyup', { key: 'a' })
    directive.keyEvent(nonNumberKeyEvent)
    expect(outputSpy).not.toHaveBeenCalled()
  })
})
