import { Metadata } from "next";
import ResumeContent from "@/components/ResumeContent";

export const metadata: Metadata = {
  title: "履历",
  description: "安德鲁的工作经历、教育背景和项目经验。",
};

export default function ResumePage() {
  return <ResumeContent />;
}