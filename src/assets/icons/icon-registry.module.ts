import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

class Icon {
  [key: string]: string
}

@NgModule({
  imports: [MatIconModule, HttpClientModule]
})
export class IconRegistryModule {
  icons: Icon = {
    github: 'assets/icons/github-icon.svg'
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    Object.keys(this.icons).forEach((key) => {
      iconRegistry.addSvgIcon(
        key,
        sanitizer.bypassSecurityTrustResourceUrl(this.icons[key])
      )
    })
  }
}
