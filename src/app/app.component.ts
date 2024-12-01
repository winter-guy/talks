import { Component } from '@angular/core';
import { HlmAccordionDirective, HlmAccordionItemDirective, HlmAccordionTriggerDirective, HlmAccordionContentComponent, HlmAccordionIconDirective } from '@spartan-ng/ui-accordion-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HlmAccordionDirective,
		HlmAccordionItemDirective,
		HlmAccordionTriggerDirective,
		HlmAccordionContentComponent,
		HlmAccordionIconDirective,
		HlmIconComponent,
  ],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'talks';
}
