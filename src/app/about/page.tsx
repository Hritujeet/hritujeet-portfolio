"use client";
import React, {useEffect, useRef, useState} from "react";
import {BookOpen, Code, Coffee, Heart, Lightbulb, Users} from "lucide-react";
import CTA from "@/components/CTA";
import Link from "next/link";
import Head from "next/head";
import {useProjects} from "@/hooks/useProjects";
import SkeletonLoader from "@/components/SkeletonLoader";

type Project = {
    id: string,
    title: string,
    decription: string,
    link: string,
    techStack: string[]
}

const useInView = (options: IntersectionObserverInit = {}) => {
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsInView(true);
                    setHasAnimated(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
                ...options,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [hasAnimated, options]);

    return [ref, isInView] as const;
};

const AboutPage = () => {
    const {data, isPending} = useProjects()
    const [typedText, setTypedText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // Refs for scroll animations
    const [heroRef, heroInView] = useInView({threshold: 0.2});
    const [storyRef, storyInView] = useInView({threshold: 0.3});
    const [valuesRef, valuesInView] = useInView({threshold: 0.2});
    const [skillsRef, skillsInView] = useInView({threshold: 0.3});
    const [ctaRef, ctaInView] = useInView({threshold: 0.5});

    const texts = ["Hritujeet", "a Developer", "a Problem Solver", "a Creator"];
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseDuration = 2000;

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const currentText = texts[currentTextIndex];

        const handleTyping = () => {
            if (!isDeleting) {
                if (typedText.length < currentText.length) {
                    setTypedText(
                        currentText.substring(0, typedText.length + 1)
                    );
                } else {
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            } else {
                if (typedText.length > 0) {
                    setTypedText(
                        currentText.substring(0, typedText.length - 1)
                    );
                } else {
                    setIsDeleting(false);
                    setCurrentTextIndex(
                        (prevIndex) => (prevIndex + 1) % texts.length
                    );
                }
            }
        };

        const timer = setTimeout(
            handleTyping,
            isDeleting ? deletingSpeed : typingSpeed
        );
        return () => clearTimeout(timer);
    }, [typedText, currentTextIndex, isDeleting, texts]);

    const skills = [
        {name: "JavaScript", level: 90, color: "bg-yellow-500"},
        {name: "React", level: 75, color: "bg-blue-500"},
        {name: "Node.js", level: 80, color: "bg-green-500"},
        {name: "Python", level: 95, color: "bg-blue-600"},
        {name: "TypeScript", level: 70, color: "bg-blue-700"},
        {name: "MongoDB", level: 95, color: "bg-green-600"},
    ];

    const values = [
        {
            icon: <Code className="w-6 h-6"/>,
            title: "Clean Code Advocate",
            description:
                "I believe in writing code that tells a story - readable, maintainable, and elegant.",
        },
        {
            icon: <Lightbulb className="w-6 h-6"/>,
            title: "Continuous Learner",
            description:
                "Technology evolves rapidly, and I'm committed to growing with it, one concept at a time.",
        },
        {
            icon: <Users className="w-6 h-6"/>,
            title: "Early Bird",
            description:
                "Started Coding when I was 11. Currently, I am 16 and trying to enhance my skills and push my limits",
        },
        {
            icon: <Heart className="w-6 h-6"/>,
            title: "Problem Solver",
            description:
                "Every bug is a puzzle, every feature is an opportunity to create something meaningful.",
        },
    ];
    return (
        <div className="min-h-screen">
            <Head>
                <title>Hritujeet | About Me</title>
                <meta
                    name="description"
                    content="A passionate developer sharing the journey through code, coffee, and countless debugging sessions. Welcome to my corner of the internet where I document the beautiful chaos of programming."
                />
            </Head>
            {/* Hero Section with Typing Animation */}
            <div
                ref={heroRef}
                className={`relative overflow-hidden w-[80vw] h-[70vh] flex flex-col justify-center items-center md:w-auto mx-auto my-20 shadow-lg shadow-blue-600/20 bg-blue-600/10 rounded-lg transform transition-all duration-1000 ${
                    showContent && heroInView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                }`}
            >
                <div className="absolute inset-0"></div>
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6">
                            It&#39;s me,{" "}
                            <span className="text-blue-500 inline-block">
                                {typedText}
                                <span className="animate-pulse">|</span>
                            </span>
                        </h1>
                        <p
                            className={`text-base mb-8 max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ${
                                showContent && heroInView
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-5 opacity-0"
                            }`}
                        >
                            A passionate developer sharing the journey through
                            code, coffee, and countless debugging sessions.
                            Welcome to my corner of the internet where I
                            document the beautiful chaos of programming.
                        </p>
                    </div>
                    <div
                        className={`flex justify-center items-center gap-4 transform transition-all duration-1000 delay-500 ${
                            showContent && heroInView
                                ? "translate-y-0 opacity-100"
                                : "translate-y-5 opacity-0"
                        }`}
                    >
                        <Link
                            href={"/blogs/this-is-a-blog"}
                            className="group/btn relative font-medium text-sm px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-600 text-white rounded-lg cursor-pointer duration-200 border border-blue-500/20 transform hover:scale-105 transition-all"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Read Blogs
                            </span>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg opacity-0 group-hover/btn:opacity-20 duration-300 blur"></div>
                        </Link>
                        <Link
                            href="https://github.com/Hritujeet"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border px-6 py-2 border-blue-800/60 hover:border-blue-800 hover:bg-blue-800/60 duration-150 rounded-lg transform hover:scale-105 transition-all"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Story Section */}
                <div
                    ref={storyRef}
                    className={`grid md:grid-cols-2 gap-12 items-center mb-20 transform transition-all duration-1000 ${
                        storyInView
                            ? "translate-y-0 opacity-100"
                            : "translate-y-20 opacity-0"
                    }`}
                >
                    <div className="transform transition-all duration-700 hover:translate-x-2">
                        <h2 className="text-3xl font-bold text-gray-100 mb-6">
                            My Story
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p
                                className={`transform transition-all duration-700 delay-200 hover:text-gray-300 ${
                                    storyInView
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-[-30px] opacity-0"
                                }`}
                            >
                                My programming journey began with curiosity and
                                a simple Hello, World! that changed everything.
                                What started as tinkering with code has evolved
                                into a passionate pursuit of creating digital
                                solutions that make a difference.
                            </p>
                            <p
                                className={`transform transition-all duration-700 delay-400 hover:text-gray-300 ${
                                    storyInView
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-[-30px] opacity-0"
                                }`}
                            >
                                Through this platform, I share the real,
                                unfiltered experience of being a developer - the
                                victories, the failures, the late-night
                                debugging sessions, and those magical moments
                                when everything finally clicks. It&#39;s not
                                just about the code; it&#39;s about the journey.
                            </p>
                            <p
                                className={`transform transition-all duration-700 delay-600 hover:text-gray-300 ${
                                    storyInView
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-[-30px] opacity-0"
                                }`}
                            >
                                When I&#39;m not coding, you&#39;ll find me
                                exploring new technologies, contributing to
                                open-source projects, or mentoring fellow
                                developers. I believe that knowledge grows when
                                shared, and every challenge is an opportunity to
                                learn something new.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {[
                            {
                                icon: Code,
                                title: "Programming Experience",
                                content: "4+ years",
                            },
                            {
                                icon: Coffee,
                                title: "Fuel of Choice",
                                content: "Coffee ☕ (and occasionally tea)",
                            },
                            {
                                icon: BookOpen,
                                title: "Currently Reading",
                                content: "Python for Data Analysis",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl p-6 shadow-lg bg-blue-950/30 border-blue-950 border transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-blue-950/40 ${
                                    storyInView
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-[50px] opacity-0"
                                }`}
                                style={{
                                    transitionDelay: `${index * 20}ms`,
                                }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <item.icon
                                        className="w-5 h-5 text-blue-600 transition-transform duration-300 hover:scale-110"/>
                                    <span className="font-semibold text-gray-100">
                                        {item.title}
                                    </span>
                                </div>
                                <p className="text-gray-300">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div ref={valuesRef} className="mb-20">
                    <h2
                        className={`text-3xl font-bold text-blue-500 text-center mb-12 transform transition-all duration-1000 ${
                            valuesInView
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        What Drives Me
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className={`bg-blue-950/20 rounded-2xl p-6 shadow-lg border border-blue-950 hover:shadow-xl transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2 ${
                                    valuesInView
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-20 opacity-0"
                                }`}
                                style={{transitionDelay: `${index * 10}ms`}}
                            >
                                <div
                                    className="text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6">
                                    {value.icon}
                                </div>
                                <h3 className="font-bold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors duration-300">
                                    {value.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div ref={skillsRef} className="mb-20">
                    <h2
                        className={`text-3xl font-bold text-center text-blue-500 mb-12 transform transition-all duration-1000 ${
                            skillsInView
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        Technical Arsenal
                    </h2>
                    <div
                        className={`rounded-2xl p-8 shadow-lg border border-blue-950 bg-blue-950/20 transform transition-all duration-1000 hover:shadow-xl ${
                            skillsInView
                                ? "scale-100 opacity-100"
                                : "scale-95 opacity-0"
                        }`}
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3
                                    className={`text-xl font-bold text-gray-100 mb-6 transform transition-all duration-700 delay-200 ${
                                        skillsInView
                                            ? "translate-x-0 opacity-100"
                                            : "translate-x-[-20px] opacity-0"
                                    }`}
                                >
                                    Skills & Proficiency
                                </h3>
                                <div className="space-y-4">
                                    {skills.map((skill, index) => (
                                        <div key={index} className="group">
                                            <div
                                                className={`flex justify-between items-center mb-2 transform transition-all duration-500 ${
                                                    skillsInView
                                                        ? "translate-x-0 opacity-100"
                                                        : "translate-x-[-30px] opacity-0"
                                                }`}
                                                style={{
                                                    transitionDelay: `${
                                                        (index + 2) * 100
                                                    }ms`,
                                                }}
                                            >
                                                <span
                                                    className="font-medium text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                                                    {skill.name}
                                                </span>
                                                <span className="text-sm text-gray-200">
                                                    {skill.level}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className={`h-2 rounded-full ${
                                                        skill.color
                                                    } transition-all duration-1000 ease-out ${
                                                        skillsInView
                                                            ? ""
                                                            : "w-0"
                                                    }`}
                                                    style={{
                                                        width: skillsInView
                                                            ? `${skill.level}%`
                                                            : "0%",
                                                        transitionDelay: `${
                                                            (index + 4) * 150
                                                        }ms`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3
                                    className={`text-xl font-bold mb-6 transform transition-all duration-700 delay-200 ${
                                        skillsInView
                                            ? "translate-x-0 opacity-100"
                                            : "translate-x-[20px] opacity-0"
                                    }`}
                                >
                                    Tech Stack Highlights
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            label: "Frontend:",
                                            techs: [
                                                "React",
                                                "Next.js",
                                                "Tailwind CSS",
                                                "TypeScript",
                                            ],
                                            color: "blue",
                                        },
                                        {
                                            label: "Backend:",
                                            techs: [
                                                "Node.js",
                                                "Express",
                                                "MongoDB",
                                                "PostgreSQL",
                                            ],
                                            color: "green",
                                        },
                                        {
                                            label: "Tools:",
                                            techs: ["Git", "Vercel"],
                                            color: "purple",
                                        },
                                    ].map((category, categoryIndex) => (
                                        <div
                                            key={categoryIndex}
                                            className="flex flex-wrap gap-2"
                                        >
                                            <span
                                                className={`text-xs transform transition-all duration-500 ${
                                                    skillsInView
                                                        ? "translate-x-0 opacity-100"
                                                        : "translate-x-[20px] opacity-0"
                                                }`}
                                                style={{
                                                    transitionDelay: `${
                                                        (categoryIndex + 4) *
                                                        200
                                                    }ms`,
                                                }}
                                            >
                                                {category.label}
                                            </span>
                                            {category.techs.map(
                                                (tech, techIndex) => (
                                                    <span
                                                        key={tech}
                                                        className={`px-3 py-1 text-${
                                                            category.color
                                                        }-100 bg-${
                                                            category.color
                                                        }-800 rounded-full text-xs font-medium transform transition-all duration-500 hover:scale-110 hover:shadow-lg ${
                                                            skillsInView
                                                                ? "scale-100 opacity-100"
                                                                : "scale-75 opacity-0"
                                                        }`}
                                                        style={{
                                                            transitionDelay: `${
                                                                (categoryIndex *
                                                                    4 +
                                                                    techIndex +
                                                                    6) *
                                                                100
                                                            }ms`,
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl text-blue-500 text-center mt-10">Projects</h1>
                    <p className="mt-2 mb-10 text-center text-gray-400">
                        Here&#39;s a glimpse of my work in these projects
                    </p>
                    {isPending && <div className={"flex gap-4"}>
                        <SkeletonLoader height={"100px"}/>
                        <SkeletonLoader height={"100px"}/>
                    </div>}
                    {(!isPending && data.projects.length == 0) &&
                        <div className={"text-2xl font-bold text-gray-400 text-center"}>No Projects Yet</div>}
                    {(!isPending && data.projects.length != 0) && data.projects.map((project: Project, index: KeyType) => (<div
                            key={index}
                            className={`rounded-2xl p-6 shadow-lg bg-blue-950/30 border-blue-950 border transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-blue-950/40`}
                        >
                            <div className="flex items-center gap-2 mb-4">
                            <span className="font-semibold text-xl text-gray-100">
                                {project.title}
                            </span>
                            </div>
                            <p className="text-gray-300">
                                {project.decription}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-5">
                                {project.techStack.map((element, index) => (

                                    <div
                                        key={index}
                                        className="tech rounded-full bg-indigo-700/40 border-indigo-700/60 border px-4 py-1 text-sm">
                                        {element}
                                    </div>

                                ))}
                            </div>
                            <div className="mt-6">
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border px-4 py-2 my-10 border-blue-800/60 hover:border-blue-800 hover:bg-blue-800/60 duration-150 rounded-lg transform hover:scale-105 transition-all"
                                >
                                    Project Link
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                ref={ctaRef}
                className={`transform transition-all duration-1000 ${
                    ctaInView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0"
                }`}
            >
                <CTA/>
            </div>
        </div>
    );
};
export default AboutPage;
