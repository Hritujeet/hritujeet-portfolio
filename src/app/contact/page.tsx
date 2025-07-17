import React from "react";
import {Mail, Phone, Github, Linkedin, Instagram, Twitter} from "lucide-react";
import { Metadata } from "next";

const page = () => {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-lg">
                        Let&#39;s connect and discuss your next project
                    </p>
                </div>

                <div className="flex justify-center">
                    {/* Contact Information */}
                    <div>
                        <div className="backdrop-blur-sm rounded-2xl p-8 border max-w-md">
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm">Email</p>
                                        <a href="mailto:sharmahritjeet@gmail.com" className="hover:transition-colors duration-200">
                                            sharmahritjeet@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm">Phone</p>
                                        <a href="tel:+91 90548 99358" className="hover:transition-colors duration-200">
                                            +91 90548 99358
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.linkedin.com/in/hritujeet-sharma-797ba7281/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-lg"
                                    >
                                        <Linkedin className="w-6 h-6" />
                                    </a>

                                    <a
                                        href="https://github.com/Hritujeet/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-lg"
                                    >
                                        <Github className="w-6 h-6" />
                                    </a>

                                    <a
                                        href="https://www.instagram.com/hritujeet/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-lg"
                                    >
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                <a
                                        href="https://x.com/HritujeetS93526"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-lg"
                                    >
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export const metadata: Metadata = {
    title: "Contact | Hritujeet",
    description: "Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world. Get in Touch with me for any queries or collaborations.",
    keywords: "contact, web development, programming, blogs, tech trends, developer community, insights, Hritujeet Sharma, teenage developer, coding enthusiast, web dev, Next.js, React, JavaScript, tech blogs, software development, coding tutorials, personal blog, tech enthusiast, coding community, web design, frontend development, backend development, full-stack development, open source, tech education, coding resources, developer portfolio",
};
export default page;