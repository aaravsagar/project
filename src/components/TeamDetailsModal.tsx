import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Users, MapPin, Phone, Mail, Calendar, Globe, Monitor } from 'lucide-react';

interface TeamMember {
  name: string;
  enrollmentNo: string;
  contact: string;
  email: string;
  branch: string;
  semester: string;
  gender: string;
}

interface Registration {
  id: string;
  teamName: string;
  psNumber: string;
  teamLeader: TeamMember;
  teamMembers: TeamMember[];
  willingness: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  teamStats: {
    totalMembers: number;
    femaleMembers: number;
    branches: Record<string, number>;
  };
}

interface TeamDetailsModalProps {
  registration: Registration | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamDetailsModal({ registration, isOpen, onClose }: TeamDetailsModalProps) {
  if (!registration) return null;

  const getWillingnessColor = (willingness: string) => {
    switch (willingness) {
      case 'Yes': return 'bg-green-100 text-green-800';
      case 'Maybe': return 'bg-yellow-100 text-yellow-800';
      case 'No': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderMemberCard = (member: TeamMember, role: string, index?: number) => (
    <Card key={`${role}-${index || 0}`} className="mb-3 sm:mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm sm:text-base flex items-center">
          <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
          {role} {index !== undefined && `${index + 2}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
          <div>
            <span className="font-medium text-gray-600">Name:</span>
            <p className="text-gray-900 truncate" title={member.name}>{member.name}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Enrollment:</span>
            <p className="text-gray-900 font-mono text-xs break-all">{member.enrollmentNo}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Contact:</span>
            <p className="text-gray-900 font-mono">{member.contact}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Email:</span>
            <p className="text-gray-900 break-all text-xs" title={member.email}>{member.email}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Branch:</span>
            <p className="text-gray-900 truncate" title={member.branch}>{member.branch}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Semester:</span>
            <p className="text-gray-900">Semester {member.semester}</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-medium text-gray-600">Gender:</span>
            <Badge variant="outline" className="ml-2 text-xs">
              {member.gender}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto mx-2">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg md:text-xl font-bold flex items-center">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <span className="truncate">{registration.teamName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Team Overview */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                  <span className="truncate"><strong>PS:</strong> {registration.psNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                  <span className="truncate"><strong>Female:</strong> {registration.teamStats.femaleMembers}/6</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
                  <span className="truncate"><strong>Date:</strong> {new Date(registration.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-medium">National:</span>
                <Badge className={getWillingnessColor(registration.willingness)}>
                  {registration.willingness}
                </Badge>
              </div>

              {/* Technical Details */}
              {(registration.ipAddress || registration.userAgent) && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-blue-200">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Monitor className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Technical Details
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                    {registration.ipAddress && (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-3 w-3" />
                        <span className="truncate">IP: {registration.ipAddress}</span>
                      </div>
                    )}
                    {registration.userAgent && (
                      <div className="flex items-start space-x-2 max-w-full">
                        <Monitor className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="break-all text-xs leading-tight">{registration.userAgent}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Team Leader */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-900">Team Leader</h3>
            {renderMemberCard(registration.teamLeader, 'Team Leader')}
          </div>

          <Separator />

          {/* Team Members */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-900">Team Members</h3>
            {registration.teamMembers
              .filter(member => member.name) // Only show filled members
              .map((member, index) => renderMemberCard(member, 'Member', index))
            }
          </div>

          {/* Branch Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-base">Branch Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-wrap gap-2">
                {Object.entries(registration.teamStats.branches).map(([branch, count]) => (
                  <Badge key={branch} variant="outline" className="text-xs px-2 py-1">
                    <span className="sm:hidden">{branch.split(' ')[0]}: {count}</span>
                    <span className="hidden sm:inline">{branch}: {count}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
} 