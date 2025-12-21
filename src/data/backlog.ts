export interface BacklogItem {
  id: string;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Complete';
  priority: 'High' | 'Medium' | 'Low';
  storyPoints: number;
  isStory: boolean;
  isSprintReady: boolean;
  assignedToSprint: boolean;
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
      { 
        id: '1', 
        title: 'Submit Project Proposal (D1)', 
        status: 'Complete', 
        priority: 'High', 
        storyPoints: 5, 
        isStory: true, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '2', 
        title: 'Literature Review: UV Imaging & Aflatoxin', 
        status: 'Complete', 
        priority: 'Medium', 
        storyPoints: 8, 
        isStory: false, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '3', 
        title: 'Project Specifications Report (D2)', 
        status: 'Complete', 
        priority: 'High', 
        storyPoints: 13, 
        isStory: true, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '4', 
        title: 'Initial Backlog Document (D3)', 
        status: 'Complete', 
        priority: 'Medium', 
        storyPoints: 3, 
        isStory: false, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '5', 
        title: 'Launch Project Website', 
        status: 'Complete', 
        priority: 'Low', 
        storyPoints: 5, 
        isStory: true, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Berk' 
      },
    ]
  },
  {
    id: 'sprint-2',
    title: 'Sprint 2: System Analysis',
    goal: 'Analyze requirements for the UV imaging and deep learning pipeline.',
    status: 'completed',
    items: [
      { 
        id: '6', 
        title: 'Project Analysis Report (D4)', 
        status: 'Complete', 
        priority: 'High', 
        storyPoints: 13, 
        isStory: true, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '7', 
        title: 'Define Functional Requirements', 
        status: 'Complete', 
        priority: 'High', 
        storyPoints: 8, 
        isStory: true, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '8', 
        title: 'Update Backlog Document (D5)', 
        status: 'Complete', 
        priority: 'Medium', 
        storyPoints: 3, 
        isStory: false, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
    ]
  },
  {
    id: 'sprint-3',
    title: 'Sprint 3: High-Level Design',
    goal: 'Design system architecture, subsystem decomposition, and hardware/software mapping.',
    status: 'current',
    items: [
      { 
        id: '9', 
        title: 'High-Level Design Report (D6)', 
        status: 'In Progress', 
        priority: 'High', 
        storyPoints: 13, 
        isStory: true, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '10', 
        title: 'Design Subsystem Decomposition', 
        status: 'In Progress', 
        priority: 'Medium', 
        storyPoints: 8, 
        isStory: true, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '11', 
        title: 'Update Backlog Document (D7)', 
        status: 'Not Started', 
        priority: 'Low', 
        storyPoints: 2, 
        isStory: false, 
        isSprintReady: true,
        assignedToSprint: true,
        assignee: 'Team' 
      },
    ]
  },
  {
    id: 'sprint-4',
    title: 'Sprint 4: Final Presentation',
    goal: 'Showcase the Figion prototype and present results at the Year-end Exhibition.',
    status: 'upcoming',
    items: [
      { 
        id: '12', 
        title: 'Oral Presentation (D8)', 
        status: 'Not Started', 
        priority: 'High', 
        storyPoints: 8, 
        isStory: true, 
        isSprintReady: false,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '13', 
        title: 'Poster Presentation', 
        status: 'Not Started', 
        priority: 'Medium', 
        storyPoints: 5, 
        isStory: true, 
        isSprintReady: false,
        assignedToSprint: true,
        assignee: 'Team' 
      },
      { 
        id: '14', 
        title: 'Final Prototype Demonstration', 
        status: 'Not Started', 
        priority: 'High', 
        storyPoints: 21, 
        isStory: true, 
        isSprintReady: false,
        assignedToSprint: true,
        assignee: 'Team' 
      },
    ]
  },
];
