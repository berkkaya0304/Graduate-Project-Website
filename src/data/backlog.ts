export interface BacklogItem {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee?: string;
}

export interface Sprint {
  id: string;
  title: string;
  goal: string;
  items: BacklogItem[];
  status: 'current' | 'upcoming' | 'completed';
}

export const sprints: Sprint[] = [
  {
    id: 'sprint-1',
    title: 'Sprint 1: Proposal & Specifications',
    goal: 'Define project scope, constraints, and initial requirements for Figion.',
    status: 'completed',
    items: [
      { id: '1', title: 'Submit Project Proposal (D1)', status: 'done', assignee: 'Team' },
      { id: '2', title: 'Literature Review: UV Imaging & Aflatoxin', status: 'done', assignee: 'Team' },
      { id: '3', title: 'Project Specifications Report (D2)', status: 'done', assignee: 'Team' },
      { id: '4', title: 'Initial Backlog Document (D3)', status: 'done', assignee: 'Team' },
      { id: '5', title: 'Launch Project Website', status: 'done', assignee: 'Berk' },
    ]
  },
  {
    id: 'sprint-2',
    title: 'Sprint 2: System Analysis',
    goal: 'Analyze requirements for the UV imaging and deep learning pipeline.',
    status: 'completed',
    items: [
      { id: '6', title: 'Project Analysis Report (D4)', status: 'done', assignee: 'Team' },
      { id: '7', title: 'Define Functional Requirements', status: 'done', assignee: 'Team' },
      { id: '8', title: 'Update Backlog Document (D5)', status: 'done', assignee: 'Team' },
    ]
  },
  {
    id: 'sprint-3',
    title: 'Sprint 3: High-Level Design',
    goal: 'Design system architecture, subsystem decomposition, and hardware/software mapping.',
    status: 'current',
    items: [
      { id: '9', title: 'High-Level Design Report (D6)', status: 'in-progress', assignee: 'Team' },
      { id: '10', title: 'Design Subsystem Decomposition', status: 'in-progress', assignee: 'Team' },
      { id: '11', title: 'Update Backlog Document (D7)', status: 'todo', assignee: 'Team' },
    ]
  },
  {
    id: 'sprint-4',
    title: 'Sprint 4: Final Presentation',
    goal: 'Showcase the Figion prototype and present results at the Year-end Exhibition.',
    status: 'upcoming',
    items: [
      { id: '12', title: 'Oral Presentation (D8)', status: 'todo', assignee: 'Team' },
      { id: '13', title: 'Poster Presentation', status: 'todo', assignee: 'Team' },
      { id: '14', title: 'Final Prototype Demonstration', status: 'todo', assignee: 'Team' },
    ]
  }
];
