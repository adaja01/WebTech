export class Team {
    #title;
    #country;
    #city;

    constructor(title, country, city){
        this.title = title;
        this.country = country;
        this.city = city;
    }

    get title(){
        return this.#title;
    }
    get country(){
        return this.#country;
    }
    get city(){
        return this.#city;
    }

    set title(value){
        if(typeof value !== 'string' || value.trim() === "")
            throw new Error("Invalid title, must be a non empty string.");
        this.#title = value;
    }
    set country(value){
        if(typeof value !== 'string')
            throw new Error("Invalid country, must be a string");
        else if (value.trim() === "")
            this.#country = "International";
        else
            this.#country = value;
    }

    set city(value){
        if(value && typeof value !== 'string')
            throw new Error("Invalid city, must be a string.");
        else if (value && value.trim() === "")
            this.#city = "N/A";
        else if (value)
            this.#city = value;
        else
            this.#city = "N/A";
    }
}