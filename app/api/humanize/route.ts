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

// Add conversational elements and personal voice - OPTIMIZED FOR 80%+ SCORE
function addConversationalTone(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // PROTECT INTRODUCTION - Skip first paragraph entirely
        if (paragraphIndex === 0) return paragraph;

        let sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        sentences = sentences.map((sentence, sentIndex) => {
            // Stacking guard: a sentence that already opens with a starter/
            // connector must not collect another one.
            if (/^\s*(Research suggests|Studies indicate|Evidence shows|Analysis reveals|Findings demonstrate|Observations suggest|Data indicates|Experts note|Scholars argue|It's worth noting|One could argue|It appears|It seems|Many believe|Some suggest|Research has shown|Experience tells|History shows|In fact|What's more|Interestingly|Notably|In this context|From this perspective|To put it|In other words|More specifically|For instance|As an example|Particularly|Especially|Importantly|Significantly|Clearly|Indeed|Certainly|Admittedly|That said|Still|Yet|Even so|In practice|In effect|One might|It's interesting|Looking at|Upon closer|From this angle|Taking a step|If we think|Considering this)\b/i.test(sentence)) {
                return sentence;
            }
            // Add professional academic starters - OPTIMIZED frequency
            if (globalRandom.next() < 0.22 && sentence.length > 40) {
                const conversationalStarters = [
                    "Research suggests that ",
                    "Studies indicate that ",
                    "Evidence shows that ",
                    "Analysis reveals that ",
                    "Findings demonstrate that ",
                    "Observations suggest that ",
                    "Data indicates that ",
                    "Experts note that ",
                    "Scholars argue that ",
                    "It's worth noting that ",
                    "One could argue that ",
                    "It appears that ",
                    "It seems that ",
                    "Many believe that ",
                    "Some suggest that ",
                    "Research has shown that ",
                    "Experience tells us that ",
                    "History shows that ",
                ];
                const starter = globalRandom.choice(conversationalStarters);
                sentence = starter + sentence.charAt(0).toLowerCase() + sentence.slice(1);
            }

            // Add natural connectors - OPTIMIZED for consistency
            if (sentIndex > 0 && globalRandom.next() < 0.20 && sentence.length > 25) {
                const connectors = [
                    "In fact, ",
                    "What's more, ",
                    "Interestingly, ",
                    "Notably, ",
                    "In this context, ",
                    "From this perspective, ",
                    "To put it differently, ",
                    "In other words, ",
                    "More specifically, ",
                    "For instance, ",
                    "As an example, ",
                    "Particularly, ",
                    "Especially, ",
                ];
                const connector = globalRandom.choice(connectors);
                sentence = connector + sentence.charAt(0).toLowerCase() + sentence.slice(1);
            }

            return sentence;
        });

        return sentences.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Add incomplete thoughts and self-corrections (very human) - SKIP FIRST PARAGRAPH - IMPROVED
function addIncompleteThoughts(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // PROTECT INTRODUCTION - Skip first paragraph
        if (paragraphIndex === 0) return paragraph;

        const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        const modified = sentences.map(sentence => {
            // Add self-corrections - OPTIMIZED for authenticity
            if (globalRandom.next() < 0.10 && sentence.length > 60) {
                // Only add corrections at commas or conjunctions to avoid awkward repetitions
                if (sentence.includes(',') || sentence.includes(' and ') || sentence.includes(' but ')) {
                    const corrections = [
                        ", that is to say,",
                        ", or rather,",
                        ", in other words,",
                    ];

                    const correction = globalRandom.choice(corrections);

                    // Replace first comma with correction (more natural placement)
                    if (sentence.includes(',')) {
                        sentence = sentence.replace(',', correction);
                    }
                }
            }

            return sentence;
        });

        return modified.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// MAXIMUM sentence structure variation - SKIP FIRST PARAGRAPH
function breakPerfectStructures(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // PROTECT INTRODUCTION - Skip first paragraph
        if (paragraphIndex === 0) return paragraph;

        const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        const modified = sentences.map(sentence => {
            // MAXIMUM sentence splitting for natural flow - OPTIMIZED
            if (sentence.length > 65 && globalRandom.next() < 0.50) {
                const words = sentence.split(' ');
                const splitPoint = globalRandom.nextInt(Math.floor(words.length / 2) - 3, Math.floor(words.length / 2) + 3);

                if (splitPoint > 0 && splitPoint < words.length - 1) {
                    const firstPart = words.slice(0, splitPoint).join(' ');
                    const secondPart = words.slice(splitPoint).join(' ');

                    // Use MORE different punctuation styles for variety
                    const splitStyle = globalRandom.next();
                    if (splitStyle < 0.3) {
                        return `${firstPart}—${secondPart}`;
                    } else if (splitStyle < 0.6) {
                        return `${firstPart}; ${secondPart.charAt(0).toLowerCase()}${secondPart.slice(1)}`;
                    } else if (splitStyle < 0.8) {
                        // Add a comma with a conjunction
                        const conjunctions = ['and', 'but', 'yet', 'so', 'for'];
                        const conj = globalRandom.choice(conjunctions);
                        return `${firstPart}, ${conj} ${secondPart.charAt(0).toLowerCase()}${secondPart.slice(1)}`;
                    } else {
                        // Split into two sentences
                        return `${firstPart}. ${secondPart.charAt(0).toUpperCase()}${secondPart.slice(1)}`;
                    }
                }
            }

            // Add parenthetical asides for natural human writing - OPTIMIZED
            if (sentence.length > 50 && globalRandom.next() < 0.22) {
                const words = sentence.split(' ');
                const insertPoint = globalRandom.nextInt(Math.floor(words.length / 3), Math.floor(words.length * 2 / 3));

                const asides = [
                    'of course',
                    'naturally',
                    'as expected',
                    'in this case',
                    'for instance',
                    'to be clear',
                    'in fact',
                    'as it happens',
                    'interestingly enough',
                    'surprisingly',
                ];

                const aside = globalRandom.choice(asides);
                words.splice(insertPoint, 0, `(${aside})`);
                sentence = words.join(' ');
            }

            return sentence;
        });

        return modified.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Enhanced contractions for more natural human writing
function addMoreContractions(text: string): string {
    let modified = text;

    // Balanced contraction replacement for natural flow
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
        { full: /\bI will\b/gi, short: "I'll" },
        { full: /\bwe will\b/gi, short: "we'll" },
        { full: /\bthey will\b/gi, short: "they'll" },
        { full: /\byou will\b/gi, short: "you'll" },
        { full: /\bhe will\b/gi, short: "he'll" },
        { full: /\bshe will\b/gi, short: "she'll" },
        { full: /\bit will\b/gi, short: "it'll" },
        { full: /\bI would\b/gi, short: "I'd" },
        { full: /\bwe would\b/gi, short: "we'd" },
        { full: /\bthey would\b/gi, short: "they'd" },
        { full: /\byou would\b/gi, short: "you'd" },
        { full: /\bhe would\b/gi, short: "he'd" },
        { full: /\bshe would\b/gi, short: "she'd" },
        { full: /\bI have\b/gi, short: "I've" },
        { full: /\bwe have\b/gi, short: "we've" },
        { full: /\bthey have\b/gi, short: "they've" },
        { full: /\byou have\b/gi, short: "you've" },
    ];

    contractions.forEach(({ full, short }) => {
        // Apply contractions with 70% probability for maximum natural feel
        modified = modified.replace(full, (match) => {
            return globalRandom.next() < 0.70 ? short : match;
        });
    });

    return modified;
}

// Vary sentence beginnings — only when the same opener repeats within the
// last 3 sentences (otherwise every sentence collects an opener and they
// stack: "That said, certainly, ..."). Also skips already-opened sentences.
function varySentenceBeginnings(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    // Track sentence beginnings to avoid repetition
    const beginnings: string[] = [];

    const modified = sentences.map((sentence) => {
        if (/^\s*(Additionally|Also|Plus|What's more|On top of that|Besides|In addition|Beyond that|Equally important|Similarly|Likewise|At the same time|Simultaneously|Notably|Importantly|Significantly|Interestingly|Indeed|Clearly|Evidently|Obviously|Certainly|Undoubtedly|Surely|Frankly|Honestly|Admittedly|In practice|In effect|In fact|That said|Still|Yet|Even so|Anyway|Basically|Actually|Well|So|Like|Look|See|It's|One might|Research|Studies|Evidence|Analysis|Findings|Observations|Data|Experts|Scholars)\b/i.test(sentence)) {
            beginnings.push(sentence.split(' ')[0].toLowerCase());
            return sentence;
        }
        const firstWord = sentence.split(' ')[0].toLowerCase();

        // If we've used this beginning recently, change it MORE AGGRESSIVELY
        if (beginnings.slice(-3).includes(firstWord) && globalRandom.next() < 0.85) {
            const alternatives = [
                "Additionally, ",
                "Also, ",
                "Plus, ",
                "What's more, ",
                "On top of that, ",
                "Besides, ",
                "In addition, ",
                "Beyond that, ",
                "Equally important, ",
                "Similarly, ",
                "Likewise, ",
                "At the same time, ",
                "Simultaneously, ",
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
            if (globalRandom.next() < 0.15 && sentence.length > 50) { // Increased from 0.12
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

            // Stacking guard: never prefix a sentence that already opens with an
            // opener/transition word — prevents "Significantly, it is worth
            // noting, significantly, ..." pile-ups.
            const alreadyOpened = /^(Significantly|Notably|Importantly|Interestingly|Indeed|Clearly|Evidently|Obviously|Certainly|Undoubtedly|Surely|In fact|As it turns out|One might argue|It's worth noting|It is worth noting)\b/i.test(sentence.trim());

            // Vary word count based on current length
            if (!alreadyOpened && globalRandom.next() < 0.4) {
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
                // Add variety to medium sentences — insert at clause boundary
                // (after comma) or sentence start, never mid-phrase.
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

                        const qualifier = globalRandom.choice(qualifiers);
                        if (sentence.includes(',')) {
                            sentence = sentence.replace(',', `, ${qualifier}`);
                        } else {
                            sentence = `${qualifier.charAt(0).toUpperCase() + qualifier.slice(1)} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
                        }
                    }
                }
            }

            return sentence;
        });

        return modified.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Add subtle variations without awkward repetitions - IMPROVED
function addNaturalImperfections(text: string): string {
    const sentences = text.split('. ');
    const modifiedSentences = sentences.map((sentence) => {
        // Add natural pauses with em-dashes instead of repetitions (2% chance - very subtle)
        if (globalRandom.next() < 0.02 && sentence.length > 40) {
            // Add a natural pause at a logical break point (comma or conjunction)
            if (sentence.includes(',')) {
                // Replace a comma with an em-dash for emphasis (no repetition)
                const commaIndex = sentence.indexOf(',');
                if (commaIndex > 10 && commaIndex < sentence.length - 10) {
                    sentence = sentence.replace(',', '—');
                }
            }
        }
        return sentence;
    });
    return modifiedSentences.join('. ');
}

// Add natural thinking patterns and hesitations
function addThinkingPatterns(text: string): string {
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    const modifiedParagraphs = paragraphs.map((paragraph, paragraphIndex) => {
        // Skip first paragraph
        if (paragraphIndex === 0) return paragraph;

        const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

        const modified = sentences.map((sentence, sentIndex) => {
            // Skip sentences that already open with an opener (stacking guard)
            if (/^\s*(It's interesting|What's particularly|One might|It's worth|Looking at|Upon closer|From this|Taking a|If we|Considering|Notably|Importantly|Significantly|Interestingly|Indeed|Clearly)\b/i.test(sentence)) {
                return sentence;
            }
            // Add thinking patterns occasionally - INCREASED
            if (globalRandom.next() < 0.12 && sentence.length > 40 && sentIndex > 0) {
                const thinkingPatterns = [
                    "It's interesting to note that ",
                    "What's particularly noteworthy is that ",
                    "One might observe that ",
                    "It's worth considering that ",
                    "Looking at this more closely, ",
                    "Upon closer examination, ",
                    "From this angle, ",
                    "Taking a step back, ",
                    "If we think about it, ",
                    "Considering this further, ",
                ];
                const pattern = globalRandom.choice(thinkingPatterns);
                sentence = pattern + sentence.charAt(0).toLowerCase() + sentence.slice(1);
            }
            return sentence;
        });

        return modified.join(' ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Flow variations — RARE rhetorical questions only (0.08 → 0.03).
// The old rate inserted "Why is this important?" into formal academic prose,
// which reads as broken. Now max one question per text, never stacked.
function addFlowVariations(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    let inserted = false;
    const modified = sentences.map((sentence, index) => {
        if (inserted || index === 0) return sentence;
        // Skip sentences that already open with an opener/question
        if (/^\s*(Why is|What does|How does|Why does|What's|Notably|Importantly|Significantly|Interestingly|Indeed|Clearly|In fact|That said|Still|Yet|One might|It's)\b/i.test(sentence)) {
            return sentence;
        }
        if (globalRandom.next() < 0.03 && sentence.length > 60) {
            const questionStarters = [
                "Why is this important? ",
                "What does this mean? ",
                "Why does this matter? ",
            ];
            const starter = globalRandom.choice(questionStarters);
            inserted = true;
            return starter + sentence;
        }
        return sentence;
    });

    return modified.join(' ');
}

// Add perplexity - vary word choice unpredictably (KEY for 80%+)
function addPerplexity(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const modified = sentences.map((sentence) => {
        // Randomly restructure some sentences for unpredictability
        if (globalRandom.next() < 0.15 && sentence.length > 60) {
            // Add unexpected word choices
            const unexpectedPhrases = [
                { pattern: /\bvery important\b/gi, replacement: 'crucial' },
                { pattern: /\bvery good\b/gi, replacement: 'excellent' },
                { pattern: /\bvery bad\b/gi, replacement: 'problematic' },
                { pattern: /\ba lot of\b/gi, replacement: 'numerous' },
                { pattern: /\bin order to\b/gi, replacement: 'to' },
                { pattern: /\bdue to the fact that\b/gi, replacement: 'because' },
                { pattern: /\bat this point in time\b/gi, replacement: 'now' },
            ];

            unexpectedPhrases.forEach(({ pattern, replacement }) => {
                if (globalRandom.next() < 0.6) {
                    sentence = sentence.replace(pattern, replacement);
                }
            });
        }
        return sentence;
    });

    return modified.join(' ');
}

// Add burstiness - vary sentence length dramatically (KEY for 80%+)
// FIXED: no more random one-word fragments ("After all.", "Yet.", "So.") —
// those read as errors, not style. Now only splits long sentences at real
// clause boundaries (commas/conjunctions) and never orphans <4 words.
function addBurstiness(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const modified: string[] = [];

    for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];
        const wordCount = sentence.split(' ').length;

        // Split long sentences at a clause boundary (comma or conjunction)
        if (wordCount > 20 && globalRandom.next() < 0.25) {
            const commaIdx = sentence.indexOf(',');
            if (commaIdx > 20 && commaIdx < sentence.length - 20) {
                const firstPart = sentence.slice(0, commaIdx).trim();
                let secondPart = sentence.slice(commaIdx + 1).trim();
                secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
                modified.push(firstPart + '.');
                modified.push(secondPart);
                continue;
            }
            const conjMatch = sentence.match(/\s+(and|but|while|whereas)\s+/i);
            if (conjMatch && (conjMatch.index ?? 0) > 20) {
                const at = conjMatch.index ?? 0;
                const firstPart = sentence.slice(0, at).trim().replace(/[,;:]$/, '');
                let secondPart = sentence.slice(at + conjMatch[0].length).trim();
                secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
                if (firstPart.split(' ').length >= 4 && secondPart.split(' ').length >= 4) {
                    modified.push(firstPart + '.');
                    modified.push(secondPart);
                    continue;
                }
            }
        }

        modified.push(sentence);
    }

    return modified.join(' ');
}

// Introduce varied punctuation patterns — SAFE subset only.
// FIXED: appending a bare '—' to a sentence ("...evidence.— ...") produced
// mojibake ("inâ—") and broken punctuation. That transform is removed; only
// the safe semicolon variation remains.
function varyPunctuation(text: string): string {
    let modified = text;

    // Add occasional semicolons for professional flow
    modified = modified.replace(/\. (However|Nevertheless|Moreover|Furthermore),/g, (match) => {
        return globalRandom.next() < 0.3 ? `; ${match.slice(2)}` : match;
    });

    return modified;
}

// Add natural filler words and phrases — ACADEMIC-SAFE subset.
// Casual fillers ("so to speak", "if you will", "as it were", "more or less",
// "in a sense", "needless to say") made formal text sound broken, so they
// were removed. Mid-sentence inserts only happen after a comma now.
function addFillerWords(text: string): string {
    const fillers = [
        'notably',
        'importantly',
        'in particular',
        'specifically',
        'essentially',
        'fundamentally',
        'primarily',
        'in practice',
        'arguably',
        'undoubtedly',
        'certainly',
        'admittedly',
        'for the most part',
        'in essence',
        'to some extent',
        'after all',
        'in any event',
        'in fact',
        'one might argue',
        'plainly',
        'obviously',
        'clearly',
        'evidently'
    ];

    const sentences = text.split('. ');
    const modifiedSentences = sentences.map((sentence) => {
        // Skip sentences that already open with a filler/opener (stacking guard)
        if (/^\s*(Notably|Importantly|Significantly|Interestingly|Indeed|Clearly|Evidently|Obviously|Certainly|Undoubtedly|Surely|Frankly|Honestly|Admittedly|Arguably|Essentially|Fundamentally|Primarily|Specifically|In particular|In practice|In fact|In essence|After all|All things considered|At any rate|To be sure|By and large|It's worth noting|It is worth noting|One might argue|In conclusion|Moreover|Furthermore|Additionally|Therefore|However|Nevertheless|Consequently|Thus|Hence)\b/i.test(sentence)) {
            return sentence;
        }
        // Add filler words to some sentences (25% chance - optimized for 80%+)
        if (globalRandom.next() < 0.25 && sentence.length > 30) {
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

// Introduce natural sentence rhythm variations — CONSERVATIVE.
// FIXED: splitting on ' and ' produced fragments ("Also, empirical evidence.")
// Now only splits when both halves stand alone (4+ words each).
function varyRhythm(text: string): string {
    const sentences = text.split('. ');
    const modifiedSentences = sentences.map((sentence) => {
        // Occasionally break long sentences into shorter ones
        if (sentence.length > 100 && sentence.includes(' and ')) {
            const parts = sentence.split(' and ');
            if (parts.length === 2 && globalRandom.next() < 0.4) {
                const left = parts[0].trim();
                const right = parts[1].trim();
                if (left.split(/\s+/).length >= 4 && right.split(/\s+/).length >= 4) {
                    return `${left}. Additionally, ${right}`;
                }
            }
        }
        return sentence;
    });

    return modifiedSentences.join('. ');
}

// Add contextual interjections (but avoid first paragraph to preserve introduction)
// FIXED: no longer lowercases the whole sentence (was producing "notably,
// machine learning..." with broken capitalization); only lowercases the first
// letter. Skips sentences that already open with an opener.
function addInterjections(text: string): string {
    const interjections = ['Indeed', 'Notably', 'Interestingly', 'Clearly', 'Evidently'];
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
            const target = sentences[randomIndex];
            if (!/^\s*(Indeed|Notably|Interestingly|Clearly|Evidently|Importantly|Significantly|Obviously|Certainly|In fact|In practice|That said|Still|Yet|One might|It's)\b/i.test(target)) {
                const interjection = globalRandom.choice(interjections);
                sentences[randomIndex] = `${interjection}, ${target.charAt(0).toLowerCase()}${target.slice(1)}`;
            }
        }

        return sentences.join('. ');
    });

    return modifiedParagraphs.join('\n\n');
}

// Improved first paragraph handling - make it more natural and engaging
function rewriteFirstParagraph(text: string): string {
    // Split text into paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

    if (paragraphs.length === 0) return text;

    let firstParagraph = paragraphs[0];

    // Remove contrasting/conditional words that weaken the opening
    const avoidWords = ['Although', 'Though', 'While', 'Whereas', 'Despite', 'However', 'Nevertheless', 'Yet', 'Even though', 'Even if'];

    avoidWords.forEach(word => {
        const pattern = new RegExp(`^${word}\\s+`, 'i');
        if (pattern.test(firstParagraph)) {
            // Remove the contrasting word and capitalize
            firstParagraph = firstParagraph.replace(pattern, '');
            firstParagraph = firstParagraph.charAt(0).toUpperCase() + firstParagraph.slice(1);
        }
    });

    // Make the opening more direct and engaging
    const sentences = firstParagraph.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    if (sentences.length > 0) {
        let firstSentence = sentences[0];

        // Remove redundant phrases from the first sentence
        const redundantPhrases = [
            /^It is important to note that\s+/i,
            /^It should be noted that\s+/i,
            /^It is worth noting that\s+/i,
            /^One should note that\s+/i,
            /^It is clear that\s+/i,
            /^It is evident that\s+/i,
            /^It can be said that\s+/i,
            /^One might say that\s+/i,
        ];

        redundantPhrases.forEach(pattern => {
            if (pattern.test(firstSentence)) {
                firstSentence = firstSentence.replace(pattern, '');
                firstSentence = firstSentence.charAt(0).toUpperCase() + firstSentence.slice(1);
            }
        });

        sentences[0] = firstSentence;
        firstParagraph = sentences.join(' ');
    }

    paragraphs[0] = firstParagraph;
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

// Remove repeated words and sentences for cleaner text
function removeRepetitions(text: string): string {
    let cleaned = text;

    // Remove repeated words (e.g., "the the" -> "the")
    cleaned = cleaned.replace(/\b(\w+)\s+\1\b/gi, '$1');

    // Remove repeated phrases (3+ words repeated)
    const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    const seenSentences = new Set<string>();
    const uniqueSentences: string[] = [];

    sentences.forEach(sentence => {
        // Normalize sentence for comparison (lowercase, remove punctuation)
        const normalized = sentence.toLowerCase().replace(/[.,;:!?]/g, '').trim();

        // Check if we've seen this sentence or a very similar one
        let isDuplicate = false;
        for (const seen of seenSentences) {
            // Calculate similarity (simple word overlap check)
            const words1 = normalized.split(/\s+/);
            const words2 = seen.split(/\s+/);

            // If sentences are very similar (>80% word overlap), consider it a duplicate
            if (words1.length > 5 && words2.length > 5) {
                const commonWords = words1.filter(w => words2.includes(w)).length;
                const similarity = commonWords / Math.max(words1.length, words2.length);

                if (similarity > 0.8) {
                    isDuplicate = true;
                    break;
                }
            }
        }

        if (!isDuplicate) {
            uniqueSentences.push(sentence);
            seenSentences.add(normalized);
        }
    });

    cleaned = uniqueSentences.join(' ');

    // Remove repeated short phrases within sentences
    cleaned = cleaned.replace(/\b(\w+\s+\w+)\s+\1\b/gi, '$1');

    // Remove excessive commas (more than one in a row)
    cleaned = cleaned.replace(/,\s*,+/g, ',');

    // Remove repeated punctuation
    cleaned = cleaned.replace(/([.!?])\1+/g, '$1');

    return cleaned;
}

// Enhanced grammar and spelling correction function
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
        { pattern: /\bmustnt\b/gi, replacement: "mustn't" },
        { pattern: /\bhadnt\b/gi, replacement: "hadn't" },

        // Fix common spelling errors - comprehensive list
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
        { pattern: /\bneccessary\b/gi, replacement: 'necessary' },
        { pattern: /\boccassion\b/gi, replacement: 'occasion' },
        { pattern: /\bprivelege\b/gi, replacement: 'privilege' },
        { pattern: /\bpublically\b/gi, replacement: 'publicly' },
        { pattern: /\bquantity\b/gi, replacement: 'quantity' },
        { pattern: /\brecommend\b/gi, replacement: 'recommend' },
        { pattern: /\brefered\b/gi, replacement: 'referred' },
        { pattern: /\brelevant\b/gi, replacement: 'relevant' },
        { pattern: /\brhythm\b/gi, replacement: 'rhythm' },
        { pattern: /\bschedule\b/gi, replacement: 'schedule' },
        { pattern: /\bsuccessful\b/gi, replacement: 'successful' },
        { pattern: /\bsupercede\b/gi, replacement: 'supersede' },
        { pattern: /\bsurprise\b/gi, replacement: 'surprise' },
        { pattern: /\btendancy\b/gi, replacement: 'tendency' },
        { pattern: /\btommorow\b/gi, replacement: 'tomorrow' },
        { pattern: /\btruely\b/gi, replacement: 'truly' },
        { pattern: /\bvacuum\b/gi, replacement: 'vacuum' },
        { pattern: /\bwether\b/gi, replacement: 'whether' },
        { pattern: /\bwhich\b/gi, replacement: 'which' },
        { pattern: /\bwritting\b/gi, replacement: 'writing' },
        { pattern: /\byeild\b/gi, replacement: 'yield' },
        { pattern: /\baccomodate\b/gi, replacement: 'accommodate' },
        { pattern: /\bacquaintance\b/gi, replacement: 'acquaintance' },
        { pattern: /\bacquire\b/gi, replacement: 'acquire' },
        { pattern: /\bacross\b/gi, replacement: 'across' },
        { pattern: /\baggressive\b/gi, replacement: 'aggressive' },
        { pattern: /\balot\b/gi, replacement: 'a lot' },
        { pattern: /\bamateur\b/gi, replacement: 'amateur' },
        { pattern: /\bapparent\b/gi, replacement: 'apparent' },
        { pattern: /\bargument\b/gi, replacement: 'argument' },
        { pattern: /\bathlete\b/gi, replacement: 'athlete' },
        { pattern: /\bbeginning\b/gi, replacement: 'beginning' },
        { pattern: /\bcalendar\b/gi, replacement: 'calendar' },
        { pattern: /\bcategory\b/gi, replacement: 'category' },
        { pattern: /\bcommittee\b/gi, replacement: 'committee' },
        { pattern: /\bconscience\b/gi, replacement: 'conscience' },
        { pattern: /\bconscious\b/gi, replacement: 'conscious' },
        { pattern: /\bconsensus\b/gi, replacement: 'consensus' },
        { pattern: /\bdevelopment\b/gi, replacement: 'development' },
        { pattern: /\bdiscipline\b/gi, replacement: 'discipline' },
        { pattern: /\bembarrass\b/gi, replacement: 'embarrass' },
        { pattern: /\bequipment\b/gi, replacement: 'equipment' },
        { pattern: /\bexaggerate\b/gi, replacement: 'exaggerate' },
        { pattern: /\bexperience\b/gi, replacement: 'experience' },
        { pattern: /\bfascinate\b/gi, replacement: 'fascinate' },
        { pattern: /\bforeigners\b/gi, replacement: 'foreigners' },
        { pattern: /\bfourty\b/gi, replacement: 'forty' },
        { pattern: /\bgauge\b/gi, replacement: 'gauge' },
        { pattern: /\bgrateful\b/gi, replacement: 'grateful' },
        { pattern: /\bguarantee\b/gi, replacement: 'guarantee' },
        { pattern: /\bharass\b/gi, replacement: 'harass' },
        { pattern: /\bheight\b/gi, replacement: 'height' },
        { pattern: /\bhierarchy\b/gi, replacement: 'hierarchy' },
        { pattern: /\bignorance\b/gi, replacement: 'ignorance' },
        { pattern: /\bimmediate\b/gi, replacement: 'immediate' },
        { pattern: /\bindependent\b/gi, replacement: 'independent' },
        { pattern: /\bintelligence\b/gi, replacement: 'intelligence' },
        { pattern: /\binterest\b/gi, replacement: 'interest' },
        { pattern: /\bjewelry\b/gi, replacement: 'jewelry' },
        { pattern: /\bjudgment\b/gi, replacement: 'judgment' },
        { pattern: /\bknowledge\b/gi, replacement: 'knowledge' },
        { pattern: /\blicence\b/gi, replacement: 'license' },
        { pattern: /\bmaintenance\b/gi, replacement: 'maintenance' },
        { pattern: /\bmedieval\b/gi, replacement: 'medieval' },
        { pattern: /\bmillennium\b/gi, replacement: 'millennium' },
        { pattern: /\bminiature\b/gi, replacement: 'miniature' },
        { pattern: /\bmischievous\b/gi, replacement: 'mischievous' },
        { pattern: /\bnoticeable\b/gi, replacement: 'noticeable' },
        { pattern: /\boccurrence\b/gi, replacement: 'occurrence' },
        { pattern: /\bperseverance\b/gi, replacement: 'perseverance' },
        { pattern: /\bpersistence\b/gi, replacement: 'persistence' },
        { pattern: /\bpossession\b/gi, replacement: 'possession' },
        { pattern: /\bprecedence\b/gi, replacement: 'precedence' },
        { pattern: /\bprejudice\b/gi, replacement: 'prejudice' },

        // Fix subject-verb agreement issues (common patterns)
        { pattern: /\b(he|she|it)\s+are\b/gi, replacement: '$1 is' },
        { pattern: /\b(they|we)\s+is\b/gi, replacement: '$1 are' },
        { pattern: /\b(I)\s+is\b/gi, replacement: '$1 am' },
        { pattern: /\b(you)\s+is\b/gi, replacement: '$1 are' },

        // Fix double negatives (common academic errors)
        { pattern: /\bdon't\s+have\s+no\b/gi, replacement: "don't have any" },
        { pattern: /\bcan't\s+hardly\b/gi, replacement: "can hardly" },
        { pattern: /\bcan't\s+barely\b/gi, replacement: "can barely" },

        // Fix comma splices (basic detection)
        { pattern: /,\s+(however|therefore|thus|consequently|nevertheless)\s+/gi, replacement: '; $1, ' },

        // Ensure proper capitalization at start
        { pattern: /^([a-z])/g, replacement: (match: string) => match.toUpperCase() },

        // Fix multiple punctuation marks
        { pattern: /\.{2,}/g, replacement: '.' },
        { pattern: /!{2,}/g, replacement: '!' },
        { pattern: /\?{2,}/g, replacement: '?' },
        { pattern: /,{2,}/g, replacement: ',' },

        // Fix spacing around quotes
        { pattern: /"\s+/g, replacement: '"' },
        { pattern: /\s+"/g, replacement: ' "' },

        // Fix common word confusions
        { pattern: /\bthen\s+(I|he|she|it|they|we)\s+(am|is|are|was|were)\b/gi, replacement: 'than $1 $2' },
        { pattern: /\beffect\s+(on|upon)\b/gi, replacement: 'affect $1' },
        { pattern: /\byour\s+(going|coming|doing)\b/gi, replacement: "you're $1" },
        { pattern: /\bto\s+(much|many)\b/gi, replacement: 'too $1' },
        { pattern: /\blose\s+(weight|money|time)\b/gi, replacement: 'lose $1' },
        { pattern: /\baccept\s+(for|from)\b/gi, replacement: 'accept $1' },
        { pattern: /\badvice\s+(someone)\b/gi, replacement: 'advise $1' },
        { pattern: /\bbreath\s+(deeply)\b/gi, replacement: 'breathe $1' },
        { pattern: /\bcompliment\s+(each other)\b/gi, replacement: 'complement $1' },

        // Fix possessive errors
        { pattern: /\bits'\b/g, replacement: 'its' },
        { pattern: /\bwhos\b/gi, replacement: "who's" },
        { pattern: /\bwhose\s+(is|are)\b/gi, replacement: "who's $1" },

        // Fix article errors
        { pattern: /\ba\s+([aeiou])/gi, replacement: 'an $1' },
        { pattern: /\ban\s+([^aeiou])/gi, replacement: 'a $1' },
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

    // Final cleanup - remove any remaining double spaces
    corrected = corrected.replace(/\s{2,}/g, ' ');
    corrected = corrected.trim();

    return corrected;
}

// Protect spans we must never rewrite: URLs, emails, numbers, citations,
// quoted text. Returns text with placeholders + restore fn.
function protectSpans(text: string): { text: string; restore: (s: string) => string } {
    const slots: string[] = [];
    const stash = (s: string) => {
        slots.push(s);
        return `__PROT${slots.length - 1}__`;
    };
    let out = text;
    out = out.replace(/https?:\/\/[^\s)]+/gi, (m) => stash(m));
    out = out.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, (m) => stash(m));
    out = out.replace(/\([A-Z][A-Za-z-]+,\s*\d{4}[a-z]?\)/g, (m) => stash(m));
    out = out.replace(/\[\d+(?:[,-]\d+)*\]/g, (m) => stash(m));
    out = out.replace(/\b(Figure|Table|Equation|Section|Chapter)\s+\d+(\.\d+)*/gi, (m) => stash(m));
    out = out.replace(/"[^"]{2,200}"/g, (m) => stash(m));
    return {
        text: out,
        restore: (s: string) => s.replace(/__PROT(\d+)__/g, (_m, i) => slots[Number(i)] ?? _m),
    };
}

// Split long docs into sentence-aware chunks so API calls + transforms
// don't blow token limits or time out. Splits on sentence boundaries.
function chunkBySentences(text: string, maxChars = 2500): string[] {
    if (text.length <= maxChars) return [text];
    const sentences = text.match(/[^.!?]+[.!?]+["']?\s*|\S[^.!?]*$/g) ?? [text];
    const chunks: string[] = [];
    let current = '';
    for (const s of sentences) {
        if ((current + s).length > maxChars && current.trim()) {
            chunks.push(current.trim());
            current = s;
        } else {
            current += s;
        }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks.length ? chunks : [text];
}

// Strip the most overused AI-tell phrases (detectors key on these).
// Replaces with plainer wording or drops them.
function stripAITells(text: string): string {
    let out = text;
    const tells: Array<[RegExp, string]> = [
        [/\bit is important to note that\s+/gi, ''],
        [/\bit is worth noting that\s+/gi, ''],
        [/\bin today's fast-paced world,?\s*/gi, ''],
        [/\bin conclusion,?\s*/gi, ''],
        [/\bin summary,?\s*/gi, ''],
        [/\bmoreover,?\s*/gi, ''],
        [/\bfurthermore,?\s*/gi, ''],
        [/\badditionally,?\s*/gi, ''],
        [/\bdelve into/gi, 'explore'],
        [/\btapestry of/gi, 'range of'],
        [/\blandmark study/gi, 'study'],
        [/\bgroundbreaking/gi, 'notable'],
        [/\bcutting-edge/gi, 'recent'],
        [/\bleverage(ing|s|d)?\b/gi, 'use$1'],
        [/\butilize[sd]?\b/gi, 'use'],
        [/\ba testament to\b/gi, 'evidence of'],
        [/\bin the realm of\b/gi, 'in'],
        [/\bboasts\b/gi, 'has'],
        [/\bvibrant\b/gi, 'active'],
        [/\bpivotal\b/gi, 'key'],
        [/\bit should be noted that\s+/gi, ''],
        [/\bdue to the fact that\b/gi, 'because'],
        [/\bin order to\b/gi, 'to'],
    ];
    for (const [pattern, replacement] of tells) {
        out = out.replace(pattern, replacement);
    }
    out = out.replace(/[ \t]{2,}/g, ' ');
    out = out.replace(/(^|[.!?]\s+)([a-z])/g, (_m, pre: string, ch: string) => pre + ch.toUpperCase());
    return out;
}

// Safety net: guarantee output length stays within sane bounds of input.
// If transforms deleted/duplicated too much, fall back toward the input.
function enforceLengthGuardrail(input: string, output: string): string {
    const ratio = output.length / Math.max(1, input.length);
    if (ratio >= 0.7 && ratio <= 1.6) return output;
    console.warn(`Length guardrail tripped (ratio ${ratio.toFixed(2)}), returning lightly-processed input`);
    return input;
}

// Enhanced paraphrase sentences while maintaining academic tone and meaning
function paraphraseSentences(text: string, aggressiveness: 'medium' | 'heavy'): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const synonymMap: { [key: string]: string[] } = {
        'important': ['significant', 'crucial', 'essential', 'vital', 'critical', 'key', 'pivotal'],
        'shows': ['demonstrates', 'illustrates', 'reveals', 'indicates', 'exhibits', 'displays', 'manifests'],
        'uses': ['utilizes', 'employs', 'applies', 'implements', 'leverages', 'adopts', 'harnesses'],
        'helps': ['facilitates', 'assists', 'aids', 'supports', 'enables', 'promotes', 'fosters'],
        'makes': ['creates', 'produces', 'generates', 'establishes', 'forms', 'constructs', 'develops'],
        'gives': ['provides', 'offers', 'presents', 'supplies', 'delivers', 'furnishes', 'grants'],
        'gets': ['obtains', 'acquires', 'receives', 'secures', 'gains', 'attains', 'procures'],
        'big': ['substantial', 'considerable', 'significant', 'extensive', 'major', 'large', 'sizable'],
        'small': ['minor', 'limited', 'modest', 'minimal', 'negligible', 'slight', 'marginal'],
        'good': ['beneficial', 'advantageous', 'favorable', 'positive', 'effective', 'valuable', 'constructive'],
        'bad': ['detrimental', 'adverse', 'unfavorable', 'negative', 'problematic', 'harmful', 'damaging'],
        'many': ['numerous', 'multiple', 'various', 'several', 'abundant', 'countless', 'myriad'],
        'different': ['diverse', 'varied', 'distinct', 'alternative', 'disparate', 'dissimilar', 'contrasting'],
        'same': ['identical', 'equivalent', 'similar', 'comparable', 'analogous', 'parallel', 'corresponding'],
        'new': ['novel', 'recent', 'contemporary', 'modern', 'emerging', 'fresh', 'innovative'],
        'old': ['established', 'traditional', 'conventional', 'historical', 'longstanding', 'classic', 'time-honored'],
        'very': ['highly', 'extremely', 'particularly', 'notably', 'remarkably', 'exceptionally', 'considerably'],
        'also': ['additionally', 'furthermore', 'moreover', 'likewise', 'similarly', 'equally', 'correspondingly'],
        'because': ['since', 'as', 'due to', 'owing to', 'given that', 'considering that', 'in light of'],
        'but': ['however', 'nevertheless', 'nonetheless', 'yet', 'although', 'though', 'whereas'],
        'so': ['therefore', 'thus', 'consequently', 'accordingly', 'hence', 'as a result', 'for this reason'],
        'and': ['as well as', 'along with', 'together with', 'in addition to', 'coupled with', 'plus', 'combined with'],
        'think': ['believe', 'consider', 'suppose', 'assume', 'reckon', 'presume', 'surmise'],
        'know': ['understand', 'recognize', 'realize', 'comprehend', 'grasp', 'perceive', 'discern'],
        'say': ['state', 'assert', 'declare', 'mention', 'express', 'articulate', 'convey'],
        'see': ['observe', 'notice', 'perceive', 'witness', 'detect', 'discern', 'recognize'],
        'find': ['discover', 'locate', 'identify', 'determine', 'ascertain', 'uncover', 'detect'],
        'tell': ['inform', 'notify', 'advise', 'communicate', 'relate', 'convey', 'disclose'],
        'ask': ['inquire', 'question', 'query', 'request', 'seek', 'solicit', 'petition'],
        'work': ['function', 'operate', 'perform', 'execute', 'labor', 'toil', 'endeavor'],
        'seem': ['appear', 'look', 'sound', 'feel', 'come across', 'strike one as', 'give the impression'],
        'feel': ['sense', 'perceive', 'experience', 'undergo', 'encounter', 'detect', 'discern'],
        'try': ['attempt', 'endeavor', 'strive', 'seek', 'aim', 'undertake', 'venture'],
        'leave': ['depart', 'exit', 'abandon', 'vacate', 'withdraw', 'retreat', 'evacuate'],
        'call': ['name', 'designate', 'term', 'label', 'dub', 'christen', 'entitle'],
        'keep': ['maintain', 'retain', 'preserve', 'sustain', 'uphold', 'continue', 'persist'],
        'let': ['allow', 'permit', 'enable', 'authorize', 'sanction', 'grant', 'approve'],
        'begin': ['start', 'commence', 'initiate', 'launch', 'embark', 'undertake', 'inaugurate'],
        'start': ['begin', 'commence', 'initiate', 'launch', 'embark', 'kick off', 'set out'],
        'run': ['operate', 'manage', 'conduct', 'administer', 'direct', 'oversee', 'supervise'],
        'move': ['shift', 'transfer', 'relocate', 'transport', 'migrate', 'transition', 'progress'],
        'live': ['reside', 'dwell', 'inhabit', 'occupy', 'settle', 'lodge', 'abide'],
        'believe': ['think', 'suppose', 'assume', 'presume', 'consider', 'hold', 'maintain'],
        'bring': ['carry', 'transport', 'convey', 'deliver', 'fetch', 'bear', 'transfer'],
        'happen': ['occur', 'take place', 'transpire', 'arise', 'come about', 'materialize', 'develop'],
        'write': ['compose', 'author', 'draft', 'pen', 'inscribe', 'record', 'document'],
        'provide': ['supply', 'furnish', 'offer', 'give', 'present', 'deliver', 'contribute'],
        'sit': ['be seated', 'rest', 'perch', 'settle', 'position oneself', 'take a seat', 'be situated'],
        'stand': ['rise', 'be upright', 'remain', 'endure', 'tolerate', 'withstand', 'persist'],
        'lose': ['misplace', 'forfeit', 'surrender', 'relinquish', 'sacrifice', 'waste', 'squander'],
        'pay': ['compensate', 'remunerate', 'reimburse', 'settle', 'disburse', 'expend', 'contribute'],
        'meet': ['encounter', 'come across', 'run into', 'convene', 'assemble', 'gather', 'congregate'],
        'include': ['comprise', 'contain', 'encompass', 'incorporate', 'embody', 'involve', 'embrace'],
        'continue': ['proceed', 'persist', 'carry on', 'maintain', 'sustain', 'persevere', 'endure'],
        'set': ['establish', 'determine', 'fix', 'arrange', 'position', 'place', 'situate'],
        'learn': ['discover', 'ascertain', 'master', 'acquire', 'grasp', 'comprehend', 'absorb'],
        'change': ['alter', 'modify', 'transform', 'convert', 'adjust', 'adapt', 'revise'],
        'lead': ['guide', 'direct', 'head', 'command', 'govern', 'manage', 'supervise'],
        'understand': ['comprehend', 'grasp', 'perceive', 'recognize', 'appreciate', 'fathom', 'discern'],
        'watch': ['observe', 'view', 'monitor', 'survey', 'examine', 'scrutinize', 'inspect'],
        'follow': ['pursue', 'track', 'trail', 'shadow', 'succeed', 'come after', 'ensue'],
        'stop': ['cease', 'halt', 'discontinue', 'terminate', 'end', 'conclude', 'finish'],
        'create': ['generate', 'produce', 'make', 'form', 'construct', 'build', 'develop'],
        'speak': ['talk', 'converse', 'communicate', 'articulate', 'express', 'voice', 'utter'],
        'read': ['peruse', 'study', 'examine', 'review', 'scan', 'browse', 'scrutinize'],
        'allow': ['permit', 'enable', 'authorize', 'sanction', 'approve', 'consent', 'grant'],
        'add': ['append', 'attach', 'include', 'incorporate', 'insert', 'supplement', 'augment'],
        'spend': ['expend', 'disburse', 'allocate', 'invest', 'devote', 'dedicate', 'consume'],
        'grow': ['expand', 'increase', 'develop', 'flourish', 'thrive', 'prosper', 'advance'],
        'open': ['unlock', 'unseal', 'uncover', 'reveal', 'expose', 'initiate', 'commence'],
        'walk': ['stroll', 'amble', 'stride', 'pace', 'march', 'trek', 'wander'],
        'win': ['triumph', 'prevail', 'succeed', 'conquer', 'overcome', 'achieve', 'attain'],
        'offer': ['provide', 'present', 'propose', 'suggest', 'extend', 'put forward'],
        'remember': ['recall', 'recollect', 'reminisce', 'retain', 'bear in mind', 'keep in mind', 'think back'],
        'love': ['adore', 'cherish', 'treasure', 'value', 'appreciate', 'prize', 'hold dear'],
        'consider': ['contemplate', 'ponder', 'reflect', 'deliberate', 'weigh', 'examine', 'evaluate'],
        'appear': ['seem', 'look', 'emerge', 'surface', 'materialize', 'manifest', 'present'],
        'buy': ['purchase', 'acquire', 'obtain', 'procure', 'secure', 'invest in', 'get'],
        'wait': ['pause', 'delay', 'hold', 'remain', 'stay', 'linger', 'tarry'],
        'serve': ['assist', 'help', 'aid', 'support', 'cater', 'provide', 'supply'],
        'die': ['perish', 'expire', 'pass away', 'decease', 'succumb', 'depart', 'cease'],
        'send': ['dispatch', 'transmit', 'forward', 'deliver', 'convey', 'ship', 'mail'],
        'expect': ['anticipate', 'foresee', 'predict', 'await', 'look forward to', 'envision', 'project'],
        'build': ['construct', 'erect', 'assemble', 'create', 'establish', 'develop', 'form'],
        'stay': ['remain', 'continue', 'persist', 'endure', 'linger', 'abide', 'reside'],
        'fall': ['drop', 'descend', 'plunge', 'tumble', 'decline', 'decrease', 'diminish'],
        'cut': ['slice', 'sever', 'divide', 'split', 'trim', 'reduce', 'decrease'],
        'reach': ['attain', 'achieve', 'arrive at', 'get to', 'access', 'contact', 'touch'],
        'kill': ['slay', 'murder', 'eliminate', 'destroy', 'terminate', 'end', 'extinguish'],
        'remain': ['stay', 'continue', 'persist', 'endure', 'last', 'linger', 'abide'],
        'suggest': ['propose', 'recommend', 'advise', 'advocate', 'indicate', 'imply', 'hint'],
        'raise': ['lift', 'elevate', 'hoist', 'increase', 'boost', 'enhance', 'heighten'],
        'pass': ['go by', 'elapse', 'proceed', 'move', 'transfer', 'hand over', 'convey'],
        'sell': ['market', 'trade', 'vend', 'retail', 'merchandise', 'peddle', 'offer'],
        'require': ['need', 'demand', 'necessitate', 'call for', 'entail', 'involve', 'mandate'],
        'report': ['announce', 'declare', 'state', 'communicate', 'relay', 'disclose', 'reveal'],
        'decide': ['determine', 'resolve', 'conclude', 'settle', 'choose', 'opt', 'elect'],
        'pull': ['drag', 'tug', 'haul', 'draw', 'yank', 'tow', 'extract'],
    };

    // Domain / compound-term blocklist: swapping these changes meaning
    // ("artificial intelligence" -> "fake intelligence" is wrong).
    const protectedTerms = /\b(artificial intelligence|machine learning|deep learning|neural network|natural language|climate change|higher education|peer review|case study|data set)\b/i;

    const paraphrased = sentences.map(sentence => {
        let modified = sentence;

        // Skip sentences containing protected compound terms entirely —
        // synonym-swapping inside them corrupts meaning.
        if (protectedTerms.test(sentence)) return sentence;

        // Apply synonym replacement based on aggressiveness
        // LOWERED: 0.7/0.5 replaced far too many words per sentence, producing
        // garbled output. 0.3/0.2 keeps voice natural.
        const replacementChance = aggressiveness === 'heavy' ? 0.3 : 0.2;

        Object.keys(synonymMap).forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            modified = modified.replace(regex, (match, offset: number, full: string) => {
                // Never swap inside protected placeholders or multi-word terms
                if (/__PROT\d+__/.test(full.slice(Math.max(0, offset - 10), offset + match.length + 10))) return match;
                // Never swap capitalized mid-sentence words (likely proper nouns / terms of art)
                if (offset > 0 && match[0] === match[0].toUpperCase() && /[a-z]/.test(match.slice(1)) && full[offset - 1] !== '.' && /\S/.test(full[offset - 1] || '')) {
                    const prevChar = full[offset - 1];
                    if (prevChar !== ' ' || /^[A-Z]/.test(full.slice(offset, offset + 12))) return match;
                }
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

// Add MINIMAL grammatical errors for human-like text - SIGNIFICANTLY REDUCED
function addGrammaticalErrors(text: string, intensity: 'light' | 'medium' | 'heavy'): string {
    // DRASTICALLY REDUCED errors - almost none, focus on natural variation instead
    const errorChances = {
        light: 0.0005,    // 0.05% per sentence - essentially none
        medium: 0.001,    // 0.1% per sentence - extremely rare
        heavy: 0.002      // 0.2% per sentence - very rare
    };

    const errorChance = errorChances[intensity];
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const modified = sentences.map(sentence => {
        if (globalRandom.next() > errorChance) return sentence;

        // Skip - errors are now so rare they're essentially disabled
        // This focuses on natural variation through other techniques instead
        return sentence;
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
        'artificial': ['synthetic', 'machine-generated', 'automated'],
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
// FIXED: previous version merged sentence[i] with sentence[i+1] but still emitted
// sentence[i+1] on the next iteration → duplicated content. Now consumes pairs.
function varySentenceComplexity(text: string, aggressiveness: 'medium' | 'heavy'): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    const modificationChance = aggressiveness === 'heavy' ? 0.35 : 0.22;

    const out: string[] = [];
    for (let index = 0; index < sentences.length; index++) {
        const sentence = sentences[index];
        if (globalRandom.next() > modificationChance) {
            out.push(sentence);
            continue;
        }

        // Combine two short consecutive sentences (consume both, no duplication)
        const next = sentences[index + 1];
        if (sentence.length < 60 && next && next.length < 60 && globalRandom.next() < 0.5) {
            const connectors = ['and', 'while', 'as', 'whereas', 'though'];
            const connector = globalRandom.choice(connectors);
            out.push(
                `${sentence.replace(/[.!?]$/, '')}, ${connector} ` +
                `${next.charAt(0).toLowerCase()}${next.slice(1)}`
            );
            index++; // consume next sentence
            continue;
        }

        // Split long sentences (no content loss)
        if (sentence.length > 120 && sentence.includes(' and ')) {
            const parts = sentence.split(' and ');
            if (parts.length === 2) {
                out.push(`${parts[0].trim()}. Additionally, ${parts[1].trim()}`);
                continue;
            }
        }

        out.push(sentence);
    }

    return out.join(' ');
}

// Add scholarly hedging and qualifiers
// FIXED: mid-sentence comma insertion ("use vast certainly. Notably, amounts")
// sounded broken. Qualifiers now go at clause boundaries only.
function addAcademicHedging(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const hedges = [
        { pattern: /\b(shows|demonstrates|proves)\b/i, replacement: 'suggests', chance: 0.2 },
        { pattern: /\b(always|never)\b/i, replacement: 'generally', chance: 0.25 },
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
            // Insert at a clause boundary (after first comma) or sentence start —
            // never in the middle of a noun phrase.
            if (modified.includes(',')) {
                modified = modified.replace(',', `, ${qualifier},`);
            } else {
                const words = modified.split(' ');
                if (words.length > 6) {
                    const insertPoint = globalRandom.nextInt(1, 3);
                    words.splice(insertPoint, 0, qualifier + ',');
                    modified = words.join(' ');
                }
            }
        }

        return modified;
    });

    return hedged.join(' ');
}

// Create frequent sentence breaks — CONSERVATIVE rewrite.
// FIXED: the old fallback pattern (", " → ". ") fired on ANY comma with
// heavy's 0.6 chance, orphaning fragments ("In practice.", "Significantly.",
// "data privacy,. The erosion..."). Now: only breaks at relative-clause or
// conjunction boundaries, never leaves a fragment under 4 words, and heavy
// chance lowered 0.6 → 0.35.
function createFrequentSentenceBreaks(text: string, breakIntensity: 'light' | 'medium' | 'heavy' = 'medium'): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const breakChance = {
        light: 0.15,
        medium: 0.25,
        heavy: 0.35
    }[breakIntensity];

    const modified = sentences.map(sentence => {
        // Don't break very short sentences
        if (sentence.length < 80) return sentence;

        if (globalRandom.next() < breakChance) {
            // Look for natural breaking points (ordered: safest first)
            const breakPatterns = [
                { pattern: /,\s+(?=which|that|who|where|when|why|how)/i, separator: '. ' },
                { pattern: /;\s+/, separator: '. ' },
                { pattern: /\s+and\s+/, separator: '. And ' },
                { pattern: /\s+but\s+/, separator: '. But ' },
            ];

            for (const { pattern, separator } of breakPatterns) {
                if (!pattern.test(sentence)) continue;
                const candidate = sentence.replace(pattern, separator);
                // Validate: every resulting sentence must stand alone (4+ words,
                // starts uppercase, ends with punctuation)
                const parts = candidate.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
                const valid = parts.length === 2 && parts.every(p =>
                    p.trim().split(/\s+/).length >= 4 && /^[A-Z]/.test(p.trim())
                );
                if (valid) return candidate;
            }
        }

        return sentence;
    });

    return modified.join(' ');
}

// Introduce MINIMAL spelling mistakes for authenticity - SIGNIFICANTLY REDUCED
function introduceSpellingMistakes(text: string, intensity: 'light' | 'medium' | 'heavy'): string {
    // DRASTICALLY REDUCED typing error rates - extremely subtle, almost none
    const mistakeChances = {
        light: 0.001,     // 0.1% per word - almost never
        medium: 0.002,    // 0.2% per word - extremely rare
        heavy: 0.003      // 0.3% per word - very rare
    };

    const mistakeChance = mistakeChances[intensity];
    const words = text.split(/(\s+)/);

    const modified = words.map(word => {
        // Don't modify whitespace
        if (/^\s+$/.test(word)) return word;

        // Extract the actual word without punctuation
        const punctuation = word.match(/[.!?,;:\-—]*$/)?.[0] || '';
        const cleanWord = word.slice(0, word.length - punctuation.length);

        // Only apply to longer words (less suspicious) and increase minimum length
        if (cleanWord.length < 7) return word;

        // ONLY introduce the most natural typing errors: transpositions only
        // These are what humans naturally do when typing quickly
        if (globalRandom.next() < mistakeChance) {
            // Only transpose two adjacent characters in the middle (natural typing error)
            if (cleanWord.length > 5) {
                const startIdx = 2;
                const endIdx = cleanWord.length - 3;
                if (endIdx > startIdx) {
                    const idx = globalRandom.nextInt(startIdx, endIdx);
                    const chars = cleanWord.split('');
                    [chars[idx], chars[idx + 1]] = [chars[idx + 1], chars[idx]];
                    return chars.join('') + punctuation;
                }
            }
        }

        return word;
    });

    return modified.join('');
}

// Aggressive vocabulary shift for extreme word variation (HIGH PERPLEXITY)
// FIXED: no longer touches function words like "the" (was destroying grammar),
// uses safer content-word swaps at a moderate rate with case preservation.
function aggressiveVocabularyShift(text: string): string {
    const extremeSynonyms: { [key: string]: string[] } = {
        'very': ['exceptionally', 'remarkably', 'particularly', 'notably', 'tremendously'],
        'good': ['commendable', 'strong', 'solid', 'valuable', 'effective'],
        'bad': ['poor', 'weak', 'problematic', 'unfavorable', 'limited'],
        'thing': ['aspect', 'element', 'factor', 'feature', 'consideration'],
        'way': ['approach', 'method', 'strategy', 'avenue', 'path'],
        'place': ['setting', 'context', 'environment', 'arena'],
        'time': ['period', 'moment', 'juncture', 'phase'],
        'people': ['individuals', 'stakeholders', 'participants', 'scholars'],
        'make': ['create', 'produce', 'generate', 'shape', 'foster'],
        'have': ['possess', 'retain', 'encompass', 'include'],
        'say': ['state', 'note', 'observe', 'contend', 'argue'],
        'use': ['employ', 'apply', 'leverage', 'draw on', 'utilize'],
        'show': ['demonstrate', 'illustrate', 'reveal', 'underscore', 'highlight'],
        'help': ['support', 'facilitate', 'strengthen', 'advance'],
    };

    let modified = text;
    Object.entries(extremeSynonyms).forEach(([word, synonyms]) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        modified = modified.replace(regex, (match) => {
            // 35% chance to replace (was 65% — far too aggressive)
            if (globalRandom.next() < 0.35) {
                const replacement = globalRandom.choice(synonyms);
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
// FIXED: previous version DELETED content (truncated sentences) and DUPLICATED
// sentences (appended sentence to itself). This version only reorders / splits
// without losing or duplicating meaning.
function extremeBurstiness(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const modified: string[] = [];
    for (let index = 0; index < sentences.length; index++) {
        const sentence = sentences[index];
        const modulo = index % 4;

        if (modulo === 0) {
            // Occasionally split a long sentence at a clause boundary
            // (comma/conjunction) — never mid-phrase, never <4-word orphans.
            const words = sentence.split(' ');
            if (words.length > 22 && globalRandom.next() < 0.4) {
                const commaAt = sentence.indexOf(',', 20);
                if (commaAt > 0 && commaAt < sentence.length - 20) {
                    const firstPart = sentence.slice(0, commaAt).trim();
                    let secondPart = sentence.slice(commaAt + 1).trim();
                    secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
                    if (firstPart.split(' ').length >= 4 && secondPart.split(' ').length >= 4) {
                        modified.push(firstPart + '.');
                        modified.push(secondPart);
                        continue;
                    }
                }
            }
            modified.push(sentence);
        } else if (modulo === 1) {
            // Occasionally merge with next short sentence for a longer rhythm
            const next = sentences[index + 1];
            if (next && sentence.length < 80 && next.length < 80 && globalRandom.next() < 0.35) {
                const connectors = [' and ', ', while ', ', whereas ', ' — ', '; '];
                const connector = globalRandom.choice(connectors);
                const merged = sentence.replace(/[.!?]$/, '') + connector +
                    next.charAt(0).toLowerCase() + next.slice(1);
                modified.push(merged);
                index++; // consume next
            } else {
                modified.push(sentence);
            }
        } else if (modulo === 2) {
            // Add a natural opener occasionally (skip already-opened sentences)
            const openers = ['Notably, ', 'In practice, ', 'Crucially, ', 'In effect, '];
            if (sentence.length > 40 && globalRandom.next() < 0.3 &&
                !/^\s*(Well|You see|Actually|Notably|In practice|Importantly|Significantly|Interestingly|Indeed|Clearly|Evidently|Obviously|Certainly|In fact|That said|Still|Yet|One might|It's)\b/i.test(sentence)) {
                const opener = globalRandom.choice(openers);
                modified.push(opener + sentence.charAt(0).toLowerCase() + sentence.slice(1));
            } else {
                modified.push(sentence);
            }
        } else {
            modified.push(sentence);
        }
    }

    return modified.join(' ');
}

// Back-translation function to naturally paraphrase text
async function backTranslate(text: string, intensity: 'light' | 'medium' | 'heavy'): Promise<string> {
    // Different translation chains based on intensity
    // NOTE: kept short on purpose — each hop costs latency + risks meaning drift.
    // Heavy uses 3 hops max; text is chunked so long docs still work.
    const translationChains = {
        light: ['ja'], // English -> Japanese -> English
        medium: ['ja', 'es'], // English -> Japanese -> Spanish -> English
        heavy: ['ja', 'fr', 'de'], // English -> Japanese -> French -> German -> English
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

// Discourse markers — ACADEMIC-SAFE set only. The old casual set
// ("Like,", "You know,", "Look,", "See,") made academic text sound broken,
// so casual markers were removed. Rate lowered 0.15 → 0.10.
function addDiscourseMarkers(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const discourseMarkers = {
        start: ['Notably,', 'Importantly,', 'Crucially,', 'In practice,', 'In effect,', 'That said,', 'Still,', 'Yet,', 'Even so,', 'Admittedly,'],
        mid: [', notably,', ', importantly,', ', in effect,', ', admittedly,'],
        transition: ['Still,', 'Yet,', 'Even so,', 'That said,', 'In this context,'],
    };

    const modified = sentences.map((sentence) => {
        // Skip sentences that already open with an opener (stacking guard)
        if (/^\s*(Notably|Importantly|Significantly|Interestingly|Indeed|Clearly|Evidently|Obviously|Certainly|Undoubtedly|Surely|Frankly|Honestly|Admittedly|Arguably|In practice|In effect|In fact|That said|Still|Yet|Even so|Anyway|Basically|Actually|Well|So|Like|Look|See)\b/i.test(sentence)) {
            return sentence;
        }
        if (globalRandom.next() < 0.10 && sentence.length > 30) {
            // Add at start of sentence
            if (globalRandom.next() < 0.6) {
                const marker = globalRandom.choice(discourseMarkers.start);
                return `${marker} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
            }
            // Add in middle — only after a comma (clause boundary), never mid-phrase
            else if (sentence.includes(',') && globalRandom.next() < 0.5) {
                const marker = globalRandom.choice(discourseMarkers.mid);
                return sentence.replace(',', `${marker.replace(/^,/, '')},`.replace(',,', ','));
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

// Add interrupted sentence patterns — ACADEMIC-SAFE.
// FIXED: breakpoint was random mid-phrase ("must be, let me clarify, guided").
// Now only interrupts after a comma (real clause boundary), and the casual
// "let me clarify" pattern was removed.
function addInterruptedSentences(text: string): string {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);

    const interruptionPatterns = [
        'or rather',
        'more accurately',
        'that is to say',
        'in other words',
        'or perhaps',
        'better stated as',
    ];

    const modified = sentences.map(sentence => {
        if (sentence.length < 80 || !sentence.includes(',') || globalRandom.next() > 0.12) return sentence;

        const pattern = globalRandom.choice(interruptionPatterns);
        // Interrupt only at the first comma — a genuine clause boundary
        return sentence.replace(',', `, ${pattern},`);
    });

    return modified.join(' ');
}

// addMetaphorAndAnalogy is DISABLED by design: it spliced random poetic
// comparisons mid-sentence ("a gardener cultivating growth") which reads as
// nonsense in academic text and hurts detector scores. Kept as a no-op so
// existing pipeline call sites don't need changes.
function addMetaphorAndAnalogy(text: string): string {
    return text;
}


// Master function to apply all humanization techniques
// IMPROVED: protect → strip AI tells → transform → restore → guardrail.
function applyAdvancedHumanization(text: string, intensity: 'light' | 'medium' | 'heavy' = 'medium'): string {
    const guard = protectSpans(text);
    let humanized = guard.text;

    // Always strip AI clichés first (all intensities — detectors key on these)
    humanized = stripAITells(humanized);

    // Apply different levels of transformation based on intensity
    switch (intensity) {
        case 'light':
            // Light mode: minimal changes, AI-assisted
            humanized = varyPunctuation(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = rewriteFirstParagraph(humanized);
            humanized = rewriteConcludingParagraph(humanized);
            humanized = addDiscourseMarkers(humanized);
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
            humanized = varyPunctuation(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = varyRhythm(humanized);
            humanized = varyWordCountInSentences(humanized);
            humanized = addFillerWords(humanized);
            humanized = varySentenceComplexity(humanized, 'medium');
            humanized = addAcademicHedging(humanized);
            humanized = rewriteConcludingParagraph(humanized);
            humanized = simplifyIntroductionAndConclusion(humanized);
            break;

        case 'heavy':
            // Heavy mode: maximum transformation without AI
            humanized = paraphraseSentences(humanized, 'heavy');
            humanized = aggressiveVocabularyShift(humanized);
            humanized = rewriteFirstParagraph(humanized);
            humanized = restructureSentences(humanized, 'heavy');
            humanized = addAcademicTransitions(humanized);
            humanized = addDiscourseMarkers(humanized);
            humanized = addConditionalReasoning(humanized);
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
            humanized = createFrequentSentenceBreaks(humanized, 'heavy');
            humanized = extremeBurstiness(humanized);
            humanized = addAcademicHedging(humanized);
            // NOTE: heavy skips rewriteConcludingParagraph + simplification —
            // both inject random sentences ("All things considered, ...") that
            // break meaning on short texts.
            break;
    }

    // Remove repetitions BEFORE grammar fixes to clean up duplicates
    humanized = removeRepetitions(humanized);

    // Dedup stacked openers across function boundaries ("Importantly,
    // essentially, ..." / "evidently, obviously, ..."): keep the LAST
    // (it carries the sentence's actual attachment point), drop earlier ones.
    // Runs twice to collapse 3-deep stacks.
    for (let pass = 0; pass < 2; pass++) {
        humanized = humanized.replace(
            /\b(Importantly|Essentially|Notably|Significantly|Interestingly|Indeed|Clearly|Evidently|Obviously|Certainly|Undoubtedly|Surely|Frankly|Honestly|Admittedly|Arguably|Fundamentally|Primarily|Specifically|In practice|In effect|In fact|After all|In any event|That said|Still|Yet|Even so|One might argue|As it turns out|Under certain conditions|In this context|From this perspective|To some extent|For the most part|In essence)\s*,\s*(?=[a-z][a-z\-']*(?:\s*,\s*)?\s*[A-Z])/g,
            ''
        );
    }

    // ALWAYS apply grammar and spelling fixes at the end (after all transformations)
    humanized = fixGrammarAndSpelling(humanized);

    // Restore protected spans (citations, URLs, quotes, figures)
    humanized = guard.restore(humanized);

    // Safety net: never return something wildly shorter/longer than input
    humanized = enforceLengthGuardrail(text, humanized);

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

        // Chunk long inputs so external API calls stay within token limits.
        // Short texts take the fast path (single chunk = identical behavior).
        const chunks = chunkBySentences(text, 2500);
        const useChunking = chunks.length > 1;
        if (useChunking) console.log(`Long input: processing in ${chunks.length} chunks`);

        // ============================================================================
        // STEP 1: BACK-TRANSLATION (for medium and heavy modes)
        // Graceful: if the Translate key is missing/fails, rule-based pipeline
        // below still runs — output quality degrades slightly, never errors.
        // ============================================================================
        if (intensity === 'medium' || intensity === 'heavy') {
            console.log('Applying back-translation...');
            if (useChunking) {
                const out: string[] = [];
                for (const chunk of chunks) {
                    out.push(await backTranslate(chunk, 'heavy'));
                }
                processedText = out.join(' ');
            } else {
                processedText = await backTranslate(text, 'heavy');
            }
            console.log('Back-translation complete');
        }

        // ============================================================================
        // STEP 2: AI PROCESSING (only for light mode)
        // ============================================================================
        // Only use AI for "light" mode.
        // Graceful fallback: if Gemini is unavailable, run the rule-based
        // light pipeline instead of erroring — user still gets an output.
        if (intensity === 'light') {
            if (process.env.GEMINI_API_KEY) {
                try {
                    const parts = useChunking ? chunks : [text];
                    const aiOut: string[] = [];
                    for (const part of parts) {
                        // Craft the humanization prompt for light mode
                        const prompt = `You are an expert text humanizer. Rewrite the text below to sound natural and human-written while preserving the original meaning and a professional academic tone.

Guidelines:
- Remove overly formal or robotic language
- Use more varied sentence structures
- Add natural transitions and flow
- Keep the same core message and facts
- Vary sentence length for better rhythm
- NEVER add typos or grammar errors; output must be clean
- Preserve citations, quotes, numbers, URLs exactly

Original text:
${part}

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
                                    contents: [{ parts: [{ text: prompt }] }],
                                }),
                            }
                        );

                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            console.error('API Error:', errorData);
                            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
                        }

                        const data = await response.json();

                        // Extract the humanized text from the response
                        const aiHumanizedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

                        if (!aiHumanizedText) {
                            throw new Error('No text generated from API');
                        }

                        aiOut.push(aiHumanizedText.trim());
                    }
                    processedText = aiOut.join(' ');
                } catch (err) {
                    console.warn('Gemini light-mode failed, falling back to rule-based:', err);
                    processedText = text; // rule-based pipeline below still runs
                }
            } else {
                console.log('No GEMINI_API_KEY — using rule-based light mode');
                processedText = text;
            }
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
        // STEP 4: AGGRESSIVE HUMANIZATION — intensity-aware (was: same max
        // treatment for ALL intensities, which mangled light-mode output).
        // ============================================================================
        console.log('Applying aggressive humanization techniques...');

        if (intensity === 'light') {
            // Light: gentle touch only — preserve meaning & polish
            finalHumanizedText = addPerplexity(finalHumanizedText);
            finalHumanizedText = addMoreContractions(finalHumanizedText);
            finalHumanizedText = varySentenceBeginnings(finalHumanizedText);
            finalHumanizedText = addNaturalRedundancy(finalHumanizedText);
        } else if (intensity === 'medium') {
            // Medium: balanced bypass + readability
            finalHumanizedText = addPerplexity(finalHumanizedText);
            finalHumanizedText = addBurstiness(finalHumanizedText);
            finalHumanizedText = addConversationalTone(finalHumanizedText);
            finalHumanizedText = addMoreContractions(finalHumanizedText);
            finalHumanizedText = breakPerfectStructures(finalHumanizedText);
            finalHumanizedText = varySentenceBeginnings(finalHumanizedText);
            finalHumanizedText = addNaturalRedundancy(finalHumanizedText);
            finalHumanizedText = varyWordCountInSentences(finalHumanizedText);
            finalHumanizedText = varyRhythm(finalHumanizedText);
            finalHumanizedText = addFillerWords(finalHumanizedText);
            finalHumanizedText = addPersonalTouches(finalHumanizedText);
            finalHumanizedText = addThinkingPatterns(finalHumanizedText);
            finalHumanizedText = addFlowVariations(finalHumanizedText);
            finalHumanizedText = addNaturalImperfections(finalHumanizedText);
            finalHumanizedText = addIncompleteThoughts(finalHumanizedText);
            finalHumanizedText = addInterjections(finalHumanizedText);
        } else {
            // Heavy: maximum bypass
            finalHumanizedText = addPerplexity(finalHumanizedText);
            finalHumanizedText = addBurstiness(finalHumanizedText);
            finalHumanizedText = addConversationalTone(finalHumanizedText);
            finalHumanizedText = addMoreContractions(finalHumanizedText);
            finalHumanizedText = breakPerfectStructures(finalHumanizedText);
            finalHumanizedText = varySentenceBeginnings(finalHumanizedText);
            finalHumanizedText = addNaturalRedundancy(finalHumanizedText);
            finalHumanizedText = varyWordCountInSentences(finalHumanizedText);
            finalHumanizedText = varyRhythm(finalHumanizedText);
            finalHumanizedText = addFillerWords(finalHumanizedText);
            finalHumanizedText = addPersonalTouches(finalHumanizedText);
            finalHumanizedText = addThinkingPatterns(finalHumanizedText);
            finalHumanizedText = addFlowVariations(finalHumanizedText);
            finalHumanizedText = addNaturalImperfections(finalHumanizedText);
            finalHumanizedText = addIncompleteThoughts(finalHumanizedText);
            finalHumanizedText = addInterjections(finalHumanizedText);
        }

        console.log('Aggressive humanization complete');

        // ============================================================================
        // STEP 5: FINAL POLISH — clean grammar (typo injection removed: it hurt
        // quality and addGrammaticalErrors() was a no-op anyway). Light mode may
        // still use AI paraphrase when a key is configured; medium/heavy skip it
        // (it makes text too "perfect" / AI-like).
        // ============================================================================
        if (intensity === 'light') {
            finalHumanizedText = await paraphraseWithFallback(finalHumanizedText, false);
        }

        // Final cleanup: fix any grammar/spacing damage from transforms,
        // strip leftover AI clichés, enforce sane output length.
        finalHumanizedText = fixGrammarAndSpelling(finalHumanizedText);
        finalHumanizedText = stripAITells(finalHumanizedText);
        finalHumanizedText = enforceLengthGuardrail(text, finalHumanizedText);

        console.log('Final polish complete');

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
