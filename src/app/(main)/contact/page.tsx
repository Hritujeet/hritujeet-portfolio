import {
    Github,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    Twitter,
} from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

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
};

const contactInfo: ContactItem[] = [
    {
        icon: <Mail className="w-5 h-5 text-muted-foreground" />,
        label: "Email Address",
        value: "sharmahritjeet@gmail.com",
        href: "mailto:sharmahritjeet@gmail.com",
    },
    {
        icon: <Phone className="w-5 h-5 text-muted-foreground" />,
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
    },
    {
        icon: <Github className="w-5 h-5" />,
        href: "https://github.com/Hritujeet/",
        label: "GitHub",
    },
    {
        icon: <Instagram className="w-5 h-5" />,
        href: "https://www.instagram.com/hritujeet/",
        label: "Instagram",
    },
    {
        icon: <Twitter className="w-5 h-5" />,
        href: "https://x.com/HritujeetS93526",
        label: "X (Twitter)",
    },
];

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-background py-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold mb-4 text-foreground tracking-tight">
                        Get In Touch 👋
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {
                            "Let's connect and discuss your next project, internship, or learning opportunity."
                        }
                    </p>
                </header>

                {/* Main Content: Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Column 1: Contact Card & Info */}
                    <section className="order-2 lg:order-1 sticky top-24">
                        <Card className="shadow-lg border-border/50">
                            <CardContent className="p-8">
                                <h2 className="text-3xl font-bold mb-8 text-foreground tracking-tight">
                                    Connect Directly
                                </h2>

                                {/* Contact Details */}
                                <div className="space-y-6 mb-10">
                                    {contactInfo.map((contact, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-lg transition-colors border border-transparent hover:border-border/50"
                                        >
                                            <div className="mt-1 bg-muted p-2 rounded-md">
                                                {contact.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                                    {contact.label}
                                                </p>
                                                <a
                                                    href={contact.href}
                                                    className="text-lg font-semibold text-foreground hover:underline decoration-muted-foreground/50 underline-offset-4"
                                                >
                                                    {contact.value}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <hr className="my-8 border-border" />

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-xl font-bold mb-6 text-foreground tracking-tight">
                                        Social Presence
                                    </h3>
                                    <div className="flex gap-4 flex-wrap">
                                        {socialLinks.map((social, index) => (
                                                <a
                                                    href={social.href}
                                                    target="_blank"
                                                    className={buttonVariants({ variant: "outline" })}
                                                    rel="noopener noreferrer"
                                                    aria-label={social.label}
                                                >
                                                    {social.icon}
                                                </a>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Column 2: Send Message & Form */}
                    <section className="order-1 lg:order-2">
                        <ContactForm />
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
