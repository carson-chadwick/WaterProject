import { Project } from "../types/project";

interface FetchProjectsResponse {
    projects: Project [];
    totalNumProjects: number;

}

const API_URL =
  "https://wateproject-chadwick-backend.azurewebsites.net/Water";

export const fetchProjects = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
) : Promise<FetchProjectsResponse> => {

    try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join("&");
    // Fetch projects from API based on the current page and page size
    const response = await fetch(
      `${API_URL}/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok){
        throw new Error('Failed to fetch projects');
    }
    return await response.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error; // Re-throw the error to ensure the function always returns a value
    }
};

export const addProject = async (newProject: Project): Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/AddProject?`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject)
        });

        if (!response.ok) {
            throw new Error('Failed to add project')
        }

        return await response.json();
    } catch(error) {
        console.error('error adding project', error)
        throw error;
    }
};

export const updateProject = async (projectId:number, updatedProject: Project) : Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject)
        });

        return await response.json();

    } catch (error) {
        console.error("Error updating project:", error)
        throw error;
    }
};

export const deleteProject = async (projectId: number): Promise<void> =>{
    try {
        const response = await fetch(`${API_URL}/DeleteProject/${projectId}`,
            {
                method:'DELETE'
            });

            if (!response.ok) {
                throw new Error("Failed to delte project")
            }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};