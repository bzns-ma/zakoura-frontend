export interface Artisan {
    _id: string;
    first_name: string;
    last_name: string;
    description:string;
    membership : boolean;
    title: string;
    photo? : string;
    website? : string;
    facebook?: string;
}