import * as React from "react";

const socialIcons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e1b483037f2e4e31bfe5dae50902a93781259f02933134f7f295086b287f1f34?placeholderIfAbsent=true&apiKey=75ee0982192e49fc91344ce448028012", alt: "Social media icon" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d48d6948ca2010aff9999f59435a88941d48709aa300e1f5908b3c77e0946173?placeholderIfAbsent=true&apiKey=75ee0982192e49fc91344ce448028012", alt: "Social media icon" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/231fd00d34c075573660ec9f14d5e28dc44c74d876e1bc5225ff125c8c9b878e?placeholderIfAbsent=true&apiKey=75ee0982192e49fc91344ce448028012", alt: "Social media icon" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a91eb86b7970b2d95c6f6906055b722e0cf1d7ef41aa62549edd11717cae9aec?placeholderIfAbsent=true&apiKey=75ee0982192e49fc91344ce448028012", alt: "Social media icon" }
];

function SocialIcons() {
  return (
    <div className="flex gap-6 items-start">
      {socialIcons.map((icon, index) => (
        <img
          key={index}
          loading="lazy"
          src={icon.src}
          alt={icon.alt}
          className="object-contain shrink-0 w-7 aspect-square"
        />
      ))}
    </div>
  );
}

export default SocialIcons;