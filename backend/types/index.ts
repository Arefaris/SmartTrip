export type Plan = {
    location: string,
    days: number,
    interests: string[],
    budget: string,
    traveler_type: string
}

export type User = {
    userid: string,
    email: string,
}

//Extending express request type to include user property
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}