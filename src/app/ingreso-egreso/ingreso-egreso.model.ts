export class IngresoEgresoModel {
    description: string;
    price: number;
    type: string;
    uid?: string;

    constructor(ingresoEgreso: IngresoEgresoInterface) {
        this.description = ingresoEgreso && ingresoEgreso.description || null;
        this.price = ingresoEgreso && ingresoEgreso.price || null;
        this.type = ingresoEgreso && ingresoEgreso.type || null;
        // this.uid = ingresoEgreso && ingresoEgreso.uid || null;
    }
}

interface IngresoEgresoInterface {
    description: string;
    price: number;
    type: string;
    uid?: string;
}
