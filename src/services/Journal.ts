import axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
})

async function questionPrompt() {
    const response = await instance.get('/getrandomquestion')
    return response.data
}

async function getSentiment(journalBody: any) {
    const response = await instance.post('/sentimentanalyzer', {journal: journalBody})
    return response.data
}

async function editJournal(editJournalBody: any){
    const response = await instance.post('/editjournal', editJournalBody)
    return response.data

}

async function createJournal(newJournalBody: any){
    const response = await instance.post('/createjournal', newJournalBody)
    return response.data

}

export { questionPrompt, getSentiment, editJournal, createJournal }