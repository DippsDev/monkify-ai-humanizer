import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const { text } = await request.json();

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

        // Return the humanized text
        return NextResponse.json({
            success: true,
            originalText: text,
            humanizedText: humanizedText.trim(),
            originalLength: text.length,
            humanizedLength: humanizedText.trim().length,
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
