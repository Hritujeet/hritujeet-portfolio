import React from "react";
import {Mail, Phone, Github, Linkedin, Instagram, Twitter} from "lucide-react";

const page = () => {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-blue-500">
                        Get In Touch
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Let&#39;s connect and discuss your next project
                    </p>
                </div>

                <div className="flex justify-center">
                    {/* Contact Information */}
                    <div>
                        <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 max-w-md">
                            <h2 className="text-2xl font-bold mb-6 text-blue-400">Contact Information</h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Email</p>
                                        <a href="mailto:sharmahritjeet@gmail.com" className="text-white hover:text-blue-400 transition-colors duration-200">
                                            sharmahritjeet@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Phone</p>
                                        <a href="tel:+91 90548 99358" className="text-white hover:text-blue-400 transition-colors duration-200">
                                            +91 90548 99358
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold mb-4 text-blue-400">Connect With Us</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.linkedin.com/in/hritujeet-sharma-797ba7281/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                                    >
                                        <Linkedin className="w-6 h-6 text-white" />
                                    </a>

                                    <a
                                        href="https://github.com/Hritujeet/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-lg hover:shadow-gray-500/25"
                                    >
                                        <Github className="w-6 h-6 text-white" />
                                    </a>

                                    <a
                                        href="https://www.instagram.com/hritujeet/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-lg hover:shadow-pink-500/25"
                                    >
                                        <Instagram className="w-6 h-6 text-white" />
                                    </a>
                                <a
                                        href="https://x.com/HritujeetS93526"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-gradient-to-r from-gray-900 to-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-lg hover:shadow-gray-500/25"
                                    >
                                        <Twitter className="w-6 h-6 text-white" />
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

export default page;