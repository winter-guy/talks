import { ConsentComponent } from '@component/consent/consent.component';
import { ConsentDialogData } from '../interfaces/consent';
import { DialogConsentService } from '../services/dialog-consent.service';

const defaultConfirmData = {
    message: 'Confirmation',
    description: 'Are you sure you want to perform this action?',
    label: 'confirm'
};

export function needConfirmation(confirmData: ConsentDialogData = defaultConfirmData) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        target;
        propertyKey;
        
        const originalMethod = descriptor.value;

        // Annotate the type of 'this' explicitly
        descriptor.value = async function(this: any, ...args: any[]): Promise<void> {
            const isValidated = await DialogConsentService.getInstance()
                ?.openDialog(confirmData, ConsentComponent)
                .toPromise();

            if (isValidated) {
                // Ensure 'this' is not being shadowed by another variable
                await originalMethod.apply(this, args);
            }
        };

        return descriptor;
    };
}

