import axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
})

async function getAllJournals(body: any){
    const response = await instance.post('/journal/getalljournals', body)
    console.log(response)
    return { journals: response.data.journals, status: response.status}
}

async function getSingleDateJournal(body: any){
    const response = await instance.post('/journal/getonejournalbydate', body)
    return response.data
}


async function getJournal(journalId: any){
    const response = await instance.post('/journal/getonejournalbyid', {journalid: journalId})
    return response.data
}

async function questionPrompt() {
    const response = await instance.get('/journal/randomq')
    return response.data
}

async function getSentiment(journalBody: any) {
    const response = await instance.post('/sentiment/sentimentanalyzer', {journal: journalBody})
    return response.data
}

async function editJournal(editJournalBody: any){
    const response = await instance.post('/journal/editjournal', editJournalBody)
    return response.data

}

async function createJournal(newJournalBody: any){
    const response = await instance.post('/journal/createjournal', newJournalBody)
    return response.data

}

async function deleteJournal(journalId: any){
    const response = await instance.post('/journal/removejournal', { journalid: journalId })
    return response.data
}

export { questionPrompt, getSentiment, editJournal, createJournal, getAllJournals, getJournal, deleteJournal, getSingleDateJournal }