import { NextRequest, NextResponse } from 'next/server';

/**
 * Post-processing functions to make text more human-like and bypass AI detection
 */

// Add subtle typos and corrections (strikethrough effect in markdown)
function addNaturalImperfections(text: string): string {
    const sentences = text.split('. ');
    const modifiedSentences = sentences.map((sentence) => {
        // Randomly add natural hesitations or corrections (3% chance - reduced for professionalism)
        if (Math.random() < 0.03 && sentence.length > 20) {
            const words = sentence.split(' ');
            const randomIndex = Math.floor(Math.random() * (words.length - 2)) + 1;
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
        const randomIndex = Math.floor(Math.random() * (sentences.length - 1));
        if (Math.random() < 0.2) { // Only 20% chance
            sentences[randomIndex] = sentences[randomIndex] + '—';
            modified = sentences.join('. ');
        }
    }

    // Add occasional semicolons for professional flow
    modified = modified.replace(/\. (However|Nevertheless|Moreover|Furthermore),/g, (match) => {
        return Math.random() < 0.3 ? `; ${match.slice(2)}` : match;
    });

    return modified;
}

// Add natural filler words and phrases
function addFillerWords(text: string): string {
    const fillers = [
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
    ];

    const sentences = text.split('. ');
    const modifiedSentences = sentences.map((sentence) => {
        // Add filler words to some sentences (15% chance)
        if (Math.random() < 0.15 && sentence.length > 30) {
            const filler = fillers[Math.floor(Math.random() * fillers.length)];
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
        const randomIndices = Array.from(
            { length: Math.floor(words.length / 30) },
            () => Math.floor(Math.random() * words.length)
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
    const personalPhrases = [
        { formal: 'It is important to note', informal: "It's worth noting" },
        { formal: 'Furthermore', informal: 'Moreover' },
        { formal: 'In conclusion', informal: 'Ultimately' },
        { formal: 'Therefore', informal: 'Thus' },
        { formal: 'Additionally', informal: 'Also' },
        { formal: 'However', informal: 'Yet' },
        { formal: 'Nevertheless', informal: 'Still' },
        { formal: 'Subsequently', informal: 'Later' },
    ];

    let modified = text;
    personalPhrases.forEach(({ formal, informal }) => {
        if (Math.random() < 0.4) {
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
            if (parts.length === 2 && Math.random() < 0.4) {
                return `${parts[0]}. Additionally, ${parts[1]}`;
            }
        }
        return sentence;
    });

    return modifiedSentences.join('. ');
}

// Add contextual interjections
function addInterjections(text: string): string {
    const interjections = ['Indeed', 'Notably', 'Interestingly', 'Clearly', 'Evidently'];
    const sentences = text.split('. ');

    if (sentences.length > 2 && Math.random() < 0.3) {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        const interjection = interjections[Math.floor(Math.random() * interjections.length)];
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
            const transitions = ['Notably,', 'Importantly,', 'Significantly,', 'Essentially,'];
            if (Math.random() < 0.3 && firstSentence.length > 30) {
                return `${transitions[Math.floor(Math.random() * transitions.length)]} ${firstSentence.charAt(0).toLowerCase() + firstSentence.slice(1)}`;
            }
            return firstSentence;
        },
        // Contextual framing - maintains topic
        () => {
            // Only add context if it makes sense
            const contextPhrases = [
                'When examining this topic,',
                'In analyzing this subject,',
                'Considering this matter,'
            ];
            if (Math.random() < 0.4) {
                return `${contextPhrases[Math.floor(Math.random() * contextPhrases.length)]} ${firstSentence.charAt(0).toLowerCase() + firstSentence.slice(1)}`;
            }
            return firstSentence;
        },
        // Keep original with minor variation
        () => {
            // Replace "This" or "The" at the start with alternatives
            if (firstSentence.startsWith('This ')) {
                const replacements = ['This particular', 'This specific', 'This'];
                return firstSentence.replace('This', replacements[Math.floor(Math.random() * replacements.length)]);
            } else if (firstSentence.startsWith('The ')) {
                const replacements = ['The', 'The particular', 'The specific'];
                return firstSentence.replace('The', replacements[Math.floor(Math.random() * replacements.length)]);
            }
            return firstSentence;
        },
        // Minimal change - just keep it as is
        () => {
            return firstSentence;
        }
    ];

    // Choose a random strategy
    const strategy = openingStrategies[Math.floor(Math.random() * openingStrategies.length)];
    let rewrittenFirst = strategy();

    // Add the rest of the sentences from first paragraph with minimal professional connectors
    if (sentences.length > 1) {
        const restOfSentences = sentences.slice(1).map((sentence, index) => {
            // Only occasionally add connectors to maintain natural flow
            const connectors = ['Furthermore', 'Moreover', 'Additionally', 'In addition'];
            if (index === 0 && Math.random() < 0.25) {
                return `${connectors[Math.floor(Math.random() * connectors.length)]}, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
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
    const concludingStrategies = [
        // Summary conclusion
        () => {
            const summaryStarters = [
                "In summary,",
                "To summarize,",
                "In summation,",
                "To recapitulate,",
                "In brief,"
            ];
            const starter = summaryStarters[Math.floor(Math.random() * summaryStarters.length)];
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Synthesis conclusion
        () => {
            const synthesisStarters = [
                "Ultimately,",
                "In the final analysis,",
                "Taking everything into account,",
                "All things considered,",
                "Upon reflection,"
            ];
            const starter = synthesisStarters[Math.floor(Math.random() * synthesisStarters.length)];
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Implication conclusion
        () => {
            const implicationStarters = [
                "These findings suggest that",
                "This analysis demonstrates that",
                "The evidence indicates that",
                "This examination reveals that",
                "The research shows that"
            ];
            const starter = implicationStarters[Math.floor(Math.random() * implicationStarters.length)];
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Definitive conclusion
        () => {
            const definitiveStarters = [
                "In conclusion,",
                "To conclude,",
                "In closing,",
                "As a final point,",
                "Conclusively,"
            ];
            const starter = definitiveStarters[Math.floor(Math.random() * definitiveStarters.length)];
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Forward-looking conclusion
        () => {
            const forwardStarters = [
                "Moving forward,",
                "Looking ahead,",
                "In future considerations,",
                "As we proceed,",
                "Going forward,"
            ];
            const starter = forwardStarters[Math.floor(Math.random() * forwardStarters.length)];
            return `${starter} ${sentences[0].toLowerCase()}`;
        },
        // Reflective conclusion
        () => {
            const reflectiveStarters = [
                "Upon careful consideration,",
                "After thorough examination,",
                "Having analyzed this matter,",
                "Following this investigation,",
                "Based on this analysis,"
            ];
            const starter = reflectiveStarters[Math.floor(Math.random() * reflectiveStarters.length)];
            return `${starter} ${sentences[0].toLowerCase()}`;
        }
    ];

    // Choose a random strategy
    const strategy = concludingStrategies[Math.floor(Math.random() * concludingStrategies.length)];
    let rewrittenConclusion = strategy();

    // Add the rest of the sentences with professional concluding connectors
    if (hasMultipleSentences) {
        const restOfSentences = sentences.slice(1).map((sentence, index) => {
            // Add professional concluding connectors
            const connectors = [
                'Thus',
                'Therefore',
                'Consequently',
                'As a result',
                'Hence',
                'Accordingly'
            ];
            if (index === 0 && Math.random() < 0.4) {
                return `${connectors[Math.floor(Math.random() * connectors.length)]}, ${sentence.toLowerCase()}`;
            }
            return sentence;
        });
        rewrittenConclusion += '. ' + restOfSentences.join('. ');
    }

    // Add a professional closing statement if the conclusion seems short
    if (sentences.length === 1 && Math.random() < 0.5) {
        const closingStatements = [
            "This understanding provides valuable insight into the subject matter.",
            "These considerations remain essential for comprehensive understanding.",
            "This perspective offers significant implications for further study.",
            "Such insights contribute meaningfully to the broader discourse.",
            "This analysis underscores the importance of continued examination."
        ];
        const closing = closingStatements[Math.floor(Math.random() * closingStatements.length)];
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
            corrected = corrected.replace(rule.pattern, rule.replacement as any);
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

// Master function to apply all humanization techniques
function applyAdvancedHumanization(text: string, intensity: 'light' | 'medium' | 'heavy' = 'medium'): string {
    let humanized = text;

    // IMPORTANT: All these transformations happen AFTER the API has processed the text
    // This ensures maximum humanization and better AI detection bypass

    // Apply different levels of transformation based on intensity
    switch (intensity) {
        case 'light':
            humanized = varyPunctuation(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = rewriteFirstParagraph(humanized); // Rewrite first paragraph
            humanized = rewriteConcludingParagraph(humanized); // Rewrite conclusion
            break;

        case 'medium':
            humanized = rewriteFirstParagraph(humanized); // Rewrite first paragraph first
            humanized = varyPunctuation(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = varyRhythm(humanized);
            humanized = addFillerWords(humanized);
            humanized = rewriteConcludingParagraph(humanized); // Rewrite conclusion
            break;

        case 'heavy':
            humanized = rewriteFirstParagraph(humanized); // Rewrite first paragraph first
            humanized = addNaturalImperfections(humanized);
            humanized = varyPunctuation(humanized);
            humanized = addFillerWords(humanized);
            humanized = addFormattingVariations(humanized);
            humanized = addPersonalTouches(humanized);
            humanized = varyRhythm(humanized);
            humanized = addInterjections(humanized);
            humanized = rewriteConcludingParagraph(humanized); // Rewrite conclusion
            break;
    }

    // ALWAYS apply grammar and spelling fixes at the end (after all transformations)
    humanized = fixGrammarAndSpelling(humanized);

    return humanized;
}

export async function POST(request: NextRequest) {
    try {
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

        if (text.length > 10000) {
            return NextResponse.json(
                { error: 'Text must be less than 10,000 characters' },
                { status: 400 }
            );
        }

        // Check if API key is configured
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'API key not configured. Please add GEMINI_API_KEY to .env.local' },
                { status: 500 }
            );
        }

        // Craft the humanization prompt
        const prompt = `You are an expert text humanizer. Your task is to rewrite the following text to make it sound more natural, conversational, and human-written while preserving the original meaning and key information.

Guidelines:
- Remove overly formal or robotic language
- Use more varied sentence structures
- Add natural transitions and flow
- Keep the same core message and facts
- Make it sound like a real person wrote it
- Avoid repetitive phrases like "it is important to note" or "studies show"
- Use contractions where appropriate
- Vary sentence length for better rhythm

Original text:
${text}

Rewrite this text to sound more human and natural:`;

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
        const humanizedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        if (!humanizedText) {
            throw new Error('No text generated from API');
        }

        // ============================================================================
        // POST-PROCESSING: All text alterations happen AFTER the API response
        // This applies additional humanization layers on top of the AI-generated text
        // ============================================================================

        // Apply advanced humanization post-processing
        const finalHumanizedText = applyAdvancedHumanization(
            humanizedText.trim(),
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

    } catch (error: any) {
        console.error('Humanization error:', error);

        return NextResponse.json(
            {
                error: 'Failed to humanize text',
                details: error.message
            },
            { status: 500 }
        );
    }
}
