
export class City {
    constructor(name: string) {
        this.name = name;
    }

    id: number;
    name: string;
    wilaya: string;
    commune?: string;
    address?: string;
}
