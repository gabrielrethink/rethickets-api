
type UserType = {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

type UserEditType = {
    id: string | number;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

type EventType = {
    name: string;
    resume: string;
    description: string;
    type: string;
    category: string;
    eventImageSmall: string;
    eventImageBig: string;
    localization: string;
    eventDate: string;
}

type EventEditType = {
    id: string | number;
    name?: string;
    resume?: string;
    description?: string;
    type?: string;
    category?: string;
    eventImageSmall?: string;
    eventImageBig?: string;
    localization?: string;
    eventDate?: string;
}