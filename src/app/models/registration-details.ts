export class RegistrationDetails {
    // tslint:disable:variable-name
    private _username: string; // email
    private _password: string;
    private _confirmationPassword: string;
    private _role: number;

    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username.trim().replace(/\s+/g, '');
    }

    public get role(): number {
        return this._role;
    }

    public set role(role: number) {
        this._role = role;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password.trim().replace(/\s+/g, '');
    }

    public get confirmationPassword(): string {
        return this._confirmationPassword;
    }

    public set confirmationPassword(confirmationPassword: string) {
        this._confirmationPassword = confirmationPassword.trim().replace(/\s+/g, '');
    }
}
