
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  className?: string;
  description?: string;
}

export function StatCard({ title, value, change, icon, className, description }: StatCardProps) {
  return (
    <div className={cn("relative bg-card rounded-lg shadow-sm p-6 overflow-hidden", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-1">
              <span 
                className={cn(
                  "text-xs font-medium",
                  change.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {change.isPositive ? "+" : ""}{change.value}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs. last period</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      
      {/* Decorative Element */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/5" />
    </div>
  );
}
