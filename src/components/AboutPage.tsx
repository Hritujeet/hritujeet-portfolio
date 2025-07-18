"use client"
import { motion } from "framer-motion"
import { BookOpen, Code, Coffee, Heart, Lightbulb, Users } from "lucide-react"
import CTA from "@/components/CTA"
import Link from "next/link"
import { useProjects } from "@/hooks/useProjects"

type Project = {
  id: string
  title: string
  decription: string
  link: string
  techStack: string[]
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const AboutPage = () => {
  const { data, isPending } = useProjects()

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 75 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 95 },
    { name: "TypeScript", level: 70 },
    { name: "MongoDB", level: 95 },
  ]

  const values = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Code Advocate",
      description: "I believe in writing code that tells a story - readable, maintainable, and elegant.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Continuous Learner",
      description: "Technology evolves rapidly, and I'm committed to growing with it, one concept at a time.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Early Bird",
      description:
        "Started Coding when I was 11. Currently, I am 16 and trying to enhance my skills and push my limits",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Problem Solver",
      description: "Every bug is a puzzle, every feature is an opportunity to create something meaningful.",
    },
  ]

  const stats = [
    { icon: Code, title: "Programming Experience", content: "4+ years" },
    { icon: Coffee, title: "Fuel of Choice", content: "Coffee ☕ (and occasionally tea)" },
    { icon: BookOpen, title: "Currently Reading", content: "Python for Data Analysis" },
  ]

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <motion.div
        className="hero min-h-[70vh] bg-gradient-to-br from-primary/10 to-accent/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content text-center">
          <motion.div className="max-w-md" variants={fadeInUp} initial="initial" animate="animate">
            <h1 className="text-5xl font-bold">
              {"It's me, "}
              <span className="text-accent">Hritujeet</span>
            </h1>
            <p className="py-6">
              A passionate developer sharing the journey through code, coffee, and countless debugging sessions.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/blogs" className="btn btn-accent">
                Read Blogs
              </Link>
              <Link href="https://github.com/Hritujeet" target="_blank" className="btn btn-outline">
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-32 py-16 space-y-20">
        {/* Story Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">My Story</h2>
            <div className="prose prose-lg">
              <p>
                My programming journey began with curiosity and a simple Hello, World! that changed everything. What
                started as tinkering with code has evolved into a passionate pursuit of creating digital solutions that
                make a difference.
              </p>
              <p>
                Through this platform, I share the real, unfiltered experience of being a developer - the victories, the
                failures, and those magical moments when everything finally clicks.
              </p>
            </div>
          </div>

          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="card bg-base-200" variants={fadeInUp}>
                <div className="card-body p-4">
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-5 h-5 text-accent" />
                    <div>
                      <h3 className="font-semibold">{stat.title}</h3>
                      <p className="text-sm opacity-70">{stat.content}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">What Drives Me</h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="card bg-base-200 hover:shadow-lg transition-shadow"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-body">
                  <div className="text-accent mb-4">{value.icon}</div>
                  <h3 className="card-title text-lg">{value.title}</h3>
                  <p className="text-sm opacity-70">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Technical Arsenal</h2>
          <div className="card bg-base-200">
            <div className="card-body">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Skills & Proficiency</h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm">{skill.level}%</span>
                        </div>
                        <progress className="progress progress-accent w-full" value={skill.level} max="100" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6">Tech Stack</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium">Frontend: </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["React", "Next.js", "Tailwind CSS", "TypeScript"].map((tech) => (
                          <span key={tech} className="badge badge-primary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Backend: </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["Node.js", "Express", "MongoDB", "PostgreSQL"].map((tech) => (
                          <span key={tech} className="badge badge-secondary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Tools: </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["Git", "Vercel"].map((tech) => (
                          <span key={tech} className="badge badge-info">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
          <p className="text-center opacity-70 mb-10">{"Here's a glimpse of my work in these projects"}</p>

          {isPending && (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="card bg-base-200">
                  <div className="card-body">
                    <div className="skeleton h-6 w-3/4 mb-4"></div>
                    <div className="skeleton h-4 w-full mb-2"></div>
                    <div className="skeleton h-4 w-2/3 mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="skeleton h-6 w-16"></div>
                      <div className="skeleton h-6 w-20"></div>
                      <div className="skeleton h-6 w-14"></div>
                    </div>
                    <div className="skeleton h-8 w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isPending && data?.projects?.length === 0 && (
            <div className="text-center text-2xl font-bold opacity-50">No Projects Yet</div>
          )}

          {!isPending && data?.projects?.length > 0 && (
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {data.projects.map((project: Project, index: number) => (
                <motion.div
                  key={project.id}
                  className="card bg-base-200 hover:shadow-lg transition-shadow"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-body">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="opacity-70">{project.decription}</p>
                    <div className="flex flex-wrap gap-2 my-4">
                      {project.techStack.map((tech, techIndex) => (
                        <span key={techIndex} className="badge badge-outline">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="card-actions">
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-accent btn-sm"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-8 sm:px-12 md:px-16 lg:px-20 xl:px-32 py-16"
      >
        <CTA />
      </motion.div>
    </div>
  )
}

export default AboutPage
