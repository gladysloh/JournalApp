const Sentiment = require("sentiment");
const natural = require("natural");
const aposToLexForm = require("apos-to-lex-form");
const SpellCorrector = require("spelling-corrector");
const SW = require("stopword");
const vader = require("vader-sentiment");

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

// WIP
function preprocess(string) {
  string = string + ".";
  const {WordTokenizer, SentenceTokenizer} = natural;
  const lexedJounral = aposToLexForm(string);
  const lowerJournal = lexedJounral.toLowerCase();

  sentTokenizer = new SentenceTokenizer();
  const sentences = sentTokenizer.tokenize(lowerJournal);
  const tokenizer = new WordTokenizer();
  // console.log(sentences)
  sentences.forEach((sentence, index) => {
    const alphaOnlySentence = sentence.replace(/[^a-zA-Z\s]+/g, "");
    const tokenizedSentence = tokenizer.tokenize(alphaOnlySentence);
    const filteredSentence = SW.removeStopwords(tokenizedSentence);
    const joinedSentence = filteredSentence.join(" ");
    sentences[index] = joinedSentence;
  });
  joinedList = sentences.join(". ");

  return joinedList;


  // return res.status(200).json({ tokenized: filteredJournal })
}

module.exports = preprocess;
