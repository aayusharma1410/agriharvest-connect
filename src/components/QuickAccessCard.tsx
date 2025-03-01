
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: string;
  delay?: number;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  color = "bg-agri-green-light",
  delay = 0
}) => {
  return (
    <Link 
      to={to} 
      className={`block group overflow-hidden rounded-2xl border border-border ${color} card-hover-effect shadow-subtle hover-lift`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-medium mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        <div className="flex items-center text-primary font-medium group-hover:underline">
          <span>Learn more</span>
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default QuickAccessCard;
