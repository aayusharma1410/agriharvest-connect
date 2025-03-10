
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface GovernmentSchemeRecommendationsProps {
  schemes: Array<{
    id: string;
    name: string;
    description: string;
    benefits: string;
    eligibility: string;
    application_process: string;
    category: string;
    state: string | null;
  }>;
}

const GovernmentSchemeRecommendations: React.FC<GovernmentSchemeRecommendationsProps> = ({ schemes }) => {
  if (!schemes || schemes.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Government Schemes</CardTitle>
          <CardDescription>
            No government schemes found matching your criteria.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Recommended Government Schemes</h2>
        <p className="text-muted-foreground mb-4">
          Based on your requirements, you may be eligible for these government schemes that help with agricultural storage
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.slice(0, 4).map((scheme) => (
          <Card key={scheme.id} className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="line-clamp-2">{scheme.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{scheme.category}</Badge>
                    {scheme.state && scheme.state !== 'All India' && (
                      <Badge variant="secondary">{scheme.state}</Badge>
                    )}
                    {scheme.state === 'All India' && (
                      <Badge>National Scheme</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm line-clamp-3">{scheme.description}</p>
                <div className="text-sm">
                  <p className="font-semibold">Benefits:</p>
                  <p className="line-clamp-2">{scheme.benefits}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => window.open(`/government-schemes?scheme=${scheme.id}`, '_blank')}
              >
                <Info className="h-4 w-4 mr-2" />
                View Scheme Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {schemes.length > 4 && (
        <div className="flex justify-center">
          <Button 
            variant="outline"
            onClick={() => window.open('/government-schemes', '_blank')}
          >
            View All Relevant Schemes
          </Button>
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemeRecommendations;
