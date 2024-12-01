import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ComponentFactoryResolver, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '@component/footer/footer.component';
import { Subject, Observable, takeUntil } from 'rxjs';
import { needConfirmation } from 'src/app/directives/dialog.directive';
import { AppTheme, ThemeService } from 'src/app/services/theme';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuModule,],
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
          const componentFactory = this._componentFactoryResolver.resolveComponentFactory(FooterComponent);
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

  @needConfirmation({
      message: `Are you sure you want to log out?`,
      description: `Logging out will terminate your current session and require you to 
                      sign in again to access your account and modify artifacts. `,
      label: 'sign out',
      disableCloseBtn: true,
  })
  public logout(): void {
      // this.auth.logout({ logoutParams: { returnTo: this._doc.location.origin } });
  }
}
