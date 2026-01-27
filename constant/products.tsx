import { Product } from "@/type/products";
import { Book, Briefcase, Handshake, NotebookTextIcon, School } from "lucide-react";

// asdasdasdasdasdasdasdasd

export const products = [
  {
    id: 1,
    name: "Studygen AI",
    title:
      "AI platform designed to supercharge student learning and exam prep.",
    avatar: "/studygen.svg",
    Icon: ({className}) => <NotebookTextIcon className={className}/>,
    url: process.env.NEXT_PUBLIC_DASHBOARD_URL || "#",
    description: `
Studygen AI is your intelligent learning companion, built to help students craft personalized study plans, generate smart notes, and access curated learning materials powered by AI. Whether you're preparing for competitive exams or mastering a new subject, Studygen adapts to your learning pace and style.

With advanced natural language understanding, it summarizes lengthy topics, quizzes you on weak areas, and keeps track of your overall progress in real time. It's not just a study planner — it's a 24/7 mentor that evolves with you, helping you stay consistent, confident, and exam-ready.

Studygen AI turns your study sessions into data-driven experiences, ensuring that every minute you invest in learning pays off with measurable results.
    `,
    features: [
      "AI-generated personalized study plans",
      "Smart notes and flashcard creation",
      "Progress tracking and adaptive scheduling",
      "Instant quiz generation for any topic",
      "Collaboration tools for study groups",
    ],
    tags: ["Education", "AI", "Learning", "Productivity"],
    reviews: 1873,
    testimonial: {
      quote:
        "Studygen completely transformed how I prepare for exams — it feels like having a personal tutor that never sleeps.",
      author: "Aarav Sharma",
      role: "Engineering Student, IIT Delhi",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  },
  {
    id: 2,
    name: "Smart Work AI",
    url: process.env.NEXT_PUBLIC_DASHBOARD_URL || "#",
    title:
      "Boost workplace productivity with intelligent AI tools for professionals.",
    avatar: "/logo.svg",
    Icon: ({className}) => <Briefcase className={className}/>,
    description: `
Professional AI empowers individuals and teams to work smarter, not harder. It integrates seamlessly with your daily workflow — from drafting emails and generating reports to managing meetings and automating repetitive tasks. Its adaptive models learn your work patterns to deliver personalized assistance tailored to your role.

Whether you’re a developer, designer, marketer, or executive, Professional AI enhances productivity through contextual insights, time-saving automations, and real-time analytics. It helps you focus on high-impact work while AI handles the rest.

With enterprise-grade security and customization, Professional AI brings the future of workplace efficiency to your fingertips — helping professionals achieve more with less effort.
    `,
    features: [
      "AI-powered document generation and summarization",
      "Task automation and workflow optimization",
      "Context-aware meeting notes and reminders",
      "Email drafting and tone adjustment",
      "Integration with tools like Slack, Notion, and Google Workspace",
    ],
    tags: ["Workplace", "Automation", "Productivity", "AI"],
    reviews: 1129,
    testimonial: {
      quote:
        "Professional AI saved me hours every week — it's like having an assistant that understands exactly how I work.",
      author: "Sophia Martinez",
      role: "Project Manager, Notion Labs",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    },
  },
  {
    id: 3,
    name: "Smart Build AI",
    url: process.env.NEXT_PUBLIC_DASHBOARD_URL || "#",
    title: "Data-driven intelligence for business growth and decision-making.",
    avatar: "/logo.svg",
    Icon: ({className}) => <Handshake className={className}/>,
    description: `
Smart Build AI delivers end-to-end intelligence for modern organizations. It helps businesses forecast trends, understand customer behavior, and automate decision-making with precision. With AI-powered analytics, leaders gain real-time visibility into operations and performance metrics across departments.

From sales automation to market prediction and customer sentiment analysis, Smart Build AI provides a unified layer of intelligence across your organization. It integrates seamlessly with your CRM, ERP, and marketing tools, ensuring every decision is backed by actionable insights.

Designed for scalability and security, Smart Build AI empowers companies to innovate faster, cut operational inefficiencies, and stay ahead in competitive markets.
    `,
    features: [
      "Predictive analytics and forecasting",
      "Automated report generation and visualization",
      "AI-driven customer segmentation and insights",
      "Sales and marketing automation",
      "Integration with major CRMs and business tools",
    ],
    tags: ["Analytics", "Business", "Enterprise", "AI"],

    reviews: 963,
    testimonial: {
      quote:
        "Our decision-making has become faster and far more data-driven — Smart Build AI paid for itself within the first month.",
      author: "David Chen",
      role: "COO, NovaTech Solutions",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  },
] satisfies Product[];
