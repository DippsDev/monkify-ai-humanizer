import { NextRequest, NextResponse } from 'next/server';

// Helper function to extract text from PDF
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        throw new Error('Failed to parse PDF file');
    }
}

// Helper function to extract text from DOCX files
async function extractTextFromDocx(buffer: Buffer): Promise<string> {
    try {
        const JSZip = require('jszip');
        const xml2js = require('xml2js');

        const zip = new JSZip();
        await zip.loadAsync(buffer);

        // Extract text from document.xml
        const docXml = await zip.file('word/document.xml').async('text');
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(docXml);

        // Extract all text nodes
        const extractText = (obj: unknown): string => {
            let text = '';

            if (typeof obj === 'string') {
                return obj;
            }

            if (Array.isArray(obj)) {
                return obj.map(extractText).join('');
            }

            if (obj && typeof obj === 'object') {
                // Process text elements
                if (obj['w:t']) {
                    text += Array.isArray(obj['w:t']) ? obj['w:t'].join('') : obj['w:t'];
                }

                // Process child elements recursively
                for (const key in obj) {
                    if (key !== '$' && typeof obj[key] === 'object') {
                        text += extractText(obj[key]);
                    }
                }

                // Add paragraph breaks
                if (obj['w:p']) {
                    text += '\n';
                }
            }

            return text;
        };

        const document = result['w:document'];
        const textContent = extractText(document['w:body']);

        return textContent.trim();
    } catch (error) {
        throw new Error('Failed to parse DOCX file');
    }
}

// Helper function to extract text from DOC files (older format)
async function extractTextFromDoc(buffer: Buffer): Promise<string> {
    // For older .doc files, we'll use a simple text extraction
    // This is a basic implementation and may not capture all text perfectly
    try {
        const text = buffer.toString('utf-8', 0, buffer.length);
        // Remove binary characters and extract readable text
        const cleanText = text
            .replace(/[^\x20-\x7E\n\r\t]/g, '')
            .split('\n')
            .filter(line => line.trim().length > 0)
            .join('\n');

        return cleanText;
    } catch (error) {
        throw new Error('Failed to parse DOC file');
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Check file type
        const allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        const allowedExtensions = ['pdf', 'doc', 'docx'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            return NextResponse.json(
                { error: 'Only PDF and Word files (.pdf, .doc, .docx) are allowed' },
                { status: 400 }
            );
        }

        if (!allowedMimeTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only PDF and Word files are allowed' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Check file size (max 5MB)
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        if (buffer.length > maxFileSize) {
            return NextResponse.json(
                { error: 'File size must be less than 5MB' },
                { status: 400 }
            );
        }

        let extractedText = '';

        // Extract text based on file type
        if (fileExtension === 'pdf') {
            extractedText = await extractTextFromPDF(buffer);
        } else if (fileExtension === 'docx') {
            extractedText = await extractTextFromDocx(buffer);
        } else if (fileExtension === 'doc') {
            extractedText = await extractTextFromDoc(buffer);
        }

        if (!extractedText || extractedText.length === 0) {
            return NextResponse.json(
                { error: 'No text could be extracted from the file' },
                { status: 400 }
            );
        }

        // Check text length
        if (extractedText.length > 100000) {
            return NextResponse.json(
                { error: 'Extracted text exceeds 100,000 character limit' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            text: extractedText,
            fileName: file.name,
            fileSize: buffer.length,
            textLength: extractedText.length,
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('File upload error:', error);

        return NextResponse.json(
            {
                error: 'Failed to process file',
                details: errorMessage
            },
            { status: 500 }
        );
    }
}
