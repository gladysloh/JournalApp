const Sentiment = require('sentiment')
const natural = require('natural')
const aposToLexForm = require('apos-to-lex-form')
const SpellCorrector = require('spelling-corrector')
const SW = require('stopword')
const vader = require('vader-sentiment')

const spellCorrector = new SpellCorrector()
spellCorrector.loadDictionary()

//WIP
function preprocess(string){
    string = string + '.'
    const { WordTokenizer, SentenceTokenizer } = natural
    const lexedJounral = aposToLexForm(string)
    const lowerJournal = lexedJounral.toLowerCase()
  
    sentTokenizer = new SentenceTokenizer()
    var sentences = sentTokenizer.tokenize(lowerJournal)
    const tokenizer = new WordTokenizer()
    //console.log(sentences)
    sentences.forEach((sentence, index) => {
        var alphaOnlySentence = sentence.replace(/[^a-zA-Z\s]+/g, '')
        var tokenizedSentence = tokenizer.tokenize(alphaOnlySentence)
        var filteredSentence = SW.removeStopwords(tokenizedSentence)
        var joinedSentence = filteredSentence.join(' ')
        sentences[index] = joinedSentence
    })
    joinedList = sentences.join('. ')
    
    return joinedList
    
    


    //return res.status(200).json({ tokenized: filteredJournal })
}

module.exports = preprocess