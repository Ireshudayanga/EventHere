/* eslint-disable react/prop-types */
import * as React from "react";
import logo from "../assets/images/300PPI.png";

const footerLinks = {
  getStarted: {
    title: "Get Started",
    links: [
      { label: "Download App", path: "/download" },
      { label: "Create Event", path: "add-events" },
      { label: "Sell Tickets Online", path: "/sell-tickets" },
    ],
  },
  account: {
    title: "Account",
    links: [
      { label: "Sign In", path: "/signin" },
      { label: "Support", path: "/support" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
  pride: {
    title: "Developer",
    links: [
      {
        label: "Proudly made in Sri Lanka",
        path: "https://github.com/Ireshudayanga",
        external: true,
      },
    ],
  },
};

const legalLinks = [
  { label: "©2025 EventHere", path: "/" },
  { label: "Cookie Settings", path: "/cookies" },
  { label: "Terms and Conditions", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Modern Slavery Statement", path: "/modern-slavery" },
];

const socialIcons = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d48d6948ca2010aff9999f59435a88941d48709aa300e1f5908b3c77e0946173",
    alt: "Facebook",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/231fd00d34c075573660ec9f14d5e28dc44c74d876e1bc5225ff125c8c9b878e",
    alt: "Instagram",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a91eb86b7970b2d95c6f6906055b722e0cf1d7ef41aa62549edd11717cae9aec",
    alt: "Twitter",
  },
];

function FooterLinks({ title, links }) {
  return (
    <div className="flex flex-col text-left">
      <h4 className="font-semibold text-zinc-700 mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-zinc-500">
        {links.map(({ label, path, external }, index) => (
          <li key={index}>
            <a
              href={path}
              target={external ? "_blank" : "_self"}
              rel={external ? "noopener noreferrer" : ""}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="flex gap-4">
      {socialIcons.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition-transform duration-200"
        />
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#bedddb] pt-16 pb-10 px-4 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-zinc-300 pb-10">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={logo} alt="EventHere logo" className="w-40 md:w-52 mb-4" />
          <p className="text-zinc-600 text-sm max-w-xs">
            Bringing people together, one event at a time.
          </p>
        </div>

        {/* Footer Links */}
        {Object.values(footerLinks).map((section, idx) => (
          <FooterLinks key={idx} title={section.title} links={section.links} />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <SocialIcons />
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs md:text-sm text-zinc-500">
          {legalLinks.map(({ label, path }, index) => (
            <a
              key={index}
              href={path}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
