import { useEffect, useState } from "react";
import { Project } from "../types/project";
import { useNavigate } from "react-router-dom";
import { fetchProjects } from "../api/ProjectsAPI";
import Pagination from "./Pagination";

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  // State variables to manage projects, pagination, and total records
  const [projects, setProjects] = useState<Project[]>([]); // Stores the list of projects
  const [pageSize, setPageSize] = useState<number>(10); // Number of records per page
  const [pageNum, setPageNum] = useState<number>(1); // Current page number
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, pageNum, selectedCategories);
        // Update state with fetched data
        setProjects(data.projects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize)); // Calculate total pages
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects(); // Invoke the function to fetch data
  }, [pageSize, pageNum, selectedCategories]); // Runs when pageSize, pageNum, or totalItems change

  if (loading) return <p>Loading projects...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>


  return (
    <>
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type:</strong> {p.projectType}
              </li>
              <li>
                <strong>Regional Program:</strong> {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact:</strong> {p.projectImpact} individuals served
              </li>
              <li>
                <strong>Project Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Project Status:</strong> {p.projectFunctionalityStatus}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${p.projectName}/${p.projectId}`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default ProjectList;
