const vader = require('vader-sentiment')
const natural = require('natural')
const aposToLexForm = require('apos-to-lex-form')
const SpellCorrector = require('spelling-corrector')
const SW = require('stopword')

const spellCorrector = new SpellCorrector()
spellCorrector.loadDictionary()

//WIP
function sentimentAnalyzer(req,res){
    var raw = req.body.journal
    const lexedJounral = aposToLexForm(raw)
    const lowerJournal = lexedJounral.toLowerCase()

    const alphaOnlyJournal = lowerJournal.replace(/[^a-zA-Z\s]+/g, '')
    return res.status(200).json({ alphaOnlyJournal })

    const { WordTokenizer } = natural
    const tokenizer = new WordTokenizer()
    const tokenizedReview = tokenizer.tokenize(alphaOnlyJournal)

    // tokenizedReview.forEach((word, index) => {
    //     tokenizedReview[index] = spellCorrector.correct(word)
    // })

    const filteredJournal = SW.removeStopwords(tokenizedReview)
    //return res.status(200).json({ tokenized: filteredJournal })
}

module.exports = sentimentAnalyzer