export class Person{
    #firstName;
    #lastName;
    #born;
    #nationality;

    constructor(firstName, lastName, born, nationality){
        this.firstName = firstName;
        this.lastName = lastName;
        this.born = born;
        this.nationality = nationality;
    }

    get firstName(){
        return this.#firstName;
    }
    get lastName(){
        return this.#lastName;
    }
    get born(){
        return this.#born;
    }
    get nationality(){
        return this.#nationality;
    }

    set firstName(value){
        if (typeof value !== 'string' || value.trim() === "")
            throw new Error("Invalid first name, must be a non empty string.");
        this.#firstName = value;
    }
    set lastName(value){
        if (typeof value !== 'string' || value.trim() === "")
            throw new Error("Invalid last name must be a non empty string.");
        this.#lastName = value;
    }
    set born(value){
        if(value === null || value === undefined)
            this.#born = "unknown";
        else{
            const date = new Date(value);
            if(isNaN(date.getTime()))
                this.#born = "unknown";
            else 
                this.#born = date;
        }
    }
    set nationality(value){
        if(typeof value !== 'string' || value.trim() === "")
            throw new Error("Invalid nationality, must be a non empty string.");
        this.#nationality = value;
    }
}