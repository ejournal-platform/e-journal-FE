export type SubmissionStatus = 'Approved' | 'Pending' | 'Rejected';

export interface Submission {
  id: number;
  title: string;
  date: string;
  status: SubmissionStatus;
}

export const mockSubmissions: Submission[] = [
  { id: 1, title: "Food Safety in Catering", date: "2023-08-15", status: "Approved" },
  { id: 2, title: "Hygiene Practices", date: "2023-07-22", status: "Pending" },
  { id: 3, title: "Allergen Management", date: "2023-06-10", status: "Rejected" },
  { id: 4, title: "Food Storage Guidelines", date: "2023-05-05", status: "Approved" },
  { id: 5, title: "Cross-Contamination Prevention", date: "2023-04-18", status: "Pending" },
];
