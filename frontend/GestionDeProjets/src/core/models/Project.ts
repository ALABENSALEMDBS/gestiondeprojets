import { Task } from './Task';

export interface Project {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date; // Converti depuis LocalDateTime du backend
  tasks?: Task[];     // relation OneToMany
}