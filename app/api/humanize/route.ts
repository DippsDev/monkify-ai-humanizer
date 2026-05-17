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
        'in practice'
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

// Add contextual interjections
function addInterjections(text: string): string {
    const interjections = globalRandom.shuffle(['Indeed', 'Notably', 'Interestingly', 'Clearly', 'Evidently']);
    const sentences = text.split('. ');

    if (sentences.length > 2 && globalRandom.next() < 0.3) {
        const randomIndex = globalRandom.nextInt(0, sentences.length - 1);
        const interjection = globalRandom.choice(interjections);
        sentences[randomIndex] = `${interjection}, ${sentences[randomIndex].toLowerCase()}`;
    }

    return sentences.join('. ');
}

// Completely rewrite the first paragraph with a different approach
function rewriteFirstParagraph(text: string): string {
    // Split text into paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    if (paragraphs.length === 0) return text;

    const firstParagraph = paragraphs[0];
    const sentences = firstParagraph.split('. ').filter(s => s.trim().length > 0);

    if (sentences.length === 0) return text;

    // Extract the core subject from the first sentence to maintain topic clarity
    const firstSentence = sentences[0].trim();

    // Different opening strategies - professional and topic-focused
    const openingStrategies = [
        // Direct professional opening - keeps original sentence structure
        () => {
            // Just add a subtle professional transition word at the start occasionally
            const transitions = globalRandom.shuffle(['Notably,', 'Importantly,', 'Significantly,', 'Essentially,']);
            if (globalRandom.next() < 0.3 && firstSentence.length > 30) {
                return `${globalRandom.choice(transitions)} ${firstSentence.charAt(0).toLowerCase() + firstSentence.slice(1)}`;
            }
            return firstSentence;
        },
        // Contextual framing - maintains topic
        () => {
            // Only add context if it makes sense
            const contextPhrases = globalRandom.shuffle([
                'When examining this topic,',
                'In analyzing this subject,',
                'Considering this matter,'
            ]);
            if (globalRandom.next() < 0.4) {
                return `${globalRandom.choice(contextPhrases)} ${firstSentence.charAt(0).toLowerCase() + firstSentence.slice(1)}`;
            }
            return firstSentence;
        },
        // Keep original with minor variation
        () => {
            // Replace "This" or "The" at the start with alternatives
            if (firstSentence.startsWith('This ')) {
                const replacements = globalRandom.shuffle(['This particular', 'This specific', 'This']);
                return firstSentence.replace('This', globalRandom.choice(replacements));
            } else if (firstSentence.startsWith('The ')) {
                const replacements = globalRandom.shuffle(['The', 'The particular', 'The specific']);
                return firstSentence.replace('The', globalRandom.choice(replacements));
            }
            return firstSentence;
        },
        // Minimal change - just keep it as is
        () => {
            return firstSentence;
        }
    ];

    // Choose a random strategy
    const strategy = globalRandom.choice(openingStrategies);
    let rewrittenFirst = strategy();

    // Add the rest of the sentences from first paragraph with minimal professional connectors
    if (sentences.length > 1) {
        const restOfSentences = sentences.slice(1).map((sentence, index) => {
            // Only occasionally add connectors to maintain natural flow
            const connectors = globalRandom.shuffle(['Furthermore', 'Moreover', 'Additionally', 'In addition']);
            if (index === 0 && globalRandom.next() < 0.25) {
                return `${globalRandom.choice(connectors)}, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
            }
            return sentence;
        });
        rewrittenFirst += '. ' + restOfSentences.join('. ');
    }

    // Reconstruct the full text with rewritten first paragraph
    paragraphs[0] = rewrittenFirst;
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

// Back-translation function to naturally paraphrase text
async function backTranslate(text: string, intensity: 'light' | 'medium' | 'heavy'): Promise<string> {
    // Different translation chains based on intensity
    const translationChains = {
        light: ['ja'], // English -> Japanese -> English
        medium: ['ja', 'es'], // English -> Japanese -> Spanish -> English
        heavy: ['ja', 'de', 'fr'], // English -> Japanese -> German -> French -> English
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
            break;

        case 'medium':
            // Medium mode: substantial transformation without AI
            humanized = paraphraseSentences(humanized, 'medium');
            humanized = rewriteFirstParagraph(humanized);
            humanized = restructureSentences(humanized, 'medium');
            humanized = addAcademicTransitions(humanized);
            humanized = varyPunctuation(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = varyRhythm(humanized);
            humanized = addFillerWords(humanized);
            humanized = varySentenceComplexity(humanized, 'medium');
            humanized = addAcademicHedging(humanized);
            humanized = rewriteConcludingParagraph(humanized);
            break;

        case 'heavy':
            // Heavy mode: maximum transformation without AI
            humanized = paraphraseSentences(humanized, 'heavy');
            humanized = rewriteFirstParagraph(humanized);
            humanized = restructureSentences(humanized, 'heavy');
            humanized = addAcademicTransitions(humanized);
            humanized = addNaturalImperfections(humanized);
            humanized = varyPunctuation(humanized);
            humanized = addFillerWords(humanized);
            humanized = addFormattingVariations(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = varyRhythm(humanized);
            humanized = addInterjections(humanized);
            humanized = varySentenceComplexity(humanized, 'heavy');
            humanized = addAcademicHedging(humanized);
            humanized = rewriteConcludingParagraph(humanized);
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
        // ============================================================================
        if (intensity === 'medium' || intensity === 'heavy') {
            console.log('Applying back-translation...');
            processedText = await backTranslate(text, intensity as 'light' | 'medium' | 'heavy');
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
        const finalHumanizedText = applyAdvancedHumanization(
            processedText,
            intensity as 'light' | 'medium' | 'heavy'
        );

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
