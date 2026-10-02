"use client";

const testimonials = [
    {
        name: "Daniel",
        major: "Computer Science",
        text: "I like that it doesn't just throw a random number at you. It shows what needs fixing.",
    },
    {
        name: "Sofia",
        major: "Law",
        text: "Really easy to use and quick. I run my assignments through it before I submit.",
    },
    {
        name: "Olivia",
        major: "Marketing",
        text: "Honestly didn't expect it to be that accurate. The highlighted parts were spot on.",
    },
    {
        name: "Emma",
        major: "Psychology",
        text: "It actually showed which parts sounded like AI. I changed them pretty fast and my essay sounded way more like me.",
    },
    {
        name: "Noah",
        major: "Engineering",
        text: "It keeps what I'm trying to say but makes it sound less robotic.",
    },
    {
        name: "Liam",
        major: "English",
        text: "I paste the draft, hit humanize, and the result still sounds like something I would turn in.",
    },
];

export default function TestimonialsMarquee() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
                <figure
                    key={testimonial.name}
                    className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 min-h-[200px]"
                >
                    <figcaption className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                        {testimonial.major}
                    </figcaption>
                    <blockquote className="mt-3 text-sm text-gray-700 leading-relaxed flex-1">
                        {testimonial.text}
                    </blockquote>
                    <p className="mt-6 text-sm font-semibold text-gray-900">{testimonial.name}</p>
                </figure>
            ))}
        </div>
    );
}
