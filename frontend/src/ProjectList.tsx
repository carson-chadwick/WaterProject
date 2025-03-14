import { useEffect, useState } from "react";
import { Project } from "./types/project";

function ProjectList() {
  // State variables to manage projects, pagination, and total records
  const [projects, setProjects] = useState<Project[]>([]); // Stores the list of projects
  const [pageSize, setPageSize] = useState<number>(10); // Number of records per page
  const [pageNum, setPageNum] = useState<number>(1); // Current page number
  const [totalItems, setTotalItems] = useState<number>(0); // Total number of projects available
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages

  useEffect(() => {
    const fetchProjects = async () => {
      // Fetch projects from API based on the current page and page size
      const response = await fetch(
        `https://localhost:5000/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();

      // Update state with fetched data
      setProjects(data.projects);
      setTotalItems(data.totalNumProjects);
      setTotalPages(Math.ceil(totalItems / pageSize)); // Calculate total pages
    };

    fetchProjects(); // Invoke the function to fetch data
  }, [pageSize, pageNum, totalItems]); // Runs when pageSize, pageNum, or totalItems change

  return (
    <>
      <h1>Water Projects</h1>
      <br />
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
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />

      {/* Dropdown to select page size */}
      <label>Results per page:</label>
      <select
        value={pageSize}
        onChange={(p) => {
          setPageSize(Number(p.target.value)); // Update page size
          setPageNum(1); // Reset to first page when page size changes
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </>
  );
}

export default ProjectList;
