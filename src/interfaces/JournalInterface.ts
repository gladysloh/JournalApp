import { Timestamp } from "@google-cloud/firestore";

export interface UserJournal {
    title: string,
    body: string,
    sentiment: number,
    url?: string,
    filename?: string,
    createdTimestamp: {
        _seconds: number
    }
    editTimestamp?:{
        _seconds: number
    }
}

export interface CreateJournalEntry {
    title: string, 
    journal: string,
    image?: any, 
    sentiment: number
}

export interface EditJournalEntry {
    journalid: string, 
    newbody: string,
    newtitle: string, 
    sentiment: number,
    filename?: string, 
    newimage?:any
}