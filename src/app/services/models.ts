export interface Student {
    fullName: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    skillsCount: number;
    certificateCount: number;
    notificationCount?: number;
}

export interface Certificates{
    title: string;
    grade: string;
}

export interface Skills{
    title: string;
    grade: string;
}

export interface Course{
   title: string;
   caption: string;
   docId?:string;
   uid?: string;
   grade?: number;
   size?: number;
   intro?; string;
}

export interface Notifcations{
    author: string;
    title: string;
    message: string;
    status: string;
    read: boolean;
    timestamp: number;
}