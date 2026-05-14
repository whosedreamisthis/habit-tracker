import React from "react";

type Props = {
  title: string;
  description: string;
};

const SectionHeader = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex text-3xl ">
        <p className="font-semibold">{title}</p>
        <p></p>
      </div>

      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default SectionHeader;
