import React from "react";
import TeamClient from "@/components/TeamClient";
import { teamMembers } from "@/data/team";

export const metadata = {
  title: "Takım | Bitirme Takımı",
  description: "Takım üyeleri ve görev dağılımları",
};

const members = teamMembers;

export default function TeamPage() {
  return <TeamClient members={members} />;
}


