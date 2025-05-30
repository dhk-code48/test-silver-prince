"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  Heart,
  Coffee,
  Mail,
  Calendar,
  MapPin,
  Feather,
  BookMarked,
  Facebook,
  Twitter,
  Instagram,
  Twitch,
  PawPrintIcon as Patreon,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialMedia } from "@/lib/constants";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaPatreon,
  FaTwitter,
  FaXTwitter,
} from "react-icons/fa6";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("about");

  const milestones = [
    {
      year: 2019,
      title: "Writing Journey Begins",
      description: "Started writing Pokemon: A Real Story",
    },
    {
      year: 2020,
      title: "First Publication",
      description: "Published on Webnovel and FanFiction.net",
    },
    {
      year: 2021,
      title: "Growing Audience",
      description: "Reached 50,000 readers milestone",
    },
    {
      year: 2022,
      title: "Expanded Universe",
      description: "Started planning additional stories in the same universe",
    },
    {
      year: 2023,
      title: "Website Launch",
      description:
        "Launched TheSilverPrince.com as the official home for all novels",
    },
  ];

  const skills = [
    { name: "Worldbuilding", level: 95 },
    { name: "Character Development", level: 90 },
    { name: "Plot Structure", level: 85 },
    { name: "Dialogue", level: 80 },
    { name: "Action Scenes", level: 92 },
  ];

  const faqs = [
    {
      question: "How often do you update chapters?",
      answer:
        "I aim to release new chapters weekly, typically on Fridays. However, during special events or holidays, the schedule might change. I always announce any changes in the News section.",
    },
    {
      question: "Will you write other stories besides Pokemon?",
      answer:
        "Yes! While Pokemon: A Real Story is my main focus right now, I have plans for other novels in different universes. I&apos;m particularly interested in exploring original fantasy worlds in the future.",
    },
    {
      question: "How can I support your work?",
      answer:
        "The best ways to support me are by reading my stories, leaving comments, and sharing with others who might enjoy them. If you&apos;d like to support me financially, you can become a patron on Patreon where you&apos;ll also get access to exclusive content.",
    },
    {
      question: "Do you take story suggestions?",
      answer:
        "I love hearing readers&apos; ideas! While I can&apos;t promise to incorporate every suggestion, I do consider them and sometimes they inspire new directions for the story. Feel free to share your thoughts in the comments or via email.",
    },
  ];

  return (
    <MaxWidthWrapper className="space-y-10">
      {/* Hero Section */}
      <section className="relative px-10 py-20 rounded-lg overflow-hidden">
        <div className="z-0 absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/5"></div>
        <div className="-top-24 -right-24 z-0 absolute bg-primary/60 opacity-50 rounded-full w-64 h-64"></div>
        <div className="-bottom-32 -left-32 z-0 absolute bg-primary/60 opacity-50 rounded-full w-96 h-96"></div>

        <div className="z-10 relative container">
          <div className="flex md:flex-row flex-col items-center gap-12">
            <motion.div
              className="flex justify-center md:w-1/2"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-lg rotate-3 transform"></div>
                <div className="relative shadow-xl border-4 border-white rounded-lg overflow-hidden">
                  <Image
                    src="/banner.jpg"
                    alt="Rahul Manandhar - The Silver Prince"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <motion.div
                  className="-right-6 -bottom-6 absolute bg-white shadow-lg p-3 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Feather className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item}>
                <Badge className="bg-primary/20 hover:bg-primary/30 mb-4 px-3 py-1 text-primary text-sm cursor-pointer">
                  Author & Creator
                </Badge>
              </motion.div>
              <motion.h1
                variants={item}
                className="mb-4 font-bold text-foreground text-4xl md:text-5xl"
              >
                The Silver Prince
              </motion.h1>
              <motion.p
                variants={item}
                className="mb-6 text-muted-foreground text-xl"
              >
                Crafting immersive fantasy worlds and reimagining familiar
                universes
              </motion.p>
              <motion.div
                variants={item}
                className="flex items-center gap-2 mb-3 text-muted-foreground"
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span>Based in Nepal</span>
              </motion.div>
              <motion.div
                variants={item}
                className="flex items-center gap-2 mb-3 text-muted-foreground"
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span>Writing since 2019</span>
              </motion.div>
              <motion.div
                variants={item}
                className="flex items-center gap-2 mb-6 text-muted-foreground"
              >
                <BookMarked className="w-5 h-5 text-primary" />
                <span>Author of &quot;Pokemon: A Real Story&quot;</span>
              </motion.div>
              <motion.div variants={item} className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link
                    href="https://www.patreon.com/TheSilverPrince1"
                    target="_blank"
                  >
                    <Patreon className="mr-2 w-4 h-4" />
                    Support on Patreon
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <div className="bg-card py-10 rounded-lg">
        <Tabs
          defaultValue="about"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-4xl">
              <TabsTrigger value="about">About Me</TabsTrigger>

              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about">
            <motion.div
              className="mx-auto max-w-4xl"
              initial="hidden"
              animate={activeTab === "about" ? "show" : "hidden"}
              variants={fadeIn}
            >
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 font-bold text-2xl">Who I Am</h2>
                  <p className="mb-4 text-muted-foreground">
                    I&apos;m Rahul Manandhar, writing under the pen name
                    &quot;The Silver Prince.&quot; Born and raised in Nepal,
                    I&apos;ve been passionate about storytelling since
                    childhood. My journey as a writer officially began in 2019
                    when I started publishing my fan fiction novel
                    &quot;Pokemon: A Real Story.&quot;
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    As a fiction novelist, I focus on fantasy and adventure,
                    blending familiar elements with my own imagination to create
                    unique reading experiences. I love exploring the deeper
                    aspects of familiar worlds and adding layers of complexity
                    that make readers think.
                  </p>
                  <p className="text-muted-foreground">
                    When I&apos;m not writing, I enjoy playing video games,
                    reading other fantasy novels, and exploring the beautiful
                    landscapes of Nepal. These experiences often find their way
                    into my writing, enriching the worlds I create.
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 font-bold text-2xl">
                    My Writing Philosophy
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    I believe stories should be both entertaining and
                    thought-provoking. In my writing, I aim to create immersive
                    worlds that readers can get lost in, while also exploring
                    themes that resonate on a deeper level.
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    My approach to fan fiction is to honor the original material
                    while adding my own perspective. With &quot;Pokemon: A Real
                    Story,&quot; I wanted to explore a more realistic take on
                    the Pokemon universe, examining the implications of a world
                    where such powerful creatures exist alongside humans.
                  </p>
                  <p className="text-muted-foreground">
                    I&apos;m dedicated to improving the reader&apos;s experience
                    with every chapter I write. Your support means everything to
                    me, and I reinvest it directly into creating better content
                    and more stories for you to enjoy.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="mb-6 font-bold text-2xl text-center">
                  Connect With Me
                </h2>
                <div className="flex justify-center gap-6">
                  <motion.a
                    href={socialMedia.FACEBOOK}
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <FaFacebook className="w-6 h-6 text-[#0866FF]" />
                  </motion.a>
                  <motion.a
                    href={socialMedia.X}
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <FaXTwitter className="w-6 h-6 text-black" />
                  </motion.a>
                  <motion.a
                    href={socialMedia.INSTAGRAM}
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <FaInstagram className="w-6 h-6 text-[#FF0069]" />
                  </motion.a>
                  <motion.a
                    href={socialMedia.PATREON}
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <FaPatreon className="w-6 h-6 text-black" />
                  </motion.a>

                  <motion.a
                    href={socialMedia.DISCORD}
                    target="_blank"
                    className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition-all hover:-translate-y-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                  >
                    <FaDiscord className="w-6 h-6 text-[#5865F2]" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="faq">
            <motion.div
              className="mx-auto max-w-3xl"
              initial="hidden"
              animate={activeTab === "faq" ? "show" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="mb-12 font-bold text-3xl text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-background shadow-md rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="p-6">
                      <h3 className="mb-3 font-bold text-lg">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MaxWidthWrapper>
  );
}

/*


      <Head>
        <title>About | The Silver Prince | Rahul Manandhar</title>
        <meta
          name="description"
          content="Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He
            is a light novel writer and has been writing since 2019. He is
            famous for his novel ‘Pokemon- a real story’ which has been
            published in webnovels, Fanfiction.net and AO3."
        ></meta>
      </Head>

*/
