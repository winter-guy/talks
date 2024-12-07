import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ComponentFactoryResolver, ElementRef, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConsentComponent } from '@component/consent/consent.component';
import { CorenavComponent } from '@component/corenav/corenav.component';

import { Subject, Observable, takeUntil } from 'rxjs';

import { needConfirmation } from '@consent';
import { ThemeService, AppTheme } from '@theme';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuModule, HlmButtonModule],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  public currentTheme!: AppTheme | null;
  private readonly _destroy$ = new Subject();

  $navbarState!: Observable<boolean>;

  constructor(
      public router: Router,
      public themeService: ThemeService,
      // public auth: AuthService,
      @Inject(DOCUMENT) private _doc: Document,

      private _componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit(): void {
      this.themeService.currentTheme$
          .pipe(takeUntil(this._destroy$))
          .subscribe((theme) => (this.currentTheme = theme));

      this.$navbarState = this.themeService.navState;
  }

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  dynamicComponentRef: unknown;
  public toggleDynamicComponent(): void {
      if (this.dynamicComponentRef) {
          // If dynamic component is already added, remove it
          this.dynamicComponentContainer.clear();
          this.dynamicComponentRef = null;
      } else {
          // Create an instance of the dynamic component
          const componentFactory = this._componentFactoryResolver.resolveComponentFactory(CorenavComponent);
          this.dynamicComponentRef = this.dynamicComponentContainer.createComponent(componentFactory);

          // You can pass inputs to the component
          // this.dynamicComponentRef.instance.inputProperty = value;
      }
  }

  ngOnDestroy(): void {
      this._destroy$.complete();
      this._destroy$.unsubscribe();
  }

  public handleThemeChange(): void {
      const themes = ['light', 'dark'];
      const currentIndex = themes.indexOf(this.themeService.currentTheme ?? 'light');
      this.themeService.setTheme(themes[(currentIndex + 1) % themes.length] as AppTheme);
  }

  public onBtnActionClicked(id?: string): void {
      const NAV_URL = '/compose';
      this.router.navigate([NAV_URL], { queryParams: { page: id } });
  }

  public loginWithRedirect(): void {
      // this.auth.loginWithRedirect();
  }

  @needConfirmation<ConsentComponent>({
    message: `Are you sure you want to log out?`,
    description: `Logging out will terminate your current session and require you to 
                    sign in again to access your account and modify artifacts. `,
    label: 'sign out',
    disableCloseBtn: true,
  }, ConsentComponent)
  public logout(): void {
      // this.auth.logout({ logoutParams: { returnTo: this._doc.location.origin } });
  }

  @ViewChild('imageContainer') imageContainer!: ElementRef;

    addCSS() {
        if (this.imageContainer) {
            const parentDiv = this.imageContainer.nativeElement as HTMLDivElement;
            parentDiv.classList.add('-space-x-1');
            parentDiv.classList.remove('space-x-2');

            // const images = parentDiv.getElementsByTagName('img') as [HTMLImageElement];

            // Array.from(images).forEach((img: HTMLImageElement) => {
            //     img.classList.add('image-style');  // Add the class to each image
            // });
        }
    }


    removeCSS() {
        if (this.imageContainer) {
            const parentDiv = this.imageContainer.nativeElement as HTMLDivElement;
            parentDiv.classList.remove('-space-x-1');
            parentDiv.classList.add('space-x-2');
        }
    }

    checkIfItHasClass() {
        const parentDiv = this.imageContainer.nativeElement as HTMLDivElement;
        if(parentDiv.classList.contains('-space-x-1')) {
            this.removeCSS();
            return;
        }

        this.addCSS();
    }
}
