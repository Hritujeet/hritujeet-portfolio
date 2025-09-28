import {
    Github,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    Twitter
} from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "../../../../utils/db";
import SubmitButton from "./submit-button";

type ContactItem = {
    icon: React.ReactElement;
    label: string;
    value: string;
    href: string;
};

type SocialLink = {
    icon: React.ReactElement;
    href: string;
    label: string;
    color: string;
};

const contactInfo: ContactItem[] = [
    {
        icon: <Mail className="w-5 h-5 text-primary" />,
        label: "Email Address",
        value: "sharmahritjeet@gmail.com",
        href: "mailto:sharmahritjeet@gmail.com",
    },
    {
        icon: <Phone className="w-5 h-5 text-secondary" />,
        label: "Phone Number",
        value: "+91 90548 99358",
        href: "tel:+91 90548 99358",
    },
];

const socialLinks: SocialLink[] = [
    {
        icon: <Linkedin className="w-5 h-5" />,
        href: "https://www.linkedin.com/in/hritujeet-sharma-797ba7281/",
        label: "LinkedIn",
        color: "btn-info text-white",
    },
    {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/Hritujeet/",
        label: "GitHub",
        color: "btn-neutral",
    },
    {
        icon: <Instagram className="w-5 h-5" />,
        href: "https://www.instagram.com/hritujeet/",
        label: "Instagram",
        color: "bg-pink-500 hover:bg-pink-600 text-white border-none",
    },
    {
        icon: <Twitter className="w-5 h-5" />,
        href: "https://x.com/HritujeetS93526",
        label: "X (Twitter)",
        color: "btn-ghost",
    },
];

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-base-100 py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold mb-4 text-base-content">
                        Get In Touch 👋
                    </h1>
                    <p className="text-xl opacity-80 text-base-content">
                        {
                            "Let's connect and discuss your next project, internship, or learning opportunity."
                        }
                    </p>
                </header>

                {/* Main Content: Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Column 1: Contact Card & Info */}
                    <section className="order-2 lg:order-1">
                        <div className="card bg-base-200 shadow-2xl p-8 h-full">
                            <h2 className="text-3xl font-bold mb-8">
                                Connect Directly
                            </h2>

                            {/* Contact Details */}
                            <div className="space-y-6 mb-10">
                                {contactInfo.map((contact, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-3 hover:bg-base-300 rounded-lg transition-colors"
                                    >
                                        <div className="mt-1">
                                            {contact.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm opacity-70 mb-0.5">
                                                {contact.label}
                                            </p>
                                            <a
                                                href={contact.href}
                                                className="text-lg font-semibold link link-hover"
                                            >
                                                {contact.value}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="divider my-0"></div>

                            {/* Social Links */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-4">
                                    Social Presence
                                </h3>
                                <div className="flex gap-4 flex-wrap">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`btn btn-circle ${social.color} btn-lg shadow-md hover:shadow-xl transition-all duration-300`}
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Column 2: Send Message & Form */}
                    <section className="order-1 lg:order-2">
                        <div className="p-8 space-y-8 h-full">
                            <h2 className="text-3xl font-bold mb-4">
                                Send a Message
                            </h2>
                            <p className="opacity-80 mb-6 text-lg">
                                If you prefer, fill out the form below. I'm keen
                                to hear about your projects, discuss web
                                development trends, or talk about opportunities!
                            </p>

                            <form
                                className="space-y-6"
                                action={async (data: FormData) => {
                                    "use server";
                                    const name = data.get("name");
                                    const email = data.get("email");
                                    const phone = data.get("phone");
                                    const query = data.get("message");

                                    try {
                                        const newContact =
                                            await prisma.contact.create({
                                                data: {
                                                    name: name as string,
                                                    email: email as string,
                                                    phone: phone as string,
                                                    query: query as string,
                                                },
                                            });
                                    } catch (error) {
                                        if (error instanceof Error) {
                                            console.log(error);
                                        }
                                    }
                                }}
                                method="POST"
                            >
                                {/* Name Input */}
                                <div className="form-control">
                                    <label htmlFor="name" className="label">
                                        <span className="label-text">
                                            Your Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        className="input border shadow-none w-full"
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="form-control">
                                    <label htmlFor="email" className="label">
                                        <span className="label-text">
                                            Your Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        className="input border shadow-none w-full"
                                        required
                                    />
                                </div>

                                {/* Phone Input */}
                                <div className="form-control">
                                    <label htmlFor="email" className="label">
                                        <span className="label-text">
                                            Your Phone Number
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phpne"
                                        name="phone"
                                        placeholder="90xxx xxxxx (IN)"
                                        className="input border shadow-none w-full"
                                        required
                                    />
                                </div>

                                {/* Message Textarea */}
                                <div className="form-control">
                                    <label htmlFor="message" className="label">
                                        <span className="label-text">
                                            Message
                                        </span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell me about your project or idea..."
                                        className="textarea border shadow-none h-24 w-full"
                                        required
                                    ></textarea>
                                </div>

                                <SubmitButton />
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export const metadata: Metadata = {
    title: "Contact | Hritujeet Sharma",
    description:
        "Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world. Get in Touch with me for any queries or collaborations.",
    keywords:
        "contact, web development, programming, blogs, tech trends, developer community, insights, Hritujeet Sharma, teenage developer, coding enthusiast, web dev, Next.js, React, JavaScript, tech blogs, software development, coding tutorials, personal blog, tech enthusiast, coding community, web design, frontend development, backend development, full-stack development, open source, tech education, coding resources, developer portfolio, Kota, MIT Aspirant",
};

export default ContactPage;
