import { NextRequest, NextResponse } from 'next/server';

/**
 * Post-processing functions to make text more human-like and bypass AI detection
 */

// Seeded random number generator for consistent but varied results
class SeededRandom {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    choice<T>(array: T[]): T {
        return array[this.nextInt(0, array.length - 1)];
    }

    shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = this.nextInt(0, i);
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Global random instance that will be reset for each request
let globalRandom: SeededRandom = new SeededRandom(Date.now());

// ============================================================================
// AGGRESSIVE AI DETECTION BYPASS FUNCTIONS
// ============================================================================

// Add conversational elements and personal voice
// Add conversational elements and personal voice
function addConversationalTone(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // PROTECT INTRODUCTION - Skip first paragraph entirely
        if (paragraphIndex === 0) return paragraph;

        let sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        sentences = sentences.map((sentence, sentIndex) => {
            // Add professional academic starters (REDUCED for more formality)
            if (globalRandom.next() < 0.08 && sentence.length > 50) { // Reduced from 0.15 to 0.08
                const conversationalStarters = [
                    "Research suggests that ",
                    "Studies indicate that ",
                    "Evidence shows that ",
                ];
                const starter = globalRandom.choice(conversationalStarters);
                sentence = starter + sentence.charAt(0).toLowerCase() + sentence.slice(1);
            }

            // NO casual transitions - keep it professional

            return sentence;
        });

        return sentences.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Add incomplete thoughts and self-corrections (very human) - SKIP FIRST PARAGRAPH
function addIncompleteThoughts(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // PROTECT INTRODUCTION - Skip first paragraph
        if (paragraphIndex === 0) return paragraph;

        const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        const modified = sentences.map(sentence => {
            // Add self-corrections (REDUCED for professionalism)
            if (globalRandom.next() < 0.06 && sentence.length > 50) { // Reduced from 0.15 to 0.06
                const words = sentence.split(' ');
                const insertPoint = globalRandom.nextInt(Math.floor(words.length / 3), Math.floor(words.length * 2 / 3));

                const corrections = [
                    "—that is to say, ",
                    "—or rather, ",
                ];

                const correction = globalRandom.choice(corrections);
                words.splice(insertPoint, 0, correction);
                sentence = words.join(' ');
            }

            // NO trailing thoughts - removed for professionalism

            return sentence;
        });

        return modified.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Break up overly perfect sentence structures - SKIP FIRST PARAGRAPH
function breakPerfectStructures(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // PROTECT INTRODUCTION - Skip first paragraph
        if (paragraphIndex === 0) return paragraph;

        const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        const modified = sentences.map(sentence => {
            // Randomly split long sentences with dashes or semicolons (REDUCED)
            if (sentence.length > 80 && globalRandom.next() < 0.20) { // Reduced from 0.35 to 0.20
                const words = sentence.split(' ');
                const splitPoint = globalRandom.nextInt(Math.floor(words.length / 2) - 2, Math.floor(words.length / 2) + 2);

                if (splitPoint > 0 && splitPoint < words.length - 1) {
                    const firstPart = words.slice(0, splitPoint).join(' ');
                    const secondPart = words.slice(splitPoint).join(' ');

                    if (globalRandom.next() < 0.5) {
                        return `${firstPart}—${secondPart}`;
                    } else {
                        return `${firstPart}; ${secondPart.charAt(0).toLowerCase()}${secondPart.slice(1)}`;
                    }
                }
            }

            // NO parenthetical asides - removed for professionalism

            return sentence;
        });

        return modified.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Add more contractions (humans use these constantly)
function addMoreContractions(text: string): string {
    let modified = text;

    // Moderate contraction replacement (reduced for professionalism)
    const contractions = [
        { full: /\bit is\b/gi, short: "it's" },
        { full: /\bthat is\b/gi, short: "that's" },
        { full: /\bwhat is\b/gi, short: "what's" },
        { full: /\bwho is\b/gi, short: "who's" },
        { full: /\bthere is\b/gi, short: "there's" },
        { full: /\bhere is\b/gi, short: "here's" },
        { full: /\bhe is\b/gi, short: "he's" },
        { full: /\bshe is\b/gi, short: "she's" },
        { full: /\bwe are\b/gi, short: "we're" },
        { full: /\bthey are\b/gi, short: "they're" },
        { full: /\byou are\b/gi, short: "you're" },
        { full: /\bI am\b/gi, short: "I'm" },
        { full: /\bdo not\b/gi, short: "don't" },
        { full: /\bdoes not\b/gi, short: "doesn't" },
        { full: /\bdid not\b/gi, short: "didn't" },
        { full: /\bwill not\b/gi, short: "won't" },
        { full: /\bwould not\b/gi, short: "wouldn't" },
        { full: /\bcould not\b/gi, short: "couldn't" },
        { full: /\bshould not\b/gi, short: "shouldn't" },
        { full: /\bcannot\b/gi, short: "can't" },
        { full: /\bhave not\b/gi, short: "haven't" },
        { full: /\bhas not\b/gi, short: "hasn't" },
        { full: /\bhad not\b/gi, short: "hadn't" },
        { full: /\bwas not\b/gi, short: "wasn't" },
        { full: /\bwere not\b/gi, short: "weren't" },
        { full: /\bis not\b/gi, short: "isn't" },
        { full: /\bare not\b/gi, short: "aren't" },
    ];

    contractions.forEach(({ full, short }) => {
        // Apply contractions with 40% probability (reduced from 60%)
        modified = modified.replace(full, (match) => {
            return globalRandom.next() < 0.40 ? short : match;
        });
    });

    return modified;
}

// Vary sentence beginnings aggressively (AI often starts sentences similarly)
function varySentenceBeginnings(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    // Track sentence beginnings to avoid repetition
    const beginnings: string[] = [];

    const modified = sentences.map((sentence, index) => {
        const firstWord = sentence.split(' ')[0].toLowerCase();

        // If we've used this beginning recently, change it
        if (beginnings.slice(-3).includes(firstWord) && globalRandom.next() < 0.7) {
            const alternatives = [
                "Additionally, ",
                "Also, ",
                "Plus, ",
                "Furthermore, ",
                "What's more, ",
                "On top of that, ",
                "Besides, ",
                "Moreover, ",
            ];

            const alt = globalRandom.choice(alternatives);
            sentence = alt + sentence.charAt(0).toLowerCase() + sentence.slice(1);
        }

        beginnings.push(firstWord);
        return sentence;
    });

    return modified.join(' ');
}

// Add natural redundancy and repetition (humans do this)
// Add natural redundancy and repetition (humans do this) - SKIP FIRST PARAGRAPH
function addNaturalRedundancy(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // PROTECT INTRODUCTION - Skip first paragraph
        if (paragraphIndex === 0) return paragraph;

        const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        const modified = sentences.map(sentence => {
            if (globalRandom.next() < 0.08 && sentence.length > 50) { // Reduced from 0.15 to 0.08
                const redundantPhrases = [
                    "generally ",
                    "typically ",
                    "often ",
                ];

                const phrase = globalRandom.choice(redundantPhrases);
                const words = sentence.split(' ');
                const insertPoint = globalRandom.nextInt(2, Math.min(6, words.length - 2));
                words.splice(insertPoint, 0, phrase);
                sentence = words.join(' ');
            }

            return sentence;
        });

        return modified.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Vary word count in sentences for more natural flow
function varyWordCountInSentences(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        const modified = sentences.map((sentence, sentenceIndex) => {
            const words = sentence.split(' ');
            const wordCount = words.length;

            // Vary word count based on current length
            if (globalRandom.next() < 0.4) {
                // Add words to short sentences
                if (wordCount < 10) {
                    // For the first sentence of the first paragraph (introduction), use appropriate phrases
                    const expansionPhrases = (paragraphIndex === 0 && sentenceIndex === 0)
                        ? globalRandom.shuffle([
                            'notably,',
                            'importantly,',
                            'significantly,',
                        ])
                        : globalRandom.shuffle([
                            'in fact,',
                            'notably,',
                            'it should be noted,',
                            'indeed,',
                            'as it turns out,',
                            'interestingly,',
                            'importantly,',
                            'one might argue,',
                        ]);

                    if (globalRandom.next() < 0.6) {
                        const phrase = globalRandom.choice(expansionPhrases);
                        sentence = `${phrase} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
                    }
                }
                // Reduce words in long sentences
                else if (wordCount > 20) {
                    // Try to find and remove redundant phrases
                    const redundantPhrases = [
                        /it is (important|worth) noting that\s+/gi,
                        /the fact of the matter is that\s+/gi,
                        /it should be noted that\s+/gi,
                        /in a manner of speaking,?\s+/gi,
                        /to put it simply,?\s+/gi,
                        /so to speak,?\s+/gi,
                    ];

                    for (const pattern of redundantPhrases) {
                        if (globalRandom.next() < 0.5 && pattern.test(sentence)) {
                            sentence = sentence.replace(pattern, '');
                            break;
                        }
                    }
                }
                // Add variety to medium sentences
                else if (wordCount >= 10 && wordCount <= 20) {
                    // Occasionally add qualifier phrases
                    if (globalRandom.next() < 0.3) {
                        const qualifiers = globalRandom.shuffle([
                            'clearly,',
                            'evidently,',
                            'obviously,',
                            'certainly,',
                            'undoubtedly,',
                            'surely,',
                        ]);

                        const insertIndex = globalRandom.nextInt(2, Math.min(5, words.length - 1));
                        words.splice(insertIndex, 0, globalRandom.choice(qualifiers));
                        sentence = words.join(' ');
                    }
                }
            }

            return sentence;
        });

        return modified.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Add subtle typos and corrections (strikethrough effect in markdown)
function addNaturalImperfections(text: string): string {
    const sentences = text.split('. ');
    const modifiedSentences = sentences.map((sentence) => {
        // Randomly add natural hesitations or corrections (3% chance - reduced for professionalism)
        if (globalRandom.next() < 0.03 && sentence.length > 20) {
            const words = sentence.split(' ');
            const randomIndex = globalRandom.nextInt(1, words.length - 2);
            // Add a professional correction pattern
            words[randomIndex] = `${words[randomIndex]}—or rather, ${words[randomIndex]}`;
        }
        return sentence;
    });
    return modifiedSentences.join('. ');
}

// Introduce varied punctuation patterns
function varyPunctuation(text: string): string {
    let modified = text;

    // Replace some periods with em dashes for emphasis (reduced frequency)
    const sentences = modified.split('. ');
    if (sentences.length > 4) {
        const randomIndex = globalRandom.nextInt(0, sentences.length - 1);
        if (globalRandom.next() < 0.2) { // Only 20% chance
            sentences[randomIndex] = sentences[randomIndex] + '—';
            modified = sentences.join('. ');
        }
    }

    // Add occasional semicolons for professional flow
    modified = modified.replace(/\. (However|Nevertheless|Moreover|Furthermore),/g, (match) => {
        return globalRandom.next() < 0.3 ? `; ${match.slice(2)}` : match;
    });

    return modified;
}

// Add natural filler words and phrases
function addFillerWords(text: string): string {
    const fillers = globalRandom.shuffle([
        'notably',
        'importantly',
        'it should be noted',
        'in particular',
        'specifically',
        'essentially',
        'fundamentally',
        'primarily',
        'generally speaking',
        'in practice',
        'arguably',
        'undoubtedly',
        'certainly',
        'admittedly',
        'frankly',
        'honestly',
        'needless to say',
        'it goes without saying',
        'for the most part',
        'in essence',
        'by and large',
        'to be sure',
        'at any rate',
        'all things considered',
        'so to speak',
        'in a sense',
        'more or less',
        'if you will',
        'as it were',
        'to put it simply',
        'to put it another way',
        'without question',
        'without doubt',
        'to some extent',
        'in a manner of speaking',
        'after all',
        'in any event',
        'in fact',
        'as a matter of fact',
        'it is clear that',
        'it is evident that',
        'suffice it to say',
        'let us consider',
        'one might argue',
        'it is worth noting',
        'the fact of the matter is',
        'as one can see',
        'plainly',
        'obviously',
        'clearly',
        'evidently'
    ]);

    const sentences = text.split('. ');
    const modifiedSentences = sentences.map((sentence) => {
        // Add filler words to some sentences (15% chance)
        if (globalRandom.next() < 0.15 && sentence.length > 30) {
            const filler = globalRandom.choice(fillers);
            // Insert at the beginning or after first comma
            if (sentence.includes(',')) {
                sentence = sentence.replace(',', `, ${filler},`);
            } else {
                sentence = `${filler.charAt(0).toUpperCase() + filler.slice(1)}, ${sentence}`;
            }
        }
        return sentence;
    });

    return modifiedSentences.join('. ');
}

// Introduce slight inconsistencies in formatting
function addFormattingVariations(text: string): string {
    let modified = text;

    // Vary spacing around punctuation slightly
    modified = modified.replace(/\s+/g, ' '); // Normalize first

    // Add occasional double spaces (natural typing error)
    const words = modified.split(' ');
    if (words.length > 20) {
        const numDoubleSpaces = globalRandom.nextInt(0, Math.floor(words.length / 30));
        const randomIndices = Array.from(
            { length: numDoubleSpaces },
            () => globalRandom.nextInt(0, words.length - 1)
        );
        randomIndices.forEach(index => {
            if (index < words.length - 1) {
                words[index] = words[index] + ' '; // Double space
            }
        });
        modified = words.join(' ');
    }

    return modified;
}

// Add personal touches and informal expressions
function addPersonalTouches(text: string): string {
    const personalPhrases = globalRandom.shuffle([
        { formal: 'It is important to note', informal: "It's worth noting" },
        { formal: 'Furthermore', informal: 'Moreover' },
        { formal: 'In conclusion', informal: 'Ultimately' },
        { formal: 'Therefore', informal: 'Thus' },
        { formal: 'Additionally', informal: 'Also' },
        { formal: 'However', informal: 'Yet' },
        { formal: 'Nevertheless', informal: 'Still' },
        { formal: 'Subsequently', informal: 'Later' },
    ]);

    let modified = text;
    personalPhrases.forEach(({ formal, informal }) => {
        if (globalRandom.next() < 0.4) {
            modified = modified.replace(new RegExp(formal, 'g'), informal);
        }
    });

    return modified;
}

// Introduce natural sentence rhythm variations
function varyRhythm(text: string): string {
    const sentences = text.split('. ');
    const modifiedSentences = sentences.map((sentence) => {
        // Occasionally break long sentences into shorter ones
        if (sentence.length > 100 && sentence.includes(' and ')) {
            const parts = sentence.split(' and ');
            if (parts.length === 2 && globalRandom.next() < 0.4) {
                return `${parts[0]}. Additionally, ${parts[1]}`;
            }
        }
        return sentence;
    });

    return modifiedSentences.join('. ');
}

// Add contextual interjections (but avoid first paragraph to preserve introduction)
function addInterjections(text: string): string {
    const interjections = globalRandom.shuffle(['Indeed', 'Notably', 'Interestingly', 'Clearly', 'Evidently']);
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    // Process each paragraph separately
    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // Skip the first paragraph (introduction) to avoid modifying it
        if (paragraphIndex === 0) {
            return paragraph;
        }

        const sentences = paragraph.split('. ');

        if (sentences.length > 2 && globalRandom.next() < 0.3) {
            const randomIndex = globalRandom.nextInt(0, sentences.length - 1);
            const interjection = globalRandom.choice(interjections);
            sentences[randomIndex] = `${interjection}, ${sentences[randomIndex].toLowerCase()}`;
        }

        return sentences.join('. ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Completely rewrite the first paragraph with a different approach
// Keep first paragraph clear and topic-focused (minimal changes for clarity)
function rewriteFirstParagraph(text: string): string {
    // Split text into paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    if (paragraphs.length === 0) return text;

    const firstParagraph = paragraphs[0];

    // KEEP INTRODUCTION MOSTLY UNCHANGED FOR CLARITY
    // Only apply minimal, safe transformations

    // Avoid starting with contrasting/conditional words
    const avoidWords = ['Although', 'Though', 'While', 'Whereas', 'Despite', 'However', 'Nevertheless', 'Yet'];

    // Check if it starts with a bad word and fix it
    let cleanedParagraph = firstParagraph;
    avoidWords.forEach(word => {
        const pattern = new RegExp(`^${word}\\s+`, 'i');
        if (pattern.test(cleanedParagraph)) {
            // Remove the contrasting word
            cleanedParagraph = cleanedParagraph.replace(pattern, '');
            // Capitalize first letter
            cleanedParagraph = cleanedParagraph.charAt(0).toUpperCase() + cleanedParagraph.slice(1);
        }
    });

    // That's it! Keep the introduction clear and simple
    // No rewriting, no restructuring, just ensure it's clean

    paragraphs[0] = cleanedParagraph;
    return paragraphs.join('\n\n');
}

// Completely rewrite the concluding paragraph with professional academic tone
function rewriteConcludingParagraph(text: string): string {
    // Split text into paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    // Need at least 2 paragraphs to have a conclusion
    if (paragraphs.length < 2) return text;

    const lastParagraph = paragraphs[paragraphs.length - 1];
    const sentences = lastParagraph.split('. ').filter(s => s.trim().length > 0);

    if (sentences.length === 0) return text;

    // Extract key points from the last paragraph to maintain context
    const hasMultipleSentences = sentences.length > 1;

    // Different concluding strategies - professional academic tone
    const concludingStrategies = globalRandom.shuffle([
        // Summary conclusion
        () => {
            const summaryStarters = globalRandom.shuffle([
                "In summary,",
                "To summarize,",
                "In summation,",
                "To recapitulate,",
                "In brief,"
            ]);
            const starter = globalRandom.choice(summaryStarters);
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Synthesis conclusion
        () => {
            const synthesisStarters = globalRandom.shuffle([
                "Ultimately,",
                "In the final analysis,",
                "Taking everything into account,",
                "All things considered,",
                "Upon reflection,"
            ]);
            const starter = globalRandom.choice(synthesisStarters);
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Implication conclusion
        () => {
            const implicationStarters = globalRandom.shuffle([
                "These findings suggest that",
                "This analysis demonstrates that",
                "The evidence indicates that",
                "This examination reveals that",
                "The research shows that"
            ]);
            const starter = globalRandom.choice(implicationStarters);
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Definitive conclusion
        () => {
            const definitiveStarters = globalRandom.shuffle([
                "In conclusion,",
                "To conclude,",
                "In closing,",
                "As a final point,",
                "Conclusively,"
            ]);
            const starter = globalRandom.choice(definitiveStarters);
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Forward-looking conclusion
        () => {
            const forwardStarters = globalRandom.shuffle([
                "Moving forward,",
                "Looking ahead,",
                "In future considerations,",
                "As we proceed,",
                "Going forward,"
            ]);
            const starter = globalRandom.choice(forwardStarters);
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Reflective conclusion
        () => {
            const reflectiveStarters = globalRandom.shuffle([
                "Upon careful consideration,",
                "After thorough examination,",
                "Having analyzed this matter,",
                "Following this investigation,",
                "Based on this analysis,"
            ]);
            const starter = globalRandom.choice(reflectiveStarters);
            return `${starter} ${sentences[0].toLowerCase()}`;
        }
    ]);

    // Choose a random strategy
    const strategy = globalRandom.choice(concludingStrategies);
    let rewrittenConclusion = strategy();

    // Add the rest of the sentences with professional concluding connectors
    if (hasMultipleSentences) {
        const restOfSentences = sentences.slice(1).map((sentence, index) => {
            // Add professional concluding connectors
            const connectors = globalRandom.shuffle([
                'Thus',
                'Therefore',
                'Consequently',
                'As a result',
                'Hence',
                'Accordingly'
            ]);
            if (index === 0 && globalRandom.next() < 0.4) {
                return `${globalRandom.choice(connectors)}, ${sentence.toLowerCase()}`;
            }
            return sentence;
        });
        rewrittenConclusion += '. ' + restOfSentences.join('. ');
    }

    // Add a professional closing statement if the conclusion seems short
    if (sentences.length === 1 && globalRandom.next() < 0.5) {
        const closingStatements = globalRandom.shuffle([
            "This understanding provides valuable insight into the subject matter.",
            "These considerations remain essential for comprehensive understanding.",
            "This perspective offers significant implications for further study.",
            "Such insights contribute meaningfully to the broader discourse.",
            "This analysis underscores the importance of continued examination."
        ]);
        const closing = globalRandom.choice(closingStatements);
        rewrittenConclusion += ` ${closing}`;
    }

    // Reconstruct the full text with rewritten conclusion
    paragraphs[paragraphs.length - 1] = rewrittenConclusion;
    return paragraphs.join('\n\n');
}

// Grammar and spelling correction function
function fixGrammarAndSpelling(text: string): string {
    let corrected = text;

    // Common grammar fixes
    const grammarRules = [
        // Fix double spaces
        { pattern: /\s{2,}/g, replacement: ' ' },

        // Fix spacing before punctuation
        { pattern: /\s+([.,;:!?])/g, replacement: '$1' },

        // Fix spacing after punctuation
        { pattern: /([.,;:!?])([A-Z])/g, replacement: '$1 $2' },

        // Fix capitalization after periods
        { pattern: /\.\s+([a-z])/g, replacement: (_match: string, letter: string) => `. ${letter.toUpperCase()}` },

        // Fix "i" to "I" when standalone
        { pattern: /\bi\b/g, replacement: 'I' },

        // Fix common contractions
        { pattern: /\bwont\b/gi, replacement: "won't" },
        { pattern: /\bcant\b/gi, replacement: "can't" },
        { pattern: /\bdont\b/gi, replacement: "don't" },
        { pattern: /\bdidnt\b/gi, replacement: "didn't" },
        { pattern: /\bwasnt\b/gi, replacement: "wasn't" },
        { pattern: /\bwerent\b/gi, replacement: "weren't" },
        { pattern: /\bisnt\b/gi, replacement: "isn't" },
        { pattern: /\barent\b/gi, replacement: "aren't" },
        { pattern: /\bhasnt\b/gi, replacement: "hasn't" },
        { pattern: /\bhavent\b/gi, replacement: "haven't" },
        { pattern: /\bshouldnt\b/gi, replacement: "shouldn't" },
        { pattern: /\bwouldnt\b/gi, replacement: "wouldn't" },
        { pattern: /\bcouldnt\b/gi, replacement: "couldn't" },

        // Fix common spelling errors
        { pattern: /\brecieve\b/gi, replacement: 'receive' },
        { pattern: /\boccured\b/gi, replacement: 'occurred' },
        { pattern: /\boccuring\b/gi, replacement: 'occurring' },
        { pattern: /\bseperate\b/gi, replacement: 'separate' },
        { pattern: /\bdefinately\b/gi, replacement: 'definitely' },
        { pattern: /\baccommodate\b/gi, replacement: 'accommodate' },
        { pattern: /\bexistance\b/gi, replacement: 'existence' },
        { pattern: /\bpersue\b/gi, replacement: 'pursue' },
        { pattern: /\buntill\b/gi, replacement: 'until' },
        { pattern: /\bthier\b/gi, replacement: 'their' },
        { pattern: /\bwierd\b/gi, replacement: 'weird' },
        { pattern: /\bacheive\b/gi, replacement: 'achieve' },
        { pattern: /\bbelive\b/gi, replacement: 'believe' },
        { pattern: /\bbeleive\b/gi, replacement: 'believe' },
        { pattern: /\benvironment\b/gi, replacement: 'environment' },
        { pattern: /\bgovernment\b/gi, replacement: 'government' },

        // Fix subject-verb agreement issues (common patterns)
        { pattern: /\b(he|she|it)\s+are\b/gi, replacement: '$1 is' },
        { pattern: /\b(they|we)\s+is\b/gi, replacement: '$1 are' },

        // Fix double negatives (common academic errors)
        { pattern: /\bdon't\s+have\s+no\b/gi, replacement: "don't have any" },
        { pattern: /\bcan't\s+hardly\b/gi, replacement: "can hardly" },

        // Fix comma splices (basic detection)
        { pattern: /,\s+(however|therefore|thus|consequently|nevertheless)\s+/gi, replacement: '; $1, ' },

        // Ensure proper capitalization at start
        { pattern: /^([a-z])/g, replacement: (match: string) => match.toUpperCase() },

        // Fix multiple punctuation marks
        { pattern: /\.{2,}/g, replacement: '.' },
        { pattern: /!{2,}/g, replacement: '!' },
        { pattern: /\?{2,}/g, replacement: '?' },

        // Fix spacing around quotes
        { pattern: /"\s+/g, replacement: '"' },
        { pattern: /\s+"/g, replacement: ' "' },

        // Fix common word confusions
        { pattern: /\bthen\s+(I|he|she|it|they|we)\s+(am|is|are|was|were)\b/gi, replacement: 'than $1 $2' },
        { pattern: /\beffect\s+(on|upon)\b/gi, replacement: 'affect $1' },
        { pattern: /\byour\s+(going|coming|doing)\b/gi, replacement: "you're $1" },
    ];

    // Apply all grammar rules
    grammarRules.forEach(rule => {
        if (typeof rule.replacement === 'string') {
            corrected = corrected.replace(rule.pattern, rule.replacement);
        } else {
            corrected = corrected.replace(rule.pattern, rule.replacement as (substring: string, ...args: unknown[]) => string);
        }
    });

    // Ensure sentences end with proper punctuation
    const sentences = corrected.split(/(?<=[.!?])\s+/);
    corrected = sentences.map(sentence => {
        sentence = sentence.trim();
        if (sentence && !/[.!?]$/.test(sentence)) {
            sentence += '.';
        }
        return sentence;
    }).join(' ');

    // Final cleanup
    corrected = corrected.trim();

    return corrected;
}

// Paraphrase sentences while maintaining academic tone and meaning
function paraphraseSentences(text: string, aggressiveness: 'medium' | 'heavy'): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const synonymMap: { [key: string]: string[] } = {
        'important': ['significant', 'crucial', 'essential', 'vital', 'critical'],
        'shows': ['demonstrates', 'illustrates', 'reveals', 'indicates', 'exhibits'],
        'uses': ['utilizes', 'employs', 'applies', 'implements', 'leverages'],
        'helps': ['facilitates', 'assists', 'aids', 'supports', 'enables'],
        'makes': ['creates', 'produces', 'generates', 'establishes', 'forms'],
        'gives': ['provides', 'offers', 'presents', 'supplies', 'delivers'],
        'gets': ['obtains', 'acquires', 'receives', 'secures', 'gains'],
        'big': ['substantial', 'considerable', 'significant', 'extensive', 'major'],
        'small': ['minor', 'limited', 'modest', 'minimal', 'negligible'],
        'good': ['beneficial', 'advantageous', 'favorable', 'positive', 'effective'],
        'bad': ['detrimental', 'adverse', 'unfavorable', 'negative', 'problematic'],
        'many': ['numerous', 'multiple', 'various', 'several', 'abundant'],
        'different': ['diverse', 'varied', 'distinct', 'alternative', 'disparate'],
        'same': ['identical', 'equivalent', 'similar', 'comparable', 'analogous'],
        'new': ['novel', 'recent', 'contemporary', 'modern', 'emerging'],
        'old': ['established', 'traditional', 'conventional', 'historical', 'longstanding'],
        'very': ['highly', 'extremely', 'particularly', 'notably', 'remarkably'],
        'also': ['additionally', 'furthermore', 'moreover', 'likewise', 'similarly'],
        'because': ['since', 'as', 'due to', 'owing to', 'given that'],
        'but': ['however', 'nevertheless', 'nonetheless', 'yet', 'although'],
        'so': ['therefore', 'thus', 'consequently', 'accordingly', 'hence'],
        'and': ['as well as', 'along with', 'together with', 'in addition to', 'coupled with'],
    };

    const paraphrased = sentences.map(sentence => {
        let modified = sentence;

        // Apply synonym replacement based on aggressiveness
        const replacementChance = aggressiveness === 'heavy' ? 0.6 : 0.4;

        Object.keys(synonymMap).forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            modified = modified.replace(regex, (match) => {
                if (globalRandom.next() < replacementChance) {
                    const synonyms = globalRandom.shuffle(synonymMap[word.toLowerCase()]);
                    const replacement = globalRandom.choice(synonyms);
                    // Preserve original capitalization
                    if (match[0] === match[0].toUpperCase()) {
                        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
                    }
                    return replacement;
                }
                return match;
            });
        });

        return modified;
    });

    return paraphrased.join(' ');
}

// Add grammatical errors for more human-like text
function addGrammaticalErrors(text: string, intensity: 'light' | 'medium' | 'heavy'): string {
    const errorChances = {
        light: 0.005,     // 0.5% chance per sentence (reduced from 1%)
        medium: 0.008,    // 0.8% chance per sentence (reduced from 2%)
        heavy: 0.012      // 1.2% chance per sentence (reduced from 3%)
    };

    const errorChance = errorChances[intensity];
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const modified = sentences.map(sentence => {
        if (globalRandom.next() > errorChance) return sentence;

        let errorSentence = sentence;

        // Apply VERY MINIMAL grammatical errors - only the most subtle ones
        const selectedErrors = globalRandom.shuffle([
            // Its vs It's (very subtle)
            () => {
                errorSentence = errorSentence.replace(/\bit's\b/gi, (match: string) => {
                    return globalRandom.next() < 0.15 ? 'its' : match;
                });
            },
            // Then vs Than (very subtle)
            () => {
                errorSentence = errorSentence.replace(/\bthen\b/gi, (match: string) => {
                    return globalRandom.next() < 0.15 ? 'than' : match;
                });
            },
        ]).slice(0, 1); // Apply only 1 error per sentence

        selectedErrors.forEach(error => error());

        return errorSentence;
    });

    return modified.join(' ');
}

// Simplify complex academic terms in introduction and conclusion
function simplifyIntroductionAndConclusion(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    if (paragraphs.length === 0) return text;

    // Simplification map: complex term -> simple alternatives
    const simplificationMap: { [key: string]: string[] } = {
        'utilized': ['used', 'used'],
        'facilitate': ['help', 'make easier'],
        'proliferate': ['spread', 'grow'],
        'ameliorate': ['improve', 'make better'],
        'exacerbate': ['make worse', 'worsen'],
        'substantiate': ['prove', 'show'],
        'elucidate': ['explain', 'clarify'],
        'delineate': ['describe', 'outline'],
        'enumerate': ['list', 'count'],
        'juxtapose': ['compare', 'put side by side'],
        'corroborate': ['confirm', 'support'],
        'constitute': ['make up', 'form'],
        'perpetuate': ['continue', 'keep going'],
        'amelioration': ['improvement', 'getting better'],
        'dichotomy': ['divide', 'split', 'difference'],
        'paradigm': ['model', 'example'],
        'endeavor': ['try', 'effort'],
        'subsequent': ['later', 'next'],
        'juxtaposed': ['compared', 'placed together'],
        'obfuscate': ['confuse', 'hide'],
        'insuperable': ['impossible', 'unbeatable'],
        'perspicacity': ['insight', 'understanding'],
        'epistemological': ['about knowledge', 'how we know'],
        'ontological': ['about being', 'about existence'],
        'manifestation': ['sign', 'example', 'display'],
        'concatenation': ['joining', 'combination'],
        'recalcitrant': ['stubborn', 'resistant'],
        'parsimonious': ['stingy', 'minimal'],
        'perspicuous': ['clear', 'easy to understand'],
        'dilettante': ['amateur', 'dabbler'],
        'obsequious': ['overly eager', 'too polite'],
        'egregious': ['obvious', 'bad', 'terrible'],
        'ephemeral': ['temporary', 'short-lived'],
        'surreptitious': ['secret', 'sneaky'],
        'nefarious': ['evil', 'bad', 'wicked'],
        'mellifluous': ['pleasant', 'smooth-sounding'],
        'ubiquitous': ['everywhere', 'common'],
        'perspicuity': ['clarity', 'clearness'],
        'concatenate': ['join', 'combine'],
        'cogent': ['strong', 'convincing'],
        'profundity': ['depth', 'deep meaning'],
        'superficiality': ['surface level', 'lack of depth'],
        'predilection': ['preference', 'liking'],
        'magnanimous': ['generous', 'kind-hearted'],
        'perspicacious': ['insightful', 'keen', 'sharp'],
        'recondite': ['obscure', 'hard to understand'],
        'sesquipedalian': ['long', 'wordy'],
        'pellucid': ['clear', 'transparent'],
        'turgid': ['swollen', 'bloated'],
        'loquacious': ['talkative', 'chatty'],
        'taciturn': ['quiet', 'not talkative'],
        'indefatigable': ['tireless', 'never tired'],
        'implacable': ['unchangeable', 'relentless'],
        'impeccable': ['perfect', 'without fault'],
        'insouciant': ['carefree', 'unconcerned'],
        'obfuscation': ['confusion', 'hiding'],
        'superfluous': ['unnecessary', 'extra', 'not needed'],
        'tenuous': ['weak', 'thin', 'not strong'],
        'abstraction': ['idea', 'concept', 'thought'],
        'acquiesce': ['agree', 'accept', 'go along'],
        'acumen': ['skill', 'ability', 'keenness'],
        'adamant': ['firm', 'stubborn', 'fixed'],
        'admonish': ['warn', 'scold', 'criticize'],
        'adversity': ['hardship', 'difficulty', 'trouble'],
        'advocate': ['support', 'promote', 'back'],
        'affable': ['friendly', 'pleasant', 'kind'],
        'aggregate': ['total', 'combine', 'gather'],
        'alacrity': ['eagerness', 'speed', 'quickness'],
        'altruism': ['kindness', 'unselfishness', 'generosity'],
        'ambiguous': ['unclear', 'confusing', 'vague'],
        'amenable': ['willing', 'open', 'responsive'],
        'analogy': ['comparison', 'similarity', 'parallel'],
        'analyze': ['examine', 'break down', 'study'],
        'anonymous': ['unnamed', 'unknown', 'unnamed'],
        'anomaly': ['oddity', 'exception', 'irregularity'],
        'antagonistic': ['hostile', 'opposed', 'against'],
        'antecedent': ['before', 'previous', 'prior'],
        'antipathy': ['dislike', 'hatred', 'aversion'],
        'antithesis': ['opposite', 'contrast', 'reverse'],
        'apathetic': ['uncaring', 'indifferent', 'detached'],
        'aperture': ['opening', 'hole', 'gap'],
        'aplomb': ['confidence', 'composure', 'poise'],
        'apotheosis': ['peak', 'highest point', 'climax'],
        'appease': ['calm', 'satisfy', 'soothe'],
        'append': ['add', 'attach', 'include'],
        'applicable': ['relevant', 'suitable', 'fitting'],
        'appraise': ['evaluate', 'assess', 'judge'],
        'appreciate': ['value', 'understand', 'recognize'],
        'apprehension': ['fear', 'worry', 'dread'],
        'apprentice': ['learner', 'trainee', 'student'],
        'apprise': ['inform', 'notify', 'tell'],
        'appropriate': ['suitable', 'proper', 'fitting'],
        'approximation': ['estimate', 'near', 'rough figure'],
        'aptitude': ['talent', 'ability', 'skill'],
        'arbitrary': ['random', 'capricious', 'decided by chance'],
        'arbiter': ['judge', 'decision-maker', 'referee'],
        'arch': ['playful', 'mischievous', 'sly'],
        'archaic': ['old', 'ancient', 'outdated'],
        'ardent': ['passionate', 'eager', 'enthusiastic'],
        'ardor': ['passion', 'enthusiasm', 'zeal'],
        'arduous': ['difficult', 'hard', 'strenuous'],
        'arena': ['field', 'area', 'domain'],
        'argot': ['slang', 'jargon', 'dialect'],
        'argumentation': ['debate', 'reasoning', 'discussion'],
        'arid': ['dry', 'barren', 'dull'],
        'aristocracy': ['upper class', 'nobility', 'elite'],
        'arithmetic': ['math', 'calculation', 'numbers'],
        'armada': ['fleet', 'group', 'navy'],
        'armament': ['weapons', 'arms', 'equipment'],
        'array': ['arrange', 'display', 'set out'],
        'arrear': ['debt', 'owed amount', 'behind'],
        'arrest': ['stop', 'catch', 'seize'],
        'arresting': ['striking', 'impressive', 'attention-grabbing'],
        'arrival': ['coming', 'entrance', 'appearance'],
        'arrogance': ['pride', 'conceit', 'haughtiness'],
        'arrogate': ['claim', 'seize', 'take wrongly'],
        'arsenal': ['collection', 'storehouse', 'supply'],
        'articulate': ['speak', 'express', 'voice'],
        'artifice': ['trick', 'deception', 'cunning'],
        'artificial': ['fake', 'human-made', 'not real'],
        'artisan': ['craftsperson', 'maker', 'skilled worker'],
        'ascend': ['climb', 'go up', 'rise'],
        'ascendancy': ['dominance', 'control', 'power'],
        'ascendant': ['rising', 'dominant', 'powerful'],
        'ascent': ['climb', 'rise', 'upward movement'],
        'ascertain': ['find out', 'determine', 'discover'],
        'ascetic': ['strict', 'austere', 'disciplined'],
        'ascribe': ['attribute', 'assign', 'credit'],
        'aseptic': ['clean', 'sterile', 'pure'],
        'ashen': ['pale', 'gray', 'colorless'],
        'askance': ['with suspicion', 'sideways', 'doubtfully'],
        'aspersion': ['criticism', 'slur', 'insult'],
        'asphyxiate': ['suffocate', 'choke', 'smother'],
        'aspirant': ['seeker', 'hopeful', 'candidate'],
        'aspiration': ['desire', 'goal', 'dream'],
        'aspire': ['desire', 'aim', 'want'],
        'assail': ['attack', 'assault', 'criticize'],
        'assailant': ['attacker', 'aggressor', 'assaulter'],
        'assassin': ['killer', 'murderer', 'hitman'],
        'assassinate': ['murder', 'kill', 'eliminate'],
        'assault': ['attack', 'strike', 'hit'],
        'assay': ['test', 'examine', 'evaluate'],
        'assemble': ['gather', 'collect', 'put together'],
        'assembly': ['gathering', 'group', 'collection'],
        'assent': ['agree', 'approval', 'consent'],
        'assert': ['state', 'claim', 'declare'],
        'assertion': ['claim', 'statement', 'declaration'],
        'assertive': ['confident', 'bold', 'forceful'],
        'assess': ['evaluate', 'judge', 'analyze'],
        'assessment': ['evaluation', 'judgment', 'appraisal'],
        'asset': ['possession', 'property', 'advantage'],
        'assiduous': ['diligent', 'hardworking', 'careful'],
        'assign': ['allocate', 'give', 'designate'],
        'assignation': ['appointment', 'meeting', 'date'],
        'assimilate': ['absorb', 'integrate', 'adopt'],
        'assist': ['help', 'aid', 'support'],
        'assistant': ['helper', 'aide', 'supporter'],
        'associate': ['connect', 'link', 'partner'],
        'association': ['group', 'organization', 'connection'],
        'assonance': ['similarity', 'echo', 'resemblance'],
        'assort': ['arrange', 'classify', 'group'],
        'assortment': ['collection', 'variety', 'mix'],
        'assuage': ['ease', 'calm', 'soothe'],
        'assume': ['take', 'suppose', 'pretend'],
        'assurance': ['confidence', 'promise', 'guarantee'],
        'assure': ['promise', 'guarantee', 'convince'],
        'aster': ['star', 'flower', 'plant'],
        'astern': ['behind', 'at back', 'rear'],
        'asteroid': ['space rock', 'meteor', 'celestial body'],
        'asthmatic': ['breathless', 'wheezing', 'short of breath'],
        'astigmatism': ['eye defect', 'vision problem', 'imperfection'],
        'astir': ['in motion', 'moving', 'awake'],
        'astonish': ['surprise', 'amaze', 'shock'],
        'astonishment': ['surprise', 'amazement', 'shock'],
        'astound': ['amaze', 'surprise', 'stun'],
        'astray': ['lost', 'off course', 'wrong'],
        'astride': ['straddling', 'spanning', 'across'],
        'astringent': ['harsh', 'severe', 'sharp'],
        'astrology': ['star study', 'fortune-telling', 'zodiac'],
        'astronomer': ['scientist', 'star watcher', 'observer'],
        'astronomical': ['enormous', 'huge', 'very large'],
        'astronomy': ['space science', 'star study', 'celestial science'],
        'astute': ['clever', 'sharp', 'keen'],
        'asunder': ['apart', 'separated', 'divided'],
        'asylum': ['refuge', 'safe place', 'sanctuary'],
        'asymmetry': ['imbalance', 'unevenness', 'lopsidedness'],
        'atavism': ['throwback', 'regression', 'primitive behavior'],
        'atheism': ['disbelief', 'non-belief', 'denial of god'],
        'atheistic': ['disbelieving', 'non-believing', 'godless'],
        'athlete': ['sportsperson', 'player', 'competitor'],
        'athletic': ['sporty', 'fit', 'active'],
        'athletics': ['sports', 'games', 'physical activities'],
        'atlas': ['map book', 'book of maps', 'collection'],
        'atmosphere': ['air', 'mood', 'environment'],
        'atmospheric': ['air-related', 'moody', 'environmental'],
        'atoll': ['island', 'ring island', 'coral island'],
        'atom': ['particle', 'tiny bit', 'smallest unit'],
        'atomic': ['nuclear', 'particle-related', 'tiny'],
        'atone': ['make up for', 'repent', 'compensate'],
        'atonement': ['repentance', 'making amends', 'compensation'],
        'atonic': ['without accent', 'weak', 'unstressed'],
        'atrocious': ['terrible', 'awful', 'horrible'],
        'atrocity': ['horror', 'terrible act', 'wickedness'],
        'atrophy': ['wasting', 'shrinking', 'decay'],
        'attach': ['fasten', 'connect', 'link'],
        'attaché': ['official', 'diplomat', 'representative'],
        'attachment': ['connection', 'bond', 'appendage'],
        'attack': ['assault', 'strike', 'criticize'],
        'attain': ['achieve', 'reach', 'accomplish'],
        'attainment': ['achievement', 'accomplishment', 'success'],
        'attar': ['perfume', 'fragrance', 'oil'],
        'attempt': ['try', 'effort', 'endeavor'],
        'attend': ['be present', 'go to', 'pay attention'],
        'attendance': ['presence', 'number present', 'showing up'],
        'attendant': ['servant', 'helper', 'present'],
        'attention': ['focus', 'notice', 'care'],
        'attentive': ['focused', 'paying attention', 'careful'],
        'attenuate': ['weaken', 'thin', 'reduce'],
        'attest': ['certify', 'confirm', 'testify'],
        'attestation': ['certification', 'proof', 'testimony'],
        'attic': ['upstairs room', 'top room', 'loft'],
        'attire': ['clothing', 'dress', 'outfit'],
        'attitude': ['position', 'stance', 'viewpoint'],
        'attorney': ['lawyer', 'legal representative', 'advocate'],
        'attract': ['draw', 'pull', 'appeal'],
        'attraction': ['draw', 'appeal', 'charm'],
        'attractive': ['appealing', 'pleasing', 'beautiful'],
        'attributable': ['caused by', 'due to', 'caused'],
        'attribute': ['quality', 'feature', 'assign'],
        'attribution': ['assignment', 'credit', 'giving credit'],
        'attrition': ['wearing down', 'reduction', 'loss'],
        'attune': ['adjust', 'adapt', 'harmonize'],
        'atypical': ['unusual', 'abnormal', 'different'],
        'aubade': ['morning song', 'dawn song', 'daybreak poem'],
        'auburn': ['reddish-brown', 'brown', 'copper-colored'],
        'auction': ['sale', 'bidding', 'selling'],
        'auctioneer': ['seller', 'bidding official', 'sale conductor'],
        'audacious': ['bold', 'daring', 'fearless'],
        'audacity': ['boldness', 'daring', 'nerve'],
        'audible': ['hearable', 'able to be heard', 'noticeable'],
        'audience': ['listeners', 'watchers', 'group'],
        'audio': ['sound', 'hearing', 'ear-related'],
        'audit': ['check', 'examination', 'review'],
        'audition': ['trial', 'test performance', 'tryout'],
        'auditor': ['listener', 'checker', 'reviewer'],
        'auditory': ['hearing-related', 'sound-related', 'ear-related'],
        'augment': ['increase', 'add to', 'enlarge'],
        'augmentation': ['increase', 'addition', 'enlargement'],
        'augur': ['prophet', 'omen', 'foreteller'],
        'augury': ['omen', 'sign', 'prediction'],
        'august': ['impressive', 'dignified', 'majestic'],
        'auk': ['seabird', 'bird', 'diving bird'],
        'aunt': ['parent\'s sister', 'relative', 'family member'],
        'aura': ['feeling', 'atmosphere', 'glow'],
        'aural': ['hearing-related', 'sound-related', 'ear-related'],
        'aureate': ['golden', 'ornate', 'fancy'],
        'auricle': ['ear part', 'chamber', 'hearing part'],
        'auriferous': ['gold-bearing', 'containing gold', 'gold-rich'],
        'aurochs': ['extinct animal', 'wild ox', 'ancient beast'],
        'aurora': ['dawn', 'lights', 'glow'],
        'auspice': ['sign', 'omen', 'protection'],
        'auspicious': ['favorable', 'promising', 'lucky'],
        'austere': ['strict', 'simple', 'harsh'],
        'austerity': ['strictness', 'simplicity', 'harshness'],
        'austral': ['southern', 'south-related', 'southern'],
        'authentic': ['real', 'genuine', 'true'],
        'authenticate': ['verify', 'prove real', 'confirm'],
        'authenticity': ['genuineness', 'realness', 'truth'],
        'author': ['writer', 'creator', 'originator'],
        'authoritarian': ['strict', 'bossy', 'controlling'],
        'authoritarianism': ['strict rule', 'autocracy', 'control'],
        'authoritative': ['official', 'expert', 'commanding'],
        'authority': ['power', 'expert', 'government'],
        'authorize': ['permit', 'allow', 'approve'],
        'autism': ['developmental disorder', 'spectrum condition', 'neurological condition'],
        'autistic': ['spectrum-related', 'neurodivergent', 'disorder-related'],
        'autobiography': ['life story', 'personal history', 'memoir'],
        'autocracy': ['absolute rule', 'dictatorship', 'one-person rule'],
        'autocrat': ['dictator', 'absolute ruler', 'tyrant'],
        'autocratic': ['dictatorial', 'absolute', 'tyrannical'],
        'autograph': ['signature', 'signed', 'personal signature'],
        'automat': ['vending machine', 'automatic seller', 'machine'],
        'automate': ['mechanize', 'computerize', 'make automatic'],
        'automatic': ['self-operating', 'mechanical', 'unthinking'],
        'automation': ['mechanization', 'computerization', 'automatic operation'],
        'automatism': ['automatic behavior', 'unthinking action', 'reflex'],
        'automaton': ['robot', 'mechanical thing', 'unthinking person'],
        'automobile': ['car', 'vehicle', 'motorcar'],
        'automotive': ['car-related', 'vehicle-related', 'motor-related'],
        'autonomous': ['independent', 'self-ruling', 'self-governing'],
        'autonomy': ['independence', 'freedom', 'self-rule'],
        'autopsy': ['body examination', 'post-mortem', 'examination after death'],
        'autosuggestion': ['self-suggestion', 'self-hypnosis', 'mental influence'],
        'autumn': ['fall', 'harvest season', 'season'],
        'autumnal': ['fall-like', 'seasonal', 'autumn-related'],
        'auxiliary': ['helping', 'extra', 'supplementary'],
        'avail': ['help', 'benefit', 'use'],
        'availability': ['presence', 'access', 'readiness'],
        'available': ['present', 'accessible', 'obtainable'],
        'avalanche': ['snow slide', 'rapid fall', 'landslide'],
        'avarice': ['greed', 'desire for money', 'covetousness'],
        'avaricious': ['greedy', 'money-loving', 'covetous'],
        'avast': ['stop', 'halt', 'cease'],
        'avatar': ['form', 'representation', 'manifestation'],
        'avaunt': ['begone', 'depart', 'leave'],
        'avenge': ['take revenge', 'retaliate', 'punish'],
        'avenger': ['revenger', 'one who seeks revenge', 'retaliator'],
        'avenue': ['street', 'path', 'route'],
        'aver': ['claim', 'assert', 'state'],
        'average': ['typical', 'mean', 'common'],
        'averment': ['claim', 'assertion', 'statement'],
        'averse': ['opposed', 'reluctant', 'against'],
        'aversion': ['dislike', 'hatred', 'opposition'],
        'avert': ['turn away', 'prevent', 'deflect'],
        'avgas': ['aviation fuel', 'aircraft fuel', 'specialized fuel'],
        'avian': ['bird-related', 'bird', 'feathered'],
        'aviary': ['bird cage', 'bird enclosure', 'bird sanctuary'],
        'aviation': ['flying', 'aircraft', 'flight'],
        'aviator': ['pilot', 'flyer', 'air-traveler'],
        'avid': ['eager', 'keen', 'enthusiastic'],
        'avidity': ['eagerness', 'enthusiasm', 'keenness'],
        'avifauna': ['bird species', 'birds', 'bird life'],
        'avocado': ['fruit', 'pear-shaped fruit', 'green fruit'],
        'avocation': ['hobby', 'pastime', 'side interest'],
        'avocet': ['wading bird', 'bird', 'water bird'],
        'avoid': ['stay away from', 'shun', 'escape'],
        'avoidable': ['escapable', 'preventable', 'able to be avoided'],
        'avoidance': ['evasion', 'escape', 'shunning'],
        'avoirdupois': ['weight system', 'heaviness', 'weight measure'],
        'avouch': ['assert', 'attest', 'claim'],
        'avow': ['declare', 'admit', 'confess'],
        'avowal': ['declaration', 'admission', 'confession'],
        'avowed': ['declared', 'admitted', 'confessed'],
        'avuncular': ['uncle-like', 'paternal', 'grandfatherly'],
        'await': ['wait for', 'expect', 'be in store'],
        'awake': ['wake up', 'rouse', 'aware'],
        'awaken': ['wake', 'rouse', 'stir'],
        'awakening': ['waking', 'consciousness', 'realization'],
        'award': ['give', 'prize', 'grant'],
        'aware': ['conscious', 'knowing', 'alert'],
        'awareness': ['consciousness', 'knowledge', 'realization'],
        'awash': ['flooded', 'covered', 'inundated'],
        'away': ['distant', 'absent', 'gone'],
        'awe': ['wonder', 'fear', 'admiration'],
        'awed': ['wondering', 'impressed', 'amazed'],
        'awesome': ['amazing', 'wonderful', 'impressive'],
        'aweigh': ['raised', 'hoisted', 'lifted'],
        'awful': ['terrible', 'dreadful', 'horrible'],
        'awfully': ['terribly', 'very', 'badly'],
        'awhile': ['for a while', 'briefly', 'short time'],
        'awkward': ['clumsy', 'uncomfortable', 'difficult'],
        'awl': ['pointed tool', 'pricking tool', 'hole maker'],
        'awn': ['bristle', 'hair-like fiber', 'point'],
        'awning': ['canopy', 'shade', 'covering'],
        'awoke': ['past tense of awake', 'woke up', 'aroused'],
        'awoken': ['woken', 'awakened', 'aroused'],
        'awry': ['crooked', 'wrong', 'sideways'],
        'axe': ['tool', 'chopper', 'implement'],
        'axiom': ['truth', 'principle', 'basic fact'],
        'axiomatic': ['self-evident', 'obviously true', 'basic'],
        'axial': ['axis-related', 'central', 'along the axis'],
        'axile': ['axis-related', 'along central line', 'central'],
        'axilla': ['armpit', 'underarm', 'hollow'],
        'axillary': ['armpit-related', 'underarm', 'axis-related'],
        'axion': ['hypothetical particle', 'theoretical particle', 'physics concept'],
        'axis': ['line', 'center line', 'turning point'],
        'axle': ['rod', 'shaft', 'rotating rod'],
        'axletree': ['axle shaft', 'rod', 'beam'],
        'axman': ['executioner', 'woodsman', 'ax user'],
        'axmen': ['multiple axmen', 'executioners', 'plural'],
        'axon': ['nerve fiber', 'nerve extension', 'brain fiber'],
        'ayah': ['nanny', 'nurse', 'caregiver'],
        'aye': ['yes', 'affirmative', 'agreement'],
        'ayin': ['Hebrew letter', 'letter', 'alphabetic character'],
        'azalea': ['flowering plant', 'shrub', 'flower'],
        'azide': ['chemical compound', 'nitrogen compound', 'chemistry term'],
        'azimuth': ['direction', 'angle', 'compass bearing'],
        'azine': ['chemical compound', 'organic compound', 'chemistry term'],
        'azlon': ['fiber', 'artificial fiber', 'textile'],
        'azo': ['chemistry term', 'containing azo group', 'chemical'],
        'azote': ['nitrogen', 'element', 'chemical element'],
        'azoth': ['mercury', 'essence', 'universal remedy'],
        'azotize': ['nitrogenize', 'add nitrogen', 'chemistry process'],
        'azoturia': ['medical condition', 'nitrogen in urine', 'health condition'],
        'azuki': ['bean', 'legume', 'plant'],
        'azure': ['blue', 'sky-blue', 'blue color'],
        'azurite': ['blue mineral', 'copper ore', 'gemstone'],
        'azygous': ['unpaired', 'single', 'alone'],
    };

    // Simplify first paragraph (introduction)
    if (paragraphs.length > 0) {
        let intro = paragraphs[0];
        Object.keys(simplificationMap).forEach(complex => {
            const regex = new RegExp(`\\b${complex}\\b`, 'gi');
            intro = intro.replace(regex, (match) => {
                if (globalRandom.next() < 0.6) {
                    const simple = globalRandom.choice(globalRandom.shuffle(simplificationMap[complex.toLowerCase()]));
                    if (match[0] === match[0].toUpperCase()) {
                        return simple.charAt(0).toUpperCase() + simple.slice(1);
                    }
                    return simple;
                }
                return match;
            });
        });
        paragraphs[0] = intro;
    }

    // Simplify last paragraph (conclusion)
    if (paragraphs.length > 1) {
        let conclusion = paragraphs[paragraphs.length - 1];
        Object.keys(simplificationMap).forEach(complex => {
            const regex = new RegExp(`\\b${complex}\\b`, 'gi');
            conclusion = conclusion.replace(regex, (match) => {
                if (globalRandom.next() < 0.6) {
                    const simple = globalRandom.choice(globalRandom.shuffle(simplificationMap[complex.toLowerCase()]));
                    if (match[0] === match[0].toUpperCase()) {
                        return simple.charAt(0).toUpperCase() + simple.slice(1);
                    }
                    return simple;
                }
                return match;
            });
        });
        paragraphs[paragraphs.length - 1] = conclusion;
    }

    return paragraphs.join('\n\n');
}

// Restructure sentences while maintaining meaning
function restructureSentences(text: string, aggressiveness: 'medium' | 'heavy'): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    const restructureChance = aggressiveness === 'heavy' ? 0.5 : 0.3;

    const restructured = sentences.map(sentence => {
        if (globalRandom.next() > restructureChance) return sentence;

        // Convert active to passive voice (and vice versa) occasionally
        if (sentence.match(/\b(is|are|was|were)\s+\w+ed\b/i)) {
            // Already passive, might convert to active (complex, skip for now)
            return sentence;
        }

        // Reorder clauses with conjunctions
        if (sentence.includes(', and ')) {
            const parts = sentence.split(', and ');
            if (parts.length === 2 && globalRandom.next() < 0.5) {
                return `${parts[1].trim()}, while ${parts[0].toLowerCase().trim()}`;
            }
        }

        if (sentence.includes(', but ')) {
            const parts = sentence.split(', but ');
            if (parts.length === 2 && globalRandom.next() < 0.5) {
                return `Although ${parts[0].toLowerCase().trim()}, ${parts[1].trim()}`;
            }
        }

        // Move introductory phrases
        const introPatterns = [
            /^(However|Moreover|Furthermore|Additionally|Nevertheless|Consequently|Therefore|Thus),\s+/i,
        ];

        for (const pattern of introPatterns) {
            const match = sentence.match(pattern);
            if (match && globalRandom.next() < 0.4) {
                const intro = match[1];
                const rest = sentence.replace(pattern, '');
                const words = rest.split(' ');
                if (words.length > 5) {
                    const midPoint = Math.floor(words.length / 2);
                    return `${words.slice(0, midPoint).join(' ')}, ${intro.toLowerCase()}, ${words.slice(midPoint).join(' ')}`;
                }
            }
        }

        return sentence;
    });

    return restructured.join(' ');
}

// Add academic transitions and connectors
function addAcademicTransitions(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const transitions = {
        addition: ['Furthermore', 'Moreover', 'In addition', 'Additionally', 'Beyond this'],
        contrast: ['However', 'Conversely', 'On the other hand', 'Nevertheless', 'In contrast'],
        causation: ['Consequently', 'As a result', 'Therefore', 'Thus', 'Hence'],
        emphasis: ['Indeed', 'Notably', 'Particularly', 'Especially', 'Significantly'],
        sequence: ['Subsequently', 'Following this', 'Thereafter', 'In turn', 'Next'],
    };

    const modified = paragraphs.map((para, index) => {
        if (index === 0) return para; // Don't modify first paragraph

        const sentences = para.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
        if (sentences.length === 0) return para;

        // Add transition to first sentence of paragraph
        if (globalRandom.next() < 0.6) {
            const transitionTypes = globalRandom.shuffle(Object.keys(transitions));
            const transitionType = globalRandom.choice(transitionTypes) as keyof typeof transitions;
            const transition = globalRandom.choice(globalRandom.shuffle(transitions[transitionType]));

            // Check if sentence already starts with a transition
            const startsWithTransition = Object.values(transitions).flat().some(t =>
                sentences[0].startsWith(t)
            );

            if (!startsWithTransition) {
                sentences[0] = `${transition}, ${sentences[0].charAt(0).toLowerCase()}${sentences[0].slice(1)}`;
            }
        }

        return sentences.join(' ');
    });

    return modified.join('\n\n');
}

// Vary sentence complexity and structure
function varySentenceComplexity(text: string, aggressiveness: 'medium' | 'heavy'): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    const modificationChance = aggressiveness === 'heavy' ? 0.5 : 0.3;

    const modified = sentences.map((sentence, index) => {
        if (globalRandom.next() > modificationChance) return sentence;

        // Combine short consecutive sentences
        if (sentence.length < 60 && index < sentences.length - 1 && sentences[index + 1].length < 60) {
            const connectors = globalRandom.shuffle(['and', 'while', 'as', 'whereas', 'though']);
            const connector = globalRandom.choice(connectors);
            return `${sentence.replace(/[.!?]$/, '')}, ${connector} ${sentences[index + 1].charAt(0).toLowerCase()}${sentences[index + 1].slice(1)}`;
        }

        // Split long sentences
        if (sentence.length > 120 && sentence.includes(' and ')) {
            const parts = sentence.split(' and ');
            if (parts.length === 2) {
                return `${parts[0].trim()}. Additionally, ${parts[1].trim()}`;
            }
        }

        return sentence;
    });

    // Remove duplicates from combining
    const unique = modified.filter((sentence, index) => {
        if (index === 0) return true;
        return !modified[index - 1].includes(sentence.slice(0, 20));
    });

    return unique.join(' ');
}

// Add scholarly hedging and qualifiers
function addAcademicHedging(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const hedges = [
        { pattern: /\b(is|are|was|were)\s+(\w+)\b/i, replacement: 'appears to be $2', chance: 0.15 },
        { pattern: /\b(shows|demonstrates|proves)\b/i, replacement: 'suggests', chance: 0.2 },
        { pattern: /\b(always|never|all|none)\b/i, replacement: 'generally', chance: 0.25 },
        { pattern: /\b(will|must)\b/i, replacement: 'may', chance: 0.15 },
    ];

    const hedged = sentences.map(sentence => {
        let modified = sentence;

        hedges.forEach(hedge => {
            if (globalRandom.next() < hedge.chance) {
                modified = modified.replace(hedge.pattern, hedge.replacement);
            }
        });

        // Add qualifying phrases
        const qualifiers = globalRandom.shuffle([
            'to some extent',
            'in many cases',
            'under certain conditions',
            'in this context',
            'from this perspective',
        ]);

        if (globalRandom.next() < 0.15 && modified.length > 40) {
            const qualifier = globalRandom.choice(qualifiers);
            const words = modified.split(' ');
            const insertPoint = Math.floor(words.length / 2);
            words.splice(insertPoint, 0, qualifier + ',');
            modified = words.join(' ');
        }

        return modified;
    });

    return hedged.join(' ');
}

// Create frequent sentence breaks to split long sentences into shorter ones
function createFrequentSentenceBreaks(text: string, breakIntensity: 'light' | 'medium' | 'heavy' = 'medium'): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const breakChance = {
        light: 0.2,
        medium: 0.4,
        heavy: 0.6
    }[breakIntensity];

    const modified = sentences.map(sentence => {
        // Don't break very short sentences
        if (sentence.length < 40) return sentence;

        if (globalRandom.next() < breakChance) {
            // Look for natural breaking points
            const breakPatterns = [
                { pattern: /,\s+(?=which|that|who|where|when|why|how)/i, separator: '. ' },
                { pattern: /\s+and\s+/, separator: '. And ' },
                { pattern: /\s+but\s+/, separator: '. But ' },
                { pattern: /;\s+/, separator: '. ' },
                { pattern: /,\s+/, separator: '. ' },
            ];

            for (const { pattern, separator } of breakPatterns) {
                if (pattern.test(sentence)) {
                    return sentence.replace(pattern, separator);
                }
            }
        }

        return sentence;
    });

    return modified.join(' ');
}

// Introduce occasional spelling mistakes for authenticity
function introduceSpellingMistakes(text: string, intensity: 'light' | 'medium' | 'heavy'): string {
    const mistakeChances = {
        light: 0.04,      // 4% chance per word (increased from 3%)
        medium: 0.06,     // 6% chance per word (increased from 5%)
        heavy: 0.10       // 10% chance per word (increased from 8%)
    };

    const mistakeChance = mistakeChances[intensity];

    // Common spelling mistakes that humans make
    const commonMistakes: { [key: string]: string[] } = {
        'the': ['teh', 'thee', 'te'],
        'receive': ['recieve', 'recive'],
        'occurred': ['occured', 'ocurred'],
        'separate': ['seperate', 'seperete'],
        'definitely': ['definately', 'definitly'],
        'accommodate': ['accomodate', 'acommodate'],
        'necessary': ['neccessary', 'necesary'],
        'immediately': ['imediately', 'immeditaly'],
        'questionnaire': ['questionaire', 'questionair'],
        'embarrass': ['embarass', 'embarras'],
        'occurrence': ['occurance', 'occurence'],
        'rhythm': ['rythm', 'rhytm'],
        'conscience': ['concience', 'consciance'],
        'bureaucracy': ['burocracy', 'bureauracy'],
        'maintenance': ['maintainence', 'maintenence'],
        'relevant': ['relevent', 'relevant'],
        'privilege': ['privilage', 'privelege'],
        'medieval': ['medival', 'medeval'],
        'vacuum': ['vaccuum', 'vacuume'],
        'parliament': ['parlament', 'parliment'],
        'beginning': ['begining', 'begining'],
        'until': ['untill', 'untol'],
        'whether': ['wether', 'wheather'],
        'than': ['then', 'tahn'],
        'their': ['thier', 'theyr'],
        'through': ['thorugh', 'thru', 'threw'],
        'which': ['wich', 'whick'],
        'different': ['diferent', 'diference'],
        'believe': ['beleive', 'belive'],
        'achieve': ['acheive', 'achive'],
        'friend': ['frend', 'freind'],
        'student': ['studet', 'studnet'],
        'probably': ['probaly', 'probibly'],
        'although': ['altho', 'altough'],
        'environment': ['enviroment', 'enviornment'],
        'government': ['goverment', 'govenment'],
        'important': ['importent', 'imporant'],
        'development': ['developement', 'developmenet'],
        'experience': ['experiance', 'experiance'],
        'interest': ['intreset', 'intrest'],
        'available': ['avalable', 'availible'],
        'successful': ['sucessful', 'successfull'],
        'information': ['informaton', 'infromation'],
        'knowledge': ['knowlege', 'knwoledge'],
        'understand': ['undrestand', 'undestand'],
        'children': ['childern', 'childer'],
        'address': ['adress', 'addres'],
        'possible': ['possable', 'posible'],
        'society': ['socity', 'sosiety'],
        'and': ['adn', 'nd'],
        'become': ['becaome', 'becom'],
        'because': ['becuase', 'becasue'],
        'before': ['befor', 'befroe'],
        'change': ['chage', 'chnage'],
        'choice': ['chocie', 'choise'],
        'country': ['contry', 'coutry'],
        'decision': ['desicion', 'decison'],
        'during': ['dureing', 'durint'],
        'effect': ['affect', 'efect'],
        'finally': ['finaly', 'finnally'],
        'figure': ['figuer', 'figer'],
        'general': ['genral', 'generel'],
        'however': ['howver', 'howevre'],
        'including': ['inclding', 'includng'],
        'language': ['langauge', 'languge'],
        'material': ['materiel', 'matrial'],
        'national': ['natinal', 'nationel'],
        'occur': ['ocur', 'occure'],
        'perform': ['perfrom', 'preform'],
        'personal': ['personel', 'personall'],
        'project': ['projekt', 'projct'],
        'provide': ['provde', 'proviide'],
        'question': ['questoin', 'quesiton'],
        'reason': ['reson', 'resaon'],
        'reduce': ['reduse', 'reduec'],
        'remember': ['remeber', 'remembr'],
        'research': ['reserch', 'reseach'],
        'require': ['requir', 'requiers'],
        'result': ['resilt', 'reuslt'],
        'science': ['sceince', 'sciene'],
        'several': ['serveral', 'sevral'],
        'should': ['shuld', 'shoud'],
        'similar': ['simlar', 'similiar'],
        'specific': ['speficic', 'specifc'],
        'standard': ['standart', 'standerd'],
        'structure': ['structur', 'structer'],
        'subject': ['subjct', 'subjecct'],
        'sufficient': ['suficient', 'sufficent'],
        'suggest': ['sugest', 'sugggest'],
        'support': ['suport', 'suppport'],
        'suppose': ['supose', 'suppse'],
        'surface': ['surfce', 'serface'],
        'therefore': ['therefor', 'theerfore'],
        'thought': ['thoguht', 'thought'],
        'throughout': ['throught', 'throughout'],
        'together': ['togther', 'togetehr'],
        'training': ['trainng', 'trainging'],
        'transfer': ['tranfer', 'transffer'],
        'treatment': ['treatmnt', 'tretment'],
        'typical': ['typicle', 'typicall'],
        'usually': ['usualy', 'ussualy'],
        'various': ['varrius', 'varous'],
        'version': ['versoin', 'verson'],
        'violence': ['violance', 'violense'],
        'visible': ['visable', 'visiable'],
        'weight': ['wieght', 'wieght'],
        'western': ['westen', 'westeren'],
        'without': ['witout', 'withotu'],
        'writing': ['writting', 'writng'],
    };

    const words = text.split(/(\s+)/);

    const modified = words.map(word => {
        // Don't modify whitespace
        if (/^\s+$/.test(word)) return word;

        // Extract the actual word without punctuation
        const punctuation = word.match(/[.!?,;:\-—]*$/)?.[0] || '';
        const cleanWord = word.slice(0, word.length - punctuation.length);

        // Check if this word has a mistake variant
        const lowerWord = cleanWord.toLowerCase();

        // Look for exact match (case-insensitive)
        let hasVariant = false;
        let selectedMistake = '';

        for (const [original, mistakes] of Object.entries(commonMistakes)) {
            if (lowerWord === original && globalRandom.next() < mistakeChance) {
                selectedMistake = globalRandom.choice(globalRandom.shuffle(mistakes));
                hasVariant = true;
                break;
            }
        }

        if (hasVariant) {
            // Preserve original capitalization
            let result = selectedMistake;
            if (cleanWord[0] === cleanWord[0].toUpperCase()) {
                result = result.charAt(0).toUpperCase() + result.slice(1);
            }
            return result + punctuation;
        }

        // Occasionally introduce random character transpositions or deletions (very rare)
        if (cleanWord.length > 4 && globalRandom.next() < (mistakeChance * 0.3)) {
            const mistakeType = globalRandom.nextInt(0, 2);

            if (mistakeType === 0) {
                // Transpose two adjacent characters
                const idx = globalRandom.nextInt(0, cleanWord.length - 2);
                const chars = cleanWord.split('');
                [chars[idx], chars[idx + 1]] = [chars[idx + 1], chars[idx]];
                return chars.join('') + punctuation;
            } else if (mistakeType === 1) {
                // Double a random character
                const idx = globalRandom.nextInt(0, cleanWord.length - 1);
                const chars = cleanWord.split('');
                chars.splice(idx + 1, 0, chars[idx]);
                return chars.join('') + punctuation;
            }
        }

        return word;
    });

    return modified.join('');
}

// Aggressive vocabulary shift for extreme word variation (HIGH PERPLEXITY)
function aggressiveVocabularyShift(text: string): string {
    const extremeSynonyms: { [key: string]: string[] } = {
        'the': ['a', 'this', 'that', 'such'],
        'very': ['exceptionally', 'remarkably', 'particularly', 'extraordinarily', 'tremendously'],
        'good': ['commendable', 'praiseworthy', 'exemplary', 'admirable', 'outstanding'],
        'bad': ['deplorable', 'lamentable', 'regrettable', 'unfortunate', 'unfavorable'],
        'thing': ['matter', 'aspect', 'element', 'component', 'facet', 'feature'],
        'way': ['manner', 'approach', 'methodology', 'technique', 'method', 'strategy'],
        'place': ['location', 'venue', 'setting', 'site', 'context'],
        'time': ['period', 'epoch', 'moment', 'interval', 'instance'],
        'people': ['individuals', 'persons', 'entities', 'parties', 'stakeholders'],
        'make': ['construct', 'fabricate', 'manufacture', 'assemble', 'formulate'],
        'have': ['possess', 'retain', 'maintain', 'hold', 'harbor'],
        'say': ['articulate', 'express', 'convey', 'assert', 'proclaim'],
    };

    let modified = text;
    Object.entries(extremeSynonyms).forEach(([word, synonyms]) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        modified = modified.replace(regex, (match) => {
            // 65% chance to replace with synonym
            if (globalRandom.next() < 0.65) {
                const synonymList = globalRandom.shuffle(synonyms);
                const replacement = globalRandom.choice(synonymList);
                // Preserve capitalization
                if (match[0] === match[0].toUpperCase()) {
                    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
                }
                return replacement;
            }
            return match;
        });
    });

    return modified;
}

// Extreme burstiness for high variation between sentences (HIGH BURSTINESS)
function extremeBurstiness(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const modified = sentences.map((sentence, index) => {
        const modulo = index % 3;

        if (modulo === 0) {
            // Super short sentence: truncate to 5-10 words
            const words = sentence.split(' ');
            if (words.length > 10) {
                const truncated = words.slice(0, globalRandom.nextInt(5, 10)).join(' ');
                return truncated.replace(/[,;].*$/, '') + '.'; // Remove trailing clauses
            }
            return sentence;
        } else if (modulo === 1) {
            // Super long: add expansive clauses
            const expansions = globalRandom.shuffle([
                ', which is to say,',
                ', in other words,',
                ', that is to say,',
                ', or more precisely,',
            ]);
            const expansion = globalRandom.choice(expansions);
            return sentence.replace(/\./, expansion) + ' ' + sentence.toLowerCase();
        } else {
            // Add hesitation/natural speech patterns
            const hesitations = globalRandom.shuffle([
                'Well, ',
                'You see, ',
                'Actually, ',
                'To be honest, ',
                'In fact, ',
            ]);
            if (globalRandom.next() < 0.6) {
                return hesitations[0] + sentence.charAt(0).toLowerCase() + sentence.slice(1);
            }
            return sentence;
        }
    });

    return modified.join(' ');
}

// Back-translation function to naturally paraphrase text
async function backTranslate(text: string, intensity: 'light' | 'medium' | 'heavy'): Promise<string> {
    // Different translation chains based on intensity
    const translationChains = {
        light: ['ja'], // English -> Japanese -> English
        medium: ['ja', 'es', 'de'], // English -> Japanese -> Spanish -> German -> English
        heavy: ['ja', 'de', 'fr', 'pt', 'it', 'ru', 'ko'], // English -> Japanese -> German -> French -> Portuguese -> Italian -> Russian -> Korean -> English
    };

    const languages = translationChains[intensity];
    let currentText = text;

    try {
        // Translate through each language in the chain
        for (const targetLang of languages) {
            const translatedText = await translateText(currentText, targetLang);
            if (translatedText) {
                currentText = translatedText;
            }
        }

        // Translate back to English
        const finalText = await translateText(currentText, 'en');
        return finalText || text; // Fallback to original if translation fails

    } catch (error) {
        console.error('Back-translation error:', error);
        return text; // Return original text if translation fails
    }
}

// Paraphrase text using OpenAI API for final polish
async function paraphraseWithOpenAI(text: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.warn('OpenAI API key not configured, skipping OpenAI paraphrasing');
        return text;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Cost-effective and high quality
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional paraphrasing assistant. Rewrite text while maintaining the exact meaning, tone, and academic quality. Use different sentence structures and vocabulary to make it sound natural and human-written.'
                    },
                    {
                        role: 'user',
                        content: `Paraphrase the following text completely while maintaining the same meaning and academic tone. Use different sentence structures and vocabulary. Make it sound natural and professional:\n\n${text}\n\nProvide only the paraphrased text without any explanation:`
                    }
                ],
                temperature: 0.7,
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('OpenAI API error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData
            });
            return text;
        }

        const data = await response.json();
        const paraphrasedText = data.choices?.[0]?.message?.content || text;
        return paraphrasedText.trim();

    } catch (error) {
        console.error('OpenAI paraphrasing error:', error);
        return text;
    }
}

// Paraphrase text using Gemini API for final polish
async function paraphraseWithGemini(text: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn('Gemini API key not configured, skipping final paraphrasing');
        return text;
    }

    const prompt = `Paraphrase the following text completely while maintaining the same meaning and academic tone. Use different sentence structures and vocabulary. Make it sound natural and professional:

${text}

Provide only the paraphrased text without any explanation:`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            console.error('Paraphrase API error:', response.status);
            return text;
        }

        const data = await response.json();
        const paraphrasedText = data.candidates?.[0]?.content?.parts?.[0]?.text || text;
        return paraphrasedText.trim();

    } catch (error) {
        console.error('Paraphrasing error:', error);
        return text;
    }
}

// Smart paraphrasing with fallback: tries OpenAI first, then Gemini
// NOTE: For better AI detection bypass, consider reducing paraphrasing intensity
async function paraphraseWithFallback(text: string, skipParaphrasing: boolean = false): Promise<string> {
    // If skipParaphrasing is true, return original text (for heavy humanization mode)
    if (skipParaphrasing) {
        console.log('Skipping AI paraphrasing for better detection bypass');
        return text;
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // OpenAI is temporarily disabled - skip to Gemini
    // Uncomment the code below to re-enable OpenAI paraphrasing
    /*
    if (openaiKey) {
        console.log('Attempting paraphrasing with OpenAI...');
        const result = await paraphraseWithOpenAI(text);
        if (result !== text) {
            console.log('OpenAI paraphrasing successful');
            return result;
        }
        console.log('OpenAI paraphrasing failed, trying Gemini...');
    }
    */

    // Use Gemini as primary paraphrasing method
    if (geminiKey) {
        console.log('Attempting paraphrasing with Gemini...');
        const result = await paraphraseWithGemini(text);
        if (result !== text) {
            console.log('Gemini paraphrasing successful');
            return result;
        }
    }

    console.warn('All paraphrasing APIs failed or not configured, returning original text');
    return text;
}

// Helper function to translate text using Google Translate API
async function translateText(text: string, targetLang: string): Promise<string | null> {
    try {
        // Using Google Translate API (free tier)
        const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

        if (!apiKey) {
            console.warn('Google Translate API key not configured, skipping translation');
            return null;
        }

        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: targetLang,
                format: 'text',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Translation API error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData,
                targetLang,
                textLength: text.length
            });
            return null;
        }

        const data = await response.json();
        const translatedText = data.data?.translations?.[0]?.translatedText || null;

        if (translatedText) {
            console.log(`✓ Translated to ${targetLang} (${text.length} → ${translatedText.length} chars)`);
        }

        return translatedText;

    } catch (error) {
        console.error('Translation error:', error);
        return null;
    }
}

// Add discourse markers for natural flow
function addDiscourseMarkers(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const discourseMarkers = {
        start: ['I mean,', 'You know,', 'Like,', 'Well,', 'Actually,', 'So,', 'Basically,', 'Honestly,', 'Frankly,', 'Look,', 'See,', 'Here\'s the thing,', 'The point is,', 'What I\'m saying is,'],
        mid: [', I mean,', ', you know,', ', like,', ', well,', ', actually,', ', basically,', ', honestly,', ', frankly,'],
        transition: ['Anyway,', 'Anyhow,', 'At any rate,', 'In any case,', 'By the way,', 'That said,', 'Mind you,', 'Still,', 'Yet,', 'Even so,'],
    };

    const modified = sentences.map((sentence, index) => {
        if (globalRandom.next() < 0.15 && sentence.length > 30) {
            // Add at start of sentence
            if (globalRandom.next() < 0.6) {
                const marker = globalRandom.choice(globalRandom.shuffle(discourseMarkers.start));
                return `${marker} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
            }
            // Add in middle
            else if (sentence.includes(' ') && globalRandom.next() < 0.5) {
                const words = sentence.split(' ');
                const insertPoint = globalRandom.nextInt(Math.floor(words.length / 3), Math.floor(words.length * 2 / 3));
                const marker = globalRandom.choice(globalRandom.shuffle(discourseMarkers.mid));
                words.splice(insertPoint, 0, marker);
                return words.join(' ');
            }
        }
        return sentence;
    });

    return modified.join(' ');
}

// Add comma splicing for natural, casual flow
function addCommaSplicing(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const modified = sentences.map((sentence, index) => {
        // Only apply to mid-range sentences
        if (sentence.length < 60 || sentence.length > 150) return sentence;

        // Find clauses that could be comma-spliced (with conjunctions)
        const conjunctions = ['and', 'but', 'or', 'yet', 'so', 'because'];

        for (const conj of conjunctions) {
            const conjPattern = new RegExp(`\\s+${conj}\\s+`, 'gi');
            if (conjPattern.test(sentence) && globalRandom.next() < 0.2) {
                // Replace period + conjunction with comma + conjunction (casual style)
                const spliced = sentence.replace(conjPattern, `, ${conj} `);
                return spliced.replace(/\.$/, '');
            }
        }

        return sentence;
    });

    return modified.join('. ');
}

// Add conditional reasoning patterns
function addConditionalReasoning(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const conditionalStarters = [
        'If we consider', 'Should we examine', 'Assuming', 'Granted that', 'Provided that',
        'In the event that', 'Unless we recognize', 'Once we understand', 'To the extent that',
    ];

    const conditionalConnectors = [
        'then it follows that', 'we can deduce that', 'this suggests that', 'one might conclude',
        'it becomes clear that', 'this implies', 'we should consider', 'it reasonably follows',
    ];

    const modified = paragraphs.map((para, pIndex) => {
        if (pIndex === 0 || globalRandom.next() > 0.3) return para;

        const sentences = para.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        if (sentences.length < 2) return para;

        // Chain 2-3 sentences with conditional logic
        if (globalRandom.next() < 0.4) {
            const chainStart = globalRandom.nextInt(0, Math.max(0, sentences.length - 2));
            const starter = globalRandom.choice(globalRandom.shuffle(conditionalStarters));
            const connector = globalRandom.choice(globalRandom.shuffle(conditionalConnectors));

            if (sentences[chainStart].length > 30) {
                sentences[chainStart] = `${starter} ${sentences[chainStart].toLowerCase()}, ${connector} ${sentences[chainStart + 1].charAt(0).toLowerCase()}${sentences[chainStart + 1].slice(1)}`;
                sentences.splice(chainStart + 1, 1);
            }
        }

        return sentences.join(' ');
    });

    return modified.join('\n\n');
}

// Add interrupted sentence completion patterns
function addInterruptedSentences(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const interruptionPatterns = [
        { pattern: 'or rather', weight: 0.3 },
        { pattern: 'more accurately', weight: 0.25 },
        { pattern: 'that is to say', weight: 0.2 },
        { pattern: 'in other words', weight: 0.25 },
        { pattern: 'or perhaps', weight: 0.2 },
        { pattern: 'better stated as', weight: 0.15 },
        { pattern: 'let me clarify', weight: 0.15 },
    ];

    const modified = sentences.map(sentence => {
        if (sentence.length < 50 || globalRandom.next() > 0.12) return sentence;

        const words = sentence.split(' ');
        if (words.length < 8) return sentence;

        // Find a natural breakpoint (after a clause)
        const breakPoint = globalRandom.nextInt(Math.floor(words.length / 3), Math.floor(words.length * 2 / 3));

        if (breakPoint > 0 && breakPoint < words.length - 1) {
            const pattern = globalRandom.choice(globalRandom.shuffle(interruptionPatterns));
            const firstPart = words.slice(0, breakPoint).join(' ');
            const secondPart = words.slice(breakPoint).join(' ');

            // Create interrupted effect with em-dash or comma
            if (globalRandom.next() < 0.6) {
                return `${firstPart}—${pattern.pattern}, ${secondPart}`;
            } else {
                return `${firstPart}, ${pattern.pattern}, ${secondPart}`;
            }
        }

        return sentence;
    });

    return modified.join(' ');
}

// Add metaphor and analogy weaving
function addMetaphorAndAnalogy(text: string): string {
    const metaphors: { [key: string]: string[] } = {
        'process': ['journey', 'pathway', 'progression', 'unfolding', 'trajectory'],
        'growth': ['blossoming', 'flowering', 'maturation', 'expansion', 'development'],
        'decline': ['erosion', 'withering', 'diminishment', 'regression', 'deterioration'],
        'understanding': ['grasping', 'seizing', 'capturing', 'embracing', 'penetrating'],
        'complexity': ['labyrinth', 'tapestry', 'web', 'mosaic', 'intricate network'],
        'clarity': ['light', 'illumination', 'beacon', 'clarity', 'crystalline'],
        'foundation': ['bedrock', 'cornerstone', 'anchor', 'pillar', 'base'],
        'support': ['scaffold', 'framework', 'buttress', 'backbone', 'infrastructure'],
        'challenge': ['obstacle', 'hurdle', 'barrier', 'wall', 'summit'],
        'breakthrough': ['breakthrough', 'watershed', 'turning point', 'leap', 'rupture'],
    };

    const analogies = [
        'much like', 'similar to', 'akin to', 'analogous to', 'comparable to',
        'as one might', 'as if', 'not unlike', 'in the same way that', 'just as',
    ];

    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const modified = sentences.map(sentence => {
        // Only apply to longer sentences
        if (sentence.length < 70 || globalRandom.next() > 0.15) return sentence;

        // Find keywords that could use metaphorical enhancement
        for (const [keyword, metaphorOptions] of Object.entries(metaphors)) {
            if (sentence.toLowerCase().includes(keyword)) {
                if (globalRandom.next() < 0.5) {
                    // Add a metaphorical phrase
                    const metaphor = globalRandom.choice(globalRandom.shuffle(metaphorOptions));
                    const words = sentence.split(' ');
                    const insertPoint = globalRandom.nextInt(Math.floor(words.length / 2), words.length - 2);
                    words.splice(insertPoint, 0, `(much like a ${metaphor}),`);
                    return words.join(' ');
                }
            }
        }

        // Add standalone analogy/comparison
        if (globalRandom.next() < 0.3) {
            const analogy = globalRandom.choice(globalRandom.shuffle(analogies));
            const words = sentence.split(' ');
            const insertPoint = globalRandom.nextInt(2, words.length - 3);

            const comparisons = [
                'a researcher exploring new territory',
                'an explorer charting unknown waters',
                'a craftsperson refining their technique',
                'an architect designing a structure',
                'a gardener cultivating growth',
                'a musician finding harmony',
                'a sculptor revealing form',
                'a weaver creating patterns',
            ];

            const comparison = globalRandom.choice(globalRandom.shuffle(comparisons));
            words.splice(insertPoint, 0, `${analogy} ${comparison},`);
            return words.join(' ');
        }

        return sentence;
    });

    return modified.join(' ');
}


// Master function to apply all humanization techniques
function applyAdvancedHumanization(text: string, intensity: 'light' | 'medium' | 'heavy' = 'medium'): string {
    let humanized = text;

    // Apply different levels of transformation based on intensity
    switch (intensity) {
        case 'light':
            // Light mode: minimal changes, AI-assisted
            humanized = varyPunctuation(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = rewriteFirstParagraph(humanized);
            humanized = rewriteConcludingParagraph(humanized);
            humanized = addDiscourseMarkers(humanized);
            // Light spelling mistakes
            humanized = introduceSpellingMistakes(humanized, 'light');
            // Light grammatical errors
            humanized = addGrammaticalErrors(humanized, 'light');
            // Simplify complex terms in introduction and conclusion
            humanized = simplifyIntroductionAndConclusion(humanized);
            break;

        case 'medium':
            // Medium mode: substantial transformation without AI
            humanized = paraphraseSentences(humanized, 'medium');
            humanized = rewriteFirstParagraph(humanized);
            humanized = restructureSentences(humanized, 'medium');
            humanized = addAcademicTransitions(humanized);
            humanized = addDiscourseMarkers(humanized);
            humanized = addConditionalReasoning(humanized);
            humanized = addMetaphorAndAnalogy(humanized);
            humanized = varyPunctuation(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = varyRhythm(humanized);
            humanized = varyWordCountInSentences(humanized);
            humanized = addFillerWords(humanized);
            humanized = varySentenceComplexity(humanized, 'medium');
            humanized = addAcademicHedging(humanized);
            humanized = rewriteConcludingParagraph(humanized);
            // Medium spelling mistakes
            humanized = introduceSpellingMistakes(humanized, 'medium');
            // Medium grammatical errors
            humanized = addGrammaticalErrors(humanized, 'medium');
            // Simplify complex terms in introduction and conclusion
            humanized = simplifyIntroductionAndConclusion(humanized);
            break;

        case 'heavy':
            // Heavy mode: maximum transformation without AI
            // AGGRESSIVE PERPLEXITY + BURSTINESS
            humanized = paraphraseSentences(humanized, 'heavy');
            humanized = aggressiveVocabularyShift(humanized);  // NEW: Extreme word variation
            humanized = rewriteFirstParagraph(humanized);
            humanized = restructureSentences(humanized, 'heavy');
            humanized = addAcademicTransitions(humanized);
            humanized = addDiscourseMarkers(humanized);
            humanized = addConditionalReasoning(humanized);
            humanized = addMetaphorAndAnalogy(humanized);
            humanized = addInterruptedSentences(humanized);
            humanized = addCommaSplicing(humanized);
            humanized = addNaturalImperfections(humanized);
            humanized = varyPunctuation(humanized);
            humanized = addFillerWords(humanized);
            humanized = addFormattingVariations(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = varyRhythm(humanized);
            humanized = varyWordCountInSentences(humanized);
            humanized = addInterjections(humanized);
            humanized = varySentenceComplexity(humanized, 'heavy');
            humanized = createFrequentSentenceBreaks(humanized, 'heavy');  // Aggressive sentence breaking
            humanized = extremeBurstiness(humanized);  // NEW: Extreme sentence variation
            humanized = addAcademicHedging(humanized);
            humanized = rewriteConcludingParagraph(humanized);
            // Heavy spelling mistakes
            humanized = introduceSpellingMistakes(humanized, 'heavy');
            // Heavy grammatical errors
            humanized = addGrammaticalErrors(humanized, 'heavy');
            // Simplify complex terms in introduction and conclusion
            humanized = simplifyIntroductionAndConclusion(humanized);
            break;
    }

    // ALWAYS apply grammar and spelling fixes at the end (after all transformations)
    humanized = fixGrammarAndSpelling(humanized);

    return humanized;
}

export async function POST(request: NextRequest) {
    try {
        // Initialize random seed for this request to ensure unique output each time
        // Use timestamp + random component to ensure different results for same input
        globalRandom = new SeededRandom(Date.now() + Math.floor(Math.random() * 1000000));

        // Parse the request body
        const { text, intensity = 'medium' } = await request.json();

        // Validate input
        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text is required and must be a string' },
                { status: 400 }
            );
        }

        if (text.length < 10) {
            return NextResponse.json(
                { error: 'Text must be at least 10 characters long' },
                { status: 400 }
            );
        }

        if (text.length > 100000) {
            return NextResponse.json(
                { error: 'Text must be less than 100,000 characters' },
                { status: 400 }
            );
        }

        let processedText = text;

        // ============================================================================
        // STEP 1: BACK-TRANSLATION (for medium and heavy modes)
        // This naturally paraphrases the text through translation chains
        // Always use 'heavy' for maximum perplexity
        // ============================================================================
        if (intensity === 'medium' || intensity === 'heavy') {
            console.log('Applying back-translation...');
            // Force 'heavy' mode for back-translation to maximize perplexity
            processedText = await backTranslate(text, 'heavy');
            console.log('Back-translation complete');
        }

        // ============================================================================
        // STEP 2: AI PROCESSING (only for light mode)
        // ============================================================================
        // Only use AI for "light" mode
        if (intensity === 'light') {
            // Check if API key is configured
            if (!process.env.GEMINI_API_KEY) {
                return NextResponse.json(
                    { error: 'API key not configured for light mode. Please add GEMINI_API_KEY to .env.local or use medium/heavy mode.' },
                    { status: 500 }
                );
            }

            // Craft the humanization prompt for light mode
            const prompt = `You are an expert text humanizer. Your task is to rewrite the following text to make it sound more natural and human-written while preserving the original meaning and maintaining a professional academic tone.

Guidelines:
- Remove overly formal or robotic language
- Use more varied sentence structures
- Add natural transitions and flow
- Keep the same core message and facts
- Make it sound like a real person wrote it
- Maintain professional and academic tone
- Avoid repetitive phrases like "it is important to note" or "studies show"
- Vary sentence length for better rhythm

Original text:
${text}

Rewrite this text to sound more human and natural while keeping it professional:`;

            // Use the REST API directly with v1beta endpoint and gemini-flash-latest model
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt,
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Extract the humanized text from the response
            const aiHumanizedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            if (!aiHumanizedText) {
                throw new Error('No text generated from API');
            }

            processedText = aiHumanizedText.trim();
        }

        // ============================================================================
        // STEP 3: POST-PROCESSING - Apply rule-based humanization
        // For "light" mode: minimal post-processing after AI
        // For "medium" and "heavy" modes: aggressive post-processing after back-translation
        // ============================================================================

        // Apply advanced humanization post-processing
        let finalHumanizedText = applyAdvancedHumanization(
            processedText,
            intensity as 'light' | 'medium' | 'heavy'
        );

        // ============================================================================
        // STEP 4: AGGRESSIVE HUMANIZATION - Break AI patterns
        // ============================================================================
        console.log('Applying aggressive humanization techniques...');

        // Apply aggressive techniques to ALL intensities (increased coverage)
        finalHumanizedText = addConversationalTone(finalHumanizedText);
        finalHumanizedText = addMoreContractions(finalHumanizedText);
        finalHumanizedText = breakPerfectStructures(finalHumanizedText);
        finalHumanizedText = varySentenceBeginnings(finalHumanizedText);
        finalHumanizedText = addNaturalRedundancy(finalHumanizedText);

        // Add incomplete thoughts for medium and heavy
        if (intensity === 'medium' || intensity === 'heavy') {
            finalHumanizedText = addIncompleteThoughts(finalHumanizedText);
        }

        console.log('Aggressive humanization complete');

        // ============================================================================
        // STEP 5: FINAL PARAPHRASING - Polish the text with AI (OpenAI or Gemini)
        // NOTE: Skipped for medium and heavy modes to avoid making text too perfect
        // ============================================================================
        console.log('Applying final paraphrasing...');

        // Skip paraphrasing for medium and heavy modes (it makes text too AI-like)
        const skipParaphrasing = intensity === 'medium' || intensity === 'heavy';
        finalHumanizedText = await paraphraseWithFallback(finalHumanizedText, skipParaphrasing);

        console.log('Final paraphrasing complete');

        // ============================================================================
        // STEP 6: ADD GRAMMAR AND SPELLING ERRORS - Make it more human-like
        // ============================================================================
        console.log('Adding final grammar and spelling errors...');

        // Add spelling mistakes based on intensity
        if (intensity === 'light') {
            finalHumanizedText = introduceSpellingMistakes(finalHumanizedText, 'light');
            finalHumanizedText = addGrammaticalErrors(finalHumanizedText, 'light');
        } else if (intensity === 'medium') {
            finalHumanizedText = introduceSpellingMistakes(finalHumanizedText, 'medium');
            finalHumanizedText = addGrammaticalErrors(finalHumanizedText, 'medium');
        } else if (intensity === 'heavy') {
            finalHumanizedText = introduceSpellingMistakes(finalHumanizedText, 'heavy');
            finalHumanizedText = addGrammaticalErrors(finalHumanizedText, 'heavy');
        }

        console.log('Grammar and spelling errors added');

        // Return the humanized text
        return NextResponse.json({
            success: true,
            originalText: text,
            humanizedText: finalHumanizedText,
            originalLength: text.length,
            humanizedLength: finalHumanizedText.length,
            intensity: intensity,
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Humanization error:', error);

        return NextResponse.json(
            {
                error: 'Failed to humanize text',
                details: errorMessage
            },
            { status: 500 }
        );
    }
}
