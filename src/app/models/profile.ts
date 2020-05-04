import {Position} from './interfaces';
import {Status} from './enums';
import {User} from './user';

export class Profile extends User {
    // tslint:disable:variable-name
    private _firstName: string;
    private _lastName: string;
    private _phoneNumber: string;
    private _professionId: number;
    private _isActive: boolean;
    // '_position' arrives from database as a 'string'
    // then it will be a 'Position' object
    private _position: Position | string;
    private _status: Status | null;
    private _availableFrom: Date; // ?
    private _user: User;
    private _profileImg: string;


    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    get professionId(): number {
        return this._professionId;
    }

    set professionId(value: number) {
        this._professionId = value;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }

    get position(): Position | string {
        return this._position;
    }

    set position(value: Position | string) {
        this._position = value;
    }

    get status(): Status | null {
        return this._status;
    }

    set status(value: Status | null) {
        this._status = value;
    }

    get availableFrom(): Date {
        return this._availableFrom;
    }

    set availableFrom(value: Date) {
        this._availableFrom = value;
    }

    get profileImg(): string {
        return this._profileImg;
    }

    set profileImg(value: string) {
        this._profileImg = value;
    }

    constructor() {
        super();
    }
    public get user(): User {
        return this._user;
    }

    public set user(user: User) {
        this._user = user;
    }
}
