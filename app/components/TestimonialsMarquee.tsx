'use client';

export default function TestimonialsMarquee() {
    const testimonials = [
        {
            name: "Daniel",
            major: "Computer Science",
            rating: 5,
            text: "I like that it doesn't just throw a random number at you. It shows what needs fixing.",
            color: "orange"
        },
        {
            name: "Sofia",
            major: "Law",
            rating: 5,
            text: "Really easy to use and quick! I run my assignments through it before I submit.",
            color: "pink"
        },
        {
            name: "Olivia",
            major: "Marketing",
            rating: 5,
            text: "Honestly didn't expect it to be that accurate. The highlighted parts were spot on.",
            color: "blue"
        },
        {
            name: "Emma",
            major: "Psychology",
            rating: 4,
            text: "It actually showed which parts sounded like AI. I changed them pretty fast and my essay sounded way more like me.",
            color: "purple"
        },
        {
            name: "Noah",
            major: "Engineering",
            rating: 5,
            text: "It keeps what I'm trying to say but makes it sound less robotic.",
            color: "green"
        }
    ];

    const colorClasses = {
        orange: "bg-orange-200 text-orange-700",
        pink: "bg-pink-200 text-pink-700",
        blue: "bg-blue-200 text-blue-700",
        purple: "bg-purple-200 text-purple-700",
        green: "bg-green-200 text-green-700"
    };

    return (
        <div className="relative overflow-hidden">
            <div
                className="flex gap-6"
                style={{
                    animation: 'marquee 20s linear infinite',
                    willChange: 'transform'
                }}
                onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
                {/* First set */}
                {testimonials.map((testimonial, index) => (
                    <div key={`first-${index}`} className="bg-white border border-gray-200 rounded-2xl p-6 min-h-[240px] flex flex-col w-80 flex-shrink-0">
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                            {[...Array(5 - testimonial.rating)].map((_, i) => (
                                <svg key={`empty-${i}`} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-gray-700 mb-6 flex-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
                            {testimonial.text}
                        </p>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[testimonial.color as keyof typeof colorClasses]}`}>
                                <span className="text-sm font-bold">{testimonial.name[0]}</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                                <p className="text-xs text-gray-500">{testimonial.major}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {testimonials.map((testimonial, index) => (
                    <div key={`second-${index}`} className="bg-white border border-gray-200 rounded-2xl p-6 min-h-[240px] flex flex-col w-80 flex-shrink-0">
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                            {[...Array(5 - testimonial.rating)].map((_, i) => (
                                <svg key={`empty-${i}`} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm text-gray-700 mb-6 flex-1" style={{ fontFamily: 'var(--font-fredoka)' }}>
                            {testimonial.text}
                        </p>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[testimonial.color as keyof typeof colorClasses]}`}>
                                <span className="text-sm font-bold">{testimonial.name[0]}</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                                <p className="text-xs text-gray-500">{testimonial.major}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
