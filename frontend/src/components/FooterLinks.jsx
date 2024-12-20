/* eslint-disable react/prop-types */
import * as React from "react";

const footerLinks = {
  getStarted: {
    title: "Get started",
    links: ["Download app", "New releases", "Originals", "Plans"]
  },
  account: {
    title: "Account", 
    links: ["Sign in", "Platform", "Support"]
  },
  pride: {
    title: "Pride",
    links: ["Partners", "Careers", "Press"] 
  }
};

function FooterLinks({ title, links }) {
  return (
    <div className="flex flex-col">
      <div className="font-medium text-zinc-500">{title}</div>
      <div className="flex flex-col mt-6 text-blue-600">
        {links.map((link, index) => (
          <div key={index} className={index > 0 ? "mt-4" : ""}>
            {link}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FooterLinks;