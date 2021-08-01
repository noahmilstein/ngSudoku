import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(time: number | null): string {
    if (!time) {
      return '00:00:00'
    }
    const formatTimeString = (timeNum: number) => {
      return timeNum < 10 ? `0${timeNum}` : `${timeNum}`
    }
    const hours = Math.floor(time / 60 / 60)
    const minutes = Math.floor(time / 60) - hours * 60
    const seconds = time % 60

    return `${formatTimeString(hours)}:${formatTimeString(
      minutes
    )}:${formatTimeString(seconds)}`
  }
}
