import { EventEmitter } from '@angular/core'
import { ISubscription } from 'rxjs/Subscription'

// TODO :: add spec
function unsubscribe(subscription: ISubscription): void {
  if (subscription) {
    subscription.unsubscribe()
  }
}

export function AutoUnsubscribe(exclude: string[] = []): (target: any) => void {
  return (target) => {
    const ngOnDestroy = target.prototype.ngOnDestroy

    target.prototype.ngOnDestroy = function (): void {
      if (typeof ngOnDestroy !== 'function') {
        throw new Error(
          `${target.name} is using 'AutoUnsubscribe()' but does not implement OnDestroy`
        )
      }
      Object.keys(this)
        .filter((prop) => exclude.indexOf(prop) === -1)
        .forEach((prop) => {
          const property = this[prop]
          if (property && typeof property.unsubscribe === 'function') {
            if (!(property instanceof EventEmitter)) {
              unsubscribe(property)
            }
          }
        })
      if (ngOnDestroy && typeof ngOnDestroy === 'function') {
        ngOnDestroy.apply(this, arguments)
      }
    }
  }
}
