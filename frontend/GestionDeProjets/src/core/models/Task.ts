import { status } from './status';
import { Project } from './Project';

export interface Task {
  id?: number;
  title: string;
  status: status;
  dueDate: Date;   // Converti depuis LocalDateTime du backend
  project?: Project;
}