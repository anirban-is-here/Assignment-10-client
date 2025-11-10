import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdMoving } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-neutral text-base-content py-6 px-10 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* LOGO */}
        <div className="mb-4 md:mb-0 flex items-center ">
          <span className="font-bold text-xl text-secondary flex">
            Next
            <span className="text-3xl text-primary">
              <MdMoving />
            </span>
            <span className="text-accent">Skill</span>
          </span>
        </div>

        {/* COPYRIGHT */}
        <div className="mb-4 md:mb-0 text-sm text-center md:text-left">
          © {new Date().getFullYear()} NextSkill. All rights reserved.
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 1227"
              className="w-4 h-4"
              fill="currentColor"
            >
              <path d="M714 519L1160 0H1042L671 441 459 0H0L464 927 141 1227H259L505 958 737 1227H1196z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
