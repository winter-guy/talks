import { ComponentType } from "@angular/cdk/portal";
import { DialogConsentService } from "./consent.service";
import { ConsentDialogData } from "./consent";


const defaultConfirmData = {
    message: 'Confirmation',
    description: 'Are you sure you want to perform this action?',
    label: 'confirm'
};

export function needConfirmation<T>(confirmData: ConsentDialogData = defaultConfirmData, component: ComponentType<T>) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        target;
        propertyKey;
        
        const originalMethod = descriptor.value;

        // Annotate the type of 'this' explicitly
        descriptor.value = async function(this: any, ...args: any[]): Promise<void> {
            const isValidated = await DialogConsentService.getInstance()
                ?.openDialog(confirmData, component)
                .toPromise();

            if (isValidated) {
                // Ensure 'this' is not being shadowed by another variable
                await originalMethod.apply(this, args);
            }
        };

        return descriptor;
    };
}

