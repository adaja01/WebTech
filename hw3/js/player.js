import { Person } from "./person.js";
import { Team } from "./team.js";

export class Player extends Person{
    #role;
    #number;
    #photo;
    #formerTeams;

    constructor(firstName, lastName, born, nationality, role, number, photo, formerTeams){
        super(firstName, lastName, born, nationality);
        this.role = role;
        this.number = number;
        this.photo = photo;
        this.formerTeams = formerTeams;
    }

    get role(){
        return this.#role;
    }
    get number(){
        return this.#number;
    }
    get photo(){
        return this.#photo;
    }
    get formerTeams(){
        return this.#formerTeams;
    }

    set role(value){
        if(typeof value !== "string" || value.trim() === "")
            {throw new Error("Invalid role, must be a non empty string.");}
        this.#role = value;
    }
    set number(value){
        if(value === null)
            {this.#number = null;}
        else if(typeof value !== "number" || value < 0)
            {throw new Error("Invalid number, must be a number and positive.");}
        else 
            {this.#number = value;}
    }
    set photo(value){
        if (value === null)
            {this.#photo = "assets/images/anonymous.png";}
        else if (typeof value !== "string" || value.trim() === "")
            {throw new Error("Invalid photo, photo must be a file path or url with string type.");}
        else
            {this.#photo = value;}
    }
    set formerTeams(value){
        if(!Array.isArray(value))
            {this.#formerTeams = [];}
        else{
            this.#formerTeams = value.map(item => {
                if (item instanceof Team)
                    {return item;}
                return new Team(item.title, item.country, item.city);
            });
        }
    }
}