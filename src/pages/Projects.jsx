import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import CTA from "../Components/CTA";
import { projects } from "../constants";
import arrow from "../assets/icons/arrow.svg";

const Project = () => {
  return (
    <section className="max-container">
      <h1 className='head-text'>
        My <span className='blue-gradient_text font-semibold drop-shadow'>Projects</span>
      </h1>
      <div className='mt-5 flex flex-col gap-3 text-slate'>
        <p>Some projects that I have worked on</p>
      </div>
      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project) => (
          <div className="lg:w-[400px] w-full" key={project.name}>
            <div className="block-container h-12 w-12">
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={project.iconUrl}
                  alt={project.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col">
              <h4>{project.name}</h4>
              <p className="mt-2 text-slate-500">{project.description}</p>
              <div className="mt-5 flex items-center gap-2 font-poppins">
                <Link to={project.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-300">Live Link</Link>
                <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-slate"/>
      <CTA/>
    </section>
  );
}

export default Project;
