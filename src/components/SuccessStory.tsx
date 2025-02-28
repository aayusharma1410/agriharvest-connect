
import React from "react";

interface SuccessStoryProps {
  name: string;
  location: string;
  story: string;
  image: string;
  delay?: number;
}

const SuccessStory: React.FC<SuccessStoryProps> = ({
  name,
  location,
  story,
  image,
  delay = 0
}) => {
  return (
    <div 
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="grid md:grid-cols-2 h-full">
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground">
              Success Story
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">"{story}"</p>
          </div>
          <div>
            <p className="font-medium text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        <div className="h-64 md:h-full">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
