export class ValidationRegexes {
    static email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    static phoneNumber = /^[0-9]{10,12}$/;
    static taxId = /^[0-9][A-z]{10,12}$/;
    static website = /^(http|https):\/\/[^ "]+$/;
    static name = /^[a-zA-Z ]{2,}$/;
}