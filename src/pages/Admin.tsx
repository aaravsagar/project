import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Users, Trophy, Calendar, FileSpreadsheet } from 'lucide-react';
import { getAllRegistrations } from '@/lib/firebase';
import { exportToExcel } from '@/lib/excel';
import { toast } from 'sonner';

interface Registration {
  id: string;
  teamName: string;
  psNumber: string;
  teamLeader: {
    name: string;
    enrollmentNo: string;
    contact: string;
    email: string;
    branch: string;
    semester: string;
    gender: string;
  };
  teamMembers: Array<{
    name: string;
    enrollmentNo: string;
    contact: string;
    email: string;
    branch: string;
    semester: string;
    gender: string;
  }>;
  willingness: string;
  submittedAt: string;
  teamStats: {
    totalMembers: number;
    femaleMembers: number;
    branches: Record<string, number>;
  };
}

export default function Admin() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error('Error loading registrations:', error);
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleExportToExcel = async () => {
    try {
      setExporting(true);
      await exportToExcel(registrations);
      toast.success('Excel file downloaded successfully!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const getWillingnessColor = (willingness: string) => {
    switch (willingness) {
      case 'Yes': return 'bg-green-100 text-green-800';
      case 'Maybe': return 'bg-yellow-100 text-yellow-800';
      case 'No': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                SIH 2025 Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage team registrations and export data
              </p>
            </div>
            <Button
              onClick={handleExportToExcel}
              disabled={exporting || registrations.length === 0}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Export to Excel</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Teams</p>
                  <p className="text-2xl font-bold text-gray-900">{registrations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold text-gray-900">{registrations.length * 6}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Willing for National</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {registrations.filter(r => r.willingness === 'Yes').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Female Participants</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {registrations.reduce((sum, r) => sum + r.teamStats.femaleMembers, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team Registrations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No registrations yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>PS Number</TableHead>
                      <TableHead>Team Leader</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Female Members</TableHead>
                      <TableHead>National Willingness</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">
                          {registration.teamName}
                        </TableCell>
                        <TableCell>{registration.psNumber}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{registration.teamLeader.name}</p>
                            <p className="text-sm text-gray-600">{registration.teamLeader.enrollmentNo}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{registration.teamLeader.contact}</p>
                            <p className="text-sm text-gray-600">{registration.teamLeader.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={registration.teamStats.femaleMembers >= 2 ? "default" : "secondary"}>
                            {registration.teamStats.femaleMembers}/6
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getWillingnessColor(registration.willingness)}>
                            {registration.willingness}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(registration.submittedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Show detailed view in a modal or navigate to detail page
                              console.log('View details for:', registration.id);
                              toast.info('Detailed view coming soon');
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={loadRegistrations}
            className="mr-4"
          >
            Refresh Data
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}