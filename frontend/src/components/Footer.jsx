import * as React from "react";
import FooterLinks from "./FooterLinks";
import SocialIcons from "./SocialIcons";

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

const legalLinks = [
  "©2025 EventHere",
  "Cookie settings",
  "Terms and conditions",
  "Privacy policy",
  "Modern slavery statement"
];

function Footer() {
  return (
    <div className="bg-[#bedddb] py-36 flex relative flex-col items-center px-12 max-md:px-5" >
      <div className="flex z-0 gap-10 items-center max-w-full text-lg w-[1347px]">
        <div className="flex flex-wrap gap-10 justify-center items-start self-stretch my-auto min-w-[240px] max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c075f7a69ac98c9d5843949906aed2b86dc6c82ac44f404790795064affd9704?placeholderIfAbsent=true&apiKey=75ee0982192e49fc91344ce448028012"
            alt="Company logo"
            className="object-contain shrink-0 aspect-[1.39] min-w-[240px] w-[294px]"
          />
          {Object.values(footerLinks).map((section, index) => (
            <FooterLinks key={index} title={section.title} links={section.links} />
          ))}
        </div>
      </div>
      <div className="flex z-0 flex-col items-center mt-20 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-end max-md:max-w-full">
          <div className="text-xl text-zinc-500">
            Bring people together one event at <span className="">Time</span>{" "}
          </div>
          <SocialIcons />
        </div>
        <div className="mt-12 max-w-full min-h-0 border border-solid bg-zinc-700 border-zinc-700 w-[1231px] max-md:mt-10" />
        <div className="flex flex-wrap gap-10 items-start mt-12 text-lg text-zinc-500 max-md:mt-10 max-md:max-w-full">
          {legalLinks.map((link, index) => (
            <div key={index}>{link}</div>
          ))}
        </div>
      </div>
      <div className="flex absolute top-0 right-0 z-0 self-start h-[207px] min-h-[207px] w-[1520px] max-md:max-w-full" />
    </div>
  );
}

export default Footer;
