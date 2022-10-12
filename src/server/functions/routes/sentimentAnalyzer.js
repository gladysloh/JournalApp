const Sentiment = require('sentiment')
const natural = require('natural')
const aposToLexForm = require('apos-to-lex-form')
const SpellCorrector = require('spelling-corrector')
const SW = require('stopword')
const vader = require('vader-sentiment')
const preprocess = require('./preprocessText')

const spellCorrector = new SpellCorrector()
spellCorrector.loadDictionary()

//WIP
function sentimentAnalyzer(req,res){
    if (!req.body.journal){
        return res.status(400).json({
            success: false,
            message: 'please send a journal as journal not as body'
        })
    }
    joinedList = preprocess(req.body.journal)
    var result = vader.SentimentIntensityAnalyzer.polarity_scores(joinedList)
    return res.json(result)
    
    


    //return res.status(200).json({ tokenized: filteredJournal })
}

module.exports = sentimentAnalyzer