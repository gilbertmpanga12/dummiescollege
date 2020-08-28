export interface Student {
    fullName: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    skillsCount: number;
    certificateCount: number;
}

export interface Certificates{
    title: string;
    grade: string;
}

export interface Skills{
    title: string;
    grade: string;
}