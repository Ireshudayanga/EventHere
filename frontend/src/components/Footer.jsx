/* eslint-disable react/prop-types */
import * as React from "react";
import logo from '../assets/images/300PPI.png';
const footerLinks = {
  getStarted: {
    title: "Get started",
    links: ["Download app", "Create event", "Sell tickets online"]
  },
  account: {
    title: "Account",
    links: ["Sign in","Support", "Contact us"]
  },
  pride: {
    title: "Developer",
    links: ["Proudly made in Sri Lanka"]
  }
};

function FooterLinks({ title, links }) {
  return (
    <div className="flex flex-col">
      <div className="font-medium text-zinc-500 text-sm md:text-base lg:text-lg">{title}</div>
      <div className="flex flex-col mt-4 md:mt-6 text-blue-600 text-xs md:text-sm lg:text-base">
        {links.map((link, index) => (
          <div key={index} className={index > 0 ? "mt-2 md:mt-4" : ""}>
            {link}
          </div>
        ))}
      </div>
    </div>
  );
}

const socialIcons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d48d6948ca2010aff9999f59435a88941d48709aa300e1f5908b3c77e0946173?placeholderIfAbsent=true&apiKey=75ee0982192e49fc91344ce448028012", alt: "Social media icon" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/231fd00d34c075573660ec9f14d5e28dc44c74d876e1bc5225ff125c8c9b878e?placeholderIfAbsent=true&apiKey=75ee0982192e49fc91344ce448028012", alt: "Social media icon" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a91eb86b7970b2d95c6f6906055b722e0cf1d7ef41aa62549edd11717cae9aec?placeholderIfAbsent=true&apiKey=75ee0982192e49fc91344ce448028012", alt: "Social media icon" }
];

function SocialIcons() {
  return (
    <div className="flex gap-4 md:gap-6 items-start">
      {socialIcons.map((icon, index) => (
        <img
          key={index}
          loading="lazy"
          src={icon.src}
          alt={icon.alt}
          className="object-contain shrink-0 w-5 md:w-7 aspect-square"
        />
      ))}
    </div>
  );
}

const legalLinks = [
  "©2025 EventHere",
  "Cookie settings",
  "Terms and conditions",
  "Privacy policy",
  "Modern slavery statement"
];

function Footer() {
  return (
    <div className="bg-[#bedddb] py-20  flex relative flex-col items-center px-5 md:px-12" >
      <div className="flex z-0 gap-5 md:gap-10 items-center w-full justify-center flex-col md:flex-row">
        <div className="flex flex-wrap gap-5 md:gap-10  items-start self-stretch my-auto w-full md:w-3/4">
          <img
            loading="lazy"
            src={logo}
            alt="Company logo"
            className="object-contain shrink-0 aspect-[1.39] w-[200px] md:w-[294px] mx-auto md:mx-0"
          />
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-5 md:gap-10 justify-center w-full md:w-auto">
            {Object.values(footerLinks).map((section, index) => (
              <FooterLinks key={index} title={section.title} links={section.links} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex z-0 flex-col items-center mt-10 md:mt-20 w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full max-md:max-w-full">
          <div className="text-sm md:text-xl text-zinc-500 text-center ">
            Bring people together one event at <span className="font-medium">Time</span>
          </div>
          <SocialIcons />
        </div>
        <div className="mt-8 md:mt-12 w-full border border-solid bg-zinc-700 border-zinc-700 max-md:mt-10" />
        <div className="flex flex-wrap gap-4 md:gap-10 justify-center items-start mt-8 md:mt-12 text-xs md:text-sm lg:text-base text-zinc-500 w-full">
          {legalLinks.map((link, index) => (
            <div key={index} className="text-center md:text-left">{link}</div>
          ))}
        </div>
      </div>
      <div className="flex absolute top-0 right-0 z-0 self-start h-[207px] min-h-[207px] w-full max-md:max-w-full" />
    </div>
  );
}

export default Footer;