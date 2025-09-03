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
    <Card key={`${role}-${index || 0}`} className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <User className="h-4 w-4 mr-2" />
          {role} {index !== undefined && `${index + 2}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-gray-600">Name:</span>
            <p className="text-gray-900">{member.name}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Enrollment:</span>
            <p className="text-gray-900 font-mono text-xs">{member.enrollmentNo}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Contact:</span>
            <p className="text-gray-900">{member.contact}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Email:</span>
            <p className="text-gray-900 break-all">{member.email}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Branch:</span>
            <p className="text-gray-900">{member.branch}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Semester:</span>
            <p className="text-gray-900">Semester {member.semester}</p>
          </div>
          <div className="md:col-span-2">
            <span className="font-medium text-gray-600">Gender:</span>
            <Badge variant="outline" className="ml-2">
              {member.gender}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <Users className="h-5 w-5 mr-2" />
            {registration.teamName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Team Overview */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span><strong>PS Number:</strong> {registration.psNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span><strong>Female Members:</strong> {registration.teamStats.femaleMembers}/6</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span><strong>Submitted:</strong> {new Date(registration.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">National Willingness:</span>
                <Badge className={getWillingnessColor(registration.willingness)}>
                  {registration.willingness}
                </Badge>
              </div>

              {/* Technical Details */}
              {(registration.ipAddress || registration.userAgent) && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Monitor className="h-4 w-4 mr-1" />
                    Technical Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                    {registration.ipAddress && (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-3 w-3" />
                        <span>IP: {registration.ipAddress}</span>
                      </div>
                    )}
                    {registration.userAgent && (
                      <div className="flex items-start space-x-2">
                        <Monitor className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="break-all">{registration.userAgent}</span>
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
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Team Leader</h3>
            {renderMemberCard(registration.teamLeader, 'Team Leader')}
          </div>

          <Separator />

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Team Members</h3>
            {registration.teamMembers
              .filter(member => member.name) // Only show filled members
              .map((member, index) => renderMemberCard(member, 'Member', index))
            }
          </div>

          {/* Branch Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Branch Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(registration.teamStats.branches).map(([branch, count]) => (
                  <Badge key={branch} variant="outline" className="text-xs">
                    {branch}: {count}
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